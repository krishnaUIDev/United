/**
 * Tests for HomePage sagas
 */

import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  TOKEN_REFRESH,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_ERROR,
  LOAD_SIGN_IN,
  LOAD_FLIGHT_STATUS,
  LOAD_FLIGHT_CHECKIN,
  LOAD_MY_TRIPS,
} from 'containers/App/constants';
import { loadToken, tokenLoaded, tokenLoadingError, refreshToken, tokenRefreshed, tokenRefreshError, signInLoaded, signInLoadingError, flightStatusLoaded, flightStatusLoadingError, flightCheckinLoaded, flightCheckinLoadingError, myTripsLoaded, myTripsLoadingError } from 'containers/App/actions';
import serializeError from 'utils/serializeError';
import {
  makeSelectAirportsRetryCount,
 } from 'containers/HomePage/selectors';

import {
  loadAirports, airportsLoaded, airportsLoadingError, carLocationsLoaded, carLocationsLoadingError,
    hotelLocationsLoaded, hotelLocationsLoadingError,
} from '../actions';

import {
  LOAD_AIRPORTS,
  LOAD_CAR_LOCATIONS,
  LOAD_HOTEL_LOCATIONS,
} from '../constants';


import {
  getTokenData, getToken, getAnonToken, getAirports, airportData, getRefreshTokenData, carLocationsData, getSignIn,
  signInData, flightStatusData, getFlightStatus, getFlightCheckin, flightCheckinData, getCarLocations,
  hotelLocationsData, getHotelLocations, handleApiErrors, myTripsData, getMyTrips,
} from '../sagas';

import config from '../../../config/development';

