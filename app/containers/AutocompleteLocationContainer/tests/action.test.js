import {
  HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN,
  UPDATE_MOBILE_VIEW,
  SET_AUTO_ARIA_LABEL,
} from '../constants';

import {
  onHideAutocompleteLocationDropdown,
  onUpdateMobileView,
  setAutolocationAriaLabel,
} from '../actions';

describe('AutocompleteLocationContainer Actions', () => {
  describe('onHideAutocompleteLocationDropdown', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN,
      };
      expect(onHideAutocompleteLocationDropdown()).toEqual(expectedResult);
    });
  });
  describe('onUpdateMobileView', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UPDATE_MOBILE_VIEW,
      };
      expect(onUpdateMobileView()).toEqual(expectedResult);
    });
  });
  describe('setAutolocationAriaLabel', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_AUTO_ARIA_LABEL,
        ariaLabel: 'foo',
      };
      expect(setAutolocationAriaLabel('foo')).toEqual(expectedResult);
    });
  });
});
