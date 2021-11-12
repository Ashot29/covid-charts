import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetCurrentCountry } from "../../stateManagement/actions/actionCreators/currentCountryActionCreator";
import { RootState } from "../../stateManagement/reducers/rootReducer";
import { fetchCurrentCountryInfo } from "./../../services/countries.service";
import { setCountryAsCurrent } from "./../../stateManagement/actions/actionCreators/currentCountryActionCreator";
import { getChartData } from "../../stateManagement/actions/actionCreators/chartDataActionCreator";
import * as d3 from "d3";
import { ICountry } from "./../../stateManagement/reducers/countriesReducer";
import "./index.css";

interface CountryChartProps {
  width: number;
  height: number;
}

interface IChartData {
  date: string;
  count: number;
}

function CountryChart(props: CountryChartProps): JSX.Element {
  const currentCountry = useSelector(
    (state: RootState) => state.currentCountry.country
  );
  const chartDataState = useSelector((state: RootState) => state.chartData);
  const parseDate = d3.timeParse("%Y-%m-%d");
  const chartData: IChartData[] = useSelector((state: RootState) => {
    const allChartData = state.chartData.chartData;
    const countsByDate = allChartData.map((each: ICountry) => {
      return { date: parseDate(each.date.slice(0, 10)), count: each.confirmed };
    });
    return countsByDate;
  });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const countryName = history.location.pathname.slice(1);
    dispatch(getChartData(countryName));

    if (currentCountry.country === undefined) {
      fetchCurrentCountryInfo(countryName).then((data) =>
        dispatch(setCountryAsCurrent(data[0]))
      );
    }
    return () => {
      dispatch(resetCurrentCountry());
    };
  }, []);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  const doD3Stuff = (element: any) => {
    if (chartData.length === 0) return;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width =
      parseInt(d3.select("#chart").style("width")) - margin.left - margin.right;
    const height =
      parseInt(d3.select("#chart").style("height")) -
      margin.top -
      margin.bottom;
    if (chartData.length === 0) return;

    const svg = d3
      .select(element)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color", "yellow")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent<IChartData>(chartData, (d: IChartData) => d.date) as any
      )
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const max = d3.max(chartData, function (d) {
      return d.count;
    });
    if (max === undefined) return;

    const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr(
        "d", d3.line()
          .x(function (d){return x(d.date)})
          .y(function (d){return y(d.count)})
      );

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 5 - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", "white")
      .text("New York City Film Permits entered in 2020 - Shooting Permit");
  };

  if (chartDataState.loading)
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon left-icon"></div>
        <div className="loading-icon right-icon"></div>
      </div>
    );

  return (
    <div id="chart">
      <svg id="d3svg" ref={doD3Stuff}></svg>
    </div>
  );
}

export default CountryChart;
