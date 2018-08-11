import headerFooterReducer, { initialState } from '../reducer';
import {
  loadFooter,
  footerLoaded,
  footerLoadingError,
} from '../actions';

import sample from '../samples/sample.json';

describe('headerFooterReducer', () => {
  it('should handle loadFooter action correctly (no retry)', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', true)
      .set('retryCount', 0);
    expect(headerFooterReducer(initialState, loadFooter(false))).toEqual(expectedResult);
  });

  it('should handle loadFooter action correctly (with retry)', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', true)
      .set('retryCount', 1);
    expect(headerFooterReducer(initialState, loadFooter(true))).toEqual(expectedResult);
  });

  it('should handle footerLoaded action correctly', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', false)
      .set('headerData', sample.data.headerFooter.headerNav)
      .set('footerData', sample.data.headerFooter.footerNav)
      .set('siteLinkData', sample.data.headerFooter.footerColumn)
      .set('socialData', sample.data.headerFooter.socialLinks)
      .set('retryCount', 0);
    expect(headerFooterReducer(initialState, footerLoaded(sample.data.headerFooter))).toEqual(expectedResult);
  });

  it('should handle footerLoadingError action correctly', () => {
    const error = { error: 'error message' };
    const expectedResult = initialState
      .set('error', error)
      .set('loading', false)
      .set('retryCount', 0);
    expect(headerFooterReducer(initialState, footerLoadingError(error))).toEqual(expectedResult);
  });
});
