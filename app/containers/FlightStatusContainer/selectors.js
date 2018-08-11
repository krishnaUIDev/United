import { createSelector } from 'reselect';

const selectStatus = (state) => state.get('status');

const makeSelectDate = () => createSelector(
  selectStatus,
  (statusState) => statusState.get('dateSelected'),
);

const makeSelectFlightStatusOrigin = () => createSelector(
  selectStatus,
  (statusState) => statusState.get('flightStatusOrigin'),
);

const makeSelectFlightStatusDestination = () => createSelector(
  selectStatus,
  (statusState) => statusState.get('flightStatusDestination'),
);

const makeSelectFlightStatusDate = () => createSelector(
  selectStatus,
  (statusState) => statusState.get('flightStatusDate'),
);

const makeSelectFlightDataSelected = () => createSelector(
  selectStatus,
  (statusState) => statusState.get('flightSelected'),
);

export {
  selectStatus,
  makeSelectDate,
  makeSelectFlightStatusOrigin,
  makeSelectFlightStatusDestination,
  makeSelectFlightStatusDate,
  makeSelectFlightDataSelected,
};
