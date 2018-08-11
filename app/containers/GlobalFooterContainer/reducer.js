import { fromJS } from 'immutable';

import {
  LOAD_FOOTER_DATA,
  LOAD_FOOTER_DATA_SUCCESS,
  LOAD_FOOTER_DATA_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  retryCount: 0,
  footerData: null,
  siteLinkData: null,
  socialData: null,
});

function headerFooterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FOOTER_DATA:
      return state
        .set('error', false)
        .set('loading', true)
        .update('retryCount', (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_FOOTER_DATA_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('retryCount', 0)
        .set('headerData', action.data.headerNav)
        .set('footerData', action.data.footerNav)
        .set('siteLinkData', action.data.footerColumn)
        .set('socialData', action.data.socialLinks);
    case LOAD_FOOTER_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('retryCount', 0);
    default:
      return state;
  }
}

export default headerFooterReducer;
