import { createSelector } from 'reselect';


const selectMileagePlusProfile = (state) => state.get('mileagePlus');
const selectAboutMe = (state) => state.get('aboutMe');


const makeSelectMileagePlusProfileData = () => createSelector(
  selectMileagePlusProfile,
  (mileagePlusProfileState) => mileagePlusProfileState.getIn(['mileagePlusProfile', 'data'])
);
const makeSelectCountryListData = () => createSelector(
  selectMileagePlusProfile,
  (countryListState) => countryListState.getIn(['countryList', 'data'])
);

export {
  makeSelectMileagePlusProfileData,
  makeSelectCountryListData,
};

