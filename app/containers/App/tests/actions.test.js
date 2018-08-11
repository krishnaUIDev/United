import {
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  LOAD_FLIGHT_CHECKIN,
  LOAD_FLIGHT_CHECKIN_SUCCESS,
  LOAD_FLIGHT_CHECKIN_ERROR,
} from '../constants';

import {
  loadToken,
  tokenLoaded,
  tokenLoadingError,
  loadFlightCheckin,
  flightCheckinLoaded,
  flightCheckinLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('token refresh', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOKEN_ANON,
      };

      expect(loadToken()).toEqual(expectedResult);
    });
  });

  describe('tokenLoaded', () => {
    it('should return the correct token', () => {
      const token = { hash: '1234', expires: 999999999999 };
      const expectedResult = {
        type: TOKEN_ANON_SUCCESS,
        token,
      };

      expect(tokenLoaded(token)).toEqual(expectedResult);
    });
  });

  describe('tokenLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: TOKEN_ANON_ERROR,
        error: fixture,
      };

      expect(tokenLoadingError(fixture)).toEqual(expectedResult);
    });
  });

  describe('loadFlightCheckin', () => {
    it('should return the correct type', () => {
      const retry = false;
      const expectedResult = {
        type: LOAD_FLIGHT_CHECKIN,
        retry,
      };
      expect(loadFlightCheckin(false)).toEqual(expectedResult);
    });
  });
  describe('flightCheckinLoaded', () => {
    it('should return the correct type', () => {
      const checkinInfo = {};
      const expectedResult = {
        type: LOAD_FLIGHT_CHECKIN_SUCCESS,
        checkinInfo,
      };
      expect(flightCheckinLoaded(checkinInfo)).toEqual(expectedResult);
    });
  });
  describe('flightCheckinLoadingError', () => {
    it('should return the correct type', () => {
      const error = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_FLIGHT_CHECKIN_ERROR,
        error,
      };
      expect(flightCheckinLoadingError(error)).toEqual(expectedResult);
    });
  });
});
