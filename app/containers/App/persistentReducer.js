/*
 * Persistant Reducer
 *
 * This reduces is persisted using localForage and automatically rehydrated
 */

import { fromJS } from 'immutable';
import moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';

import {
  ROUNDTRIP_CHECKED,
  FLEXIBLE_DATES_CHECKED,
  NONSTOP_CHECKED,
  CORPORATE_BOOK_CHECKED,
  BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
  BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
  SET_ORIGIN_CODE,
  SET_DESTINATION_CODE,
  UPDATE_PASSENGER_INFO,
} from 'containers/BookFlightContainer/constants';
import {
  FLIGHT_CALENDAR_START_DATE,
  FLIGHT_CALENDAR_END_DATE,
  CALENDAR_FOCUSED_INPUT,
} from 'containers/BookCalendar/constants';
import {
  HOTEL_START_DATE,
  HOTEL_END_DATE,
} from 'containers/BookHotelFormContainer/constants';
import {
  BOOK_CAR_DRIVERS_AGE_SELECTED,
  BOOK_CAR_SAME_LOCATION_CHECKED,
  BOOK_CAR_HIDE_AGE_BOX_CHECKED,
  BOOK_CAR_CALENDAR_PICKUP_DATE,
  BOOK_CAR_CALENDAR_DROPOFF_DATE,
} from 'containers/BookCarContainer/constants';
import {
  SET_FLIGHT_STATUS_ORIGIN_CODE,
  SET_FLIGHT_STATUS_DESTINATION_CODE,
  FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED,
  FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED,
} from 'containers/FlightStatusContainer/constants';
import { CABIN_CLASS_SELECTED, AWARD_TRAVEL_SELECTED } from 'containers/HomePage/constants';
import { FLEXIBLE_MONTH, FLEXIBLE_DAY } from 'components/FlexibleDates/constants';

import {
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  TOKEN_REFRESH,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_ERROR,
  LOAD_SIGN_IN_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  REMEMBER_ME_CHECKED,
  DO_SIGN_OUT,
  SIGN_OUT_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  apiToken: false,
  roundtripChecked: true,
  flexibleDatesChecked: false,
  corporateBookChecked: false,
  nonstopFlightChecked: false,
  flightDestination: '',
  flightOrigin: '',
  flightStartDate: null,
  calendarFocusedInput: '',
  flightEndDate: null,
  flexMonth: moment().date(1).format('YYYY-MM-DD'),
  tripLength: '6',
  hotelStartDate: null,
  hotelEndDate: null,
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
  cabinSelected: 'econ',
  awardTravelSelected: false,
  originLocationCode: '',
  destinationLocationCode: '',
  mpUsername: '',
  mpUsernameCrypto: '',
  rememberMeChecked: false,
  flightStatusOrigin: '',
  flightStatusDestination: '',
  flightStatusOriginLocationCode: '',
  flightStatusDestinationLocationCode: '',
  carSameLocationChecked: true,
  carHideAgeBox: true,
  carPickupDate: null,
  carDropoffDate: null,
  carDropoffTime: '10|0',
  carPickupTime: '10|0',
});

function persistentReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case REHYDRATE:
      // console.log('REHYDRATE persistantReducer', action.payload);
      return state;
    case TOKEN_ANON:
      return state
        .set('error', false)
        .set('apiToken', false);
    case TOKEN_ANON_SUCCESS:
      return state
        .set('apiToken', { ...action.token, isAuthenticated: false });
    case TOKEN_ANON_ERROR:
      return state
        .set('error', action.error);
    case TOKEN_REFRESH:
      return state
        .set('error', false);
    case TOKEN_REFRESH_SUCCESS: {
      const isAuthenticated = (state.get('apiToken') && state.get('apiToken').isAuthenticated) === true;
      return state
        .set('apiToken', { ...action.token, isAuthenticated });
    }
    case TOKEN_REFRESH_ERROR:
      return state
        .set('error', action.error);
    case ROUNDTRIP_CHECKED:
      return state
        .set('roundtripChecked', action.isChecked);
    case FLEXIBLE_DATES_CHECKED:
      return state
        .set('flexibleDatesChecked', action.isChecked);
    case NONSTOP_CHECKED:
      return state
        .set('nonstopFlightChecked', action.isChecked);
    case CORPORATE_BOOK_CHECKED:
      return state
        .set('corporateBookChecked', action.isChecked);
    case BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED:
      return state
        .set('flightDestination', action.bookFlightDestinationLocation);
    case BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED:
      return state
        .set('flightOrigin', action.bookFlightOriginLocation);
    case FLIGHT_CALENDAR_START_DATE:
      return state
        .set('flightStartDate', action.startDate);
    case CALENDAR_FOCUSED_INPUT:
      return state
        .set('calendarFocusedInput', action.focusedInput);
    case FLIGHT_CALENDAR_END_DATE:
      return state
        .set('flightEndDate', action.endDate);
    case FLEXIBLE_MONTH:
      return state
        .set('flexMonth', action.flexMonth);
    case FLEXIBLE_DAY:
      return state
        .set('tripLength', action.tripLength);
    case HOTEL_START_DATE:
      return state
        .set('hotelStartDate', action.startDate);
    case HOTEL_END_DATE:
      return state
        .set('hotelEndDate', action.endDate);
    case UPDATE_PASSENGER_INFO:
      return state
        .set('passengersToBook', state.get('passengersToBook')
          .set(action.passengerSection, action.passengerCount));
    case CABIN_CLASS_SELECTED:
      return state
        .set('cabinSelected', action.cabinSelected);
    case AWARD_TRAVEL_SELECTED:
      return state
        .set('awardTravelSelected', action.isSelected);
    case SET_ORIGIN_CODE:
      return state
        .set('originLocationCode', action.code);
    case SET_DESTINATION_CODE:
      return state
        .set('destinationLocationCode', action.code);
    case LOAD_PROFILE_SUCCESS: {
      let newState = state;
      if (state.get('mpUsernameCrypto') !== action.mpUsernameCrypto) {
        newState = state.set('mpUsername', '').set('mpUsernameCrypto', '');
      }
      return newState;
    }
    case LOAD_SIGN_IN_SUCCESS: {
      let newState = state;
      if (action.persist) {
        const maskedMpNumber = action.mpUsername.replace(/.(?=.{3,}$)/g, '*');
        newState = state.set('mpUsername', maskedMpNumber).set('mpUsernameCrypto', action.mpUsernameCrypto);
      } else {
        newState = state.set('mpUsername', '').set('mpUsernameCrypto', '');
      }
      return newState
        .set('apiToken', { ...action.token, isAuthenticated: true });
    }
    case DO_SIGN_OUT:
      return initialState.merge(state.filter((val, key) => key === 'mpUsername' || key === 'mpUsernameCrypto' || key === 'rememberMeChecked'));
    case SIGN_OUT_SUCCESS:
      return state
        .set('apiToken', { ...action.token, isAuthenticated: false });
    case REMEMBER_ME_CHECKED:
      return state
        .set('rememberMeChecked', action.isChecked);
    case FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED:
      return state
        .set('flightStatusOrigin', action.flightStatusOriginLocation);
    case FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED:
      return state
        .set('flightStatusDestination', action.flightStatusDestinationLocation);
    case SET_FLIGHT_STATUS_ORIGIN_CODE:
      return state
        .set('flightStatusOriginLocationCode', action.code);
    case SET_FLIGHT_STATUS_DESTINATION_CODE:
      return state
        .set('flightStatusDestinationLocationCode', action.code);
    case BOOK_CAR_DRIVERS_AGE_SELECTED:
      return state
        .set('carDriversAge', action.driversAge);
    case BOOK_CAR_SAME_LOCATION_CHECKED:
      return state
        .set('carSameLocationChecked', action.isChecked);
    case BOOK_CAR_HIDE_AGE_BOX_CHECKED:
      return state
        .set('carHideAgeBox', action.isChecked);
    case BOOK_CAR_CALENDAR_PICKUP_DATE:
      return state
        .set('carPickupDate', action.startDate);
    case BOOK_CAR_CALENDAR_DROPOFF_DATE:
      return state
        .set('carDropoffDate', action.endDate);
    default:
      return state;
  }
}

export default persistentReducer;
