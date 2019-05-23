import {
  GTRENDS_DATA_REQUESTED,
  GTRENDS_DATA_SUCCESS,
  GTRENDS_DATA_INVALID,
  GTRENDS_DATA_FAILED,
  GTRENDS_SET_TREND
} from '../actions/types';

const initialState = {
  trendIsInvalid: false,
  trendsData: null,
  selectedTrend: null,
  trendApiError: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GTRENDS_SET_TREND:
      return {
        ...state,
        selectedTrend: action.payload
      };

    case GTRENDS_DATA_REQUESTED:
      return {
        ...state,
        trendsData: null
      };

    case GTRENDS_DATA_INVALID:
      return {
        ...state,
        trendIsInvalid: true,
        trendsData: null
      };

    case GTRENDS_DATA_SUCCESS:
      return {
        ...state,
        trendsData: action.payload
      };

    case GTRENDS_DATA_FAILED:
      return {
        ...state,
        trendsData: null,
        trendApiError: action.payload
      };

    default:
      return state;
  }
}
