/*
 * FlightCheckinForm Messages
 *
 * This contains all the text for the FlightCheckinForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  confirmationNumberLabelTxt: {
    id: 'unitedapp.components.FlightCheckinForm.confirmationNumberLabelTxt',
    defaultMessage: 'Confirmation number or ticket number*',
  },
  confirmationNumberPlaceholderTxt: {
    id: 'unitedapp.components.FlightCheckinForm.confirmationNumberPlaceholderTxt',
    defaultMessage: 'Confirmation number*',
  },
  confirmationNumberErrorMsg: {
    id: 'unitedapp.components.FlightCheckinForm.confirmationNumberErrorMsg',
    defaultMessage: 'Please enter a valid confirmation or eTicket number.',
  },
  lastNamePlaceholder: {
    id: 'unitedapp.components.FlightCheckinForm.lastNamePlaceholder',
    defaultMessage: 'Last Name*',
  },
  lastNameLabel: {
    id: 'unitedapp.components.FlightCheckinForm.lastNameLabel',
    defaultMessage: 'Last Name*',
  },
  lastNameErrorMsg: {
    id: 'unitedapp.components.FlightCheckinForm.lastNameErrorMsg',
    defaultMessage: 'Please enter a valid last name.',
  },
  checkinWithMPLink: {
    id: 'unitedapp.components.FlightCheckinForm.checkinWithMPLink',
    defaultMessage: 'Check in with your MileagePlus number',
  },
  checkInDetailsA: {
    id: 'unitedapp.components.FlightCheckinForm.checkInDetailsA',
    defaultMessage: 'Check-in is available starting 24 hours before your scheduled departure. See our ',
  },
  checkInDetailsLink: {
    id: 'unitedapp.components.FlightCheckinForm.checkInDetailsLink',
    defaultMessage: 'Check-in and Airport Processing Times',
  },
  checkInDetailsLinkAriaLabel: {
    id: 'unitedapp.components.FlightCheckinForm.checkInDetailsLinkAriaLabel',
    defaultMessage: 'Check-in is available starting 24 hours before your scheduled departure. See our link Check-in and Airport Processing Times page for details.',
  },
  checkInDetailsB: {
    id: 'unitedapp.components.FlightCheckinForm.checkInDetailsB',
    defaultMessage: ' page for details.',
  },
  submitCheckinBtn: {
    id: 'unitedapp.components.FlightCheckinForm.submitCheckinBtn',
    defaultMessage: 'Search',
  },
  checkInHeader: {
    id: 'unitedapp.components.FlightCheckinForm.checkInHeader',
    defaultMessage: 'Check-in',
  },
  checkinWithMPariaLabel: {
    id: 'unitedapp.components.FlightCheckinForm.checkinWithMPariaLabel',
    defaultMessage: 'link Check in with your mileageplus number.',
  },
  confirmationNumberFieldAriaLabelTxt: {
    id: 'unitedapp.components.FlightCheckinForm.confirmationNumberFieldAriaLabelTxt',
    defaultMessage: 'please enter your 6 digits confirmation number or the first 13 digits of your ticket number',
  },
  lastNameFieldAriaLabel: {
    id: 'unitedapp.components.FlightCheckinForm.lastNameFieldAriaLabel',
    defaultMessage: 'Please enter your last name. This field is required.',
  },
});
