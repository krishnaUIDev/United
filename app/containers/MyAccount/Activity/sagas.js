import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import serializeError from 'utils/serializeError';
import { TIMEOUT_TOKEN, TIMEOUT_INACTIVE } from 'containers/TimeoutModal/constants';

import {
  ROUTE_LOADED,
  API_BASE_URL,
  API_TOKEN_REQUEST,
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
  API_FLIGHT_TRIPS_REQUEST_URL,
  TIMEOUT_SET_MODAL,
  API_CAROUSEL_REQUEST_URL,
} from 'containers/App/constants';

import {
  API_ACTIVITIES_REQUEST_URL,
  API_STATEMENTS_REQUEST_URL,
} from 'containers/MyAccount/App/constants';

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
} from 'containers/App/actions';


import {
  makeSelectToken,
  makeSelectHydrated,
} from 'containers/App/selectors';

import {
  makeSelectActivityListDateRange,
  makeSelectActivityListViewCount,
  makeSelectActivityExpandAll,
} from './selectors';

import {
  activityListExported,
  activityListExportFailed,
  activityListLoaded,
  activityStatementListLoaded,
  showingFullActivityList,
} from './actions';


import {
  API_EXPORT_ACTIVITIES_REQUEST_URL,
  EXPORT_ACTIVITIES_LIST,
  LOAD_ACTIVITIES_LIST,
  LOAD_ACTIVITY_STATEMENTS_LIST,
  LOAD_UPGRADE_ACTIVITY,
  LOAD_UPGRADE_ACTIVITY_LIST,
} from './constants';


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

function jsonToCSV() {
  var objectToCSVRow = function(dataObject) {
    var dataArray = new Array;
    for (var o in dataObject) {
      var innerValue = dataObject[o] === null ? '' : dataObject[o].toString();
      var result = innerValue.replace(/"/g, '""');
      result = '"' + result + '"';
      dataArray.push(result);
    }
    return dataArray.join(' ') + '\r\n';
  };
}

const labels = [
  'TransactionDate',
  'ActivityType',
  'Description',
  'PQM',
  'PQS',
  'PQD',
  'AwardMiles',
];

const labelHeaders = {
  TransactionDate: 'Transaction Date',
  ActivityType: 'Activity Type',
  Description: 'Description',
  PQM: 'PQM',
  PQS: 'PQS',
  PQD: 'PQD',
  AwardMiles: 'Award Miles',
}

const ActivityCodeToType = {
  F: 'Airline',
  O: 'Non-Air',
  // V: 'temp',
  A: 'Economy Plus',
  R: 'Award',
};


function objectToCSVRow(dataObject, sepValues = ',', sepLines = '\r\n') {
  var dataArray = new Array;
  for (var o of labels) {
    var innerValue = dataObject[o] === null ? '' : dataObject[o].toString();
    var result = innerValue.replace(/"/g, '""');
    result = '"' + result + '"';
    dataArray.push(result);
  }
  return dataArray.join(sepValues) + sepLines;
}

function exportToCSV(arrayOfObjects) {
  if (!arrayOfObjects.length) {
      return;
  }

  var csvContent = 'data:text/csv;charset=utf-8,';

  // headers
  csvContent += objectToCSVRow(labelHeaders);

  arrayOfObjects.forEach(function(item){
      csvContent += objectToCSVRow(item);
  }); 

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'export.csv');
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
}

function getActivityRecords(activities) {
  const records = activities.map(a => {
    const descriptors = [
      a.Description,
      a.FlightNumber,
      a.OriginCode,
      a.DestinationCode ? `- ${a.DestinationCode}` : '',
    ];
    const Description = descriptors.filter(d => d).join(' ');

    const record = {
      ActivityType: ActivityCodeToType[a.ActivityType] || a.ActivityType || '-',
      TransactionDate: a.TransactionDate,
      Description,
      PQM: a.PQM,
      PQS: a.PQS,
      PQD: a.PQD,
      AwardMiles: (a.BaseMiles + a.BonusMiles) || '-',
    };

    return record;
  });
  return records;
}

export function* getActivityListExport() {
  const requestURL = `${API_EXPORT_ACTIVITIES_REQUEST_URL}`;
  yield call(getToken);
  const token = yield select(makeSelectToken());
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    const records = getActivityRecords(response.data.activities);
    exportToCSV(records);
    yield put(activityListExported());
  } catch (error) {
    yield put(activityListExportFailed());
  }
}

export function* exportActivityListData() {
  // Watches for LOAD_ACTIVITIES_LIST actions and calls getMileagePlusProfile when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(EXPORT_ACTIVITIES_LIST, getActivityListExport);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* getActivityList() {
  const dateRange = yield select(makeSelectActivityListDateRange());
  const expandAll = yield select(makeSelectActivityExpandAll());
  const noofActivities = yield select(makeSelectActivityListViewCount());
  const requestURL = `${API_ACTIVITIES_REQUEST_URL}/${dateRange}/${noofActivities}`;
  yield call(getToken);
  const token = yield select(makeSelectToken());
  try {
  // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    for (var i= 0; i < response.data.activities.length; i++) {
      response.data.activities[i].showDescription = expandAll ? true : false;
    }
  // console.log(response.data.activities.length);
    if(response.data.activities.length < noofActivities)
    {
      yield put(showingFullActivityList(true));
    }
    else
    {
      yield put(showingFullActivityList(false));
    }
    yield put(activityListLoaded(response.data.activities));
  } catch (error) {
  }
}


export function* activityListData() {
  // Watches for LOAD_ACTIVITIES_LIST actions and calls getMileagePlusProfile when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ACTIVITIES_LIST, getActivityList);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* getActivityStatementsList() {
  const requestURL = `${API_STATEMENTS_REQUEST_URL}`;
  yield call(getToken);
  const token = yield select(makeSelectToken());
  try {
  // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(activityStatementListLoaded(response.data.Statements));
  } catch (error) {
  }
}
export function* activityStatementsListData() {
 // Watches for LOAD_ACTIVITIES_LIST actions and calls getPnrs when one comes in.
 // By using `takeLatest` only the result of the latest API call is applied.
 // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ACTIVITY_STATEMENTS_LIST, getActivityStatementsList);
 // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* UpgradeActivityData() {
  // Watches for LOAD_ACTIVITIES_LIST actions and calls getPnrs when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_UPGRADE_ACTIVITY_LIST, LoadUpgradeActivityListSaga);
  // Suspend execution until location changes
   yield take(LOCATION_CHANGE);
   yield cancel(watcher);
 }

 export function* LoadUpgradeActivityListSaga(payload){
  const upgradeActivites=[{
    "TransactionDate":"7/24/2017",
    "Description":"Regional Premier Upgrade Redemption",
    "TotalMiles":-2
  },
  {
    "TransactionDate":"7/24/2017",
    "Description":"Regional Premier Upgrade Redemption",
    "TotalMiles":-1
  },
  {
    "TransactionDate":"7/24/2017",
    "Description":"Global Premier Upgrade Deposit",
    "TotalMiles":1
  },
  {
    "TransactionDate":"7/24/2017",
    "Description":"Regional Premier Upgrade Redemption",
    "TotalMiles":-1
  },
  {
    "TransactionDate":"7/24/2017",
    "Description":"Global Premier Upgrade Deposit",
    "TotalMiles":2
  }
  ]



    yield[put({type:LOAD_UPGRADE_ACTIVITY, upgradeActivites})];


 }
export default [
  exportActivityListData,
  activityListData,
  activityStatementsListData,
  UpgradeActivityData,
  // LoadUpgradeActivityListSaga
];
