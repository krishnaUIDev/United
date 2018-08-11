/*
 * LoginForm
 *
 * Login Form in the right sidebar -- LoginButton
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Control, Form } from 'react-redux-form/lib/immutable';
import classNames from 'classnames';

import { INVALID_CREDENTIALS, ACCOUNT_LOCKED } from 'containers/App/constants';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import config from 'config'; // eslint-disable-line

import messages from './messages';
import styles from './loginForm.scss';
import SlidingInput from '../SlidingInput';
import TogglePassword from '../TogglePassword/index';
import ToolTip from '../ToolTip';

import { isSubmittableInput, isSubmittablePassword, isValidMPnumber } from '../../utils/validators';

class LoginForm extends React.Component {
  componentWillMount() {
    if (this.props.globalMPusername && this.props.isRememberMeChecked) {
      this.props.onChangeModel('loginFormModel.login', this.props.globalMPusername);
    }
    this.props.onChangeModel('loginFormModel.rememberMe', this.props.isRememberMeChecked);
  }

  onRememberMeChange(event) {
    // if event is triggered by enter key, then event.target.checked is the opposite of whether or not it is actually checked
    const isChecked = (event.keyCode !== undefined) ? !(event.target.checked) : event.target.checked;
    this.props.onChangeModel('loginFormModel.rememberMe', isChecked);
    this.props.signInRememberMeChecked(isChecked);
  }

  checkForEmptyFields = (formValues) => {
    const hasLoginError = !isSubmittableInput(formValues.get('login'));
    const hasPasswordError = !isSubmittablePassword(formValues.get('password'));
    this.props.onFieldErrorSubmit('loginFormModel.login', {
      isValidInput: hasLoginError,
    });

    this.props.onFieldErrorSubmit('loginFormModel.password', {
      isValidPassword: hasPasswordError,
    });

    return hasLoginError || hasPasswordError;
  }

  handleSignInSubmit(model) {
    const hasFieldErrors = this.checkForEmptyFields(model);
    if (hasFieldErrors) return;

    const isEncrypted = model.get('login').includes('**') && this.props.globalMPusernameCrypto !== '';
    const username = isEncrypted ? this.props.globalMPusernameCrypto : model.get('login');
    // TODO: change this check once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
    const modelPassword = model.get('password');
    const password = (typeof (modelPassword) === 'string') ? modelPassword : modelPassword.get('password');
    this.props.onSignInSubmit(username, password, model.get('rememberMe'), isEncrypted);
  }


  render() {
    const { intl } = this.props;
    const isValidInput = (val) => isValidMPnumber(val, this.props.globalMPusername);

    const error = this.props.userProfileError;
    let showError = false;
    let msg;
    if (error && error.response.status === INVALID_CREDENTIALS) {
      showError = true;
      msg = (
        <span id="errorMsg">
          {intl.formatMessage(messages.invalidLoginErrorMsgPart1)}
          <u>{intl.formatMessage(messages.invalidLoginErrorUnderlined)}</u>
          {intl.formatMessage(messages.invalidLoginErrorMsgPart2)}
        </span>
      );
    } else if (error && error.response.status === ACCOUNT_LOCKED) {
      showError = true;
      msg = (
        <span id="errorMsg">
          {intl.formatMessage(messages.accountLockedErrorMsg)}
        </span>
      );
    }

    // Disable and dim the panel while login/loading is occuring
    const containerOpacity = (this.props.isLoading) ? styles.loadingOpacity : styles.loadedOpacity;

    return (
      <Form
        model="loginFormModel"
        id="loginFormModel"
        onSubmit={(model) => this.handleSignInSubmit(model)}
        className={classNames(styles.loginForm, containerOpacity)}
      >
        {(showError) ?
          <div
            className={styles.loginErrorMsg}
            id="loginError"
            tabIndex="0"
            role="alert"
            aria-label={msg}
          >
            {msg}
          </div>
        : ''}
        <div className={styles.mileagePlusEnroll}>
          <FormattedMessage {...messages.enrollAriaLabel}>
            {(placeholder) => (
              <a
                href={`${config.UAL_BASE_URL}/ual/en/us/account/enroll/default`}
                title={placeholder}
                aria-label={placeholder}
              >
                <div><FormattedMessage {...messages.notMemberText} /></div>
                <FormattedMessage {...messages.enrollText} />
              </a>
            )}
          </FormattedMessage>
        </div>
        <div className={styles.mpContainer}>
          <FormattedMessage {...messages.mileageplus}>
            {(placeholder) => (
              <SlidingInput
                modelName=".login"
                inputId="loginFormModel.login"
                inputType="text"
                inverse="true"
                isMP="true"
                placeholder={placeholder}
                inputLabel={placeholder}
                inputErrorMsg={intl.formatMessage(messages.invalidMPnumber)}
                screenReaderLabel={intl.formatMessage(messages.mileageplusshort)}
                validators={isValidInput}
                hasDynamicErrorMsg="true"
                dynamicErrorMsg={intl.formatMessage(messages.invalidSubmitMPnumberErrorMsg)}
                isAriaRequired="true"
                maxLength="11"
                showLabel="true"
                fixedLabel="true"
                isCustom="false"
              />
            )}
          </FormattedMessage>
        </div>
        <div className={classNames(styles.forgotMPcontainer, styles.forgotCredentials)}>
          <FormattedMessage {...messages.forgot} />&nbsp;
          <FormattedMessage {...messages.mileageplusshort}>
            {(placeholder) => (
              <a
                className={styles.forgotCredentailsLink}
                href={`${config.UAL_BASE_URL}/web/en-US/apps/account/settings/accountNumberResolution.aspx`}
                aria-label={intl.formatMessage(messages.forgotMPariaLabel)}
              >
                {placeholder}
              </a>
            )}
          </FormattedMessage>
        </div>
        <div className={styles.passwordContainer}>
          <FormattedMessage {...messages.password}>
            {(placeholder) => (
              <TogglePassword
                modelName="loginFormModel"
                inputId="loginFormModel.password"
                maxLength="32"
                isAriaRequired="true"
                inverse="true"
                showHideStyle={styles.showHidePassword}
                placeholder={placeholder}
                inputLabel={placeholder}
                inputErrorMsg={intl.formatMessage(messages.invalidMPpassword)}
                screenReaderLabel={intl.formatMessage(messages.passwordAriaLabel)}
                parentModelName="loginFormModel"
                onChangeModel={this.props.onChangeModel}
                onFocusModel={this.props.onFocusModel}
                showLabel="true"
                fixedLabel="true"
                isCustom="false"
              />
            )}
          </FormattedMessage>
        </div>
        <div className={classNames(styles.forgotCredentials, styles.forgotPasswordContainer)}>
          <FormattedMessage {...messages.or} />
          &nbsp;
          <FormattedMessage {...messages.forgotPasswordAriaLabel}>
            {(placeholder) => (
              <a
                className={styles.forgotCredentailsLink}
                href={`${config.UAL_BASE_URL}/ual/en/us/account/security/passwordrecovery`}
                title={placeholder}
                aria-label={placeholder}
              >
                <FormattedMessage {...messages.passwordPlaceholder} />?
              </a>
            )}
          </FormattedMessage>
        </div>
        <fieldset className={classNames(styles.checkboxWrapper, styles.saveCredentailsContainer)}>
          <Control.checkbox
            model=".rememberMe"
            type="checkbox"
            className={styles.customCheckbox}
            id="saveCredentials"
            onChange={(event) => this.onRememberMeChange(event)}
            role="checkbox"
            checked={this.props.isRememberMeChecked}
            aria-checked={this.props.isRememberMeChecked}
            aria-label={intl.formatMessage(messages.rememberMeCheckboxAriaLabel)}
          />
          <label htmlFor="saveCredentials" aria-label={intl.formatMessage(messages.rememberme)} />
        </fieldset>
        <div className={styles.tooltipContainer}>
          <ToolTip
            msg={intl.formatMessage(messages.rememberme)}
            tooltipmsg={intl.formatMessage(messages.tooltipMessage)}
            tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.rememberme)}`}
            eventIDtoIgnore={['loginFormModel.login', 'loginFormModel.password']}
            tooltipContainerStyle={styles.tooltipContainerWithMargin}
            labelStyle={styles.checkboxLabelStyle}
          />
        </div>
        <div className={styles.accountSecurity}>
          <FormattedMessage {...messages.accountSecurity}>
            {(placeholder) => (
              <a
                className={classNames(styles.mileagePlusAccountSecurity)}
                href={`${config.UAL_BASE_URL}/web/en-US/content/help/PIN-password.aspx`}
                title={placeholder}
              >
                <FormattedMessage {...messages.accountSecurityText} />
              </a>
            )}
          </FormattedMessage>
        </div>
        <div tabIndex="0" className={styles.adPlaceholderDiv} aria-label="Ad placeholder">Ad placeholder</div>
        <button
          type="submit"
          className={classNames(styles.signInButton, styles.btnDefault, styles.primaryButton, 'signInButton')}
        >
          <FormattedMessage {...messages.signin} />
        </button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSignInSubmit: PropTypes.func,
  onFieldErrorSubmit: PropTypes.func,
  userProfileError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  globalMPusername: PropTypes.string,
  globalMPusernameCrypto: PropTypes.string,
  onChangeModel: PropTypes.func,
  signInRememberMeChecked: PropTypes.func,
  isRememberMeChecked: PropTypes.bool,
  onFocusModel: PropTypes.func,
};

export default injectIntl(LoginForm);
