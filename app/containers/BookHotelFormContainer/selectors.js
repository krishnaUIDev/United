import { createSelector } from 'reselect';

const selectBookHotel = (state) => state.get('bookHotel');
const selectCalendar = (state) => state.get('calendar');

const makeSelectHotelToBook = () => createSelector(
  selectBookHotel,
  (bookHotelState) => bookHotelState.get('passengersToBook'),
);

const makeSelectDisableBtnsHotel = () => createSelector(
  selectBookHotel,
  (bookHotelState) => bookHotelState.get('disableTravelerButtons'),
);

const makeSelectShowHotelMenu = () => createSelector(
  selectBookHotel,
  (bookHotelState) => bookHotelState.get('showTravelerMenu'),
);

const makeSelectHotelCheckinDate = () => createSelector(
  selectBookHotel,
  (bookHotelState) => bookHotelState.get('checkinDate')
);

const makeSelectHotelCheckoutDate = () => createSelector(
  selectBookHotel,
  (bookHotelState) => bookHotelState.get('checkoutDate')
);

const makeSelectHasCalendarErrors = () => createSelector(
  selectCalendar,
  (calendarState) => calendarState.get('hotelErrors'),
);

export {
  selectBookHotel,
  makeSelectHotelToBook,
  makeSelectDisableBtnsHotel,
  makeSelectShowHotelMenu,
  makeSelectHotelCheckinDate,
  makeSelectHotelCheckoutDate,
  makeSelectHasCalendarErrors,
};
