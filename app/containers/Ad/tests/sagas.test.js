import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import serializeError from 'utils/serializeError';

import {
  LOAD_ADS,
} from '../constants';

import {
  adsLoaded,
  adsLoadingError,
} from '../actions';

import {
  requestAds,
  adsDataDaemon,
} from '../sagas';


import response from './samples/response.json';

describe('requestAds Saga', () => {
  let requestAdsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    requestAdsGenerator = requestAds();

    const callDescriptor = requestAdsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();

    const selectDescriptor = requestAdsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const secondCallDescriptor = requestAdsGenerator.next().value;
    expect(secondCallDescriptor).toMatchSnapshot();
  });

  it('should dispatch the adsLoaded action if it requests the data successfully', () => {
    const putDescriptor = requestAdsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(adsLoaded(response.data.ads)));
  });

  it('should call the adsLoadingError action if the response errors', () => {
    const error = ({
      response: {
        status: 401,
      },
    });
    const errorObj = new Error(error);
    requestAdsGenerator.throw(errorObj);
    const putDescriptor = requestAdsGenerator.next().value;
    expect(putDescriptor).toEqual(put(adsLoadingError(serializeError(errorObj))));
  });
});

describe('adsDataDaemon Saga', () => {
  const adsDataDaemonSaga = adsDataDaemon();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_ADS action', () => {
    const takeLatestDescriptor = adsDataDaemonSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ADS, requestAds));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = adsDataDaemonSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = adsDataDaemonSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
