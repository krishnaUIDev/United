import { fromJS } from 'immutable';
import {
  makeSelectFooterLoading,
  makeSelectFooterError,
  makeSelectFooterData,
  makeSelectSiteLinkData,
  makeSelectSocialData,
} from '../selectors';

describe('makeSelectFooterLoading', () => {
  const selector = makeSelectFooterLoading();
  it('should select the data', () => {
    const loading = false;
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: false,
        retryCount: 0,
        footerData: null,
        siteLinkData: null,
        socialData: null,
      },
    });
    expect(selector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectFooterData', () => {
  const selector = makeSelectFooterData();
  it('should select the data', () => {
    const slides = fromJS([]);
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: false,
        retryCount: 0,
        footerData: [],
        siteLinkData: null,
        socialData: null,
      },
    });
    expect(selector(mockedState)).toEqual(slides);
  });
});

describe('makeSelectSiteLinkData', () => {
  const selector = makeSelectSiteLinkData();
  it('should select the data', () => {
    const slides = fromJS([]);
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: false,
        retryCount: 0,
        footerData: null,
        siteLinkData: [],
        socialData: null,
      },
    });
    expect(selector(mockedState)).toEqual(slides);
  });
});

describe('makeSelectSocialData', () => {
  const selector = makeSelectSocialData();
  it('should select the data', () => {
    const slides = fromJS([]);
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: false,
        retryCount: 0,
        footerData: null,
        siteLinkData: null,
        socialData: [],
      },
    });
    expect(selector(mockedState)).toEqual(slides);
  });
});

describe('makeSelectFooterError', () => {
  const selector = makeSelectFooterError();
  it('should select set error state', () => {
    const error = fromJS({ some: 'error' });
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: { some: 'error' },
        retryCount: 0,
        footerData: null,
        siteLinkData: null,
        socialData: null,
      },
    });
    expect(selector(mockedState)).toEqual(error);
  });
});

