/*
 * FlightStatusForm Messages
 *
 * This contains all the text for the FlightStatusForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  fromAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.fromAriaLabel',
    defaultMessage: 'Enter your departing city, airport name, or airport code.',
  },
  fromLabel: {
    id: 'unitedapp.components.FlightStatusForm.fromLabel',
    defaultMessage: 'From',
  },
  fromError: {
    id: 'unitedapp.components.FlightStatusForm.fromError',
    defaultMessage: 'Please enter a valid origin.',
  },
  formClosePanelAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.formClosePanelAriaLabel',
    defaultMessage: 'Close airport suggestion panel',
  },
  formThreeCharAutocomplete: {
    id: 'unitedapp.components.FlightStatusForm.formThreeCharAutocomplete',
    defaultMessage: 'Flight origin location suggestion panel opened. Suggestions are available, use the up and down arrow keys to navigate them.',
  },
  toThreeCharAutocomplete: {
    id: 'unitedapp.components.FlightStatusForm.toThreeCharAutocomplete',
    defaultMessage: 'Flight destination location suggestion panel opened. Suggestions are available, use the up and down arrow keys to navigate them.',
  },
  dateLabel: {
    id: 'unitedapp.components.FlightStatusForm.dateLabel',
    defaultMessage: 'Date',
  },
  findFlightStatusAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.findFlightStatusAriaLabel',
    defaultMessage: 'Search',
  },
  findFlightStatus: {
    id: 'unitedapp.components.FlightStatusForm.findFlightStatus',
    defaultMessage: 'Search',
  },
  toLabel: {
    id: 'unitedapp.components.FlightStatusForm.toLabel',
    defaultMessage: 'To',
  },
  toError: {
    id: 'unitedapp.components.FlightStatusForm.toError',
    defaultMessage: 'Please enter a valid destination.',
  },
  toAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.toAriaLabel',
    defaultMessage: 'Enter your destination city, airport name, or airport code.',
  },
  andOr: {
    id: 'unitedapp.components.FlightStatusForm.andOr',
    defaultMessage: 'and/or',
  },
  flightNumberLabel: {
    id: 'unitedapp.components.FlightStatusForm.flightNumberLabel',
    defaultMessage: 'Flight number',
  },
  flightNumberPlaceholderTxt: {
    id: 'unitedapp.components.FlightStatusForm.flightNumberPlaceholderTxt',
    defaultMessage: 'Flight no.',
  },
  flightNumberAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.flightNumberAriaLabel',
    defaultMessage: 'Flight number',
  },
  flightNumberError: {
    id: 'unitedapp.components.FlightStatusForm.flightNumberError',
    defaultMessage: 'Please enter a valid flight number.',
  },
  dateAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.dateAriaLabel',
    defaultMessage: 'Date. Use the up or down arrow key to navigate and select flight status date.',
  },
  flightStatusHeader: {
    id: 'unitedapp.components.FlightStatusForm.flightStatusHeader',
    defaultMessage: 'Flight status',
  },
  flightStatusAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.flightStatusAriaLabel',
    defaultMessage: 'Check flight status by entering a departure and arrival city or airport code, or search by flight number and departure date.',
  },
  statusNotificationLinkTxt: {
    id: 'unitedapp.components.FlightStatusForm.statusNotificationLinkTxt',
    defaultMessage: 'Receive flight status notifications by email or text message',
  },
  statusNotificationLinkTxtAriaLabel: {
    id: 'unitedapp.components.FlightStatusForm.statusNotificationLinkTxtAriaLabel',
    defaultMessage: 'Receive flight status notifications by email or text message',
  },
});
