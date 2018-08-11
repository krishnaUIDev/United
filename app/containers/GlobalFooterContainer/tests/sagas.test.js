import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import serializeError from 'utils/serializeError';

import {
  LOAD_FOOTER_DATA,
} from '../constants';

import {
  footerLoaded,
  footerLoadingError,
} from '../actions';

import {
  getFooterData,
  footerData,
} from '../sagas';

import sample from '../samples/sample.json';

describe('getFooterData Saga', () => {
  let getFooterDataGenerator;
  beforeEach(() => {
    getFooterDataGenerator = getFooterData();

    const selectDescriptor = getFooterDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor2 = getFooterDataGenerator.next().value;
    expect(callDescriptor2).toMatchSnapshot();
    const callDescriptor3 = getFooterDataGenerator.next({ hash: '1234abc', expiresAt: '2020-11-02T15:43:42.0000000Z' }).value;
    expect(callDescriptor3).toMatchSnapshot();
  });

  it('should dispatch the footerLoaded action if it requests the data successfully', () => {
    const response = sample; // Sample api response with multiple results
    const putDescriptor = getFooterDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(footerLoaded(response.data.headerFooter)));
  });

  it('should call the footerLoadingError action if the response errors with status 403', () => {
    const error = ({
      response: {
        status: 403,
      },
    });
    const response = new Error(error);
    getFooterDataGenerator.throw(response);
    const putDescriptor = getFooterDataGenerator.next().value;
    expect(putDescriptor).toEqual(put(footerLoadingError(serializeError(response))));
  });
});

describe('carouselSlidesData Saga', () => {
  const footerDataSaga = footerData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_FOOTER_DATA action', () => {
    const takeLatestDescriptor = footerDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_FOOTER_DATA, getFooterData));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = footerDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = footerDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
