import { SET_COUNTRY_AS_CURRENT, RESET_CURRENT_COUNTRY } from "./../actionTypes/currentCountryActionType";
import { ICountry } from './../../reducers/countriesReducer';

export const setCountryAsCurrent = (country: ICountry) => {
  return {
    type: SET_COUNTRY_AS_CURRENT,
    payload: country
  };
};

export const resetCurrentCountry = () => {
    return {
        type: RESET_CURRENT_COUNTRY
    }
}
