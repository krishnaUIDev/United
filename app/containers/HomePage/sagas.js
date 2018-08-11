import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { REHYDRATE } from 'redux-persist/constants';
import { fromJS } from 'immutable';
import { actions } from 'react-redux-form/lib/immutable';
import config from 'config'; // eslint-disable-line

import {
  ROUTE_LOADED,
  API_TOKEN_REQUEST_URL,
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  TOKEN_REFRESH,
  TOKEN_REFRESH_ERROR,
  TOKEN_REFRESH_SUCCESS,
  API_AIRPORTS_REQUEST_URL,
  API_TOKEN_REFRESH_URL,
  API_HOTEL_LOCATION_REQUEST_URL,
  LOAD_SIGN_IN,
  API_SIGN_IN_REQUEST_URL,
  API_PROFILE_REQUEST_URL,
  LOAD_PROFILE,
  API_SIGN_OUT_REQUEST_URL,
  DO_SIGN_OUT,
  LOAD_FLIGHT_STATUS,
  API_FLIGHT_STATUS_REQUEST_URL,
  LOAD_FLIGHT_CHECKIN,
  API_FLIGHT_CHECKIN_REQUEST_URL,
  TIMEOUT_SET_MODAL,
  LOAD_MY_TRIPS,
  API_FLIGHT_TRIPS_REQUEST_URL,
  LOAD_SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_PROFILE_SUCCESS,
} from 'containers/App/constants';

import serializeError from 'utils/serializeError';

import {
  loadToken,
  tokenLoaded,
  tokenLoadingError,
  refreshToken,
  tokenRefreshed,
  tokenRefreshError,
  loadSignIn,
  signInLoaded,
  signInLoadingError,
  loadProfile,
  profileLoaded,
  profileLoadingError,
  doSignOut,
  signOutLoaded,
  signOutLoadingError,
  loadFlightStatus,
  flightStatusLoaded,
  flightStatusLoadingError,
  showHideTimeoutModal,
  loadFlightCheckin,
  flightCheckinLoaded,
  flightCheckinLoadingError,
  loadMyTrips,
  myTripsLoaded,
  myTripsLoadingError,
  onResetFlightStatusData,
  onResetFlightCheckinData,
  onResetMyTripsData,
} from 'containers/App/actions';

import request from 'utils/request';

import { makeSelectToken, makeSelectHydrated, makeSelectGlobalFlightStatusOrigin, makeSelectGlobalFlightStatusDestination, makeSelectGlobalPassengersToBook } from 'containers/App/selectors';
import { makeSelectDate } from 'containers/FlightStatusContainer/selectors';
import {
  makeSelectAirportsSearchString,
  makeSelectAirportsRetryCount,
  makeSelectCarLocationsSearchString,
  makeSelectCarLocationsRetryCount,
  makeSelectHotelLocationsSearchString,
  makeSelectUserProfileRetryCount,
  makeSelectFlightStatusRetryCount,
  makeSelectUserLoggedIn,
  makeSelectAdvisoriesRetryCount,
  makeSelectFlightCheckinRetryCount,
  makeSelectMyTripsRetryCount,
  makeSelectActiveTab,
  makeSelectFlightStatusData,
  makeSelectFlightCheckinData,
  makeSelectMyTripsData,
} from 'containers/HomePage/selectors';

import { TIMEOUT_TOKEN, TIMEOUT_INACTIVE } from 'containers/TimeoutModal/constants';
import { CAROUSEL_AUTO_PREV_SLIDE, CAROUSEL_AUTO_NEXT_SLIDE } from 'containers/CarouselContainer/constants';

import {
  LOAD_AIRPORTS,
  LOAD_CAR_LOCATIONS,
  LOAD_HOTEL_LOCATIONS,
  LOAD_ADVISORIES_STATUS,
  API_ADVISORIES_REQUEST_URL,
} from './constants';

import {
  loadAirports,
  airportsLoaded,
  airportsLoadingError,
  loadCarLocations,
  carLocationsLoaded,
  carLocationsLoadingError,
  hotelLocationsLoaded,
  hotelLocationsLoadingError,
  advisoriesLoaded,
  advisoriesLoadingError,
  loadAdvisories,
  setPrimaryTab,
  onSetAriaLiveMessage,
} from './actions';

