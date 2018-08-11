import { fromJS, Map } from 'immutable';
import { initialState } from '../reducer';
import {
  makeSelectAdData,
  makeSelectAdError,
  makeSelectAdLoaded,
  makeSelectAdLoading,
} from '../selectors';

describe('makeSelectAdLoaded', () => {
  const selector = makeSelectAdLoaded();
  it('should select the data', () => {
    const state = initialState
      .set('loaded', true)
      .set('error', false);
    const mockedState = Map({ ads: state });

    expect(selector(mockedState)).toEqual(true);
  });
});

describe('makeSelectAdLoading', () => {
  const selector = makeSelectAdLoading();
  it('should select the data', () => {
    const loading = true;
    const state = initialState
      .set('loading', loading)
      .set('error', false);
    const mockedState = Map({ ads: state });

    expect(selector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectAdData', () => {
  const selector = makeSelectAdData();
  it('should select the data', () => {
    const state = initialState
      .set('loading', false)
      .set('error', false)
      .set('data', ['a']);
    const mockedState = Map({ ads: state });

    expect(selector(mockedState)).toEqual(['a']);
  });
});

describe('makeSelectAdError', () => {
  const selector = makeSelectAdError();
  it('should select the data', () => {
    const error = fromJS({ some: 'error' });
    const state = initialState
      .set('error', fromJS({ some: 'error' }));

    const mockedState = Map({ ads: state });

    expect(selector(mockedState)).toEqual(error);
  });
});

