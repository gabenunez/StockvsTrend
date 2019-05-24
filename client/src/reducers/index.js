import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';
import googleTrendsReducer from './googleTrendsReducer';

export default combineReducers({
  stocks: stocksReducer,
  googleTrends: googleTrendsReducer
});
