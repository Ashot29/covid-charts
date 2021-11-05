import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState } from "../../stateManagement/reducers/rootReducer";
import { ICountry } from "./../../stateManagement/reducers/countriesReducer";
import SortIcon from '@mui/icons-material/Sort';
import "./index.css";

export default function CountriesTable() {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
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
              <span className="table-cell-span header-cell">Country <span><SortIcon /></span></span>
            </TableCell>
            <TableCell>
              <span className="table-cell-span header-cell">Total Cases <span><SortIcon /></span></span>
            </TableCell>
            <TableCell>
              <span className="table-cell-span header-cell">New Cases <span><SortIcon /></span></span>
            </TableCell>
            <TableCell>
              <span className="table-cell-span header-cell">Total Deaths <span><SortIcon /></span></span>
            </TableCell>
            <TableCell>
              <span className="table-cell-span header-cell">New Deaths <span><SortIcon /></span></span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country: ICountry, index: number) => (
            <TableRow
              key={country.country}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <span>{index + 1}</span>
              </TableCell>
              <TableCell component="th" scope="row">
                <span className="table-cell-span">{country.country}</span>
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
                <span className="table-cell-span">{country.deaths_daily}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