describe('handleApiErrors Saga with Error Status 401', () => {
  let handleApiErrorsGenerator;
  beforeEach(() => {
    const error = ({
      response: {
        status: 401,
      },
    });
    handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
    const selectDescriptor = handleApiErrorsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the LoadAirports action if the retry count is less than threshold', () => {
    const callDescriptor = handleApiErrorsGenerator.next(1).value;
    expect(callDescriptor).toMatchSnapshot();
    const callDescriptor1 = handleApiErrorsGenerator.next().value;
    expect(callDescriptor1).toMatchSnapshot();
    const putDescriptor = handleApiErrorsGenerator.next({ hash: '12345', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(putDescriptor).toMatchSnapshot(put(loadAirports('ord', true)));
  });
  it('should not dispatch any action if the retry count is greater than threshold', () => {
    const callDescriptor = handleApiErrorsGenerator.next(4).value;
    expect(callDescriptor).toMatchSnapshot();
  });
});
describe('handleApiErrors Saga with Error Status 503', () => {
  let handleApiErrorsGenerator;
  beforeEach(() => {
    const error = ({
      code: 'ECONNABORTED',
      response: {
        status: 503,
      },
    });
    handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
    const selectDescriptor = handleApiErrorsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });
  it('should dispatch the LoadAirports action if the retry count is less than threshold', () => {
    const callDescriptor = handleApiErrorsGenerator.next(1).value;
    expect(callDescriptor).toMatchSnapshot();
    const putDescriptor = handleApiErrorsGenerator.next({ hash: '12345', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(putDescriptor).toMatchSnapshot(put(loadAirports('ord', true)));
  });
  it('should not dispatch any action if the retry count is greater than threshold', () => {
    const callDescriptor = handleApiErrorsGenerator.next(4).value;
    expect(callDescriptor).toMatchSnapshot();
  });
});
describe('handleApiErrors Saga with Error Code ECONNABORTED but not Error status with 503', () => {
  const error = ({
    code: 'ECONNABORTED',
    response: {
      status: 0,
    },
  });
  const handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
  const selectDescriptor = handleApiErrorsGenerator.next().value;
  expect(selectDescriptor).toMatchSnapshot();
  const callDescriptor = handleApiErrorsGenerator.next(1).value;
  expect(callDescriptor).toMatchSnapshot();
  it('should dispatch the LoadAirports action if the retry count is less than threshold', () => {
    const putDescriptor = handleApiErrorsGenerator.next({ hash: '12345', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(putDescriptor).toMatchSnapshot(put(loadAirports('ord', true)));
  });
});
describe('handleApiErrors Saga with Error Status 403', () => {
  const error = ({
    response: {
      status: 403,
    },
  });
  const handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
  const selectDescriptor = handleApiErrorsGenerator.next().value;
  expect(selectDescriptor).toMatchSnapshot();
});
describe('handleApiErrors Saga with Error Status 501', () => {
  const error = ({
    response: {
      data: {
        errors: [
          {
            status: 501,
            detail: 'http://qa1.united.com/ual',
          },
        ],
      },
      status: 501,
    },
  });
  it('should use redirectUrl if response status is 501', () => {
    const handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
    window.location.assign = jest.fn();
    handleApiErrorsGenerator.next(error);
    expect(window.location.assign).toBeCalledWith('http://qa1.united.com/ual');
  });
});
describe('handleApiErrors Saga with Error Status not matching any valid ones', () => {
  const error = ({
    response: {
      status: 123,
    },
  });
  const handleApiErrorsGenerator = handleApiErrors(error, () => loadAirports('ord', true), makeSelectAirportsRetryCount);
  const selectDescriptor = handleApiErrorsGenerator.next().value;
  expect(selectDescriptor).toMatchSnapshot();
});
/* eslint-disable redux-saga/yield-effects */
describe('getAirports Saga', () => {
  let getAirportsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getAirportsGenerator = getAirports();

    const selectDescriptor = getAirportsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getAirportsGenerator.next('ewr').value;
    expect(callDescriptor).toMatchSnapshot();

    const callDescriptor2 = getAirportsGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();

    const callDescriptor3 = getAirportsGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the loadAirports action if it requests the data successfully', () => {
    const response = { data: { airports: [{}, {}] } };
    const putDescriptor = getAirportsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(airportsLoaded(response.data.airports)));
  });

  it('should call the airportsLoadingError action if the response errors', () => {
    const error = ({
      response: {
        status: 401,
      },
    });
    const response = new Error(error);
    getAirportsGenerator.throw(response);
    const putDescriptor = getAirportsGenerator.next().value;
    expect(putDescriptor).toEqual(put(airportsLoadingError(serializeError(response))));
  });
});

describe('getSignIn Saga', () => {
  let getSignInGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getSignInGenerator = getSignIn({ mpUsername: 'myusername', password: 'password', persist: false });

    const selectDescriptor = getSignInGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getSignInGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getSignInGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should use redirectUrl if response status is 202', () => {
    window.location.assign = jest.fn();
    const response = { data: { links: [{ Name: 'TwoFactor', Url: '/url' }] }, status: 202 };
    getSignInGenerator.next(response);
    expect(window.location.assign).toBeCalledWith(`${config.PLATYPUS_BASE_URL}${response.data.links[0].Url}`);
  });

  it('should dispatch the signInLoaded action if it requests the data successfully', () => {
    const response = { data: { encryptedUserName: 'asdads', profile: { Travelers: [{ MileagePlusId: 'myusername' }] }, token: {} } };
    const putDescriptor = getSignInGenerator.next(response).value;
    // signInLoaded(profile, mpUsername, mpUsernameCrypto, persist, token)
    expect(putDescriptor).toEqual(put(signInLoaded(response.data.profile, 'myusername', 'asdads', false, response.data.token)));
  });

  it('should call the signInLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const putDescriptor = getSignInGenerator.throw(error).value;
    expect(putDescriptor).toEqual(put(signInLoadingError(serializeError(error))));
  });

  it('should call the signInLoadingError action if the response errors with status 423', () => {
    const error = ({
      response: {
        status: 423,
      },
    });
    const putDescriptor = getSignInGenerator.throw(error).value;
    expect(putDescriptor).toEqual(put(signInLoadingError(serializeError(error))));
  });

  it('should call the signInLoadingError action if the response errors with invalid Status', () => {
    const error = ({
      response: {
        status: 123,
      },
    });
    getSignInGenerator.throw(error);
    const putDescriptor = getSignInGenerator.next().value;
    expect(putDescriptor).toEqual(put(signInLoadingError(serializeError(error))));
  });
});

describe('signInData Saga', () => {
  const signInDataSaga = signInData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_SIGN_IN action', () => {
    const takeLatestDescriptor = signInDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_SIGN_IN, getSignIn));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = signInDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = signInDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getFlightStatus Saga calls 707/2017-12-30/ORD/DEN', () => {
  let getFlightStatusGenerator;
  const action = {
    origin: 'ORD',
    destination: 'DEN',
    flightNumber: '707',
  };
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getFlightStatusGenerator = getFlightStatus(action);

    const selectDescriptor = getFlightStatusGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getFlightStatusGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getFlightStatusGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the flightStatusLoaded action if it requests the data successfully', () => {
    const response = { data: { currentWeather: [{}], flightLegs: [{}] } };
    const putDescriptor = getFlightStatusGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(flightStatusLoaded(response.data)));
  });

  it('should call the flightStatusLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);
    getFlightStatusGenerator.throw(response);
    const putDescriptor = getFlightStatusGenerator.next().value;
    expect(putDescriptor).toEqual(put(flightStatusLoadingError(serializeError(response))));
  });
});

