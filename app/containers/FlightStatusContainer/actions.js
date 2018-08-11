/*
 * FlightStatusContainer Actions
 */
import {
  DATE_SELECTED,
  SET_FLIGHT_STATUS_ORIGIN_CODE,
  SET_FLIGHT_STATUS_DESTINATION_CODE,
  FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED,
  FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED,
  UPDATE_FLIGHT_STATUS_DATE,
  FLIGHT_SELECTED,
} from './constants';

export function onDateSelected(dateSelected) {
  return {
    type: DATE_SELECTED,
    dateSelected,
  };
}
export function onFlightStatusOriginLocationSelected(flightStatusOriginLocation) {
  return {
    type: FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED,
    flightStatusOriginLocation,
  };
}

export function onFlightStatusDestinationLocationSelected(flightStatusDestinationLocation) {
  return {
    type: FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED,
    flightStatusDestinationLocation,
  };
}
export function onSetFlightStatusOriginLocationCode(code) {
  return {
    type: SET_FLIGHT_STATUS_ORIGIN_CODE,
    code,
  };
}
export function onSetFlightStatusDestinationLocationCode(code) {
  return {
    type: SET_FLIGHT_STATUS_DESTINATION_CODE,
    code,
  };
}

export function updateFlightStatusDate(date) {
  return {
    type: UPDATE_FLIGHT_STATUS_DATE,
    date,
  };
}
export function selectedFlight(index) {
  return {
    type: FLIGHT_SELECTED,
    index,
  };
}
