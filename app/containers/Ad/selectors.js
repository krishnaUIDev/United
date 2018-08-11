import { createSelector } from 'reselect';
const selectRoot = (state) => state.get('ads');

export const makeSelectAdsRetryCount = () => createSelector(
  selectRoot,
  (state) => state.get('retryCount')
);

export const makeSelectAdData = () => createSelector(
  selectRoot,
  (state) => state.get('data')
);

export const makeSelectAdLoading = () => createSelector(
  selectRoot,
  (state) => state.get('loading')
);

export const makeSelectAdLoaded = () => createSelector(
  selectRoot,
  (state) => state.get('loaded')
);

export const makeSelectAdError = () => createSelector(
  selectRoot,
  (state) => state.get('error')
);
