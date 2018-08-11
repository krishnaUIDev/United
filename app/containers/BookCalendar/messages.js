/*
 * BookCalendar Messages
 *
 * This contains all the text for the BookFlightForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  datesAriaLabel: {
    id: 'unitedapp.components.BookCalendar.datesAriaLabel',
    defaultMessage: 'Please select your departure and return dates from the calendar.',
  },
  datesAriaLabelOneWay: {
    id: 'unitedapp.components.BookCalendar.datesAriaLabelOneWay',
    defaultMessage: 'Please select your departure date from the calendar.',
  },
  datesDeparture: {
    id: 'unitedapp.components.BookCalendar.datesDeparture',
    defaultMessage: 'Departure',
  },
  datesReturn: {
    id: 'unitedapp.components.BookCalendar.datesReturn',
    defaultMessage: 'Return',
  },
  datesPlaceholder: {
    id: 'unitedapp.components.BookCalendar.datesPlaceholder',
    defaultMessage: 'Travel dates',
  },
  datesError: {
    id: 'unitedapp.components.BookCalendar.datesError',
    defaultMessage: 'Please enter a valid date.',
  },
  datesClose: {
    id: 'unitedapp.components.BookCalendar.datesClose',
    defaultMessage: 'Close this window.',
  },
  datesInfoPanel: {
    id: 'unitedapp.components.BookCalendar.datesInfoPanel',
    defaultMessage: 'You’re on a date field. Either type in the date you want in the format month/day/year or press the down arrow key to interact with the calendar. Use the arrow keys to navigate between days and weeks. Use page up, page down to move between months and years. Press enter to select the date, and escape to close the calendar and return to the input field.',
  },
});
