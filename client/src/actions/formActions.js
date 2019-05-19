import {
  STOCK_DATA_REQUESTED,
  STOCK_DATA_FAILED,
  STOCK_DATA_INVALID,
  STOCK_DATA_SUCCESS,
  STOCK_SET_TICKER
} from './types';

async const fetchData = (apiEndpoint, apiParams) => {
    let urlParms = '';
    Object.keys(apiParams).forEach(key => {
      urlParms += `${key}=${apiParams[key]}&`;
    });

    const response = await fetch(`/api/${apiEndpoint}?${urlParms}`);

    let body;
    if (response.status !== 200) {
      const errorMsg = 'Unable to connect to API server.';
      this.setState({
        stockApiError: errorMsg,
        trendApiError: errorMsg
      });
      body = null;
    } else {
      body = await response.json();
    }

    return body;
}

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

    // Fetch stock data!
    const data = await fetchData('stocks', {
      tickerSymbol,
      dateRange
    });

    // Check if any data is recieved to begin with
    if (!data) {
      return;
    }

    // Set selected stock ticker
    dispatch({
        type: STOCK_SET_TICKER,
        payload: stockTicker
    });

    // Check for external server error.
    if (data.error) {
        dispatch({
            type: STOCK_DATA_FAILED,
            payload: stockApiError
        });

      return;
    }

    // If returned array has nothing (404), create error.
    if (data.length < 1) {
        dispatch({
            type: STOCK_DATA_INVALID
        });

      return;
    }

    // Set stock state after all above checks.
    dispatch({
        type: STOCK_DATA_SUCCESS,
        payload: data
    });
}