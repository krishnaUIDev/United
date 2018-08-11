/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  LOAD_SIGN_IN,
  LOAD_SIGN_IN_SUCCESS,
  LOAD_SIGN_IN_ERROR,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  DO_SIGN_OUT,
  LOAD_FLIGHT_STATUS,
  LOAD_FLIGHT_STATUS_SUCCESS,
  LOAD_FLIGHT_STATUS_ERROR,
  RESET_FLIGHT_STATUS_DATA,
  LOAD_FLIGHT_CHECKIN,
  LOAD_FLIGHT_CHECKIN_SUCCESS,
  LOAD_FLIGHT_CHECKIN_ERROR,
  LOAD_FLIGHT_CHECKIN_RESET,
  LOAD_MY_TRIPS,
  LOAD_MY_TRIPS_SUCCESS,
  LOAD_MY_TRIPS_ERROR,
  LOAD_MY_TRIPS_RESET,
} from 'containers/App/constants';

import {
  EXPAND_HOME_TOP,
  COLLAPSE_HOME_TOP,
  SET_PRIMARY_ACTIVE_TAB,
  SET_SECONDARY_ACTIVE_TAB,
  AWARD_TRAVEL_SELECTED,
  FIRST_CLASS_TRAVEL_SELECTED,
  CABIN_CLASS_SELECTED,
  LOAD_AIRPORTS,
  LOAD_AIRPORTS_SUCCESS,
  LOAD_AIRPORTS_ERROR,
  CABIN_CLASS_SELECTED_LABEL,
  ACTIVE_FIELD,
  ROOMS_SELECTED,
  ROOMS_SELECTED_LABEL,
  IS_KEYBOARD_USER,
  BOOK_WITH_MILES_SELECTED,
  LOAD_CAR_LOCATIONS,
  LOAD_CAR_LOCATIONS_SUCCESS,
  LOAD_CAR_LOCATIONS_ERROR,
  LOAD_HOTEL_LOCATIONS,
  LOAD_HOTEL_LOCATIONS_SUCCESS,
  LOAD_HOTEL_LOCATIONS_ERROR,
  OPEN_RIGHT_PANEL_MODAL,
  UPDATE_CHECKIN_DETAILS_INDEX,
  SET_ARIA_LIVE_MESSAGE,
  LOAD_ADVISORIES_STATUS_SUCCESS,
  LOAD_ADVISORIES_STATUS_ERROR,
  LOAD_ADVISORIES_STATUS,
  SHOW_ADVISORIES,
  TO_FOCUS_FLIGHT_STATUS_NUMBER,
  TO_FOCUS_FLIGHT_CHECKIN_NUMBER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  activeTab: 'travelTab',
  activeSubTab: 'bookFlightTab',
  expanded: false,
  awardTravel: false,
  isFirstClassSelected: false,
  cabinSelected: 'econ',
  airports: {
    error: false,
    loading: false,
    data: null,
    searchString: '',
    retryCount: 0,
  },
  carLocations: {
    error: false,
    loading: false,
    data: null,
    searchString: '',
    retryCount: 0,
  },
  hotelLocations: {
    error: false,
    loading: false,
    data: null,
    searchString: '',
  },
  cabinSelectedLabel: 'Economy',
  activeField: '',
  roomsSelected: '1',
  roomsSelectedLabel: '1 room',
  isKeyboardUser: false,
  bookWithMiles: false,
  userProfile: {
    error: false,
    loading: false,
    data: null,
    mpUsername: '',
    loggedIn: false,
    retryCount: 0,
  },
  flightStatus: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
    flightNumber: '',
    focusFlightNumberHeader: false,
  },
  advisories: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
    show: true,
  },
  flightCheckin: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
    focusFlightNumberHeader: false,
  },
  myTrips: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
  },
  ariaLiveMessage: '',
  isRightPanelModalOpen: false,
  checkinDetailsIndex: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case EXPAND_HOME_TOP:
      return state
        .set('expanded', true);
    case COLLAPSE_HOME_TOP:
      return state
        .set('expanded', false);
    case SET_PRIMARY_ACTIVE_TAB:
      return state
        .set('activeTab', action.newActiveTabId);
    case SET_SECONDARY_ACTIVE_TAB:
      return state
        .set('activeSubTab', action.newActiveTabId);
    case AWARD_TRAVEL_SELECTED:
      return state
        .set('awardTravel', action.isSelected);
    case BOOK_WITH_MILES_SELECTED:
      return state
        .set('bookWithMiles', action.isSelected);
    case FIRST_CLASS_TRAVEL_SELECTED:
      return state
        .set('isFirstClassSelected', action.isSelected);
    case CABIN_CLASS_SELECTED:
      return state
        .set('cabinSelected', action.cabinSelected);
    case ROOMS_SELECTED:
      return state
        .set('roomsSelected', action.roomsSelected);
    case LOAD_AIRPORTS:
      return state
        .setIn(['airports', 'error'], false)
        .setIn(['airports', 'data'], null)
        .setIn(['airports', 'loading'], true)
        .setIn(['airports', 'searchString'], action.searchString)
        .updateIn(['airports', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_AIRPORTS_SUCCESS:
      return state
        .setIn(['airports', 'data'], action.airports)
        .setIn(['airports', 'loading'], false)
        .setIn(['airports', 'retryCount'], 0);
    case LOAD_AIRPORTS_ERROR:
      return state
        .setIn(['airports', 'error'], action.error)
        .setIn(['airports', 'loading'], false)
        .setIn(['airports', 'retryCount'], 0);
    case LOAD_CAR_LOCATIONS:
      return state
        .setIn(['carLocations', 'error'], false)
        .setIn(['carLocations', 'data'], null)
        .setIn(['carLocations', 'loading'], true)
        .setIn(['carLocations', 'searchString'], action.searchString)
        .updateIn(['carLocations', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_CAR_LOCATIONS_SUCCESS:
      return state
        .setIn(['carLocations', 'data'], action.carLocations)
        .setIn(['carLocations', 'loading'], false)
        .setIn(['carLocations', 'retryCount'], 0);
    case LOAD_CAR_LOCATIONS_ERROR:
      return state
        .setIn(['carLocations', 'error'], action.error)
        .setIn(['carLocations', 'loading'], false)
        .setIn(['carLocations', 'retryCount'], 0);
    case LOAD_HOTEL_LOCATIONS:
      return state
        .setIn(['hotelLocations', 'error'], false)
        .setIn(['hotelLocations', 'data'], null)
        .setIn(['hotelLocations', 'loading'], true)
        .setIn(['hotelLocations', 'searchString'], action.searchString);
    case LOAD_HOTEL_LOCATIONS_SUCCESS:
      return state
        .setIn(['hotelLocations', 'data'], action.hotelLocations)
        .setIn(['hotelLocations', 'loading'], false);
    case LOAD_HOTEL_LOCATIONS_ERROR:
      return state
        .setIn(['hotelLocations', 'error'], action.error)
        .setIn(['hotelLocations', 'loading'], false);
    case CABIN_CLASS_SELECTED_LABEL:
      return state
        .set('cabinSelectedLabel', action.cabinSelectedLabel);
    case ROOMS_SELECTED_LABEL:
      return state
        .set('roomsSelectedLabel', action.roomsSelectedLabel);
    case ACTIVE_FIELD:
      return state
        .set('activeField', action.activeField);
    case IS_KEYBOARD_USER:
      return state
        .set('isKeyboardUser', action.isKeyboardUser);
    case LOAD_SIGN_IN:
      return state
        .setIn(['userProfile', 'error'], false)
        .setIn(['userProfile', 'data'], null)
        .setIn(['userProfile', 'loading'], true)
        .setIn(['userProfile', 'loggedIn'], false)
        .updateIn(['userProfile', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_SIGN_IN_SUCCESS:
      return state
        .setIn(['userProfile', 'data'], action.profile)
        .setIn(['userProfile', 'loading'], false)
        .setIn(['userProfile', 'loggedIn'], true)
        .setIn(['userProfile', 'mpUsername'], action.mpUsername)
        .setIn(['userProfile', 'retryCount'], 0);
    case LOAD_SIGN_IN_ERROR:
      return state
        .setIn(['userProfile', 'error'], action.error)
        .setIn(['userProfile', 'loading'], false)
        .setIn(['userProfile', 'loggedIn'], false)
        .setIn(['userProfile', 'retryCount'], 0);
    case LOAD_PROFILE:
      return state
        .setIn(['userProfile', 'error'], false)
        .setIn(['userProfile', 'loading'], true)
        .updateIn(['userProfile', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_PROFILE_SUCCESS:
      return state
        .setIn(['userProfile', 'data'], action.profile)
        .setIn(['userProfile', 'mpUsername'], action.mpUsername)
        .setIn(['userProfile', 'loading'], false)
        .setIn(['userProfile', 'loggedIn'], true)
        .setIn(['userProfile', 'retryCount'], 0);
    case LOAD_PROFILE_ERROR:
      return state
        .setIn(['userProfile', 'error'], action.error)
        .setIn(['userProfile', 'loading'], false)
        .setIn(['userProfile', 'loggedIn'], false)
        .setIn(['userProfile', 'retryCount'], 0);
    case LOAD_FLIGHT_STATUS:
      return state
        .setIn(['flightStatus', 'flightNumber'], action.flightNumber)
        .setIn(['flightStatus', 'error'], false)
        .setIn(['flightStatus', 'loading'], true)
        .updateIn(['flightStatus', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_FLIGHT_STATUS_SUCCESS:
      return state
        .setIn(['flightStatus', 'data'], action.flightInfo)
        .setIn(['flightStatus', 'loading'], false)
        .setIn(['flightStatus', 'retryCount'], 0);
    case LOAD_FLIGHT_STATUS_ERROR:
      return state
        .setIn(['flightStatus', 'error'], action.error)
        .setIn(['flightStatus', 'loading'], false)
        .setIn(['flightStatus', 'retryCount'], 0);
    case RESET_FLIGHT_STATUS_DATA:
      return state
        .setIn(['flightStatus', 'data'], null);
    case LOAD_FLIGHT_CHECKIN:
      return state
        .setIn(['flightCheckin', 'error'], false)
        .setIn(['flightCheckin', 'loading'], true)
        .updateIn(['flightCheckin', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_FLIGHT_CHECKIN_SUCCESS:
      return state
        .setIn(['flightCheckin', 'data'], action.checkinInfo)
        .setIn(['flightCheckin', 'loading'], false)
        .setIn(['flightCheckin', 'retryCount'], 0);
    case LOAD_FLIGHT_CHECKIN_ERROR:
      return state
        .setIn(['flightCheckin', 'error'], action.error)
        .setIn(['flightCheckin', 'loading'], false)
        .setIn(['flightCheckin', 'retryCount'], 0);
    case LOAD_FLIGHT_CHECKIN_RESET:
      return state
        .setIn(['flightCheckin', 'data'], null);
    case DO_SIGN_OUT:
      // remove all MP user info
      return state
        .setIn(['userProfile', 'data'], null)
        .setIn(['userProfile', 'mpUsername'], '')
        .setIn(['userProfile', 'error'], false)
        .setIn(['userProfile', 'loggedIn'], false)
        .setIn(['flightCheckin', 'error'], false)
        .setIn(['flightCheckin', 'data'], null)
        .setIn(['myTrips', 'error'], false)
        .setIn(['myTrips', 'data'], null);
    case OPEN_RIGHT_PANEL_MODAL:
      return state
        .set('isRightPanelModalOpen', action.toOpen);
    case UPDATE_CHECKIN_DETAILS_INDEX:
      return state
        .set('checkinDetailsIndex', action.index);
    case SET_ARIA_LIVE_MESSAGE:
      return state
      .set('ariaLiveMessage', action.message);
    case LOAD_ADVISORIES_STATUS_SUCCESS:
      return state
        .setIn(['advisories', 'data'], action.advisoryInfo)
        .setIn(['advisories', 'loading'], false)
        .setIn(['advisories', 'retryCount'], 0);
    case LOAD_ADVISORIES_STATUS_ERROR:
      return state
        .setIn(['advisories', 'error'], action.error)
        .setIn(['advisories', 'loading'], false);
    case LOAD_ADVISORIES_STATUS:
      return state
        .setIn(['advisories', 'error'], false)
        .setIn(['advisories', 'loading'], true)
        .updateIn(['advisories', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case SHOW_ADVISORIES:
      return state
        .setIn(['advisories', 'show'], action.value);
    case LOAD_MY_TRIPS:
      return state
        .setIn(['myTrips', 'error'], false)
        .setIn(['myTrips', 'loading'], true)
        .updateIn(['myTrips', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_MY_TRIPS_SUCCESS:
      return state
        .setIn(['myTrips', 'data'], action.myTripsInfo)
        .setIn(['myTrips', 'loading'], false)
        .setIn(['myTrips', 'retryCount'], 0);
    case LOAD_MY_TRIPS_ERROR:
      return state
        .setIn(['myTrips', 'error'], action.error)
        .setIn(['myTrips', 'loading'], false)
        .setIn(['myTrips', 'retryCount'], 0);
    case LOAD_MY_TRIPS_RESET:
      return state
        .setIn(['myTrips', 'data'], null);
    case TO_FOCUS_FLIGHT_STATUS_NUMBER:
      return state
        .setIn(['flightStatus', 'focusFlightNumberHeader'], action.toFocus);
    case TO_FOCUS_FLIGHT_CHECKIN_NUMBER:
      return state
        .setIn(['flightCheckin', 'focusFlightNumberHeader'], action.toFocus);
    default:
      return state;
  }
}

export default homeReducer;
