/*
 * BookFlightForm Messages
 *
 * This contains all the text for the BookFlightForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  fromAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.fromAriaLabel',
    defaultMessage: 'Enter your departing city, airport name, or airport code.',
  },
  fromLabelTxt: {
    id: 'unitedapp.components.BookFlightForm.fromLabelTxt',
    defaultMessage: 'From*',
  },
  fromError: {
    id: 'unitedapp.components.BookFlightForm.fromError',
    defaultMessage: 'Please enter a valid origin.',
  },
  formClosePanelAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.formClosePanelAriaLabel',
    defaultMessage: 'Close airport suggestion panel.',
  },
  formThreeCharAutocomplete: {
    id: 'unitedapp.components.BookFlightForm.formThreeCharAutocomplete',
    defaultMessage: 'Flight origin location suggestion panel opened. Suggestions are available, use the up and down arrow keys to navigate them.',
  },
  toAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.toAriaLabel',
    defaultMessage: 'Enter your destination city, airport name, or airport code.',
  },
  toLabel: {
    id: 'unitedapp.components.BookFlightForm.toLabel',
    defaultMessage: 'To*',
  },
  toError: {
    id: 'unitedapp.components.BookFlightForm.toError',
    defaultMessage: 'Please enter a valid destination.',
  },
  formToThreeCharAutocomplete: {
    id: 'unitedapp.components.BookFlightForm.formToThreeCharAutocomplete',
    defaultMessage: 'Flight destination location suggestion panel opened. Suggestions are available, use the up and down arrow keys to navigate them.',
  },
  passengersAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.passengersAriaLabel',
    defaultMessage: 'Select number of travelers.',
  },
  passengersPlaceholder: {
    id: 'unitedapp.components.BookFlightForm.passengersPlaceholder',
    defaultMessage: 'Passengers',
  },
  travelersLabel: {
    id: 'unitedapp.components.BookFlightForm.travelersLabel',
    defaultMessage: 'Travelers',
  },
  passengersError: {
    id: 'unitedapp.components.BookFlightForm.passengersError',
    defaultMessage: 'Required.',
  },
  roundtrip: {
    id: 'unitedapp.components.BookFlightForm.roundtrip',
    defaultMessage: 'Roundtrip',
  },
  roundtripAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.roundtripAriaLabel',
    defaultMessage: 'Round Trip Flight search',
  },
  oneway: {
    id: 'unitedapp.components.BookFlightForm.oneway',
    defaultMessage: 'One-way',
  },
  onewayAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.onewayAriaLabel',
    defaultMessage: 'One Way Flight search',
  },
  multicity: {
    id: 'unitedapp.components.BookFlightForm.multicity',
    defaultMessage: 'Multi-city',
  },
  cabinClassAria: {
    id: 'unitedapp.components.BookFlightForm.cabinClassAria',
    defaultMessage: 'cabin class.',
  },
  economy: {
    id: 'unitedapp.components.BookFlightForm.economy',
    defaultMessage: 'Economy',
  },
  businessFirst: {
    id: 'unitedapp.components.BookFlightForm.buinessFirst',
    defaultMessage: 'Business or First',
  },
  business: {
    id: 'unitedapp.components.BookFlightForm.business',
    defaultMessage: 'Business',
  },
  first: {
    id: 'unitedapp.components.BookFlightForm.first',
    defaultMessage: 'First',
  },
  corporateBook: {
    id: 'unitedapp.components.BookFlightForm.corporateBook',
    defaultMessage: 'Corporate booking',
  },
  corporateBookAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.corporateBookAriaLabel',
    defaultMessage: 'Select this option if you are booking for corporate travel.',
  },
  nonstop: {
    id: 'unitedapp.components.BookFlightForm.nonstop',
    defaultMessage: 'Nonstop',
  },
  nonstopAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.nonstopAriaLabel',
    defaultMessage: 'Select this option if you only want to search nonstop flights.',
  },
  award: {
    id: 'unitedapp.components.BookFlightForm.award',
    defaultMessage: 'Search for award travel',
  },
  awardAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.awardAriaLabel',
    defaultMessage: 'Search for Award Travel',
  },
  findflights: {
    id: 'unitedapp.components.BookFlightForm.findflights',
    defaultMessage: 'Find flights',
  },
  findflightsAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.findflights',
    defaultMessage: 'Find flights',
  },
  allSearch: {
    id: 'unitedapp.components.BookFlightForm.allSearch',
    defaultMessage: 'All search options',
  },
  bagRules: {
    id: 'unitedapp.components.BookFlightForm.bagRules',
    defaultMessage: 'Changed bag rules',
  },
  optionalSvc: {
    id: 'unitedapp.components.BookFlightForm.optionalSvc',
    defaultMessage: 'optional services',
  },
  flexibleDates: {
    id: 'unitedapp.components.BookFlightForm.flexibleDates',
    defaultMessage: 'My dates are flexible',
  },
  datesLabel: {
    id: 'unitedapp.components.BookCalendar.datesLabel',
    defaultMessage: 'Dates*',
  },
  adultTitle: {
    id: 'unitedapp.components.BookFlightForm.adultTitle',
    defaultMessage: 'Adults',
  },
  seniorsTitle: {
    id: 'unitedapp.components.BookFlightForm.seniorsTitle',
    defaultMessage: 'Seniors',
  },
  infantsTitle: {
    id: 'unitedapp.components.BookFlightForm.infantsTitle',
    defaultMessage: 'Infants',
  },
  lapInfantsTitle: {
    id: 'unitedapp.components.BookFlightForm.lapInfantsTitle',
    defaultMessage: 'Infants on lap',
  },
  childrenTitle: {
    id: 'unitedapp.components.BookFlightForm.childrenTitle',
    defaultMessage: 'Children',
  },
  adultRange: {
    id: 'unitedapp.components.BookFlightForm.adultRange',
    defaultMessage: '(18-64)',
  },
  seniorRange: {
    id: 'unitedapp.components.BookFlightForm.seniorRange',
    defaultMessage: '(65+)',
  },
  infantRange: {
    id: 'unitedapp.components.BookFlightForm.infantRange',
    defaultMessage: '(under 2)',
  },
  childrenRangeA: {
    id: 'unitedapp.components.BookFlightForm.childrenRangeA',
    defaultMessage: '(15-17)',
  },
  childrenRangeB: {
    id: 'unitedapp.components.BookFlightForm.childrenRangeB',
    defaultMessage: '(12-14)',
  },
  childrenRangeC: {
    id: 'unitedapp.components.BookFlightForm.childrenRangeC',
    defaultMessage: '(5-11)',
  },
  childrenRangeD: {
    id: 'unitedapp.components.BookFlightForm.childrenRangeD',
    defaultMessage: '(2-4)',
  },
  adultFull: {
    id: 'unitedapp.components.BookFlightForm.adultFull',
    defaultMessage: 'Adults (18-64)',
  },
  seniorFull: {
    id: 'unitedapp.components.BookFlightForm.seniorFull',
    defaultMessage: 'Seniors (65+)',
  },
  infantsFull: {
    id: 'unitedapp.components.BookFlightForm.infantsFull',
    defaultMessage: 'Infants (under 2)',
  },
  childrenFullA: {
    id: 'unitedapp.components.BookFlightForm.childrenFullA',
    defaultMessage: 'Children (15-17)',
  },
  childrenFullB: {
    id: 'unitedapp.components.BookFlightForm.childrenFullB',
    defaultMessage: 'Children (12-14)',
  },
  childrenFullC: {
    id: 'unitedapp.components.BookFlightForm.childrenFullC',
    defaultMessage: 'Children (5-11)',
  },
  childrenFullD: {
    id: 'unitedapp.components.BookFlightForm.childrenFullD',
    defaultMessage: 'Children (2-4)',
  },
  departDateAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.departDateAriaLabel',
    defaultMessage: 'Please select your departure date from the calendar.',
  },
  returnDateAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.returnDateAriaLabel',
    defaultMessage: 'Please select your return date from the calendar.',
  },
  departDateSelectedAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.departDateSelectedAriaLabel',
    defaultMessage: 'Departure Date',
  },
  returnDateSelectedAriaLabel: {
    id: 'unitedapp.components.BookFlightForm.returnDateSelectedAriaLabel',
    defaultMessage: 'Return Date',
  },
  datesAriaLabelOneWay: {
    id: 'unitedapp.components.BookFlightForm.datesAriaLabelOneWay',
    defaultMessage: 'Please select your departure date from the calendar.',
  },
  datesDeparture: {
    id: 'unitedapp.components.BookFlightForm.datesDeparture',
    defaultMessage: 'Departure',
  },
  datesReturn: {
    id: 'unitedapp.components.BookFlightForm.datesReturn',
    defaultMessage: 'Return',
  },
  datesPlaceholder: {
    id: 'unitedapp.components.BookFlightForm.datesPlaceholder',
    defaultMessage: 'Travel dates',
  },
  datesError: {
    id: 'unitedapp.components.BookFlightForm.datesError',
    defaultMessage: 'Please enter a valid',
  },
  datesEndError: {
    id: 'unitedapp.components.BookFlightForm.datesEndError',
    defaultMessage: 'Please enter a valid return date.',
  },
  datesStartError: {
    id: 'unitedapp.components.BookFlightForm.datesStartError',
    defaultMessage: 'Please enter a valid departure date.',
  },
  datesSubmitError: {
    id: 'unitedapp.components.BookFlightForm.datesSubmitError',
    defaultMessage: 'Please enter a valid departure and return date.',
  },
  datesClose: {
    id: 'unitedapp.components.BookFlightForm.datesClose',
    defaultMessage: 'Close this window.',
  },
  datesInfoPanel: {
    id: 'unitedapp.components.BookFlightForm.datesInfoPanel',
    defaultMessage: 'You’re on a date field. Either type in the date you want in the format month/day/year or press the down arrow key to interact with the calendar. Use the arrow keys to navigate between days and weeks. Use page up, page down to move between months and years. Press enter to select the date, and escape to close the calendar and return to the input field.',
  },
});
