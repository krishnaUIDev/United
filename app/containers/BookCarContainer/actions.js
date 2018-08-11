import {
  BOOK_CAR_PICKUP_TIME_SELECTED,
  BOOK_CAR_DROPOFF_TIME_SELECTED,
  BOOK_CAR_DRIVERS_AGE_SELECTED,
  BOOK_CAR_SAME_LOCATION_CHECKED,
  BOOK_CAR_HIDE_AGE_BOX_CHECKED,
  BOOK_CAR_CALENDAR_PICKUP_DATE,
  BOOK_CAR_CALENDAR_DROPOFF_DATE,
  DROPOFF_LOCATION_CHANGE,
  PICKUP_LOCATION,
  CAR_CALENDAR_ERROR,
} from './constants';

export function onBookCarPickupTimeSelected(pickupTime) {
  return {
    type: BOOK_CAR_PICKUP_TIME_SELECTED,
    pickupTime,
  };
}

export function onBookCarDropoffTimeSelected(dropoffTime) {
  return {
    type: BOOK_CAR_DROPOFF_TIME_SELECTED,
    dropoffTime,
  };
}

export function onBookCarDriversAgeSelected(driversAge) {
  return {
    type: BOOK_CAR_DRIVERS_AGE_SELECTED,
    driversAge,
  };
}

export function onDropOffLocationChecked(isChecked) {
  return {
    type: BOOK_CAR_SAME_LOCATION_CHECKED,
    isChecked,
  };
}

export function onHideAgeBoxChecked(isChecked) {
  return {
    type: BOOK_CAR_HIDE_AGE_BOX_CHECKED,
    isChecked,
  };
}

export function onSetCarPickupDate(startDate) {
  return {
    type: BOOK_CAR_CALENDAR_PICKUP_DATE,
    startDate,
  };
}

export function onSetCarDropoffDate(endDate) {
  return {
    type: BOOK_CAR_CALENDAR_DROPOFF_DATE,
    endDate,
  };
}

export function dropoffLocationChange(location) {
  return {
    type: DROPOFF_LOCATION_CHANGE,
    location,
  };
}

export function selectCarPickupLocation(location) {
  return {
    type: PICKUP_LOCATION,
    location,
  };
}

export function onSetCalendarError(errorType, errorState) {
  return {
    type: CAR_CALENDAR_ERROR,
    errorType,
    errorState,
  };
}
