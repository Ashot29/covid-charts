import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stateManagement/reducers/rootReducer";
import { ICountry } from "./../../stateManagement/reducers/countriesReducer";
import SortIcon from "@mui/icons-material/Sort";
import "./index.css";
import { Link } from "react-router-dom";
import { setCountryAsCurrent } from "./../../stateManagement/actions/actionCreators/currentCountryActionCreator";

const sortTypes: any = {
  totalCases: {
    fn: (a: ICountry, b: ICountry) => b.confirmed - a.confirmed,
  },
  countryName: {
    fn: (a: ICountry, b: ICountry) =>
      a.country > b.country ? 1 : b.country > a.country ? -1 : 0,
  },
  newCases: {
    fn: (a: ICountry, b: ICountry) => b.confirmed_daily - a.confirmed_daily,
  },
  totalDeaths: {
    fn: (a: ICountry, b: ICountry) => b.deaths - a.deaths,
  },
  newDeaths: {
    fn: (a: ICountry, b: ICountry) => b.deaths_daily - a.deaths_daily,
  },
};

export default function CountriesTable(): JSX.Element {
  const dispatch = useDispatch();
  const [sortState, setSortState] = React.useState("totalCases");
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const isLoading = useSelector((state: RootState) => state.countries.loading);

  function setCurrentCountry(id: string) {
    dispatch(
      setCountryAsCurrent(
        countries.find((country: ICountry) => country._id === id)
      )
    );
  }

  function changeSortState(event: any) {
    setSortState(event.target.dataset.name);
  }

  if (isLoading)
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon left-icon"></div>
        <div className="loading-icon right-icon"></div>
      </div>
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <span>#</span>
            </TableCell>
            <TableCell>
              <div className="table-cell-content">
                <span
                  className="table-cell-span header-cell"
                  data-name="countryName"
                  onClick={changeSortState}
                >
                  Country{" "}
                </span>
                <span>
                  <SortIcon />
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="table-cell-content">
                <span
                  className="table-cell-span header-cell"
                  data-name="totalCases"
                  onClick={changeSortState}
                >
                  Total Cases{" "}
                </span>
                <span>
                  <SortIcon />
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="table-cell-content">
                <span
                  className="table-cell-span header-cell"
                  data-name="newCases"
                  onClick={changeSortState}
                >
                  New Cases{" "}
                </span>
                <span>
                  <SortIcon />
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="table-cell-content">
                <span
                  className="table-cell-span header-cell"
                  data-name="totalDeaths"
                  onClick={changeSortState}
                >
                  Total Deaths{" "}
                </span>
                <span>
                  <SortIcon />
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="table-cell-content">
                <span
                  className="table-cell-span header-cell"
                  data-name="newDeaths"
                  onClick={changeSortState}
                >
                  New Deaths{" "}
                </span>
                <span>
                  <SortIcon />
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...countries]
            .sort(sortTypes[sortState].fn)
            .map((country: ICountry, index: number) => (
              <TableRow
                key={country.country}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <span>{index + 1}</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className="table-cell-span">
                    <Link
                      className="country-cell"
                      to={`${country.country}`}
                      onClick={() => setCurrentCountry(country._id)}
                    >
                      {country.country}
                    </Link>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="table-cell-span">{country.confirmed}</span>
                </TableCell>
                <TableCell>
                  <span className="table-cell-span">
                    {country.confirmed_daily}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="table-cell-span">{country.deaths}</span>
                </TableCell>
                <TableCell>
                  <span className="table-cell-span">
                    {country.deaths_daily}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
