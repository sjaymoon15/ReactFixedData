import { FETCH_ADS } from '../actions/types';
import { FETCH_ADS_METRICS } from '../actions/types';

const INITIAL_STATE = {
  ads: null,
  adsMetrics: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADS:
      return { ...state, ads: action.payload };
    case FETCH_ADS_METRICS:
      return { ...state, adsMetrics: action.payload };
    default:
      return state;
  }
}
