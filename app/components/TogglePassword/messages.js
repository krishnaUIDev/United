/*
 * TogglePassword Messages
 *
 * This contains all the text for the TogglePassword component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  showBtnAriaLabel: {
    id: 'unitedapp.components.TogglePassword.showBtnAriaLabel',
    defaultMessage: 'Show password button. Activate to read your password. Once you navigate away from this field, your entered password will go back to hidden',
  },
  hideBtnAriaLabel: {
    id: 'unitedapp.components.TogglePassword.hideBtnAriaLabel',
    defaultMessage: 'Hide password button. Activate to hide your password. Once you navigate away from this field, your entered password will go back to hidden',
  },
  srOnlyErrorMsg: {
    id: 'unitedapp.components.TogglePassword.srOnlyErrorMsg',
    defaultMessage: 'Please return to this field to correct the error.',
  },
  submittedErrorMsg: {
    id: 'unitedapp.components.TogglePassword.submittedErrorMsg',
    defaultMessage: 'Please enter your password or PIN.',
  },
});
