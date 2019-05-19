import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';

export default combineReducers({
  stocks: stocksReducer
});
