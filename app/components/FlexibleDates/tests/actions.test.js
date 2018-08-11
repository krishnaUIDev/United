import {
  FLEXIBLE_MONTH,
  FLEXIBLE_DAY,
} from '../constants';

import {
  setFlexMonth,
  setTripLength,
} from '../actions';

describe('App Actions', () => {
  describe('setFlexMonth', () => {
    it('should return the correct token', () => {
      const flexMonth = '2018-03-01';
      const expectedResult = {
        type: FLEXIBLE_MONTH,
        flexMonth,
      };

      expect(setFlexMonth(flexMonth)).toEqual(expectedResult);
    });
  });

  describe('setTripLength', () => {
    it('should return the correct token', () => {
      const tripLength = '6';
      const expectedResult = {
        type: FLEXIBLE_DAY,
        tripLength,
      };

      expect(setTripLength(tripLength)).toEqual(expectedResult);
    });
  });
});
