import { FETCH_ADS_METRICS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADS_METRICS:
      return action.payload;
    default:
      return state;
  }
}
