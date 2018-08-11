import { fromJS } from 'immutable';

import bookingReducer from '../reducer';
import {
  onCorporateBookChecked,
  onNonstopChecked,
  onFlexibleDatesChecked,
  disableTravelerButtons,
  displayPassengersMenu,
  updatePassengerInfo,
} from '../actions';

describe('bookingReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      corporateBookChecked: false,
      nonstopChecked: false,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(bookingReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle CORPORATE_BOOK_CHECKED action', () => {
    const corporateChecked = onCorporateBookChecked(true);
    const newState = bookingReducer(undefined, corporateChecked);
    const expected = fromJS({
      corporateBookChecked: true,
      nonstopChecked: false,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle NONSTOP_CHECKED action', () => {
    const nonstopChecked = onNonstopChecked(true);
    const newState = bookingReducer(undefined, nonstopChecked);
    const expected = fromJS({
      corporateBookChecked: false,
      nonstopChecked: true,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle FLEXIBLE_DATES_CHECKED action', () => {
    const flexibleDatesChecked = onFlexibleDatesChecked(true);
    const newState = bookingReducer(undefined, flexibleDatesChecked);
    const expected = fromJS({
      corporateBookChecked: false,
      nonstopChecked: false,
      flexibleDatesChecked: true,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle DISABLE_TRAVELER_BUTTONS action', () => {
    const disableBtn = disableTravelerButtons('plusBtn', true);
    const newState = bookingReducer(undefined, disableBtn);
    const expected = fromJS({
      corporateBookChecked: false,
      nonstopChecked: false,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: true,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle OPEN_OR_CLOSE_PASSENGER_MENU action', () => {
    const displayMenu = displayPassengersMenu(true);
    const newState = bookingReducer(undefined, displayMenu);
    const expected = fromJS({
      corporateBookChecked: false,
      nonstopChecked: false,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: true,
    });
    expect(newState).toEqual(expected);
  });
  it('should handle UPDATE_PASSENGER_INFO action', () => {
    const updateInfo = updatePassengerInfo('Adults (18-64)', 2);
    const newState = bookingReducer(undefined, updateInfo);
    const expected = fromJS({
      corporateBookChecked: false,
      nonstopChecked: false,
      flexibleDatesChecked: false,
      flightOrigin: '',
      flightDestination: '',
      roundtripChecked: '',
      passengersToBook: {
        'Adults (18-64)': 2,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      },
      disableTravelerButtons: {
        plusBtn: false,
        minusBtn: true,
      },
      showTravelerMenu: false,
    });
    expect(newState).toEqual(expected);
  });
});
