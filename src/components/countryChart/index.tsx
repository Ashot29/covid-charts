import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchCurrentCountryData } from "../../services/countries.service";
import { resetCurrentCountry } from "../../stateManagement/actions/actionCreators/currentCountryActionCreator";
import { RootState } from "../../stateManagement/reducers/rootReducer";
import { fetchCurrentCountryInfo } from "./../../services/countries.service";
import { setCountryAsCurrent } from "./../../stateManagement/actions/actionCreators/currentCountryActionCreator";
import { getChartData } from "../../stateManagement/actions/actionCreators/chartDataActionCreator";

function CountryChart(): JSX.Element {
  const currentCountry = useSelector(
    (state: RootState) => state.currentCountry.country
  );
  const chartData = useSelector((state: RootState) => state.chartData);
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

  if (chartData.loading)
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon left-icon"></div>
        <div className="loading-icon right-icon"></div>
      </div>
    );

  return <div>{currentCountry.country}</div>;
}

export default CountryChart;
