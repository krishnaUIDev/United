import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import serializeError from 'utils/serializeError';

import {
  LOAD_CAROUSEL_SLIDES,
  CAROUSEL_AUTO_START,
  CAROUSEL_AUTO_PAUSE,
} from '../constants';

import {
  carouselSlidesLoaded,
  carouselLoadingError,
} from '../actions';

import {
  getCarouselSlides,
  carouselSlidesData,
  carouselAutoAdvance,
  manageCarouselAutomation,
} from '../sagas';


import multiple from './samples/multiple.json';

describe('getCarouselSlides Saga', () => {
  let getCarouselSlidesGenerator;
  beforeEach(() => {
    getCarouselSlidesGenerator = getCarouselSlides();

    const selectDescriptor = getCarouselSlidesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getCarouselSlidesGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getCarouselSlidesGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the carouselSlidesLoaded action if it requests the data successfully', () => {
    const response = multiple; // Sample api response with multiple results
    const putDescriptor = getCarouselSlidesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(carouselSlidesLoaded(response.data.heroCarousel)));
  });

  it('should call the carouselLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);

    const putDescriptor = getCarouselSlidesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(carouselLoadingError(serializeError(response))));
  });
});

describe('carouselSlidesData Saga', () => {
  const carouselSlidesDataSaga = carouselSlidesData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_CAROUSEL_SLIDES action', () => {
    const takeLatestDescriptor = carouselSlidesDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_CAROUSEL_SLIDES, getCarouselSlides));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = carouselSlidesDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = carouselSlidesDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('carouselAutoAdvance Saga', () => {
  const carouselAutoAdvanceSaga = carouselAutoAdvance();
  const mockedTask = createMockTask();

  it('should start task to watch for CAROUSEL_AUTO_START and CAROUSEL_AUTO_PAUSE action', () => {
    const takeLatestDescriptor = carouselAutoAdvanceSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest([CAROUSEL_AUTO_START, CAROUSEL_AUTO_PAUSE], manageCarouselAutomation));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = carouselAutoAdvanceSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = carouselAutoAdvanceSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
