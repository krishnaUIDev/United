import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import serializeError from 'utils/serializeError';
import { TIMEOUT_TOKEN } from 'containers/TimeoutModal/constants';

import {
  API_TOKEN_REQUEST_URL,
  TOKEN_ANON,
  TOKEN_ANON_SUCCESS,
  TOKEN_ANON_ERROR,
  TOKEN_REFRESH,
  TOKEN_REFRESH_ERROR,
  TOKEN_REFRESH_SUCCESS,
  API_TOKEN_REFRESH_URL,
  API_PROFILE_REQUEST_URL,
} from 'containers/App/constants';

import {
  API_COUNTRYLIST_REQUEST_URL,
} from 'containers/MyAccount/App/constants';

import {
  loadToken,
  tokenLoaded,
  tokenLoadingError,
  refreshToken,
  tokenRefreshed,
  tokenRefreshError,
  profileLoadingError,
  doSignOut,
  showHideTimeoutModal,
} from 'containers/App/actions';


import { makeSelectToken } from 'containers/App/selectors';

import {
  countryListLoaded,
} from './actions';

import {
aboutMeDataLoaded,
nationalitySelected,
countryOfResidenceSelected,
} from '../AboutMeFormContainer/actions';


import {
  LOAD_MILEAGEPLUS_PROFILE,
  LOAD_COUNTRY_LIST,
} from './constants';

const NUM_RETRIES = 2;
const TIMEOUT = 20000;

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

function getTimestamp(offsetSeconds = 0) {
  return Date.now() + (offsetSeconds * 1000);
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
  }
}


export function* getMileagePlusProfile() {
  const requestURL = `${API_PROFILE_REQUEST_URL}`;
  // const requestURL2 = `${API_ACTIVITIES_REQUEST_URL}`;
  // const requestURL3 = `${API_STATEMENTS_REQUEST_URL}`;
  // const requestURL = '/test/long';
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    // Call our request helper (see 'utils/request')
    // const response2 = yield call(request, requestURL2, { timeout: TIMEOUT, headers: getHeaders(token) });
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    // yield put(profileLoaded(response.data.profile, response.data.profile.Travelers[0].MileagePlusId));
    // yield put(mileagePlusProfileLoaded(response.data.profile));
    let aboutMe = {};
    if (response.data.profile.Travelers[0] != null) {
      aboutMe = {
        name: response.data.profile.Travelers[0].CustomerName,
        dateOfBirth: response.data.profile.Travelers[0].BirthDate,
        gender: response.data.profile.Travelers[0].GenderCode,
      };
    }
    yield put(aboutMeDataLoaded(aboutMe));
    yield put(nationalitySelected(response.data.profile.Travelers[0].Nationality));
    yield put(countryOfResidenceSelected(response.data.profile.Travelers[0].CountryOfResidence));
  } catch (error) {
    // console.dir(error);
    // yield call(handleApiErrors, serializeError(error), () => loadProfile(true), makeSelectUserProfileRetryCount);
    // yield put(profileLoadingError());
  }
}

export function* mileagePlusProfileData() {
  // Watches for LOAD_MILEAGEPLUS_PROFILE actions and calls getMileagePlusProfile when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_MILEAGEPLUS_PROFILE, getMileagePlusProfile);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getCountryList() {
  const requestURL = `${API_COUNTRYLIST_REQUEST_URL}`;
  // const requestURL = '/test/long';
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(countryListLoaded(response));
  } catch (error) {
    // console.dir(error);
    // yield call(handleApiErrors, serializeError(error), () => loadProfile(true), makeSelectUserProfileRetryCount);
    yield put(profileLoadingError());
  }
}

export function* countryListData() {
  // Watches for LOAD_COUNTRY_LIST actions and calls getPnrs when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_COUNTRY_LIST, getCountryList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  countryListData,
  mileagePlusProfileData,
];
