import { createSelector } from 'reselect';

export const selectHeaderFooter = (state) => state.get('headerFooter');

export const makeSelectFooterRetryCount = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('retryCount')
);

export const makeSelectFooterLoading = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('loading')
);

export const makeSelectFooterError = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('error')
);

export const makeSelectFooterData = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('footerData')
);

export const makeSelectSiteLinkData = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('siteLinkData')
);

export const makeSelectSocialData = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('socialData')
);
