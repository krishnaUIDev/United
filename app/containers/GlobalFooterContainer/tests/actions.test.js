import {
  LOAD_FOOTER_DATA,
  LOAD_FOOTER_DATA_SUCCESS,
  LOAD_FOOTER_DATA_ERROR,
} from '../constants';

import {
  loadFooter,
  footerLoaded,
  footerLoadingError,
} from '../actions';

describe('Footer Actions', () => {
  describe('loadFooter', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_FOOTER_DATA,
        retry: true,
      };
      expect(loadFooter(true)).toEqual(expectedResult);
    });
  });

  describe('footerLoaded', () => {
    it('should return the correct type', () => {
      const data = 'stuff';
      const expectedResult = {
        type: LOAD_FOOTER_DATA_SUCCESS,
        data,
      };
      expect(footerLoaded(data)).toEqual(expectedResult);
    });
  });

  describe('footerLoadingError', () => {
    it('should return the correct type', () => {
      const error = { error: 'some error' };
      const expectedResult = {
        type: LOAD_FOOTER_DATA_ERROR,
        error,
      };
      expect(footerLoadingError(error)).toEqual(expectedResult);
    });
  });
});
