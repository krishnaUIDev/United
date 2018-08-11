/*
 * BookCarReducer
 */
import { fromJS } from 'immutable';

import {
  BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
  BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
  CORPORATE_BOOK_CHECKED,
  NONSTOP_CHECKED,
  FLEXIBLE_DATES_CHECKED,
  ROUNDTRIP_CHECKED,
  UPDATE_PASSENGER_INFO,
  DISABLE_TRAVELER_BUTTONS,
  OPEN_OR_CLOSE_PASSENGER_MENU,
  UPDATE_FULL_PASSENGERS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  corporateBookChecked: false,
  nonstopChecked: false,
  flexibleDatesChecked: false,
  flightOrigin: '',
  flightDestination: '',
  roundtripChecked: '',
  passengersToBook: {
    'Adults (18-64)': 1,
    'Seniors (65+)': 0,
    'Infants (under 2)': 0,
    'Infants on lap': 0,
    'Children (15-17)': 0,
    'Children (12-14)': 0,
    'Children (5-11)': 0,
    'Children (2-4)': 0,
  },
  disableTravelerButtons: {
    plusBtn: false,
    minusBtn: true,
  },
  showTravelerMenu: false,
});

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case CORPORATE_BOOK_CHECKED:
      return state
        .set('corporateBookChecked', action.isChecked);
    case NONSTOP_CHECKED:
      return state
        .set('nonstopChecked', action.isChecked);
    case FLEXIBLE_DATES_CHECKED:
      return state
        .set('flexibleDatesChecked', action.isChecked);
    case BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED:
      return state
        .set('flightOrigin', action.bookFlightOriginLocation);
    case BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED:
      return state
        .set('flightDestination', action.bookFlightDestinationLocation);
    case ROUNDTRIP_CHECKED:
      return state
        .set('roundtripChecked', action.isChecked);
    case UPDATE_PASSENGER_INFO:
      return state
        .set('passengersToBook', state.get('passengersToBook')
          .set(action.passengerSection, action.passengerCount));
    case DISABLE_TRAVELER_BUTTONS:
      return state
        .set('disableTravelerButtons', state.get('disableTravelerButtons')
          .set(action.btnType, action.toDisable));
    case OPEN_OR_CLOSE_PASSENGER_MENU:
      return state
        .set('showTravelerMenu', action.toOpen);
    case UPDATE_FULL_PASSENGERS:
      return state
        .set('passengersToBook', action.passengers);
    default:
      return state;
  }
}

export default bookingReducer;
