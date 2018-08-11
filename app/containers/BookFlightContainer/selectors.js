import { createSelector } from 'reselect';

const selectBook = (state) => state.get('booking');

const makeSelectCorporateBookChecked = () => createSelector(
  selectBook,
  (bookState) => bookState.get('corporateBookChecked'),
);

const makeSelectNonstopChecked = () => createSelector(
  selectBook,
  (bookState) => bookState.get('nonstopChecked'),
);

const makeSelectFlexibleDatesChecked = () => createSelector(
  selectBook,
  (bookState) => bookState.get('flexibleDatesChecked'),
);

const makeSelectFlightOrigin = () => createSelector(
  selectBook,
  (bookState) => bookState.get('flightOrigin'),
);

const makeSelectFlightDestination = () => createSelector(
  selectBook,
  (bookState) => bookState.get('flightDestination'),
);

const makeSelectRoundtripChecked = () => createSelector(
  selectBook,
  (bookState) => bookState.get('roundtripChecked'),
);


const makeSelectPassengersToBook = () => createSelector(
  selectBook,
  (bookState) => bookState.get('passengersToBook'),
);

const makeSelectDisableBtns = () => createSelector(
  selectBook,
  (bookState) => bookState.get('disableTravelerButtons'),
);

const makeSelectShowTravelerMenu = () => createSelector(
  selectBook,
  (bookState) => bookState.get('showTravelerMenu'),
);

export {
  selectBook,
  makeSelectCorporateBookChecked,
  makeSelectNonstopChecked,
  makeSelectFlexibleDatesChecked,
  makeSelectFlightOrigin,
  makeSelectFlightDestination,
  makeSelectRoundtripChecked,
  makeSelectPassengersToBook,
  makeSelectDisableBtns,
  makeSelectShowTravelerMenu,
};
