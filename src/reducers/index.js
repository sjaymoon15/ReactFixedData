import { combineReducers } from 'redux';
import AdsReducer from './adsReducer';
import AdsMetrics from './adsMetricsReducer';

const rootReducer = combineReducers({
  ads: AdsReducer,
  adsMetrics: AdsMetrics
});

export default rootReducer;
