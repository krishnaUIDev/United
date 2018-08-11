import { fromJS } from 'immutable';
import moment from 'moment';

import persistentReducer from '../persistentReducer';
import {
  loadToken,
  tokenLoaded,
  tokenLoadingError,
  onSignInRememberMeChecked,
  tokenRefreshError, tokenRefreshed, refreshToken, signInLoaded, profileLoaded, doSignOut,
  signOutLoaded,
} from '../actions';
import { awardTravelSelected, onCabinClassSelected } from '../../../containers/HomePage/actions';
import { onSetDepartDate, onSetReturnDate, onSetFocusedInput } from '../../../containers/BookCalendar/actions';
import {
  onBookFlightOriginLocationSelected,
  onBookFlightDestinationLocationSelected,
  onCorporateBookChecked,
  onNonstopChecked,
  onFlexibleDatesChecked,
  onRoundtripChecked,
  onSetOriginLocationCode,
  onSetDestinationLocationCode,
  updatePassengerInfo,
} from '../../../containers/BookFlightContainer/actions';
import { onSetFlightStatusDestinationLocationCode, onSetFlightStatusOriginLocationCode, onFlightStatusOriginLocationSelected, onFlightStatusDestinationLocationSelected } from '../../../containers/FlightStatusContainer/actions';

