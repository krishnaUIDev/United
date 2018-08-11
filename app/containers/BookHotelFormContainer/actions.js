
import {
  UPDATE_HOTEL_INFO,
  DISABLE_HOTEL_BUTTONS,
  OPEN_OR_CLOSE_HOTEL_MENU,
  UPDATE_FULL_HOTEL,
  HOTEL_START_DATE,
  HOTEL_END_DATE,
  HOTEL_CALENDAR_ERROR,
} from './constants';

export function updateHotelInfo(hotelSection, hotelCount) {
  return {
    type: UPDATE_HOTEL_INFO,
    hotelSection,
    hotelCount,
  };
}

export function disableHotelButtons(btnTypeHotel, toDisableHotel) {
  return {
    type: DISABLE_HOTEL_BUTTONS,
    btnTypeHotel,
    toDisableHotel,
  };
}

export function displayHotelMenu(toOpenHotel) {
  return {
    type: OPEN_OR_CLOSE_HOTEL_MENU,
    toOpenHotel,
  };
}

export function updateFullHotel(passengers) {
  return {
    type: UPDATE_FULL_HOTEL,
    passengers,
  };
}

export function setHotelDepartDate(startDate) {
  return {
    type: HOTEL_START_DATE,
    startDate,
  };
}

export function setHotelReturnDate(endDate) {
  return {
    type: HOTEL_END_DATE,
    endDate,
  };
}

export function onSetCalendarError(errorType, errorState) {
  return {
    type: HOTEL_CALENDAR_ERROR,
    errorType,
    errorState,
  };
}
