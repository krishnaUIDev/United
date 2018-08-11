import { createSelector } from 'reselect';

const selectAboutMe = (state) => state.get('aboutMe');

const makeSelectAboutMeData = () => createSelector(
  selectAboutMe,
  (aboutMeState) => aboutMeState.get('aboutMe')
);

const makeSelectNationality = () => createSelector(
  selectAboutMe,
  (aboutMeState) => aboutMeState.get('nationality')
);

const makeSelectCountryOfResidence = () => createSelector(
  selectAboutMe,
  (aboutMeState) => aboutMeState.get('countryOfResidence')
);

export {
  makeSelectAboutMeData,
  makeSelectNationality,
  makeSelectCountryOfResidence,
};