describe('getFlightStatus Saga calls 707/2017-12-30', () => {
  let getFlightStatusGenerator;
  const action = {
    origin: '',
    destination: '',
    flightNumber: '707',
  };
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getFlightStatusGenerator = getFlightStatus(action);

    const selectDescriptor = getFlightStatusGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getFlightStatusGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getFlightStatusGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the flightStatusLoaded action if it requests the data successfully', () => {
    const response = { data: { currentWeather: [{}], flightLegs: [{}] } };
    const putDescriptor = getFlightStatusGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(flightStatusLoaded(response.data)));
  });

  it('should call the flightStatusLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);
    getFlightStatusGenerator.throw(response);
    const putDescriptor = getFlightStatusGenerator.next().value;
    expect(putDescriptor).toEqual(put(flightStatusLoadingError(serializeError(response))));
  });
});

describe('flightStatusData Saga', () => {
  const flightStatusDataSaga = flightStatusData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_FLIGHT_STATUS action', () => {
    const takeLatestDescriptor = flightStatusDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_FLIGHT_STATUS, getFlightStatus));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = flightStatusDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = flightStatusDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getFlightCheckin Saga call isLogged In', () => {
  let getFlightCheckinGenerator;
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getFlightCheckinGenerator = getFlightCheckin();

    const selectDescriptor = getFlightCheckinGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    getFlightCheckinGenerator.next(true);
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getFlightCheckinGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getFlightCheckinGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the flightCheckinLoaded action if it requests the data successfully', () => {
    const response = { data: { currentWeather: [{}], Trips: [{}] } };
    const putDescriptor = getFlightCheckinGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(flightCheckinLoaded(response.data)));
  });

  it('should call the flightCheckinLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);
    getFlightCheckinGenerator.throw(response);
    const putDescriptor = getFlightCheckinGenerator.next().value;
    expect(putDescriptor).toEqual(put(flightCheckinLoadingError(serializeError(response))));
  });
});

describe('flightCheckinData Saga', () => {
  const flightCheckinDataSaga = flightCheckinData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_FLIGHT_CHECKIN action', () => {
    const takeLatestDescriptor = flightCheckinDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_FLIGHT_CHECKIN, getFlightCheckin));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = flightCheckinDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = flightCheckinDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getMyTrips Saga call isLogged In', () => {
  let getMyTripsGenerator;
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getMyTripsGenerator = getMyTrips();

    const selectDescriptor = getMyTripsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    getMyTripsGenerator.next(true);
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getMyTripsGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getMyTripsGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the myTripsLoaded action if it requests the data successfully', () => {
    const response = { data: { currentWeather: [{}], trips: [{}] } };
    const putDescriptor = getMyTripsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(myTripsLoaded(response.data.trips)));
  });

  it('should call the myTripsLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);
    getMyTripsGenerator.throw(response);
    const putDescriptor = getMyTripsGenerator.next().value;
    expect(putDescriptor).toEqual(put(myTripsLoadingError(serializeError(response))));
  });
});

describe('myTripsData Saga', () => {
  const myTripsDataSaga = myTripsData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_MY_TRIPS action', () => {
    const takeLatestDescriptor = myTripsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_MY_TRIPS, getMyTrips));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = myTripsDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = myTripsDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getCarLocations Saga', () => {
  let getCarLocationsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getCarLocationsGenerator = getCarLocations();

    const selectDescriptor = getCarLocationsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getCarLocationsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the carLocationsLoaded action if it requests the data successfully', () => {
    const response = { results: { docs: [{}, {}] } };
    const putDescriptor = getCarLocationsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(carLocationsLoaded(response.results.docs)));
  });

  it('should call the carLocationsLoadingError action if the response errors', () => {
    const error = ({
      response: {
        status: 401,
      },
    });
    const response = new Error(error);
    getCarLocationsGenerator.throw(response);
    const putDescriptor = getCarLocationsGenerator.next().value;
    expect(putDescriptor).toEqual(put(carLocationsLoadingError(serializeError(response))));
  });

  // it('should call the carLocationsLoadingError action if the response errors', () => {
  //   const response = new Error('Some error');
  //   const putDescriptor = getCarLocationsGenerator.throw(response).value;
  //   expect(putDescriptor).toEqual(put(carLocationsLoadingError(serializeError(response))));
  // });
});


