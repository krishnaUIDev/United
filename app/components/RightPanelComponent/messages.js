/*
 * LoggedInSidebar Messages
 *
 * This contains all the text for the LoggedInSidebar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  nonunited: {
    id: 'unitedapp.components.RightPanelComponent.nonunited',
    defaultMessage: 'This flight is not operated by United. Additional flight status information is not available.',
  },
  flightNumber: {
    id: 'unitedapp.components.RightPanelComponent.flightNumber',
    defaultMessage: 'Flight number',
  },
  flightStatus: {
    id: 'unitedapp.components.RightPanelComponent.flightStatus',
    defaultMessage: 'Flight status',
  },
  downloadLinkAria: {
    id: 'unitedapp.components.RightPanelComponent.downloadLinkAria',
    defaultMessage: 'Download united app',
  },
});
