/*
 * FlightCheckinForm Messages
 *
 * This contains all the text for the FlightCheckinForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  confirmationNumberPlaceholderTxt: {
    id: 'unitedapp.components.MyTripsForm.confirmationNumberPlaceholderTxt',
    defaultMessage: 'Confirmation number*',
  },
  confirmationNumberErrorMsg: {
    id: 'unitedapp.components.MyTripsForm.confirmationNumberErrorMsg',
    defaultMessage: 'Please enter a valid confirmation number.',
  },
  lastNamePlaceholder: {
    id: 'unitedapp.components.MyTripsForm.lastNamePlaceholder',
    defaultMessage: 'Last Name*',
  },
  lastNameLabel: {
    id: 'unitedapp.components.MyTripsForm.lastNameLabel',
    defaultMessage: 'Last Name*',
  },
  lastNameErrorMsg: {
    id: 'unitedapp.components.MyTripsForm.lastNameErrorMsg',
    defaultMessage: 'Please enter a valid last name.',
  },
  submitCheckinBtn: {
    id: 'unitedapp.components.MyTripsForm.submitCheckinBtn',
    defaultMessage: 'Search',
  },
  myTravelHeader: {
    id: 'unitedapp.components.MyTripsForm.myTravelHeader',
    defaultMessage: 'My trips',
  },
  confirmationNumberFieldAriaLabel: {
    id: 'unitedapp.components.MyTripsForm.confirmationNumberFieldAriaLabel',
    defaultMessage: 'Please enter your 6 digit confirmation number',
  },
  lastNameFieldAriaLabel: {
    id: 'unitedapp.components.MyTripsForm.lastNameFieldAriaLabel',
    defaultMessage: 'Please enter the last name that matches your reservation.',
  },
  findPastFlightsLoggedOutTxt: {
    id: 'unitedapp.components.MyTripsForm.findPastFlightsLoggedOutTxt',
    defaultMessage: 'Find past or canceled flights with your MileagePlus number',
  },
  findPastFlightsLoggedIn: {
    id: 'unitedapp.components.MyTripsForm.findPastFlightsLoggedIn',
    defaultMessage: 'Find past or canceled flights',
  },
  findPastFlightsAria: {
    id: 'unitedapp.components.MyTripsForm.findPastFlightsAria',
    defaultMessage: 'Find past or canceled flights. You will be redirected to the manage reservation page.',
  },
});
