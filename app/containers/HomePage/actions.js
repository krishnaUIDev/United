/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
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
  ROOMS_SELECTED_LABEL,
  ROOMS_SELECTED,
  LOAD_CAR_LOCATIONS,
  LOAD_CAR_LOCATIONS_SUCCESS,
  LOAD_CAR_LOCATIONS_ERROR,
  LOAD_HOTEL_LOCATIONS,
  LOAD_HOTEL_LOCATIONS_SUCCESS,
  LOAD_HOTEL_LOCATIONS_ERROR,
  CABIN_CLASS_SELECTED_LABEL,
  ACTIVE_FIELD,
  IS_KEYBOARD_USER,
  BOOK_WITH_MILES_SELECTED,
  OPEN_RIGHT_PANEL_MODAL,
  UPDATE_CHECKIN_DETAILS_INDEX,
  SET_ARIA_LIVE_MESSAGE,
  TO_FOCUS_FLIGHT_STATUS_NUMBER,
  LOAD_ADVISORIES_STATUS_SUCCESS,
  LOAD_ADVISORIES_STATUS_ERROR,
  LOAD_ADVISORIES_STATUS,
  SHOW_ADVISORIES,
  TO_FOCUS_FLIGHT_CHECKIN_NUMBER,
} from './constants';


export function expandHomeTop() {
  return {
    type: EXPAND_HOME_TOP,
  };
}

export function collapseHomeTop() {
  return {
    type: COLLAPSE_HOME_TOP,
  };
}

export function setPrimaryTab(newActiveTabId) {
  return {
    type: SET_PRIMARY_ACTIVE_TAB,
    newActiveTabId,
  };
}

export function setSecondaryTab(newActiveTabId) {
  return {
    type: SET_SECONDARY_ACTIVE_TAB,
    newActiveTabId,
  };
}

export function awardTravelSelected(isSelected) {
  return {
    type: AWARD_TRAVEL_SELECTED,
    isSelected,
  };
}

export function bookWithMilesSelected(isSelected) {
  return {
    type: BOOK_WITH_MILES_SELECTED,
    isSelected,
  };
}

export function onFirstClassSelected(isSelected) {
  return {
    type: FIRST_CLASS_TRAVEL_SELECTED,
    isSelected,
  };
}

export function onCabinClassSelected(cabinSelected) {
  return {
    type: CABIN_CLASS_SELECTED,
    cabinSelected,
  };
}

export function onRoomsSelected(roomsSelected) {
  return {
    type: ROOMS_SELECTED,
    roomsSelected,
  };
}

export function loadAirports(searchString, retry = false) {
  return {
    type: LOAD_AIRPORTS,
    searchString,
    retry,
  };
}

export function airportsLoaded(airports) {
  return {
    type: LOAD_AIRPORTS_SUCCESS,
    airports,
  };
}

export function airportsLoadingError(error) {
  return {
    type: LOAD_AIRPORTS_ERROR,
    error,
  };
}

export function loadCarLocations(searchString, retry = false) {
  return {
    type: LOAD_CAR_LOCATIONS,
    searchString,
    retry,
  };
}

export function carLocationsLoaded(carLocations) {
  return {
    type: LOAD_CAR_LOCATIONS_SUCCESS,
    carLocations,
  };
}

export function carLocationsLoadingError(error) {
  return {
    type: LOAD_CAR_LOCATIONS_ERROR,
    error,
  };
}

export function advisoriesLoaded(advisoryInfo) {
  return {
    type: LOAD_ADVISORIES_STATUS_SUCCESS,
    advisoryInfo,
  };
}

export function advisoriesLoadingError(error) {
  return {
    type: LOAD_ADVISORIES_STATUS_ERROR,
    error,
  };
}

export function loadAdvisories(retry = false) {
  return {
    type: LOAD_ADVISORIES_STATUS,
    retry,
  };
}

export function showAdvisories(value) {
  return {
    type: SHOW_ADVISORIES,
    value,
  };
}

export function loadHotelLocations(searchString) {
  return {
    type: LOAD_HOTEL_LOCATIONS,
    searchString,
  };
}

export function hotelLocationsLoaded(hotelLocations) {
  return {
    type: LOAD_HOTEL_LOCATIONS_SUCCESS,
    hotelLocations,
  };
}

export function hotelLocationsLoadingError(error) {
  return {
    type: LOAD_HOTEL_LOCATIONS_ERROR,
    error,
  };
}

export function setCabinClassLabel(cabinSelectedLabel) {
  return {
    type: CABIN_CLASS_SELECTED_LABEL,
    cabinSelectedLabel,
  };
}

export function setRoomsSelectedLabel(roomsSelectedLabel) {
  return {
    type: ROOMS_SELECTED_LABEL,
    roomsSelectedLabel,
  };
}

export function setActiveField(activeField) {
  return {
    type: ACTIVE_FIELD,
    activeField,
  };
}

export function setKeyboardUser(isKeyboardUser) {
  return {
    type: IS_KEYBOARD_USER,
    isKeyboardUser,
  };
}

export function onOpenRightPanelModal(toOpen) {
  return {
    type: OPEN_RIGHT_PANEL_MODAL,
    toOpen,
  };
}

export function updateCheckinDetailsIndex(index) {
  return {
    type: UPDATE_CHECKIN_DETAILS_INDEX,
    index,
  };
}

export function onSetAriaLiveMessage(message) {
  return {
    type: SET_ARIA_LIVE_MESSAGE,
    message,
  };
}

export function toFocusFlightStatusNumber(toFocus) {
  return {
    type: TO_FOCUS_FLIGHT_STATUS_NUMBER,
    toFocus,
  };
}

export function toFocusFlightCheckinNumber(toFocus) {
  return {
    type: TO_FOCUS_FLIGHT_CHECKIN_NUMBER,
    toFocus,
  };
}
