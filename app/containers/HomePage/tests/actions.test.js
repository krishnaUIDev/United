import {
  EXPAND_HOME_TOP,
  COLLAPSE_HOME_TOP,
  SET_PRIMARY_ACTIVE_TAB,
  SET_SECONDARY_ACTIVE_TAB,
  AWARD_TRAVEL_SELECTED,
  FIRST_CLASS_TRAVEL_SELECTED,
  CABIN_CLASS_SELECTED,
  ACTIVE_FIELD,
  IS_KEYBOARD_USER,
  OPEN_RIGHT_PANEL_MODAL,
  UPDATE_CHECKIN_DETAILS_INDEX,
  TO_FOCUS_FLIGHT_STATUS_NUMBER,
  TO_FOCUS_FLIGHT_CHECKIN_NUMBER,
} from '../constants';

import {
  expandHomeTop,
  collapseHomeTop,
  setPrimaryTab,
  setSecondaryTab,
  awardTravelSelected,
  onFirstClassSelected,
  onCabinClassSelected,
  setActiveField,
  setKeyboardUser,
  onOpenRightPanelModal,
  updateCheckinDetailsIndex,
  toFocusFlightStatusNumber,
  toFocusFlightCheckinNumber,
} from '../actions';

describe('Home Actions', () => {
  describe('expandHomeTop', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: EXPAND_HOME_TOP,
      };
      expect(expandHomeTop()).toEqual(expectedResult);
    });
  });
  describe('collapseHomeTop', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: COLLAPSE_HOME_TOP,
      };
      expect(collapseHomeTop()).toEqual(expectedResult);
    });
  });
  describe('setPrimaryTab', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_PRIMARY_ACTIVE_TAB,
      };
      expect(setPrimaryTab()).toEqual(expectedResult);
    });
  });
  describe('setSecondaryTab', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_SECONDARY_ACTIVE_TAB,
      };
      expect(setSecondaryTab()).toEqual(expectedResult);
    });
  });
  describe('awardTravelSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: AWARD_TRAVEL_SELECTED,
      };
      expect(awardTravelSelected()).toEqual(expectedResult);
    });
  });
  describe('onFirstClassSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FIRST_CLASS_TRAVEL_SELECTED,
      };
      expect(onFirstClassSelected()).toEqual(expectedResult);
    });
  });
  describe('onCabinClassSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CABIN_CLASS_SELECTED,
      };
      expect(onCabinClassSelected()).toEqual(expectedResult);
    });
  });
  describe('setActiveField', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ACTIVE_FIELD,
        activeField: 'pickupLocation',
      };
      expect(setActiveField('pickupLocation')).toEqual(expectedResult);
    });
  });
  describe('setKeyboardUser', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: IS_KEYBOARD_USER,
        isKeyboardUser: true,
      };
      expect(setKeyboardUser(true)).toEqual(expectedResult);
    });
  });
  describe('onOpenRightPanelModal', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: OPEN_RIGHT_PANEL_MODAL,
        toOpen: true,
      };
      expect(onOpenRightPanelModal(true)).toEqual(expectedResult);
    });
  });
  describe('updateCheckinDetailsIndex', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UPDATE_CHECKIN_DETAILS_INDEX,
        index: 0,
      };
      expect(updateCheckinDetailsIndex(0)).toEqual(expectedResult);
    });
  });
  describe('toFocusFlightStatusNumber', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TO_FOCUS_FLIGHT_STATUS_NUMBER,
        toFocus: true,
      };
      expect(toFocusFlightStatusNumber(true)).toEqual(expectedResult);
    });
  });
  describe('toFocusFlightCheckinNumber', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TO_FOCUS_FLIGHT_CHECKIN_NUMBER,
        toFocus: true,
      };
      expect(toFocusFlightCheckinNumber(true)).toEqual(expectedResult);
    });
  });
});
