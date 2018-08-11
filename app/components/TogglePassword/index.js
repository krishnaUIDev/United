/*
 * TogglePassword
 *
 * Password Toggle for hiding and showing the password in password field
 */

import React from 'react';
import { Control, Errors } from 'react-redux-form/lib/immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { injectIntl, intlShape } from 'react-intl';

import styles from 'components/SlidingInput/slidingInput.scss';
import messages from './messages';

import { isValidPassword, passwordPatternAllowEmpty } from '../../utils/validators';


class TogglePassword extends React.Component {
  state = {
    showPassword: false,
  }
  componentDidUpdate() {
    const { showPassword } = this.state;
    if (showPassword) {
      this.passwordInputField.focus();
    }
  }
  onShowError(field) {
    const activeEl = document.activeElement && document.activeElement.name;
    const btnModelName = `${this.props.parentModelName}${this.props.modelName}.btn`;
    if ((!field.focus) && (activeEl !== btnModelName) && (field.touched)) {
      return true;
    }
    return false;
  }

  onInputChange(event, inputProps) {
    const value = event.target.value;
    const valueWithoutWhitespace = value.replace(/\s/g, '');
    this.props.onChangeModel(`${inputProps.name}.password`, valueWithoutWhitespace);
  }

  showHide() {
    let { showPassword } = this.state;
    showPassword = !showPassword;
    this.props.onFocusModel(`${this.props.parentModelName}${this.props.modelName}.btn`);
    this.setState({ showPassword });
  }

  handlePasswordOnBlur() {
    this.setState({ showPassword: false });
  }

  handlePasswordFieldOnBlur() {
    const { showPassword } = this.state;
    if (showPassword) {
      // Need timeout for everything but Chrome
      setTimeout(() => {
        if ((document.activeElement.id !== 'showHideBtn') && (document.activeElement.id !== this.props.inputId)) {
          this.setState({ showPassword: false });
        }
      }, 100);
    }
  }

  render() {
    const { intl } = this.props;
    const { showPassword } = this.state;
    // TODO: remove this check once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
    const isString = (val) => (typeof (val.value === 'string') && val.length);
    // TODO: remove check within aria-label (~line 80) once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
    const getAriaLabel = (val) => {
      const aria = (passwordPatternAllowEmpty.test(val)) ? this.props.screenReaderLabel : `${this.props.screenReaderLabel} invalid entry`;
      return aria;
    };
    // TODO: remove check within aria-label (~line 91) once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
    const getPasswordType = () => {
      const type = (showPassword) ? 'text' : 'password';
      return type;
    };
    // TODO: remove check within aria-label (~line 122) once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
    const getButtonTxt = () => {
      const btnTxt = (showPassword) ? 'Hide' : 'Show';
      return btnTxt;
    };

    const errorMsgComponent = (inputProps) => {
      const errorMsg = (inputProps.submitFailed === false || (inputProps.retouched === true)) ? this.props.inputErrorMsg : intl.formatMessage(messages.submittedErrorMsg);
      return (
        <Errors
          model={inputProps.name}
          show={(field) => (this.onShowError(field))}
          messages={{
            isValidPassword: `${errorMsg}`,
          }}
          wrapper={(props) =>
            <div
              className={styles.inputFieldErrorMsg}
              role="alert"
            >
              {props.children}
              <span className={styles.srOnly}>{intl.formatMessage(messages.srOnlyErrorMsg)}</span>
            </div>
          }
        />
      );
    };

    const btnAriaLabel = (this.state.showPassword) ? intl.formatMessage(messages.hideBtnAriaLabel) : intl.formatMessage(messages.showBtnAriaLabel);

    const passwordInput = (inputProps) => (
      <div onBlur={(event) => this.handlePasswordFieldOnBlur(event, inputProps.value)} >
        <legend className={styles.srOnly}>{this.props.screenReaderLabel}</legend>
        <Control.input
          {...omit(inputProps, ['touched'], ['submitFailed'], ['retouched'])}
          className={classNames(
            inputProps.className,
            `${inputProps.touched || this.props.fixedLabel === 'true' ? styles.blur : ''}`
          )}
          model={`${this.props.modelName}.input`}
          id={inputProps.id}
          value={(isString(inputProps.value)) ? inputProps.value : inputProps.value.get('password')}
          aria-label={(isString(inputProps.value) ? getAriaLabel(inputProps.value) : getAriaLabel(inputProps.value.get('password')))}
          type={(isString(inputProps.value)) ? 'password' : getPasswordType(inputProps.value)}
          onChange={(event) => this.onInputChange(event, inputProps)}
          onFocus={(event) => { event.stopPropagation(); }}
          getRef={(input) => { this.passwordInputField = input; }}
        />
        <label
          htmlFor={inputProps.name}
          className={(this.props.showLabel === 'true' || this.props.fixedLabel === 'true') ? styles.slidingInputLabel : styles.srOnly}
        >{this.props.inputLabel}</label>
        {errorMsgComponent(inputProps)}
        <Control.button
          className={this.props.showHideStyle}
          role="button"
          id="showHideBtn"
          model={`${this.props.modelName}.btn`}
          onClick={(event) => { event.preventDefault(); event.target.blur(); this.showHide(inputProps.value); }}
          onTouchStart={(event) => { event.preventDefault(); event.target.blur(); this.showHide(inputProps.value); }}
          aria-label={btnAriaLabel}
          type="button"
        >
          {(isString(inputProps.value)) ? 'Show' : getButtonTxt(inputProps.value)}
        </Control.button>
      </div>
    );

    return (
      <div className={classNames(styles.inputFieldGroup, `${this.props.inverse ? styles.inverseDark : ''}`)}>
        <Control
          id={this.props.inputId}
          model={this.props.modelName}
          className={classNames(styles.inputField, styles.passwordInput)}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          aria-required={this.props.isAriaRequired}
          aria-label={this.props.screenReaderLabel}
          validators={{
            isValidPassword: (value) => isValidPassword(value.get('password')),
          }}
          validateOn="blur"
          component={passwordInput}
          mapProps={{
            touched: ({ fieldValue }) => fieldValue.touched,
            value: (props) => props.viewValue,
            submitFailed: ({ fieldValue }) => fieldValue.submitFailed,
            retouched: ({ fieldValue }) => fieldValue.retouched,
            onKeyPress: null, // @TODO this is not documented in react-redux-form
          }}
        >
        </Control>
      </div>
    );
  }
}

TogglePassword.propTypes = {
  fixedLabel: PropTypes.string,
  inputErrorMsg: PropTypes.string,
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  intl: intlShape.isRequired,
  inverse: PropTypes.string,
  isAriaRequired: PropTypes.string,
  maxLength: PropTypes.string,
  modelName: PropTypes.string,
  onChangeModel: PropTypes.func,
  onFocusModel: PropTypes.func,
  parentModelName: PropTypes.string,
  placeholder: PropTypes.string,
  screenReaderLabel: PropTypes.string,
  showHideStyle: PropTypes.string,
  showLabel: PropTypes.string,
};

export default injectIntl(TogglePassword);
