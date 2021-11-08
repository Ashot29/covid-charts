import { combineReducers } from "redux";
import { countriesReducer } from "./countriesReducer";
import { currentCountryReducer } from './currentCountryReducer';
import { chartDataReducer } from './chartDataReducer';

export const rootReducer = combineReducers({
  countries: countriesReducer,
  currentCountry: currentCountryReducer,
  chartData: chartDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
