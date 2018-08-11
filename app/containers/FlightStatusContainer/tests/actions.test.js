import {
  DATE_SELECTED,
  FLIGHT_SELECTED,
} from '../constants';

import {
  onDateSelected,
  selectedFlight,
} from '../actions';

describe('FlightStatusContainer Actions', () => {
  describe('onDateSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DATE_SELECTED,
        dateSelected: 'Wed, Dec 20',
      };
      expect(onDateSelected('Wed, Dec 20')).toEqual(expectedResult);
    });
  });
  describe('flightSegmentSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FLIGHT_SELECTED,
        index: 2,
      };
      expect(selectedFlight(2)).toEqual(expectedResult);
    });
  });
});
