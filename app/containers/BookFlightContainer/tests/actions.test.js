import {
  BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
  BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
  CORPORATE_BOOK_CHECKED,
  NONSTOP_CHECKED,
  FLEXIBLE_DATES_CHECKED,
  SET_ORIGIN_CODE,
  SET_DESTINATION_CODE,
  UPDATE_PASSENGER_INFO,
  OPEN_OR_CLOSE_PASSENGER_MENU,
  DISABLE_TRAVELER_BUTTONS,
} from '../constants';

import {
  onBookFlightOriginLocationSelected,
  onBookFlightDestinationLocationSelected,
  onCorporateBookChecked,
  onNonstopChecked,
  onFlexibleDatesChecked,
  onSetDestinationLocationCode,
  onSetOriginLocationCode,
  updatePassengerInfo,
  displayPassengersMenu,
  disableTravelerButtons,
} from '../actions';

describe('BookFlightFormContainer Actions', () => {
  describe('onBookFlightOriginLocationSelected', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
        bookFlightOriginLocation: 'foo',
      };
      expect(onBookFlightOriginLocationSelected('foo')).toEqual(expectedResult);
    });
  });
  describe('onBookFlightDestinationLocationSelected', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
        bookFlightDestinationLocation: 'foo',
      };
      expect(onBookFlightDestinationLocationSelected('foo')).toEqual(expectedResult);
    });
  });
  describe('onCorporateBookChecked', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: CORPORATE_BOOK_CHECKED,
        isChecked: true,
      };
      expect(onCorporateBookChecked(true)).toEqual(expectedResult);
    });
  });
  describe('onNonstopChecked', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: NONSTOP_CHECKED,
        isChecked: true,
      };
      expect(onNonstopChecked(true)).toEqual(expectedResult);
    });
  });
  describe('onFlexibleDatesChecked', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: FLEXIBLE_DATES_CHECKED,
        isChecked: true,
      };
      expect(onFlexibleDatesChecked(true)).toEqual(expectedResult);
    });
  });
  describe('onSetDestinationLocationCode', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: SET_DESTINATION_CODE,
        code: 'LAX',
      };
      expect(onSetDestinationLocationCode('LAX')).toEqual(expectedResult);
    });
  });
  describe('onSetOriginLocationCode', () => {
    it('should return the correct type and property', () => {
      const expectedResult = {
        type: SET_ORIGIN_CODE,
        code: 'ORD',
      };
      expect(onSetOriginLocationCode('ORD')).toEqual(expectedResult);
    });
  });
  describe('updatePassengerInfo', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UPDATE_PASSENGER_INFO,
      };
      expect(updatePassengerInfo()).toEqual(expectedResult);
    });
  });
  describe('displayPassengersMenu', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: OPEN_OR_CLOSE_PASSENGER_MENU,
      };
      expect(displayPassengersMenu()).toEqual(expectedResult);
    });
  });
  describe('disableTravelerButtons', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DISABLE_TRAVELER_BUTTONS,
      };
      expect(disableTravelerButtons()).toEqual(expectedResult);
    });
  });
});
