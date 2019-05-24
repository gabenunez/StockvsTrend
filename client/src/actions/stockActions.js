import {
  STOCK_DATA_REQUESTED,
  STOCK_DATA_FAILED,
  STOCK_DATA_INVALID,
  STOCK_DATA_SUCCESS,
  STOCK_SET_TICKER
} from './types';

import { fetchData } from './_utils/fetchData';

export const fetchStockData = (tickerSymbol, dateRange) => dispatch => {
  const stockTicker = tickerSymbol.trim();

  // Reset everything for the request :)
  dispatch({
    type: STOCK_DATA_REQUESTED
  });
  dispatch({
    type: STOCK_SET_TICKER,
    payload: null
  });

  // Set selected stock ticker
  dispatch({
    type: STOCK_SET_TICKER,
    payload: stockTicker
  });

  // Fetch stock data!
  fetchData('stocks', { tickerSymbol: stockTicker, dateRange })
    .then(data => finalCheck(data))
    .catch(error => serverError(error));

  // Server error. Darn.
  const serverError = error => {
    dispatch({
      type: STOCK_DATA_FAILED,
      payload: error
    });
  };

  const finalCheck = data => {
    // If returned array has nothing (404), create error.
    if (data.length < 1) {
      dispatch({
        type: STOCK_DATA_INVALID
      });
    } else {
      // Set stock state after all above checks.
      dispatch({
        type: STOCK_DATA_SUCCESS,
        payload: data
      });
    }
  };
};
