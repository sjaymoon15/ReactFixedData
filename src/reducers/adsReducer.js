import { FETCH_ADS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADS:
      return action.payload;
    default:
      return state;
  }
}
