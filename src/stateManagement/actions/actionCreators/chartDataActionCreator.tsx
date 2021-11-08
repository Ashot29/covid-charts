import { AppDispatch } from "../../store";
import {
  CHART_DATA_LOADING_FAILURE,
  CHART_DATA_LOADING_START,
  CHART_DATA_LOADING_SUCCESS,
} from "./../actionTypes/chartDataActionTypes";
import { ICountry } from "./../../reducers/countriesReducer";
import { fetchCurrentCountryData } from "./../../../services/countries.service";

export const chartDataLoadingStart = () => {
  return {
    type: CHART_DATA_LOADING_START,
  };
};

export const chartDataLoadingFailure = (err: any) => {
  return {
    type: CHART_DATA_LOADING_FAILURE,
    payload: err,
  };
};

export const chartDataLoadingSuccess = (data: ICountry[]) => {
  return {
    type: CHART_DATA_LOADING_SUCCESS,
    payload: data,
  };
};

export const getChartData = (countryName: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(chartDataLoadingStart());

    fetchCurrentCountryData(countryName)
      .then((data) => dispatch(chartDataLoadingSuccess(data)))
      .catch((err) => dispatch(chartDataLoadingFailure(err)));
  };
};
