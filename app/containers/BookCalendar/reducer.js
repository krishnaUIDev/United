/*
 * setDepartDate
 */
import { fromJS } from 'immutable';

import {
  HOTEL_CALENDAR_ERROR,
} from 'containers/BookHotelFormContainer/constants';
import {
  CAR_CALENDAR_ERROR,
} from 'containers/BookCarContainer/constants';
import {
  FLIGHT_CALENDAR_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  flightErrors: {
    hasStartError: false,
    hasEndError: false,
    errorMsg: '',
  },
  hotelErrors: {
    hasStartError: false,
    hasEndError: false,
    hasStayLengthError: false,
    errorMsg: '',
  },
  carErrors: {
    hasStartError: false,
    hasEndError: false,
    errorMsg: '',
  },
});

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case FLIGHT_CALENDAR_ERROR:
      return state
        .set('flightErrors', state.get('flightErrors')
          .set(action.errorType, action.errorState));
    case HOTEL_CALENDAR_ERROR:
      return state
        .set('hotelErrors', state.get('hotelErrors')
          .set(action.errorType, action.errorState));
    case CAR_CALENDAR_ERROR:
      return state
        .set('carErrors', state.get('carErrors')
          .set(action.errorType, action.errorState));
    default:
      return state;
  }
}

export default calendarReducer;
