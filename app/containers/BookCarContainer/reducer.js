/*
 * BookCarReducer
 */
import { fromJS } from 'immutable';

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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  dropoffTime: '10|0',
  pickupTime: '10|0',
  driversAge: '',
  sameLocationChecked: true,
  hideAgeBox: true,
  pickupDate: null,
  dropoffDate: null,
  dropoffLocation: '',
  pickupLocation: '',
});

function bookCarReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_CAR_PICKUP_TIME_SELECTED:
      return state
        .set('pickupTime', action.pickupTime);
    case BOOK_CAR_DROPOFF_TIME_SELECTED:
      return state
        .set('dropoffTime', action.dropoffTime);
    case BOOK_CAR_DRIVERS_AGE_SELECTED:
      return state
        .set('driversAge', action.driversAge);
    case BOOK_CAR_SAME_LOCATION_CHECKED:
      return state
        .set('sameLocationChecked', action.isChecked);
    case BOOK_CAR_HIDE_AGE_BOX_CHECKED:
      return state
        .set('hideAgeBox', action.isChecked);
    case BOOK_CAR_CALENDAR_PICKUP_DATE:
      return state
        .set('pickupDate', action.startDate);
    case BOOK_CAR_CALENDAR_DROPOFF_DATE:
      return state
        .set('dropoffDate', action.endDate);
    case DROPOFF_LOCATION_CHANGE:
      return state
        .set('dropoffLocation', action.location);
    case PICKUP_LOCATION:
      return state
        .set('pickupLocation', action.location);
    default:
      return state;
  }
}

export default bookCarReducer;