describe('getHotelLocations Saga', () => {
  let getHotelLocationsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getHotelLocationsGenerator = getHotelLocations();

    const selectDescriptor = getHotelLocationsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getHotelLocationsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the hotelLocationsLoaded action if it requests the data successfully', () => {
    const response = { suggestions: [{}, {}] };
    const putDescriptor = getHotelLocationsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(hotelLocationsLoaded(response.suggestions)));
  });

  it('should call the hotelLocationsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getHotelLocationsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(hotelLocationsLoadingError(serializeError(response))));
  });
});


describe('airportData Saga', () => {
  const airportDataSaga = airportData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_AIRPORTS action', () => {
    const takeLatestDescriptor = airportDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_AIRPORTS, getAirports));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = airportDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = airportDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('carLocationsData Saga', () => {
  const carLocationsDataSaga = carLocationsData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_CAR_LOCATIONS action', () => {
    const takeLatestDescriptor = carLocationsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_CAR_LOCATIONS, getCarLocations));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = carLocationsDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = carLocationsDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('hotelLocationsData Saga', () => {
  const hotelLocationsDataSaga = hotelLocationsData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_HOTEL_LOCATIONS action', () => {
    const takeLatestDescriptor = hotelLocationsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_HOTEL_LOCATIONS, getHotelLocations));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = hotelLocationsDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = hotelLocationsDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getTokenData Saga', () => {
  let getTokenDataGenerator;
  Date.now = jest.fn(() => Date.parse('2017-01-01T12:00:00.0000000Z'));

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTokenDataGenerator = getTokenData();

    const selectDescriptor = getTokenDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the tokenLoaded action if it requests the data successfully', () => {
    const response = { hash: '12345abc', expiresAt: '2017-11-02T15:43:42.0000000Z' };
    const jsonResponse = { data: { token: { hash: '12345abc', expiresAt: '2017-11-02T15:43:42.0000000Z' } } };
    const putDescriptor = getTokenDataGenerator.next(jsonResponse).value;
    expect(putDescriptor).toEqual(put(tokenLoaded(response)));
  });

  it('should call the pnrLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTokenDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(tokenLoadingError(serializeError(response))));
  });
});

describe('getRefreshTokenData Saga', () => {
  let getRefreshTokenDataGenerator;
  Date.now = jest.fn(() => Date.parse('2017-01-01T12:00:00.0000000Z'));

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getRefreshTokenDataGenerator = getRefreshTokenData();

    const selectDescriptor = getRefreshTokenDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
    const selectDescriptor2 = getRefreshTokenDataGenerator.next({ token: { hash: '12345abc', expiresAt: '2017-11-02T15:43:42.0000000Z' } }).value;
    expect(selectDescriptor2).toMatchSnapshot();
  });

  it('should dispatch the tokenRefreshed action if it requests the data successfully', () => {
    const response = { hash: '12345abc', expiresAt: '2017-11-02T15:43:42.0000000Z' };
    const jsonResponse = { data: { token: { hash: '12345abc', expiresAt: '2017-11-02T15:43:42.0000000Z' } } };
    const putDescriptor = getRefreshTokenDataGenerator.next(jsonResponse).value;
    expect(putDescriptor).toEqual(put(tokenRefreshed(response)));
  });

  it('should call the tokenRefreshError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getRefreshTokenDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(tokenRefreshError(serializeError(response))));
  });
});

