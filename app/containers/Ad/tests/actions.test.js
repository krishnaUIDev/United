import {
  LOAD_ADS,
  LOAD_ADS_SUCCESS,
  LOAD_ADS_ERROR,
} from '../constants';

import {
  loadAds,
  adsLoaded,
  adsLoadingError,
} from '../actions';

describe('Ads actions', () => {
  describe('loadAds', () => {
    it('should return the correct type (no retry)', () => {
      const expectedResult = {
        type: LOAD_ADS,
        retry: false,
      };
      expect(loadAds()).toEqual(expectedResult);
    });
  });

  describe('adsLoaded', () => {
    it('should return the correct type', () => {
      const data = 'stuff';
      const expectedResult = {
        type: LOAD_ADS_SUCCESS,
        data,
      };
      expect(adsLoaded(data)).toEqual(expectedResult);
    });
  });

  describe('adsLoadingError', () => {
    it('should return the correct type', () => {
      const error = { error: 'some error' };
      const expectedResult = {
        type: LOAD_ADS_ERROR,
        error,
      };
      expect(adsLoadingError(error)).toEqual(expectedResult);
    });
  });
});
