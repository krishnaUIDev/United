/*
 * BookPassengers Messages
 *
 * This contains all the text for the BookPassengers component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  bookPassengersLegendAriaLabelMultipleSections: {
    id: 'unitedapp.components.BookPassengers.bookPassengersLegendAriaLabelMultipleSections',
    defaultMessage: 'Select number and types of travelers panel opened, use the up or down arrow to increase or decrease number of travelers, or enter the number of travelers in each passenger type, not to exceed total of 9 passengers.',
  },
  bookPassengersLegendAriaLabelNoMaximum: {
    id: 'unitedapp.components.BookPassengers.bookPassengersLegendAriaLabelNoMaximum',
    defaultMessage: 'Select number and types of travelers panel opened, use the up or down arrow to increase or decrease number of travelers, or enter the number of travelers in each passenger type.',
  },
  closePanelAriaLabel: {
    id: 'unitedapp.components.BookPassengers.closePanelAriaLabel',
    defaultMessage: 'Close panel',
  },
});
