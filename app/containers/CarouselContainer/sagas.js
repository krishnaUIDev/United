import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  API_CAROUSEL_REQUEST_URL,
} from 'containers/App/constants';

import serializeError from 'utils/serializeError';
import request from 'utils/request';

import { makeSelectToken } from 'containers/App/selectors';
import { getHeaders, getToken } from 'containers/HomePage/sagas';

import {
  makeSelectCarouselTransitionPeriod,
} from './selectors';

import {
  LOAD_CAROUSEL_SLIDES,
  CAROUSEL_AUTO_START,
  CAROUSEL_AUTO_PAUSE,
} from './constants';

import {
  carouselSlidesLoaded,
  carouselLoadingError,
  carouselStart,
  carouselAutoNextSlide,
} from './actions';

const TIMEOUT = 5000;

export function* getCarouselSlides() {
  yield call(getToken);
  const token = yield select(makeSelectToken());

  try {
    const response = yield call(request, API_CAROUSEL_REQUEST_URL, { timeout: TIMEOUT, headers: getHeaders(token) });
    yield put(carouselSlidesLoaded(response.data.heroCarousel));
    yield put(carouselStart());
  } catch (error) {
    yield put(carouselLoadingError(serializeError(error)));
  }
}

export function* carouselSlidesData() {
  const watcher = yield takeLatest(LOAD_CAROUSEL_SLIDES, getCarouselSlides);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* manageCarouselAutomation(action) {
  if (action.type === CAROUSEL_AUTO_START) {
    const transitionPeriod = yield select(makeSelectCarouselTransitionPeriod());

    if (transitionPeriod == null || transitionPeriod <= 0) return;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      yield delay(transitionPeriod);
      yield put(carouselAutoNextSlide(true));
    }
  }
}

export function* carouselAutoAdvance() {
  const watcher = yield takeLatest([CAROUSEL_AUTO_START, CAROUSEL_AUTO_PAUSE], manageCarouselAutomation);
  // Cancel the AutoAdvancement if location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  carouselSlidesData,
  carouselAutoAdvance,
];
