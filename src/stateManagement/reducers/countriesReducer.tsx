import {
  LOADING_START,
  LOADING_FAILURE,
  LOADING_SUCCESS,
} from "./../actions/actionTypes/countriesActionTypes";

const initialState = {
  loading: false,
  countries: [],
  error: null,
};

export interface ICountry {
  _id: string;
  confirmed: number
  confirmed_daily: number
  country: string
  date: string
  deaths: number
  deaths_daily: number
  population: number
  recovered: number
  recovered_daily: number
}

export const countriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOADING_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
