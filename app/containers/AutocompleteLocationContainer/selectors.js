import { createSelector } from 'reselect';

const selectAutocomplete = (state) => state.get('autocompleteLocation');

const makeSelectHideAutocompleteLocation = () => createSelector(
  selectAutocomplete,
  (autoState) => autoState.get('hideAutocompleteLocation'),
);

const makeSelectMobileView = () => createSelector(
  selectAutocomplete,
  (autoState) => autoState.get('mobileView'),
);

const makeSelectAutoAriaLabel = () => createSelector(
  selectAutocomplete,
  (autoState) => autoState.get('autolocationAriaLabel'),
);


export {
  selectAutocomplete,
  makeSelectHideAutocompleteLocation,
  makeSelectMobileView,
  makeSelectAutoAriaLabel,
};
