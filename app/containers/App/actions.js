/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  TOKEN_REFRESH,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_ERROR,
  LOAD_SIGN_IN,
  LOAD_SIGN_IN_SUCCESS,
  LOAD_SIGN_IN_ERROR,
  REMEMBER_ME_CHECKED,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  DO_SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  LOAD_FLIGHT_STATUS,
  LOAD_FLIGHT_STATUS_SUCCESS,
  LOAD_FLIGHT_STATUS_ERROR,
  RESET_FLIGHT_STATUS_DATA,
  ROUTE_LOADED,
  TIMEOUT_SET_MODAL,
  LOAD_FLIGHT_CHECKIN,
  LOAD_FLIGHT_CHECKIN_SUCCESS,
  LOAD_FLIGHT_CHECKIN_ERROR,
  LOAD_FLIGHT_CHECKIN_RESET,
  LOAD_MY_TRIPS,
  LOAD_MY_TRIPS_SUCCESS,
  LOAD_MY_TRIPS_ERROR,
  LOAD_MY_TRIPS_RESET,
} from './constants';

export function routeLoaded(name) {
  return {
    type: ROUTE_LOADED,
    name,
  };
}

export function showHideTimeoutModal(action) {
  return {
    type: TIMEOUT_SET_MODAL,
    action,
  };
}

export function loadToken() {
  return {
    type: TOKEN_ANON,
  };
}

export function tokenLoaded(token) {
  return {
    type: TOKEN_ANON_SUCCESS,
    token,
  };
}

export function tokenLoadingError(error) {
  return {
    type: TOKEN_ANON_ERROR,
    error,
  };
}

export function refreshToken() {
  return {
    type: TOKEN_REFRESH,
  };
}

export function tokenRefreshed(token) {
  return {
    type: TOKEN_REFRESH_SUCCESS,
    token,
  };
}

export function tokenRefreshError(error) {
  return {
    type: TOKEN_REFRESH_ERROR,
    error,
  };
}

export function loadSignIn(mpUsername, password, persist = false, encrypted = false) {
  return {
    type: LOAD_SIGN_IN,
    mpUsername,
    password,
    encrypted,
    persist,
  };
}

export function signInLoaded(profile, mpUsername, mpUsernameCrypto, persist, token) {
  return {
    type: LOAD_SIGN_IN_SUCCESS,
    profile,
    mpUsername,
    mpUsernameCrypto,
    persist,
    token,
  };
}

export function signInLoadingError(error) {
  return {
    type: LOAD_SIGN_IN_ERROR,
    error,
  };
}

export function doSignOut(token) {
  return {
    type: DO_SIGN_OUT,
    token,
  };
}

export function signOutLoaded(token) {
  return {
    type: SIGN_OUT_SUCCESS,
    token,
  };
}

export function signOutLoadingError(error) {
  return {
    type: SIGN_OUT_ERROR,
    error,
  };
}

export function loadProfile(retry = false) {
  return {
    type: LOAD_PROFILE,
    retry,
  };
}

export function profileLoaded(profile, mpUsername, mpUsernameCrypto) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    profile,
    mpUsername,
    mpUsernameCrypto,
  };
}

export function profileLoadingError(error) {
  return {
    type: LOAD_PROFILE_ERROR,
    error,
  };
}

export function loadFlightStatus(origin, destination, flightNumber, statusDate, retry = false) {
  return {
    type: LOAD_FLIGHT_STATUS,
    origin,
    destination,
    flightNumber,
    statusDate,
    retry,
  };
}

export function flightStatusLoaded(flightInfo) {
  return {
    type: LOAD_FLIGHT_STATUS_SUCCESS,
    flightInfo,
  };
}

export function onResetFlightStatusData() {
  return {
    type: RESET_FLIGHT_STATUS_DATA,
  };
}

export function flightStatusLoadingError(error) {
  return {
    type: LOAD_FLIGHT_STATUS_ERROR,
    error,
  };
}

export function loadFlightCheckin(retry = false) {
  return {
    type: LOAD_FLIGHT_CHECKIN,
    retry,
  };
}

export function flightCheckinLoaded(checkinInfo) {
  return {
    type: LOAD_FLIGHT_CHECKIN_SUCCESS,
    checkinInfo,
  };
}

export function flightCheckinLoadingError(error) {
  return {
    type: LOAD_FLIGHT_CHECKIN_ERROR,
    error,
  };
}

export function onResetFlightCheckinData() {
  return {
    type: LOAD_FLIGHT_CHECKIN_RESET,
  };
}

export function onSignInRememberMeChecked(isChecked) {
  return {
    type: REMEMBER_ME_CHECKED,
    isChecked,
  };
}

export function loadMyTrips(retry = false) {
  return {
    type: LOAD_MY_TRIPS,
    retry,
  };
}

export function myTripsLoaded(myTripsInfo) {
  return {
    type: LOAD_MY_TRIPS_SUCCESS,
    myTripsInfo,
  };
}

export function myTripsLoadingError(error) {
  return {
    type: LOAD_MY_TRIPS_ERROR,
    error,
  };
}

export function onResetMyTripsData() {
  return {
    type: LOAD_MY_TRIPS_RESET,
  };
}
