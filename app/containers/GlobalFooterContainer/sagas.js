import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  API_HEADER_FOOTER_REQUEST_URL,
} from 'containers/App/constants';

import serializeError from 'utils/serializeError';
import request from 'utils/request';

import { makeSelectToken } from 'containers/App/selectors';
import { getHeaders, handleApiErrors, getToken } from 'containers/HomePage/sagas';

import {
  makeSelectFooterRetryCount,
} from './selectors';

import {
  LOAD_FOOTER_DATA,
} from './constants';

import {
  loadFooter,
  footerLoaded,
  footerLoadingError,
} from './actions';

const TIMEOUT = 20000;

export function* getFooterData() {
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    const response = yield call(request, API_HEADER_FOOTER_REQUEST_URL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(footerLoaded(response.data.headerFooter));
  } catch (error) {
    yield call(handleApiErrors, serializeError(error), () => loadFooter(true), makeSelectFooterRetryCount);
    yield put(footerLoadingError(serializeError(error)));
  }
}

export function* footerData() {
  const watcher = yield takeLatest(LOAD_FOOTER_DATA, getFooterData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  footerData,
];
