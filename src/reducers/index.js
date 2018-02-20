import { combineReducers } from 'redux';
import AdsReducer from './adsReducer';

const rootReducer = combineReducers({
  adsData: AdsReducer
});

export default rootReducer;
