import { createSelector } from 'reselect';

const selectCar = (state) => state.get('bookCar');
const selectCarModel = (state) => state.get('bookCarModel');
const selectCalendar = (state) => state.get('calendar');

const makeSelectCarPickupDate = () => createSelector(
  selectCar,
  (carState) => carState.get('pickupDate')
);

const makeSelectCarPickupTime = () => createSelector(
  selectCar,
  (carState) => carState.get('pickupTime')
);

const makeSelectCarDropoffDate = () => createSelector(
  selectCar,
  (carState) => carState.get('dropoffDate')
);

const makeSelectCarDropoffTime = () => createSelector(
  selectCar,
  (carState) => carState.get('dropoffTime')
);

const makeSelectCarSameLocationChecked = () => createSelector(
  selectCar,
  (carState) => carState.get('sameLocationChecked')
);

const makeSelectHideAgeBoxChecked = () => createSelector(
  selectCar,
  (carState) => carState.get('hideAgeBox')
);

const makeSelectCarDriversAge = () => createSelector(
  selectCar,
  (carState) => carState.get('driversAge')
);

const makeSelectDropoffLocation = () => createSelector(
  selectCar,
  (carState) => carState.get('dropoffLocation')
);

const makeSelectPickupLocation = () => createSelector(
  selectCar,
  (carState) => carState.get('pickupLocation')
);

const makeSelectHasCalendarErrors = () => createSelector(
  selectCalendar,
  (calendarState) => calendarState.get('carErrors'),
);

export {
  selectCar,
  selectCarModel,
  makeSelectCarDriversAge,
  makeSelectCarDropoffDate,
  makeSelectCarDropoffTime,
  makeSelectCarPickupDate,
  makeSelectCarPickupTime,
  makeSelectCarSameLocationChecked,
  makeSelectHideAgeBoxChecked,
  makeSelectDropoffLocation,
  makeSelectPickupLocation,
  makeSelectHasCalendarErrors,
};
