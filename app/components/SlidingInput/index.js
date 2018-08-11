/*
 * SlidingInput
 *
 * Animated input field using react-redux-form
 */

import React, { Component } from 'react';
import { Control, Errors } from 'react-redux-form/lib/immutable';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import styles from './slidingInput.scss';
import messages from './messages';

class SlidingInput extends Component { // eslint-disable-line
  render() {
    const isValidInput = this.props.validators;
    const customDisplay = ((this.props.inputValue) || (this.props.showTravelerMenu)) ? 'none' : 'inline';
    const customPadding = (customDisplay === 'none') ? this.props.noErrorPadding : this.props.isErrorPadding;

    const customInputWithVal = (inputProps) => (
      <div>
        <input
          {...omit(inputProps, ['touched'], ['submitFailed'], ['retouched'])}
          className={classNames(
            inputProps.className,
            `${(inputProps.touched || this.props.fixedLabel === 'true') ? styles.blur : ''}`
          )}
          id={inputProps.id}
          name={inputProps.id}
          placeholder={inputProps.placeholder}
          ref={(input) => { this.passengerInput = input; }}
          onBlur={() => this.props.onSetActiveField('')}
          onClick={() => this.props.onInputClick()}
          onKeyDown={(event) => this.props.onInputKeyDown(event)}
          tabIndex="0"
          aria-labelledby={`${inputProps.id}Label`}
        />
        <label
          aria-hidden="true"
          htmlFor={inputProps.id}
          className={(this.props.showLabel === 'true' || this.props.fixedLabel === 'true') ? styles.slidingInputLabel : styles.srOnly}
          id={`${inputProps.id}Label`}
        >
          {this.props.inputLabel}
          <span className={styles.srOnly}>{this.props.screenReaderLabel}</span>
        </label>
        <span
          className={styles.customErrorMsg}
          style={{ display: `${customDisplay}` }}
        >{this.props.inputErrorMsg}
          <span role="alert" className={styles.srOnly}>{messages.invalidEntryAriaMsg.defaultMessage}</span>
        </span>
      </div>
    );

    const errorMsgComponent = (inputProps) => {
      const errorMsg = (inputProps.submitFailed === true && this.props.hasDynamicErrorMsg && inputProps.retouched === false) ? this.props.dynamicErrorMsg : this.props.inputErrorMsg;
      // Use body.document.offsetWidth rather than screen.width because need just the container div
      const isNotMobile = document.body.offsetWidth > 768;
      let textAlign = 'center';
      if (this.slidingContainer && ((errorMsg === this.props.dynamicErrorMsg && !(isValidInput(inputProps.value)) && isNotMobile))) {
        // Give padding for larger error message to show
        this.slidingContainer.style.paddingBottom = '48px';
        if (errorMsg === this.props.dynamicErrorMsg && isNotMobile) {
          textAlign = 'left';
        }
      } else if (this.slidingContainer && isNotMobile && errorMsg === this.props.dynamicErrorMsg) { // If not the submit error, set back to original padding
        this.slidingContainer.style.paddingBottom = '32px';
      }

      return (
        <Errors
          model={inputProps.name}
          show={(field) => field.touched && !field.focus}
          messages={{
            isValidInput: `${errorMsg}`,
          }}
          wrapper={(props) =>
            <div
              className={styles.inputFieldErrorMsg}
              role="alert"
              style={{ textAlign: `${textAlign}` }}
            >
              {props.children}
              <span className={styles.srOnly}>{messages.invalidEntryAriaMsg.defaultMessage}</span>
            </div>
          }
        />
      );
    };

    const customInput = (inputProps) => (
      <div>
        <input
          {...omit(inputProps, ['touched'], ['submitFailed'], ['retouched'])}
          name={inputProps.id}
          className={classNames(inputProps.className, `${(inputProps.touched || this.props.fixedLabel === 'true') ? styles.blur : ''}`)}
          placeholder={inputProps.placeholder}
          aria-labelledby={`${inputProps.id}Label`}
        />
        <label
          aria-hidden="true"
          htmlFor={inputProps.id}
          id={`${inputProps.id}Label`}
          className={(this.props.showLabel === 'true' || this.props.fixedLabel === 'true') ? styles.slidingInputLabel : styles.srOnly}
        >
          {this.props.inputLabel}
          <span className={styles.srOnly}>{this.props.screenReaderLabel}</span>
        </label>
        {errorMsgComponent(inputProps)}
      </div>
    );

    if (this.passengerInput) {
      if ((this.props.isActiveLabel) && (this.props.activeField === this.props.isActiveLabel)) {
        setTimeout(() => {
          this.passengerInput.focus();
          const length = this.passengerInput.value.length;
          this.passengerInput.setSelectionRange(length, length);
        }, 1);
      }
    }

    const autocapValue = (this.props.isMP) ? 'characters' : this.props.makeUppercase;
    const autocapitalize = (this.props.isMP || this.props.makeUppercase) ? autocapValue : 'none';

    return (
      <div
        className={classNames(
          `${(this.props.isCustom) ? styles.customInputStyle : styles.inputFieldGroup}`,
          `${this.props.inverse ? styles.inverseDark : ''}`,
          `${(this.props.showLabel === 'false') ? styles.noLabel : ''}`,
        )}
        id="slidingInputFieldGroup"
        style={(this.props.isCustom) ? { paddingBottom: `${customPadding}` } : {}}
        ref={(input) => { this.slidingContainer = input; }}
      >
        <Control.text
          id={this.props.inputId}
          model={this.props.modelName}
          className={classNames(styles.inputField, `${this.props.isMP ? styles.mileagePlusInput : ''}`, `${this.props.makeUppercase === 'characters' ? styles.makeuppercase : ''}`, `${this.props.makeUppercase === 'words' ? styles.makeWordsuppercase : ''}`)}
          type={this.props.inputType}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          required={this.props.isRequired}
          aria-required={this.props.isAriaRequired}
          autoComplete={(this.props.autocompleteOff) ? 'off' : 'on'}
          autoCapitalize={autocapitalize}
          validators={(this.props.validators) ? {
            isValidInput,
          } : {}}
          validateOn="blur"
          component={(this.props.isCustom === 'true') ? customInputWithVal : customInput}
          mapProps={{
            touched: ({ fieldValue }) => fieldValue.touched,
            submitFailed: ({ fieldValue }) => fieldValue.submitFailed,
            retouched: ({ fieldValue }) => fieldValue.retouched,
          }}
        ></Control.text>
      </div>
    );
  }
}

SlidingInput.propTypes = {
  activeField: PropTypes.string,
  autocompleteOff: PropTypes.string,
  dynamicErrorMsg: PropTypes.string,
  fixedLabel: PropTypes.string,
  hasDynamicErrorMsg: PropTypes.string,
  inputErrorMsg: PropTypes.string,
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  inputType: PropTypes.string,
  inputValue: PropTypes.string,
  inverse: PropTypes.string,
  isActiveLabel: PropTypes.string,
  isAriaRequired: PropTypes.string,
  isCustom: PropTypes.string,
  isMP: PropTypes.string,
  isRequired: PropTypes.string,
  isErrorPadding: PropTypes.string,
  makeUppercase: PropTypes.string,
  modelName: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  noErrorPadding: PropTypes.string,
  onInputClick: PropTypes.func,
  onInputKeyDown: PropTypes.func,
  onSetActiveField: PropTypes.func,
  placeholder: PropTypes.string,
  screenReaderLabel: PropTypes.string,
  showLabel: PropTypes.string,
  showTravelerMenu: PropTypes.bool,
  validators: PropTypes.func,
};

export default SlidingInput;