import {
  loadCarouselSlides,
} from '../CarouselContainer/actions';

const NUM_RETRIES = 2;
const TIMEOUT = 20000;
const USER_INACTIVE_TIMEOUT = 1200000; // 20*60*1000 = 20 mins

/**
 * request/response handler
 */
export function getHeaders(token = null) {
  let headers = {
    'Accept-Language': 'en-US',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = { ...headers, Authorization: `bearer ${token.hash}` };
  }
  return headers;
}

export function* handleApiErrors(error, action, retryCountSelector) {
  const status = error && error.response && error.response.status;
  if (status === 401) {
    // console.log('Error: 401', error.response);
    const retryCount = yield select(retryCountSelector());

    if (retryCount < NUM_RETRIES) {
      // console.log('retryCount < 3', retryCount);
      yield call(getAnonToken);
      yield put(action());
    }
  } else if (status === 403) {
    // console.log('Error: 403', error.response);
    // logout user (delete all mp account data)
    // show 'logged out' modal window
    const token = yield select(makeSelectToken());
    if (token && token.hash) {
      yield put(doSignOut(token));
    }
    yield put(showHideTimeoutModal(TIMEOUT_TOKEN));

    // show login form
  } else if (status === 503 || error.code === 'ECONNABORTED') {
    // console.log('Error: 503 or ECONNABORTED', error.response);
    const retryCount = yield select(retryCountSelector());

    if (retryCount < NUM_RETRIES) {
      // console.log('500|ECONNABORTED retryCount < 3', retryCount);
      yield put(action());
    }
  } else if (status === 501) {
    const redirectUrl = error && error.response && error.response.data && error.response.data.errors.length && error.response.data.errors[0].detail;
    window.location.assign(redirectUrl);
  }
}

/* istanbul ignore next */
export function* loadRoute(action) { // runs on application start up after the page was rendered
  if (action.name === 'home') {
    const hydrated = yield select(makeSelectHydrated());
    // check if hydrated, wait for rehydration if not
    if (!hydrated) {
      yield take(REHYDRATE);
    }

    const token = yield select(makeSelectToken()); // move token logic to app level saga
    // console.log('loadRoute Saga', token, action, hydrated);

    // check if the token is valid & authenticated && user not logged in
    if (checkCookie('Session') && token && token.hash && token.isAuthenticated) {
      yield put(loadProfile());
    } else if (checkCookie('Session') && checkCookie('User')) { // logged in in 2.0
      // console.log('cookies detected!');
      yield put(loadSignIn('', ''));
    }
  }
    // initialize forms with persisted data
  yield call(restoreInitialStateForModel);
}


function* restoreInitialStateForModel() {
// Flight Status Form
  const flightStatusModelModelInitialState = fromJS({
    StatusOrigin: yield select(makeSelectGlobalFlightStatusOrigin()),
    StatusDestination: yield select(makeSelectGlobalFlightStatusDestination()),
    flightNumber: '',
    dates: yield select(makeSelectDate()),
  });
  const passengersToBook = yield select(makeSelectGlobalPassengersToBook());
  yield put(actions.change('flightStatusModel', flightStatusModelModelInitialState));
  yield put(actions.change('booking.passengersToBook', passengersToBook));
}

function delCookie(name) {
  const domain = config.COOKIE_DOMAIN;
  document.cookie = `${name}=; Max-Age=-99999999;domain=${domain}`;
}

