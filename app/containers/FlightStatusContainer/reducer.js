/*
 * FlightStatusReducer
 */
import { fromJS } from 'immutable';

import {
  DATE_SELECTED,
  FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED,
  FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED,
  UPDATE_FLIGHT_STATUS_DATE,
  FLIGHT_SELECTED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  dateSelected: '2', // current date
  flightStatusOrigin: '',
  flightStatusDestination: '',
  flightStatusDate: '',
  flightSelected: '',
});

function flightStatusReducer(state = initialState, action) {
  switch (action.type) {
    case DATE_SELECTED:
      return state
        .set('dateSelected', action.dateSelected);
    case FLIGHT_STATUS_ORIGIN_LOCATION_SELECTED:
      return state
        .set('flightStatusOrigin', action.flightStatusOriginLocation);
    case FLIGHT_STATUS_DESTINATION_LOCATION_SELECTED:
      return state
        .set('flightStatusDestination', action.flightStatusDestinationLocation);
    case UPDATE_FLIGHT_STATUS_DATE:
      return state
        .set('flightStatusDate', action.date);
    case FLIGHT_SELECTED:
      return state
        .set('flightSelected', action.index);
    default:
      return state;
  }
}

export default flightStatusReducer;
