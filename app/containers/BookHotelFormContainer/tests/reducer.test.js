import { fromJS } from 'immutable';

import bookHotelReducer from '../reducer';
import {
  updateHotelInfo,
  disableHotelButtons,
  displayHotelMenu,
} from '../actions';

describe('bookHotelReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
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
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(bookHotelReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle DISABLE_HOTEL_BUTTONS action', () => {
    const disableBtn = disableHotelButtons('plusBtn', true);
    const newState = bookHotelReducer(undefined, disableBtn);
    const expected = fromJS({
      passengersToBook: {
        Adults: 1,
        Children: 0,
      },
      disableTravelerButtons: {
        plusBtn: true,
        minusBtn: true,
      },
      showTravelerMenu: false,
      checkinDate: null,
      checkoutDate: null,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle OPEN_OR_CLOSE_HOTEL_MENU action', () => {
    const displayMenu = displayHotelMenu(true);
    const newState = bookHotelReducer(undefined, displayMenu);
    const expected = fromJS({
      passengersToBook: {
        Adults: 1,
        Children: 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: true,
      checkinDate: null,
      checkoutDate: null,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle UPDATE_HOTEL_INFO action', () => {
    const updateInfo = updateHotelInfo('Adults', 2);
    const newState = bookHotelReducer(undefined, updateInfo);
    const expected = fromJS({
      passengersToBook: {
        Adults: 2,
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
    expect(newState).toEqual(expected);
  });
});
