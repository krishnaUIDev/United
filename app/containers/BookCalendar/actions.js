import {
  FLIGHT_CALENDAR_START_DATE,
  FLIGHT_CALENDAR_END_DATE,
  FLIGHT_CALENDAR_ERROR,
  CALENDAR_FOCUSED_INPUT,
} from './constants';

export function onSetDepartDate(startDate) {
  return {
    type: FLIGHT_CALENDAR_START_DATE,
    startDate,
  };
}

export function onSetReturnDate(endDate) {
  return {
    type: FLIGHT_CALENDAR_END_DATE,
    endDate,
  };
}

export function onSetCalendarError(errorType, errorState) {
  return {
    type: FLIGHT_CALENDAR_ERROR,
    errorType,
    errorState,
  };
}

export function onSetFocusedInput(focusedInput) {
  return {
    type: CALENDAR_FOCUSED_INPUT,
    focusedInput,
  };
}
