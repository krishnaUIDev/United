/*
 * BookHotelFormReducer
 */
import { fromJS } from 'immutable';

import {
  UPDATE_HOTEL_INFO,
  DISABLE_HOTEL_BUTTONS,
  OPEN_OR_CLOSE_HOTEL_MENU,
  UPDATE_FULL_HOTEL,
  HOTEL_START_DATE,
  HOTEL_END_DATE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  passengersToBook: {
    Adults: 1,
    Children: 0,
  },
  disableTravelerButtons: {
    plusBtn: false,
    minusBtn: true,
  },
  showTravelerMenu: false,
  checkinDate: null,
  checkoutDate: null,
});

function bookHotelReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HOTEL_INFO:
      return state
        .set('passengersToBook', state.get('passengersToBook')
          .set(action.hotelSection, action.hotelCount));
    case DISABLE_HOTEL_BUTTONS:
      return state
        .set('disableTravelerButtons', state.get('disableTravelerButtons')
          .set(action.btnTypeHotel, action.toDisableHotel));
    case OPEN_OR_CLOSE_HOTEL_MENU:
      return state
        .set('showTravelerMenu', action.toOpenHotel);
    case UPDATE_FULL_HOTEL:
      return state
        .set('passengersToBook', action.passengers);
    case HOTEL_START_DATE:
      return state
        .set('checkinDate', action.startDate);
    case HOTEL_END_DATE:
      return state
        .set('checkoutDate', action.endDate);
    default:
      return state;
  }
}

export default bookHotelReducer;
