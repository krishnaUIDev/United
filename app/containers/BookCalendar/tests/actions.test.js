import {
  FLIGHT_CALENDAR_START_DATE,
  FLIGHT_CALENDAR_END_DATE,
  CALENDAR_FOCUSED_INPUT,
} from '../constants';

import {
  onSetDepartDate,
  onSetReturnDate,
  onSetFocusedInput,
} from '../actions';

describe('BookCalendar Actions', () => {
  describe('onSetDepartDate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FLIGHT_CALENDAR_START_DATE,
      };
      expect(onSetDepartDate()).toEqual(expectedResult);
    });
  });
  describe('onSetReturnDate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FLIGHT_CALENDAR_END_DATE,
      };
      expect(onSetReturnDate()).toEqual(expectedResult);
    });
  });
  describe('onSetFocusedInput', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CALENDAR_FOCUSED_INPUT,
      };
      expect(onSetFocusedInput()).toEqual(expectedResult);
    });
  });
});
