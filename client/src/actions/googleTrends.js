import {
  GTRENDS_DATA_REQUESTED,
  GTRENDS_DATA_FAILED,
  GTRENDS_DATA_INVALID,
  GTRENDS_DATA_SUCCESS,
  GTRENDS_SET_TREND
} from './types';

import { fetchData } from './_utils/fetchData';

export const fetchGoogleTrendsData = (searchTerm, dateRange) => dispatch => {
  const googleTrendSearchTerm = searchTerm.trim();

  // Reset everything for the request :)
  dispatch({
    type: GTRENDS_DATA_REQUESTED
  });

  // Set selected stock ticker
  dispatch({
    type: GTRENDS_SET_TREND,
    payload: googleTrendSearchTerm
  });

  // Fetch stock data!
  fetchData('googletrends', { searchTerm: googleTrendSearchTerm, dateRange })
    .then(data => finalCheck(data))
    .catch(error => serverError(error));

  // Server error. Darn.
  const serverError = error => {
    console.log(error);
    dispatch({
      type: GTRENDS_DATA_FAILED,
      payload: 'No data available.'
    });
  };

  const finalCheck = data => {
    const parsedData = JSON.parse(data.results).default.timelineData;
    // If returned array has nothing (404), create error.
    if (parsedData < 1) {
      dispatch({
        type: GTRENDS_DATA_INVALID
      });
    } else {
      // Set stock state after all above checks.
      dispatch({
        type: GTRENDS_DATA_SUCCESS,
        payload: parsedData
      });
    }
  };
};
