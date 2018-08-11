import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import serializeError from 'utils/serializeError';
import request from 'utils/request';

import { makeSelectToken } from 'containers/App/selectors';
import { getHeaders, getToken, handleApiErrors } from 'containers/HomePage/sagas';

import {
  makeSelectAdsRetryCount,
} from './selectors';

import {
  LOAD_ADS,
  API_ADS_REQUEST_URL,
} from './constants';

import {
  loadAds,
  adsLoaded,
  adsLoadingError,
} from './actions';

const TIMEOUT = 20000;

export function* requestAds() {
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    const response = yield call(request, API_ADS_REQUEST_URL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(adsLoaded(response.data.ads));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadAds(true), makeSelectAdsRetryCount);
    yield put(adsLoadingError(serializeError(error)));
  }
}

export function* adsDataDaemon() {
  const watcher = yield takeLatest(LOAD_ADS, requestAds);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  adsDataDaemon,
];
