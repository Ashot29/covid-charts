import { SET_COUNTRY_AS_CURRENT, RESET_CURRENT_COUNTRY } from './../actions/actionTypes/currentCountryActionType';

const initialState = {
  country: {},
};

export const currentCountryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_COUNTRY_AS_CURRENT:
      return {
        ...state,
        country: action.payload
      }
    case RESET_CURRENT_COUNTRY:
      return {
        country: {}
      }
    default:
      return state;
  }
};
