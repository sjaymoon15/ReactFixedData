import reducer from '../../src/reducers/adsReducer';
import * as types from '../../src/actions/types';

const adsPayload = require('../../database/ads.json');
const ads_metricsPayload = require('../../database/ads_metrics.json');
 
describe('ads reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        ads: null,
        adsMetrics: null
      }
    )
  })
 
  it('should handle FETCH_ADS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_ADS,
        payload: adsPayload
      })
    ).toEqual(
      {
        ads: adsPayload
      }
    )
  })

  it('should handle FETCH_ADS_METRICS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_ADS_METRICS,
        payload: ads_metricsPayload
      })
    ).toEqual(
      {
        adsMetrics: ads_metricsPayload
      }
    )
  })
})
