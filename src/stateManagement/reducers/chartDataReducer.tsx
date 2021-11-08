import { CHART_DATA_LOADING_START, CHART_DATA_LOADING_FAILURE, CHART_DATA_LOADING_SUCCESS } from '../actions/actionTypes/chartDataActionTypes'

const initialState = {
  chartData: [],
  loading: false,
  error: null,
};

export const chartDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHART_DATA_LOADING_START:
      return {
        ...state,
        loading: true
      }
    case CHART_DATA_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        chartData: []
      }
    case CHART_DATA_LOADING_SUCCESS:
      return {
        loading: false,
        error: null,
        chartData: action.payload
      }
    default:
      return state;
  }
};