function checkCookie(cookieName) {
  const name = `${cookieName}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) { // eslint-disable-line
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return true;
    }
  }
  return false;
}
/* istanbul ignore next */
export function* loadRouteData() {
  // Watches for ROUTE_LOADED actions and calls loadRoute when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // console.log('loadAppData');
  const watcher = yield takeLatest(ROUTE_LOADED, loadRoute);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userActivity() { // runs on application start up after the page was rendered
  yield call(delay, USER_INACTIVE_TIMEOUT);
  const token = yield select(makeSelectToken());
  if (token && token.hash && token.isAuthenticated) {
    // yield put({ type: 'USER_TIMEOUT' });
    yield put(showHideTimeoutModal(TIMEOUT_INACTIVE));
    yield put(doSignOut(token));
  }
}

export function* userActivityData() {
  // Watches for ALL actions and calls userActivity when one comes in.
  const watcher = yield takeLatest((action) => ![TIMEOUT_SET_MODAL, CAROUSEL_AUTO_NEXT_SLIDE, CAROUSEL_AUTO_PREV_SLIDE].includes(action.type), userActivity);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getAirports() {
  const searchString = yield select(makeSelectAirportsSearchString());
  const requestURL = `${API_AIRPORTS_REQUEST_URL}/${searchString}`;
  // const requestURL = '/test/long';

  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(airportsLoaded(response.data.airports));
  } catch (error) {
    // check if error is 403, 401: get new token and retry or 500: retry
    yield call(handleApiErrors, serializeError(error), () => loadAirports(searchString, true), makeSelectAirportsRetryCount);
    yield put(airportsLoadingError(serializeError(error)));
  }
}

export function* airportData() {
  // Watches for LOAD_AIRPORTS actions and calls getPnrs when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_AIRPORTS, getAirports);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getSignIn(action) {
  const mpUsername = action.mpUsername;
  const password = action.password;
  const requestURL = `${API_SIGN_IN_REQUEST_URL}`;
  const persist = (password !== '') ? action.persist : true;
  // const requestURL = '/test/long';

  let params = { username: mpUsername, password, isEncrypted: action.encrypted };
  if (password === '') {
    params = {};
  }

  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { method: 'post', data: params, timeout: TIMEOUT, headers: getHeaders(token) });
    if (response.status === 202) {
      const redirectUrl = `${config.PLATYPUS_BASE_URL}${response.data.links.find((link) =>
        link.Name === 'TwoFactor' || link.Name === 'SecurityUpdates').Url}`;
      window.location.assign(redirectUrl);
    } else {
      yield put(signInLoaded(response.data.profile, response.data.profile.Travelers[0].MileagePlusId, response.data.encryptedUserName, persist, response.data.token));
      yield put(actions.reset('loginFormModel'));
    }
  } catch (error) {
    if (error && error.response && (error.response.status === 403 || error.response.status === 423)) { // invalid user/password or locked account
      // console.log('invalid user-pass or locked account');
      yield put(signInLoadingError(serializeError(error)));
    } else {
      yield call(handleApiErrors, serializeError(error), () => loadSignIn(mpUsername, password, action.persist), makeSelectUserProfileRetryCount);
      yield put(signInLoadingError(serializeError(error)));
    }
  }
}

export function* signInData() {
  // Watches for LOAD_SIGN_IN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_SIGN_IN, getSignIn);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getProfile() {
  const requestURL = `${API_PROFILE_REQUEST_URL}`;
  // const requestURL = '/test/long';
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(profileLoaded(response.data.profile, response.data.profile.Travelers[0].MileagePlusId, response.data.encryptedUserName));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadProfile(true), makeSelectUserProfileRetryCount);
    yield put(profileLoadingError());
  }
}

export function* profileData() {
  // Watches for LOAD_SIGN_IN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_PROFILE, getProfile);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getFlightStatus(action) {
  const requestURL = (action.origin && action.destination && action.flightNumber) ? `${API_FLIGHT_STATUS_REQUEST_URL}/${action.flightNumber}/${action.statusDate}/${action.origin}/${action.destination}`
  : `${API_FLIGHT_STATUS_REQUEST_URL}/${action.flightNumber}/${action.statusDate}`;
  yield call(getToken);
  const token = yield select(makeSelectToken());
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(flightStatusLoaded(response.data));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadFlightStatus(action.origin, action.destination, action.flightNumber, action.statusDate, true), makeSelectFlightStatusRetryCount);
    yield put(flightStatusLoadingError(serializeError(error)));
  }
}

export function* flightStatusData() {
  // Watches for LOAD_FLIGHT_STATUS actions and calls getFlightStatus when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_FLIGHT_STATUS, getFlightStatus);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getFlightCheckin() {
  const isLoggedIn = yield select(makeSelectUserLoggedIn());
  if (isLoggedIn) {
    const requestURL = `${API_FLIGHT_CHECKIN_REQUEST_URL}`;
    yield call(getToken);
    const token = yield select(makeSelectToken());
    try {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
      yield put(flightCheckinLoaded(response.data));
    } catch (error) {
      yield call(handleApiErrors, serializeError(error), () => loadFlightCheckin(true), makeSelectFlightCheckinRetryCount);
      yield put(flightCheckinLoadingError(serializeError(error)));
    }
  } else {
    yield put(flightCheckinLoaded(null));
  }
}

export function* flightCheckinData() {
  // Watches for LOAD_FLIGHT_CHECKIN actions and calls getFlightCheckin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_FLIGHT_CHECKIN, getFlightCheckin);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* advisoriesData() {
  // Watches for LOAD_ADVISORIES  actions and calls getAdvisories when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ADVISORIES_STATUS, getAdvisories);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getMyTrips() {
  const isLoggedIn = yield select(makeSelectUserLoggedIn());
  if (isLoggedIn) {
    const requestURL = `${API_FLIGHT_TRIPS_REQUEST_URL}`;
    yield call(getToken);
    const token = yield select(makeSelectToken());
    try {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
      yield put(myTripsLoaded(response.data.trips));
    } catch (error) {
      yield call(handleApiErrors, serializeError(error), () => loadMyTrips(true), makeSelectMyTripsRetryCount);
      yield put(myTripsLoadingError(serializeError(error)));
    }
  } else {
    yield put(myTripsLoaded(null));
  }
}

export function* myTripsData() {
  // Watches for LOAD_MY_TRIPS actions and calls getMyTrips when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_MY_TRIPS, getMyTrips);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getAdvisories() {
  const requestURL = `${API_ADVISORIES_REQUEST_URL}`;
  yield call(getToken);
  const token = yield select(makeSelectToken());
  try {
  // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(advisoriesLoaded(response.data.alert));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadAdvisories(true), makeSelectAdvisoriesRetryCount);
    yield put(advisoriesLoadingError(serializeError(error)));
  }
}

export function* getSignOut(action) {
  const requestURL = `${API_SIGN_OUT_REQUEST_URL}`;
  // const requestURL = '/test/long';
  const token = action.token;
  if (token && token.hash) {
    try {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
      yield put(signOutLoaded(response.data.token));
    } catch (error) {
      yield put(signOutLoadingError(serializeError(error)));
    }
  }
  if (checkCookie('Session')) delCookie('Session');
}

export function* signOutData() {
  // Watches for DO_SIGN_OUT actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(DO_SIGN_OUT, getSignOut);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getCarLocations() {
  const searchString = yield select(makeSelectCarLocationsSearchString());
  const requestURL = `${config.API_CAR_LOCATION_REQUEST_URL}${searchString}`;
  // const requestURL = '/test/500';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(carLocationsLoaded(response.results.docs));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadCarLocations(searchString, true), makeSelectCarLocationsRetryCount);
    yield put(carLocationsLoadingError(serializeError(error)));
  }
}

export function* carLocationsData() {
  const watcher = yield takeLatest(LOAD_CAR_LOCATIONS, getCarLocations);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getHotelLocations() {
  const searchString = yield select(makeSelectHotelLocationsSearchString());
  const requestURL = `${API_HOTEL_LOCATION_REQUEST_URL}${searchString}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(hotelLocationsLoaded(response.suggestions));
  } catch (error) {
    yield put(hotelLocationsLoadingError(serializeError(error)));
  }
}

