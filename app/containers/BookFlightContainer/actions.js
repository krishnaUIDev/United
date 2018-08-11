/*
 * BookFlightContainer Actions
 */
import {
  BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
  BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
  CORPORATE_BOOK_CHECKED,
  NONSTOP_CHECKED,
  FLEXIBLE_DATES_CHECKED,
  ROUNDTRIP_CHECKED,
  SET_ORIGIN_CODE,
  SET_DESTINATION_CODE,
  UPDATE_PASSENGER_INFO,
  DISABLE_TRAVELER_BUTTONS,
  OPEN_OR_CLOSE_PASSENGER_MENU,
  UPDATE_FULL_PASSENGERS,
} from './constants';

export function onBookFlightOriginLocationSelected(bookFlightOriginLocation) {
  return {
    type: BOOK_FLIGHT_ORIGIN_LOCATION_SELECTED,
    bookFlightOriginLocation,
  };
}

export function onBookFlightDestinationLocationSelected(bookFlightDestinationLocation) {
  return {
    type: BOOK_FLIGHT_DESTINATION_LOCATION_SELECTED,
    bookFlightDestinationLocation,
  };
}

export function onCorporateBookChecked(isChecked) {
  return {
    type: CORPORATE_BOOK_CHECKED,
    isChecked,
  };
}

export function onNonstopChecked(isChecked) {
  return {
    type: NONSTOP_CHECKED,
    isChecked,
  };
}

export function onFlexibleDatesChecked(isChecked) {
  return {
    type: FLEXIBLE_DATES_CHECKED,
    isChecked,
  };
}

export function onRoundtripChecked(isChecked) {
  return {
    type: ROUNDTRIP_CHECKED,
    isChecked,
  };
}

export function onSetOriginLocationCode(code) {
  return {
    type: SET_ORIGIN_CODE,
    code,
  };
}

export function onSetDestinationLocationCode(code) {
  return {
    type: SET_DESTINATION_CODE,
    code,
  };
}

export function updatePassengerInfo(passengerSection, passengerCount) {
  return {
    type: UPDATE_PASSENGER_INFO,
    passengerSection,
    passengerCount,
  };
}

export function disableTravelerButtons(btnType, toDisable) {
  return {
    type: DISABLE_TRAVELER_BUTTONS,
    btnType,
    toDisable,
  };
}

export function displayPassengersMenu(toOpen) {
  return {
    type: OPEN_OR_CLOSE_PASSENGER_MENU,
    toOpen,
  };
}

export function updateFullPassengers(passengers) {
  return {
    type: UPDATE_FULL_PASSENGERS,
    passengers,
  };
}
