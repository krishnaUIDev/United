import { fromJS } from 'immutable';

import autocompleteLocationReducer from '../reducer';
import {
  onHideAutocompleteLocationDropdown,
  onUpdateMobileView,
  setAutolocationAriaLabel,
} from '../actions';

describe('autocompleteLocationReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      hideAutocompleteLocation: {
        pickupLocation: 'hidden',
        dropoffLocation: 'hidden',
        bookHotel: 'hidden',
        bookFlightOrigin: 'hidden',
        bookFlightDestination: 'hidden',
        flightStatusOrigin: 'hidden',
        flightStatusDestination: 'hidden',
      },
      mobileView: {
        pickupLocation: 'relative',
        dropoffLocation: 'relative',
        bookHotel: 'relative',
        bookFlightOrigin: 'relative',
        bookFlightDestination: 'relative',
        flightStatusOrigin: 'relative',
        flightStatusDestination: 'relative',
      },
      autolocationAriaLabel: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(autocompleteLocationReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN action', () => {
    const hideDropdown = onHideAutocompleteLocationDropdown('visible', 'pickupLocation');
    const newState = autocompleteLocationReducer(undefined, hideDropdown);
    const expected = fromJS({
      hideAutocompleteLocation: {
        pickupLocation: 'visible',
        dropoffLocation: 'hidden',
        bookHotel: 'hidden',
        bookFlightOrigin: 'hidden',
        bookFlightDestination: 'hidden',
        flightStatusOrigin: 'hidden',
        flightStatusDestination: 'hidden',
      },
      mobileView: {
        pickupLocation: 'relative',
        dropoffLocation: 'relative',
        bookHotel: 'relative',
        bookFlightOrigin: 'relative',
        bookFlightDestination: 'relative',
        flightStatusOrigin: 'relative',
        flightStatusDestination: 'relative',
      },
      autolocationAriaLabel: '',
    });
    expect(newState).toEqual(expected);
  });
  it('should handle UPDATE_MOBILE_VIEW action', () => {
    const mobile = onUpdateMobileView('fixed', 'pickupLocation');
    const newState = autocompleteLocationReducer(undefined, mobile);
    const expected = fromJS({
      hideAutocompleteLocation: {
        pickupLocation: 'hidden',
        dropoffLocation: 'hidden',
        bookHotel: 'hidden',
        bookFlightOrigin: 'hidden',
        bookFlightDestination: 'hidden',
        flightStatusOrigin: 'hidden',
        flightStatusDestination: 'hidden',
      },
      mobileView: {
        pickupLocation: 'fixed',
        dropoffLocation: 'relative',
        bookHotel: 'relative',
        bookFlightOrigin: 'relative',
        bookFlightDestination: 'relative',
        flightStatusOrigin: 'relative',
        flightStatusDestination: 'relative',
      },
      autolocationAriaLabel: '',
    });
    expect(newState).toEqual(expected);
  });
  it('should handle SET_AUTO_ARIA_LABEL action', () => {
    const autoAria = setAutolocationAriaLabel('foo');
    const newState = autocompleteLocationReducer(undefined, autoAria);
    const expected = fromJS({
      hideAutocompleteLocation: {
        pickupLocation: 'hidden',
        dropoffLocation: 'hidden',
        bookHotel: 'hidden',
        bookFlightOrigin: 'hidden',
        bookFlightDestination: 'hidden',
        flightStatusOrigin: 'hidden',
        flightStatusDestination: 'hidden',
      },
      mobileView: {
        pickupLocation: 'relative',
        dropoffLocation: 'relative',
        bookHotel: 'relative',
        bookFlightOrigin: 'relative',
        bookFlightDestination: 'relative',
        flightStatusOrigin: 'relative',
        flightStatusDestination: 'relative',
      },
      autolocationAriaLabel: 'foo',
    });
    expect(newState).toEqual(expected);
  });
});
