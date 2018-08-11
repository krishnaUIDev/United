/*
 * BookHotelFormReducer
 */
import { fromJS } from 'immutable';

import {
  HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN,
  UPDATE_MOBILE_VIEW,
  SET_AUTO_ARIA_LABEL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
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

function autocompleteLocationReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN:
      if (!action.id) {
        return state
          .set('hideAutocompleteLocation',
            state.get('hideAutocompleteLocation').set('bookFlightOrigin', 'hidden'),
            state.get('hideAutocompleteLocation').set('bookFlightDestination', 'hidden'),
            state.get('hideAutocompleteLocation').set('bookHotel', 'hidden'),
            state.get('hideAutocompleteLocation').set('pickupLocation', 'hidden'),
            state.get('hideAutocompleteLocation').set('dropoffLocation', 'hidden'),
            state.get('hideAutocompleteLocation').set('flightStatusOrigin', 'hidden'),
            state.get('hideAutocompleteLocation').set('flightStatusDestination', 'hidden'));
      }
      return state
        .set('hideAutocompleteLocation', state.get('hideAutocompleteLocation')
          .set(action.id, action.toHide));
    case UPDATE_MOBILE_VIEW:
      return state
        .set('mobileView', state.get('mobileView')
          .set(action.id, action.style));
    case SET_AUTO_ARIA_LABEL:
      return state
        .set('autolocationAriaLabel', action.ariaLabel);
    default:
      return state;
  }
}

export default autocompleteLocationReducer;
