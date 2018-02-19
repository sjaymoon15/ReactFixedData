import { combineReducers } from 'redux';
import AdsReducer from './adsReducer';
import AdsMetrics from './adsMetricsReducer';

const rootReducer = combineReducers({
  adsData: AdsReducer
});

export default rootReducer;
