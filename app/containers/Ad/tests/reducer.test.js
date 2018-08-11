import adsReducer, { initialState } from '../reducer';
import {
  loadAds,
  adsLoaded,
  adsLoadingError,
} from '../actions';

import response from './samples/response.json';

describe('adsReducer', () => {
  it('should handle loadAds action correctly', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', true)
      .set('retryCount', 0);
    expect(adsReducer(initialState, loadAds(false))).toEqual(expectedResult);
  });

  it('should handle adsLoaded action correctly', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', false)
      .set('loaded', true)
      .set('data', response.data.ads);
    expect(adsReducer(initialState, adsLoaded(response.data.ads))).toEqual(expectedResult);
  });

  it('should handle adsLoadingError action correctly', () => {
    const error = { error: 'error message' };
    const expectedResult = initialState
      .set('error', error)
      .set('loading', false)
      .set('retryCount', 0);
    expect(adsReducer(initialState, adsLoadingError(error))).toEqual(expectedResult);
  });
});