export function* hotelLocationsData() {
  const watcher = yield takeLatest(LOAD_HOTEL_LOCATIONS, getHotelLocations);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function getTimestamp(offsetSeconds = 0) {
  return Date.now() + (offsetSeconds * 1000);
}

export function* getTokenData() {
  try {
    // Call our request helper (see 'utils/request')
    const tokenResponse = yield call(request, API_TOKEN_REQUEST_URL, { timeout: TIMEOUT, headers: getHeaders() });
    const token = tokenResponse.data.token;
    yield put(tokenLoaded(token));
  } catch (error) {
    yield put(tokenLoadingError(serializeError(error)));
  }
}

export function* getToken() {
  const token = yield select(makeSelectToken());
  // // validate token
  if (token && token.hash && token.expiresAt && ((Date.parse(token.expiresAt) - 120000) > getTimestamp())) {
    // token is valid, do nothing
  } else if (token && token.hash) {
    // token expired or about to, refresh
    const watcher = yield takeLatest(TOKEN_REFRESH, getRefreshTokenData);
    yield put(refreshToken());
    const action = yield take([TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR]);
    if (action && action.type === TOKEN_REFRESH_ERROR && action.error && action.error.response
      && action.error.response.status === 401) {
      // token is invalid, we need a new one
      yield call(getAnonToken);
    }
    yield cancel(watcher);
  } else {
    // token is not present, we need a new one
    yield call(getAnonToken);
  }
}

export function* getAnonToken() {
  const watcherAnon = yield takeLatest(TOKEN_ANON, getTokenData);
  yield put(loadToken());
  yield take([TOKEN_ANON_SUCCESS, TOKEN_ANON_ERROR]);
  yield cancel(watcherAnon);
}

export function* getRefreshTokenData() {
  try {
    // Call our request helper (see 'utils/request')
    const token = yield select(makeSelectToken());
    const tokenResponse = yield call(request, API_TOKEN_REFRESH_URL, { timeout: TIMEOUT, headers: getHeaders(token) });
    const newToken = tokenResponse.data.token;
    yield put(tokenRefreshed(newToken));
  } catch (error) {
    yield put(tokenRefreshError(serializeError(error)));
  }
}

/**
 * This daemon will watch for incoming successful sign in messages and create new side effects, like reloading
 *  api data that differs depending of user's logged-in state.
*/
export function* refreshTasksAfterLogin() {
  const watcher = yield takeLatest([LOAD_SIGN_IN_SUCCESS, LOAD_PROFILE_SUCCESS], manageAfterLoginTasks);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * This daemon will watch for incoming successful sign off messages and create new side effects, like reloading
 *  api data that differs depending of user's logged-in state.
*/
export function* refreshTasksAfterLogout() {
  const watcher = yield takeLatest([SIGN_OUT_SUCCESS], manageAfterLogoutTasks);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* manageAfterLoginTasks() {
  // Sequence of effects that will be triggered when the user has authenticated
  yield put(loadCarouselSlides());
  // Load data for checkin or my trips if the respective tabs are open
  const activeTab = yield select(makeSelectActiveTab());
  if (activeTab === 'checkInTab') {
    yield put(loadFlightCheckin());
  } else if (activeTab === 'tripsTab') {
    yield put(loadMyTrips(true));
  }
}

export function* manageAfterLogoutTasks() {
  // Sequence of effects that will be triggered after the user logs out
  yield put(loadCarouselSlides());
  const activeTab = yield select(makeSelectActiveTab());
  if (activeTab !== 'travelTab') {
    yield put(setPrimaryTab('travelTab'));
    yield put(onSetAriaLiveMessage(''));
  }
  // Reset data if there is data in reducers
  const flightStatusDataSelector = yield select(makeSelectFlightStatusData());
  if (flightStatusDataSelector) {
    yield put(onResetFlightStatusData());
  }
  const flightCheckinDataSelector = yield select(makeSelectFlightCheckinData());
  if (flightCheckinDataSelector) {
    yield put(onResetFlightCheckinData());
  }
  const myTripsDataSelector = yield select(makeSelectMyTripsData());
  if (myTripsDataSelector) {
    yield put(onResetMyTripsData());
  }
  // reset all forms
  yield put(actions.reset('bookFlightModel'));
  yield put(actions.reset('bookCarModel'));
  yield put(actions.reset('bookHotelModel'));
  yield put(actions.reset('flightStatusModel'));
  yield put(actions.reset('bookCheckinModel'));
  yield put(actions.reset('bookMyTripsModel'));
}

// Bootstrap sagas
export default [
  airportData,
  signInData,
  carLocationsData,
  hotelLocationsData,
  loadRouteData,
  profileData,
  signOutData,
  flightStatusData,
  flightCheckinData,
  advisoriesData,
  userActivityData,
  myTripsData,
  refreshTasksAfterLogin,
  refreshTasksAfterLogout,
];
