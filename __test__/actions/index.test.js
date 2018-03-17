import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/index';
import * as types from '../../src/actions/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
 
const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const adsPayload = require('../../database/ads.json');
const ads_metricsPayload = require('../../database/ads_metrics.json');
 
describe('Test Async Actions', () => {
  afterEach(() => { mock.reset(); });
  afterAll(() => { mock.restore(); });
 
  it('creates FETCH_ADS when fetching ads has been done', () => {
    mock.onGet('/api/ads').reply(200, adsPayload);
 
    const expectedActionsAds = [
      { type: types.FETCH_ADS, payload: adsPayload }
    ];
    const store = mockStore({});
 
    return store.dispatch(actions.fetchAds()).then(() => {
      expect(store.getActions()).toEqual(expectedActionsAds)
    })
  })

  it('creates FETCH_ADS_METRICS when fetching ads_metrics has been done', () => {
    mock.onGet('/api/ads_metrics').reply(200, ads_metricsPayload);
 
    const expectedActionsAdsMetrics = [
      { type: types.FETCH_ADS_METRICS, payload: ads_metricsPayload }
    ];
    const store = mockStore({});
 
    return store.dispatch(actions.fetchAdsMetrics()).then(() => {
      expect(store.getActions()).toEqual(expectedActionsAdsMetrics)
    })
  })
})
