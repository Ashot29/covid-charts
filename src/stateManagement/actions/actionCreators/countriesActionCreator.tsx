import { AppDispatch } from "../../store";
import { fetchAllCountries } from "./../../../services/countries.service";
import {
  LOADING_SUCCESS,
  LOADING_START,
  LOADING_FAILURE,
} from "./../actionTypes/countriesActionTypes";

export const setCountries = (countries: any) => {
  return {
    type: LOADING_SUCCESS,
    payload: countries,
  };
};

export const loadingStart = () => {
  return {
    type: LOADING_START,
  };
};

export const loadingFailure = (err: any) => {
    return {
        type: LOADING_FAILURE,
        payload: err
    }
}

export const getAllCountries = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadingStart());
    fetchAllCountries()
    .then((data) => dispatch(setCountries(data)))
    .catch(error => dispatch(loadingFailure(error)))
  };
};
