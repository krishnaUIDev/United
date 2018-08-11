import { fromJS } from 'immutable';

import {
  loadProfile,
  profileLoaded,
  profileLoadingError,
  signInLoadingError,
  loadSignIn,
  signInLoaded,
  loadFlightStatus,
  flightStatusLoaded,
  flightStatusLoadingError,
  doSignOut,
  loadFlightCheckin,
  flightCheckinLoaded,
  flightCheckinLoadingError,
  loadMyTrips,
  myTripsLoaded,
  myTripsLoadingError,
  onResetMyTripsData,
} from 'containers/App/actions';

import homeReducer from '../reducer';
import {
  airportsLoaded,
  airportsLoadingError,
  awardTravelSelected,
  bookWithMilesSelected,
  expandHomeTop,
  carLocationsLoaded,
  carLocationsLoadingError,
  collapseHomeTop,
  loadAirports,
  loadCarLocations,
  loadHotelLocations,
  hotelLocationsLoaded,
  hotelLocationsLoadingError,
  onCabinClassSelected,
  onFirstClassSelected,
  onRoomsSelected,
  setActiveField,
  setKeyboardUser,
  setPrimaryTab,
  setRoomsSelectedLabel,
  setSecondaryTab,
  onOpenRightPanelModal,
  updateCheckinDetailsIndex,
  toFocusFlightStatusNumber,
  toFocusFlightCheckinNumber,
} from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      activeTab: 'travelTab',
      activeSubTab: 'bookFlightTab',
      expanded: false,
      awardTravel: false,
      isFirstClassSelected: false,
      bookWithMiles: false,
      cabinSelected: 'econ',
      airports: {
        error: false,
        loading: false,
        data: null,
        searchString: '',
        retryCount: 0,
      },
      carLocations: {
        error: false,
        loading: false,
        data: null,
        searchString: '',
        retryCount: 0,
      },
      advisories: {
        error: false,
        loading: false,
        data: null,
        retryCount: 0,
        show: true,
      },
      hotelLocations: {
        error: false,
        loading: false,
        data: null,
        searchString: '',
      },
      cabinSelectedLabel: 'Economy',
      roomsSelected: '1',
      roomsSelectedLabel: '1 room',
      activeField: '',
      isKeyboardUser: false,
      userProfile: {
        error: false,
        loading: false,
        data: null,
        mpUsername: '',
        loggedIn: false,
        retryCount: 0,
      },
      flightStatus: {
        error: false,
        loading: false,
        data: null,
        retryCount: 0,
        flightNumber: '',
        focusFlightNumberHeader: false,
      },
      flightCheckin: {
        error: false,
        loading: false,
        data: null,
        retryCount: 0,
        focusFlightNumberHeader: false,
      },
      myTrips: {
        error: false,
        loading: false,
        data: null,
        retryCount: 0,
      },
      ariaLiveMessage: '',
      isRightPanelModalOpen: false,
      checkinDetailsIndex: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the collapseHomeTop action correctly', () => {
    const expectedResult = state
      .set('expanded', false);
    expect(homeReducer(state, collapseHomeTop())).toEqual(expectedResult);
  });
  it('should handle the expandHomeTop action correctly', () => {
    const expectedResult = state
      .set('expanded', true);
    expect(homeReducer(state, expandHomeTop())).toEqual(expectedResult);
  });
  it('should handle the awardTravelSelected action correctly', () => {
    const expectedResult = state
      .set('awardTravel', true);
    expect(homeReducer(state, awardTravelSelected(true))).toEqual(expectedResult);
  });
  it('should handle the onCabinClassSelected action correctly', () => {
    const expectedResult = state
      .set('cabinSelected', 'businessFirst');
    expect(homeReducer(state, onCabinClassSelected('businessFirst'))).toEqual(expectedResult);
  });
  it('should handle the onFirstClassSelected action correctly', () => {
    const expectedResult = state
      .set('isFirstClassSelected', true);
    expect(homeReducer(state, onFirstClassSelected(true))).toEqual(expectedResult);
  });
  it('should handle the setPrimaryTab action correctly', () => {
    const expectedResult = state
      .set('activeTab', 'statusTab');
    expect(homeReducer(state, setPrimaryTab('statusTab'))).toEqual(expectedResult);
  });
  it('should handle the setSecondaryTab action correctly', () => {
    const expectedResult = state
      .set('activeSubTab', 'bookHotelTab');
    expect(homeReducer(state, setSecondaryTab('bookHotelTab'))).toEqual(expectedResult);
  });
  it('should handle the setActiveField action correctly', () => {
    const expectedResult = state
      .set('activeField', 'bookPassengers');
    expect(homeReducer(state, setActiveField('bookPassengers'))).toEqual(expectedResult);
  });
  it('should handle the setKeyboardUser action correctly', () => {
    const expectedResult = state
      .set('isKeyboardUser', true);
    expect(homeReducer(state, setKeyboardUser(true))).toEqual(expectedResult);
  });
  it('should handle the airportsLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['airports', 'data'], 'London');
    expect(homeReducer(state, airportsLoaded('London'))).toEqual(expectedResult);
  });
  it('should handle the airportsLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['airports', 'error'], true);
    expect(homeReducer(state, airportsLoadingError(true))).toEqual(expectedResult);
  });
  it('should handle the carLocationsLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['carLocations', 'data'], 'brazil');
    expect(homeReducer(state, carLocationsLoaded('brazil'))).toEqual(expectedResult);
  });
  it('should handle the carLocationsLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['carLocations', 'error'], true);
    expect(homeReducer(state, carLocationsLoadingError(true))).toEqual(expectedResult);
  });
  it('should handle the loadCarLocations action correctly', () => {
    const expectedResult = state
      .setIn(['carLocations', 'searchString'], 'london')
      .setIn(['carLocations', 'loading'], true);
    expect(homeReducer(state, loadCarLocations('london', false))).toEqual(expectedResult);
  });
  it('should handle the loadAirports action correctly', () => {
    const expectedResult = state
      .setIn(['airports', 'searchString'], 'dubai')
      .setIn(['airports', 'loading'], true);
    expect(homeReducer(state, loadAirports('dubai', false))).toEqual(expectedResult);
  });
  it('should handle the loadHotelLocations action correctly', () => {
    const expectedResult = state
      .setIn(['hotelLocations', 'searchString'], 'minnesota')
      .setIn(['hotelLocations', 'loading'], true);
    expect(homeReducer(state, loadHotelLocations('minnesota'))).toEqual(expectedResult);
  });
  it('should handle the hotelLocationsLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['hotelLocations', 'data'], 'paris');
    expect(homeReducer(state, hotelLocationsLoaded('paris'))).toEqual(expectedResult);
  });
  it('should handle the hotelLocationsLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['hotelLocations', 'error'], false);
    expect(homeReducer(state, hotelLocationsLoadingError(false))).toEqual(expectedResult);
  });
  it('should handle the setRoomsSelectedLabel action correctly', () => {
    const expectedResult = state
      .set('roomsSelectedLabel', '4 rooms');
    expect(homeReducer(state, setRoomsSelectedLabel('4 rooms'))).toEqual(expectedResult);
  });
  it('should handle the bookWithMilesSelected action correctly', () => {
    const expectedResult = state
      .set('bookWithMiles', false);
    expect(homeReducer(state, bookWithMilesSelected(false))).toEqual(expectedResult);
  });
  it('should handle onRoomsSelected action correctly', () => {
    const expectedResult = state
      .set('roomsSelected', '5');
    expect(homeReducer(state, onRoomsSelected('5'))).toEqual(expectedResult);
  });
  it('should handle signInLoadingError action correctly', () => {
    const expectedResult = state
    .setIn(['userProfile', 'error'], 'foo')
    .setIn(['userProfile', 'loading'], false)
    .setIn(['userProfile', 'loggedIn'], false)
    .setIn(['userProfile', 'retryCount'], 0);
    expect(homeReducer(state, signInLoadingError('foo'))).toEqual(expectedResult);
  });
  it('should handle signInLoaded action correctly', () => {
    const expectedResult = state
    .setIn(['userProfile', 'data'], { name: 'John Doe' })
    .setIn(['userProfile', 'loading'], false)
    .setIn(['userProfile', 'loggedIn'], true)
      .setIn(['userProfile', 'mpUsername'], 'myusername')
    .setIn(['userProfile', 'retryCount'], 0);
    expect(homeReducer(state, signInLoaded({ name: 'John Doe' }, 'myusername'))).toEqual(expectedResult);
  });
  it('should handle loadSignIn action correctly', () => {
    const expectedResult = state
    .setIn(['userProfile', 'loading'], true);
    expect(homeReducer(state, loadSignIn('username', 'password'))).toEqual(expectedResult);
  });

  it('should handle profileLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['userProfile', 'error'], 'foo')
      .setIn(['userProfile', 'loading'], false)
      .setIn(['userProfile', 'loggedIn'], false)
      .setIn(['userProfile', 'retryCount'], 0);
    expect(homeReducer(state, profileLoadingError('foo'))).toEqual(expectedResult);
  });
  it('should handle profileLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['userProfile', 'data'], { name: 'John Doe' })
      .setIn(['userProfile', 'loading'], false)
      .setIn(['userProfile', 'loggedIn'], true)
      .setIn(['userProfile', 'mpUsername'], 'me')
      .setIn(['userProfile', 'retryCount'], 0);
    expect(homeReducer(state, profileLoaded({ name: 'John Doe' }, 'me'))).toEqual(expectedResult);
  });
  it('should handle loadProfile action correctly', () => {
    const expectedResult = state
      .setIn(['userProfile', 'loading'], true)
      .setIn(['userProfile', 'error'], false);
    expect(homeReducer(state, loadProfile())).toEqual(expectedResult);
  });
  it('should handle loadFlightStatus action correctly', () => {
    const expectedResult = state
      .setIn(['flightStatus', 'loading'], true)
      .setIn(['flightStatus', 'error'], false)
      .setIn(['flightStatus', 'flightNumber'], '707');
    expect(homeReducer(state, loadFlightStatus('ORD', 'DEN', '707', '2017-12-29', false))).toEqual(expectedResult);
  });
  it('should handle flightStatusLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['flightStatus', 'data'], { flightStatus: 'On Schedule' })
      .setIn(['flightStatus', 'loading'], false)
      .setIn(['flightStatus', 'retryCount'], 0);
    expect(homeReducer(state, flightStatusLoaded({ flightStatus: 'On Schedule' }))).toEqual(expectedResult);
  });
  it('should handle flightStatusLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['flightStatus', 'error'], 'failed')
      .setIn(['flightStatus', 'loading'], false)
      .setIn(['flightStatus', 'retryCount'], 0);
    expect(homeReducer(state, flightStatusLoadingError('failed'))).toEqual(expectedResult);
  });
  it('should handle doSignOut action correctly', () => {
    const expectedResult = state
      .setIn(['userProfile', 'data'], null)
      .setIn(['userProfile', 'mpUsername'], '')
      .setIn(['userProfile', 'loggedIn'], false);
    expect(homeReducer(state, doSignOut('token'))).toEqual(expectedResult);
  });
  it('should handle doSignOut action correctly', () => {
    const expectedResult = state
      .set('isRightPanelModalOpen', true);
    expect(homeReducer(state, onOpenRightPanelModal(true))).toEqual(expectedResult);
  });
  it('should handle loadFlightCheckin action correctly', () => {
    const expectedResult = state
      .setIn(['flightCheckin', 'loading'], true)
      .setIn(['flightCheckin', 'error'], false)
      .setIn(['flightCheckin', 'retryCount'], 0);
    expect(homeReducer(state, loadFlightCheckin(false))).toEqual(expectedResult);
  });
  it('should handle flightCheckinLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['flightCheckin', 'data'], { checkinInfo: 'Trips received' })
      .setIn(['flightCheckin', 'loading'], false)
      .setIn(['flightCheckin', 'retryCount'], 0);
    expect(homeReducer(state, flightCheckinLoaded({ checkinInfo: 'Trips received' }))).toEqual(expectedResult);
  });
  it('should handle flightCheckinLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['flightCheckin', 'error'], 'failed')
      .setIn(['flightCheckin', 'loading'], false)
      .setIn(['flightCheckin', 'retryCount'], 0);
    expect(homeReducer(state, flightCheckinLoadingError('failed'))).toEqual(expectedResult);
  });
  it('should handle updateCheckinDetailsIndex action correctly', () => {
    const expectedResult = state
      .set('checkinDetailsIndex', 1);
    expect(homeReducer(state, updateCheckinDetailsIndex(1))).toEqual(expectedResult);
  });
  it('should handle loadMyTrips action correctly', () => {
    const expectedResult = state
      .setIn(['myTrips', 'loading'], true)
      .setIn(['myTrips', 'error'], false)
      .setIn(['myTrips', 'retryCount'], 0);
    expect(homeReducer(state, loadMyTrips(false))).toEqual(expectedResult);
  });
  it('should handle myTripsLoaded action correctly', () => {
    const expectedResult = state
      .setIn(['myTrips', 'data'], { myTripsInfo: 'Trips received' })
      .setIn(['myTrips', 'loading'], false)
      .setIn(['myTrips', 'retryCount'], 0);
    expect(homeReducer(state, myTripsLoaded({ myTripsInfo: 'Trips received' }))).toEqual(expectedResult);
  });
  it('should handle myTripsLoadingError action correctly', () => {
    const expectedResult = state
      .setIn(['myTrips', 'error'], 'failed')
      .setIn(['myTrips', 'loading'], false)
      .setIn(['myTrips', 'retryCount'], 0);
    expect(homeReducer(state, myTripsLoadingError('failed'))).toEqual(expectedResult);
  });
  it('should handle onResetMyTripsData action correctly', () => {
    const expectedResult = state
      .setIn(['myTrips', 'data'], null);
    expect(homeReducer(state, onResetMyTripsData(null))).toEqual(expectedResult);
  });
  it('should handle toFocusFlightStatusNumber action correctly', () => {
    const expectedResult = state
      .setIn(['flightStatus', 'focusFlightNumberHeader'], true);
    expect(homeReducer(state, toFocusFlightStatusNumber(true))).toEqual(expectedResult);
  });
  it('should handle toFocusFlightCheckinNumber action correctly', () => {
    const expectedResult = state
      .setIn(['flightCheckin', 'focusFlightNumberHeader'], true);
    expect(homeReducer(state, toFocusFlightCheckinNumber(true))).toEqual(expectedResult);
  });
});
