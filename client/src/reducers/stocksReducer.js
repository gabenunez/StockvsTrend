import {
  STOCK_DATA_REQUESTED,
  STOCK_DATA_SUCCESS,
  STOCK_DATA_INVALID,
  STOCK_DATA_FAILED,
  STOCK_SET_TICKER
} from '../actions/types';

const initialState = {
  selectedTicker: null,
  stockData: null,

  stockIsInvalid: false,
  stockApiError: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STOCK_SET_TICKER:
      return {
        ...state,
        selectedTicker: action.payload
      };

    case STOCK_DATA_REQUESTED:
      return {
        ...state,
        stockData: null
      };

    case STOCK_DATA_INVALID:
      return {
        ...state,
        stockIsInvalid: true,
        stockData: null
      };

    case STOCK_DATA_SUCCESS:
      return {
        ...state,
        stockData: action.payload
      };

    case STOCK_DATA_FAILED:
      return {
        ...state,
        stockData: null,
        stockApiError: action.payload
      };

    default:
      return state;
  }
}