describe('persistentReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      error: false,
      apiToken: false,
      roundtripChecked: true,
      flexibleDatesChecked: false,
      corporateBookChecked: false,
      nonstopFlightChecked: false,
      flightDestination: '',
      flightOrigin: '',
      flightStartDate: null,
      calendarFocusedInput: '',
      flightEndDate: null,
      hotelStartDate: null,
      hotelEndDate: null,
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
      cabinSelected: 'econ',
      awardTravelSelected: false,
      originLocationCode: '',
      destinationLocationCode: '',
      mpUsername: '',
      mpUsernameCrypto: '',
      rememberMeChecked: false,
      flightStatusOrigin: '',
      flightStatusDestination: '',
      flightStatusOriginLocationCode: '',
      flightStatusDestinationLocationCode: '',
      tripLength: '6',
      flexMonth: moment().date(1).format('YYYY-MM-DD'),
      carSameLocationChecked: true,
      carHideAgeBox: true,
      carPickupDate: null,
      carDropoffDate: null,
      carDropoffTime: '10|0',
      carPickupTime: '10|0',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(persistentReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadToken action correctly', () => {
    const expectedResult = state
      .set('error', false)
      .set('apiToken', false);

    expect(persistentReducer(state, loadToken(false))).toEqual(expectedResult);
  });

  it('should handle the tokenLoaded action correctly', () => {
    const fixture = {
      hash: 'My hash',
      isAuthenticated: false,
    };
    const expectedResult = state
      .set('apiToken', fixture);

    expect(persistentReducer(state, tokenLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the tokenLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture);

    expect(persistentReducer(state, tokenLoadingError(fixture))).toEqual(expectedResult);
  });

  it('should handle the refreshToken action correctly', () => {
    const expectedResult = state
      .set('error', false)
      .set('apiToken', false);

    expect(persistentReducer(state, refreshToken(false))).toEqual(expectedResult);
  });

  it('should handle the tokenRefreshed action correctly', () => {
    const fixture = {
      hash: 'My hash',
      isAuthenticated: false,
    };
    const expectedResult = state
      .set('apiToken', fixture);

    expect(persistentReducer(state, tokenRefreshed(fixture))).toEqual(expectedResult);
  });

  it('should handle the tokenRefreshed action correctly (auth)', () => {
    const fixture = {
      hash: 'My hash',
      isAuthenticated: true,
    };
    const expectedResult = state
      .set('apiToken', fixture);

    state = state.set('apiToken', { hash: 'something', isAuthenticated: true });
    expect(persistentReducer(state, tokenRefreshed(fixture))).toEqual(expectedResult);
  });

  it('should handle the tokenRefreshError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture);

    expect(persistentReducer(state, tokenRefreshError(fixture))).toEqual(expectedResult);
  });
  // signInLoaded(profile, mpUsername, mpUsernameCrypto, persist, token)
  it('should handle the signInLoaded action correctly (persist)', () => {
    const data = {
      some: 'data',
    };
    const fixture = {
      hash: 'My hash',
      isAuthenticated: true,
    };
    const expectedResult = state
      .set('apiToken', fixture).set('mpUsername', '*****123').set('mpUsernameCrypto', 'cryptovalue');

    expect(persistentReducer(state, signInLoaded(data, 'ABCDE123', 'cryptovalue', true, fixture))).toEqual(expectedResult);
  });

  it('should handle the signInLoaded action correctly (no persist)', () => {
    const data = {
      some: 'data',
    };
    const fixture = {
      hash: 'My hash',
      isAuthenticated: true,
    };
    const expectedResult = state
      .set('apiToken', fixture).set('mpUsername', '').set('mpUsernameCrypto', '');

    expect(persistentReducer(state, signInLoaded(data, 'ABCDE123', 'cryptovalue', false, fixture))).toEqual(expectedResult);
  });

  it('should handle the profileLoaded action correctly (keep)', () => {
    state = state.set('mpUsername', '*****123').set('mpUsernameCrypto', 'cryptosarlanga');

    const data = {
      some: 'data',
    };
    const expectedResult = state
      .set('mpUsername', '*****123').set('mpUsernameCrypto', 'cryptosarlanga');

    expect(persistentReducer(state, profileLoaded(data, 'ABCDE123', 'cryptosarlanga'))).toEqual(expectedResult);
  });

  it('should handle the profileLoaded action correctly (dont store)', () => {
    state = state.set('mpUsername', '*****123').set('mpUsernameCrypto', 'cryptosarlanga');

    const data = {
      some: 'data',
    };
    const expectedResult = state
      .set('mpUsername', '').set('mpUsernameCrypto', '');

    expect(persistentReducer(state, profileLoaded(data, 'ABCDE123', 'cryptosarlanganope'))).toEqual(expectedResult);
  });

  it('should handle the doSignOut action correctly', () => {
    const testState = state = fromJS({
      error: false,
      apiToken: false,
      roundtripChecked: true,
      flexibleDatesChecked: true,
      corporateBookChecked: true,
      nonstopFlightChecked: true,
      flightDestination: 'LAX',
      flightOrigin: 'LON',
      flightStartDate: null,
      calendarFocusedInput: '',
      flightEndDate: null,
      hotelStartDate: null,
      hotelEndDate: null,
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
      cabinSelected: 'business',
      awardTravelSelected: true,
      originLocationCode: '',
      destinationLocationCode: '',
      mpUsername: 'foo',
      mpUsernameCrypto: 'asdasdasdasd',
      rememberMeChecked: true,
      flightStatusOrigin: '',
      flightStatusDestination: '',
      flightStatusOriginLocationCode: '',
      flightStatusDestinationLocationCode: '',
      tripLength: '6',
      flexMonth: moment().date(1).format('YYYY-MM-DD'),
      carSameLocationChecked: true,
      carHideAgeBox: true,
      carPickupDate: null,
      carDropoffDate: null,
      carDropoffTime: '10|0',
      carPickupTime: '10|0',
    });

    const expectedState = state = fromJS({
      error: false,
      apiToken: false,
      roundtripChecked: true,
      flexibleDatesChecked: false,
      corporateBookChecked: false,
      nonstopFlightChecked: false,
      flightDestination: '',
      flightOrigin: '',
      flightStartDate: null,
      calendarFocusedInput: '',
      flightEndDate: null,
      hotelStartDate: null,
      hotelEndDate: null,
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
      cabinSelected: 'econ',
      awardTravelSelected: false,
      originLocationCode: '',
      destinationLocationCode: '',
      mpUsername: 'foo',
      mpUsernameCrypto: 'asdasdasdasd',
      rememberMeChecked: true,
      flightStatusOrigin: '',
      flightStatusDestination: '',
      flightStatusOriginLocationCode: '',
      flightStatusDestinationLocationCode: '',
      tripLength: '6',
      flexMonth: moment().date(1).format('YYYY-MM-DD'),
      carSameLocationChecked: true,
      carHideAgeBox: true,
      carPickupDate: null,
      carDropoffDate: null,
      carDropoffTime: '10|0',
      carPickupTime: '10|0',
    });

    expect(persistentReducer(testState, doSignOut({}))).toEqual(expectedState);
  });

  it('should handle the signOutLoaded action correctly', () => {
    state = state.set('apiToken', { hash: 'something', isAuthenticated: true });

    const fixture = {
      hash: 'My hash',
      isAuthenticated: false,
    };
    const expectedResult = state
      .set('apiToken', fixture);

    expect(persistentReducer(state, signOutLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the awardTravelSelected action correctly', () => {
    const expectedResult = state
      .set('awardTravelSelected', true);

    expect(persistentReducer(state, awardTravelSelected(true))).toEqual(expectedResult);
  });

  it('should handle the onCabinClassSelected action correctly', () => {
    const expectedResult = state
      .set('cabinSelected', true);

    expect(persistentReducer(state, onCabinClassSelected(true))).toEqual(expectedResult);
  });

  it('should handle the updatePassengerInfo action correctly', () => {
    const expectedResult = state
      .set('passengersToBook', state.get('passengersToBook')
        .set('Adults (18-64)', 2));

    expect(persistentReducer(state, updatePassengerInfo('Adults (18-64)', 2))).toEqual(expectedResult);
  });

  it('should handle the onSetDepartDate action correctly', () => {
    const expectedResult = state
      .set('flightStartDate', 'Nov 3, 2017');

    expect(persistentReducer(state, onSetDepartDate('Nov 3, 2017'))).toEqual(expectedResult);
  });

  it('should handle the onSetReturnDate action correctly', () => {
    const expectedResult = state
      .set('flightEndDate', 'Nov 24, 2017');

    expect(persistentReducer(state, onSetReturnDate('Nov 24, 2017'))).toEqual(expectedResult);
  });

  it('should handle the onSetFocusedInput action correctly', () => {
    const expectedResult = state
      .set('calendarFocusedInput', 'startDate');

    expect(persistentReducer(state, onSetFocusedInput('startDate'))).toEqual(expectedResult);
  });

  it('should handle the onBookFlightOriginLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightOrigin', 'London');

    expect(persistentReducer(state, onBookFlightOriginLocationSelected('London'))).toEqual(expectedResult);
  });

  it('should handle the onBookFlightDestinationLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightDestination', 'Chicago');

    expect(persistentReducer(state, onBookFlightDestinationLocationSelected('Chicago'))).toEqual(expectedResult);
  });

  it('should handle the onCorporateBookChecked action correctly', () => {
    const expectedResult = state
      .set('corporateBookChecked', true);

    expect(persistentReducer(state, onCorporateBookChecked(true))).toEqual(expectedResult);
  });

  it('should handle the onNonstopChecked action correctly', () => {
    const expectedResult = state
      .set('nonstopFlightChecked', true);

    expect(persistentReducer(state, onNonstopChecked(true))).toEqual(expectedResult);
  });

  it('should handle the onFlexibleDatesChecked action correctly', () => {
    const expectedResult = state
      .set('flexibleDatesChecked', true);

    expect(persistentReducer(state, onFlexibleDatesChecked(true))).toEqual(expectedResult);
  });

  it('should handle the onRoundtripChecked action correctly', () => {
    const expectedResult = state
      .set('roundtripChecked', true);

    expect(persistentReducer(state, onRoundtripChecked(true))).toEqual(expectedResult);
  });
  it('should handle the onSetOriginLocationCode action correctly', () => {
    const expectedResult = state
      .set('originLocationCode', 'LAX');

    expect(persistentReducer(state, onSetOriginLocationCode('LAX'))).toEqual(expectedResult);
  });
  it('should handle the onSetDestinationLocationCode action correctly', () => {
    const expectedResult = state
      .set('destinationLocationCode', 'LAX');

    expect(persistentReducer(state, onSetDestinationLocationCode('LAX'))).toEqual(expectedResult);
  });
  it('should handle the onSignInRememberMeChecked action correctly', () => {
    const expectedResult = state
      .set('rememberMeChecked', true);

    expect(persistentReducer(state, onSignInRememberMeChecked(true))).toEqual(expectedResult);
  });
  it('should handle the onFlightStatusOriginLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightStatusOrigin', 'ORD');

    expect(persistentReducer(state, onFlightStatusOriginLocationSelected('ORD'))).toEqual(expectedResult);
  });
  it('should handle the onFlightStatusDestinationLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightStatusDestination', 'DEN');

    expect(persistentReducer(state, onFlightStatusDestinationLocationSelected('DEN'))).toEqual(expectedResult);
  });
  it('should handle the onSetFlightStatusOriginLocationCode action correctly', () => {
    const expectedResult = state
      .set('flightStatusOriginLocationCode', 'ORD');

    expect(persistentReducer(state, onSetFlightStatusOriginLocationCode('ORD'))).toEqual(expectedResult);
  });
  it('should handle the onSetFlightStatusDestinationLocationCode action correctly', () => {
    const expectedResult = state
      .set('flightStatusDestinationLocationCode', 'DEN');

    expect(persistentReducer(state, onSetFlightStatusDestinationLocationCode('DEN'))).toEqual(expectedResult);
  });
});