describe('getToken Saga expired token', () => {
  const getTokenDataSaga = getToken();
  const mockedTask = createMockTask();

  const selectDescriptor = getTokenDataSaga.next().value;
  expect(selectDescriptor).toMatchSnapshot();


  it('should start task to watch for TOKEN_REFRESH action', () => {
    const takeLatestDescriptor = getTokenDataSaga.next({ hash: '1234abc', expiresAt: '2010-11-02T15:43:42.0000000Z' }).value;
    expect(takeLatestDescriptor).toEqual(takeLatest(TOKEN_REFRESH, getRefreshTokenData));
  });

  it('should dispatch a TOKEN_REFRESH action', () => {
    const takeDescriptor = getTokenDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(put(refreshToken()));
  });

  it('should yield until TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR action', () => {
    const takeDescriptor = getTokenDataSaga.next().value;
    expect(takeDescriptor).toEqual(take([TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR]));
  });

  it('should cancel the forked task', () => {
    const cancelDescriptor = getTokenDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('getToken Saga expired invalid token', () => {
  const getTokenDataSaga = getToken();
  const mockedTask = createMockTask();

  const selectDescriptor = getTokenDataSaga.next().value;
  expect(selectDescriptor).toMatchSnapshot();

  const tokenRefreshErrorAction = ({
    type: TOKEN_REFRESH_ERROR,
    error: {
      response: {
        status: 401,
      },
    },
  });


  it('should start task to watch for TOKEN_REFRESH action', () => {
    const takeLatestDescriptor = getTokenDataSaga.next({ hash: '1234abc', expiresAt: '2010-11-02T15:43:42.0000000Z' }).value;
    expect(takeLatestDescriptor).toEqual(takeLatest(TOKEN_REFRESH, getRefreshTokenData));
  });

  it('should dispatch a TOKEN_REFRESH action', () => {
    const takeDescriptor = getTokenDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(put(refreshToken()));
  });

  it('should yield until TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR action', () => {
    const takeDescriptor = getTokenDataSaga.next().value;
    expect(takeDescriptor).toEqual(take([TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR]));
  });

  it('should start task to watch for TOKEN_ANON action', () => {
    const takeLatestDescriptor = getTokenDataSaga.next(tokenRefreshErrorAction).value;
    expect(takeLatestDescriptor).toMatchSnapshot();
  });
  //
  // it('should dispatch a TOKEN_ANON action', () => {
  //   const takeDescriptor = getTokenDataSaga.next(mockedTask2).value;
  //   expect(takeDescriptor).toEqual(put(loadToken()));
  // });
  //
  // it('should yield until TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR action', () => {
  //   const takeDescriptor = getTokenDataSaga.next().value;
  //   expect(takeDescriptor).toEqual(take([TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR]));
  // });
  //
  // it('should cancel the inner forked task', () => {
  //   const cancelDescriptor = getTokenDataSaga.next().value;
  //   expect(cancelDescriptor).toEqual(cancel(mockedTask2));
  // });
  //
  //
  // it('should cancel the top forked task', () => {
  //   const cancelDescriptor = getTokenDataSaga.next().value;
  //   expect(cancelDescriptor).toEqual(cancel(mockedTask));
  // });
});

describe('getToken Saga no token', () => {
  const getTokenDataSaga = getToken();
  // const mockedTask = createMockTask();

  const selectDescriptor = getTokenDataSaga.next().value;
  expect(selectDescriptor).toMatchSnapshot();


  it('should start task to watch for TOKEN_ANON action', () => {
    const takeLatestDescriptor = getTokenDataSaga.next().value;
    expect(takeLatestDescriptor).toMatchSnapshot();
  });
  //
  // it('should dispatch a TOKEN_ANON action', () => {
  //   const takeDescriptor = getTokenDataSaga.next(mockedTask).value;
  //   expect(takeDescriptor).toEqual(put(loadToken()));
  // });
  //
  // it('should yield until TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR action', () => {
  //   const takeDescriptor = getTokenDataSaga.next().value;
  //   expect(takeDescriptor).toEqual(take([TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR]));
  // });
  //
  // it('should cancel the forked task', () => {
  //   const cancelDescriptor = getTokenDataSaga.next().value;
  //   expect(cancelDescriptor).toEqual(cancel(mockedTask));
  // });
});

describe('getToken Saga valid token', () => {
  const getTokenDataSaga = getToken();

  const selectDescriptor = getTokenDataSaga.next().value;
  expect(selectDescriptor).toMatchSnapshot();

  it('should exit getToken returning nothing', () => {
    const takeLatestDescriptor = getTokenDataSaga.next({ hash: '12345', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(takeLatestDescriptor).toEqual(undefined);
  });
});

describe('getAnonToken Saga', () => {
  const getAnonTokenDataSaga = getAnonToken();
  const mockedTask = createMockTask();

  it('should start task to watch for TOKEN_ANON action', () => {
    const takeLatestDescriptor = getAnonTokenDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(TOKEN_ANON, getTokenData));
  });

  it('should dispatch a TOKEN_ANON action', () => {
    const takeDescriptor = getAnonTokenDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(put(loadToken()));
  });

  it('should yield until TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR action', () => {
    const takeDescriptor = getAnonTokenDataSaga.next().value;
    expect(takeDescriptor).toEqual(take([TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR]));
  });

  it('should cancel the forked task', () => {
    const cancelDescriptor = getAnonTokenDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
