import { createSelector } from 'reselect';

export const selectHeaderFooter = (state) => state.get('headerFooter');

export const makeSelectHeaderData = () => createSelector(
  selectHeaderFooter,
  (headerFooterState) => headerFooterState.get('headerData')
);
