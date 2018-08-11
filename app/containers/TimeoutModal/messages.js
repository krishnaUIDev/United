/*
 * TimeoutModal Messages
 *
 * This contains all the text for the TimeoutModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  tokenTimeoutHeader: {
    id: 'unitedapp.components.TimeoutModal.tokenTimeoutHeader',
    defaultMessage: 'Session expired',
  },
  inactiveTimeoutHeader: {
    id: 'unitedapp.components.TimeoutModal.inactiveTimeoutHeader',
    defaultMessage: 'Session time-out',
  },
  tokenTimeoutBody: {
    id: 'unitedapp.components.TimeoutModal.tokenTimeoutBody',
    defaultMessage: 'Your united.com session timed out. Any transactions for which you have received confirmation during the session are not affected, however you must restart any searches or any incomplete transactions. If you were signed into your account, you\'ll need to sign in again.',
  },
  inactiveTimeoutBody: {
    id: 'unitedapp.components.TimeoutModal.inactiveTimeoutBody',
    defaultMessage: 'In order to protect the privacy and security of your interactions, united.com times out sessions after 20 minutes of inactivity. Any transactions for which you have received confirmation during the session are not affected, however you must restart any searches or any incomplete transactions. If you were signed into your account, you\'ll need to sign in again.',
  },
  timeoutButton: {
    id: 'unitedapp.components.TimeoutModal.timeoutButton',
    defaultMessage: 'Return to home page',
  },
});
