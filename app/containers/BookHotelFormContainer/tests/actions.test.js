import {
  UPDATE_HOTEL_INFO,
  OPEN_OR_CLOSE_HOTEL_MENU,
  DISABLE_HOTEL_BUTTONS,
} from '../constants';

import {
  updateHotelInfo,
  displayHotelMenu,
  disableHotelButtons,
} from '../actions';

describe('BookHotelFormContainer Actions', () => {
  describe('updatePassengerInfo', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UPDATE_HOTEL_INFO,
      };
      expect(updateHotelInfo()).toEqual(expectedResult);
    });
  });
  describe('displayPassengersMenu', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: OPEN_OR_CLOSE_HOTEL_MENU,
      };
      expect(displayHotelMenu()).toEqual(expectedResult);
    });
  });
  describe('disableTravelerButtons', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DISABLE_HOTEL_BUTTONS,
      };
      expect(disableHotelButtons()).toEqual(expectedResult);
    });
  });
});
