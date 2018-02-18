import axios from 'axios';
import { FETCH_ADS, FETCH_ADS_METRICS } from './types';

export const fetchAds = () =>  {
  return (dispatch) => {
    axios.get('/api/ads')
    .then(result => dispatch({ type: FETCH_ADS, payload: result.data }))
  }
};

export const fetchAdsMetrics = () =>  {
  return (dispatch) => {
    axios.get('/api/ads_metrics')
    .then(result => dispatch({ type: FETCH_ADS_METRICS, payload: result.data }))
  }
};
