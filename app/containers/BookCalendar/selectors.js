import { createSelector } from 'reselect';

const selectCalendar = (state) => state.get('calendar');

const makeSelectHasFlightCalendarErrors = () => createSelector(
  selectCalendar,
  (calendarState) => calendarState.get('flightErrors'),
);

const makeSelectHasHotelCalendarErrors = () => createSelector(
  selectCalendar,
  (calendarState) => calendarState.get('hotelErrors'),
);

const makeSelectHasCarCalendarErrors = () => createSelector(
  selectCalendar,
  (calendarState) => calendarState.get('carErrors'),
);

export {
  selectCalendar,
  makeSelectHasFlightCalendarErrors,
  makeSelectHasHotelCalendarErrors,
  makeSelectHasCarCalendarErrors,
};
