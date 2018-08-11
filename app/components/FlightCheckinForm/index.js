import React, { Component } from 'react';
import { Form } from 'react-redux-form/lib/immutable';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import config from 'config'; // eslint-disable-line

import SlidingInput from '../SlidingInput';

import messages from './messages';
import styles from './flightCheckinForm.scss';


export class FlightCheckinForm extends Component {
  onFlightCheckin(model) {
    const method = 'post';
    const path = `${config.UAL_BASE_URL}${config.FLIGHT_CHECKIN_URL}`;

    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    // Move the submit function to another variable so that it doesn't get overwritten.
    form.submitFunction = form.submit;

    let hiddenField = document.createElement('input');

    // append parameters
    const confirmationNumber = model.get('confirmationNumber');
    hiddenField = (confirmationNumber.length > 6) ? this.setFormHiddenField('irETicket', confirmationNumber) : this.setFormHiddenField('irPNR', confirmationNumber);
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('LastName', model.get('lastName'));
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('LangCode', 'en-US');
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    setTimeout(() => {
      form.submitFunction();
    }, 100);
  }

  setFormHiddenField(name, value) {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', name);
    hiddenField.setAttribute('value', value);
    return hiddenField;
  }

  validateCheckinForm(model) {
    // Required fields
    const confirmationNumber = model.get('confirmationNumber');
    const lastName = model.get('lastName');
    if (confirmationNumber && lastName) {
      return true;
    }
    return false;
  }

  render() {
    const confirmationNumberIntPattern = /^[0-9]{13,14}$/;
    const confirmationNumberCharPattern = /^[A-Za-z0-9]{6}$/;
    const isConfirmationNumberValid = (val) => confirmationNumberIntPattern.test(val) || confirmationNumberCharPattern.test(val);

    const lastNamePattern = /^[A-Za-z -]{1,30}$/;
    const isLastNameValid = (val) => lastNamePattern.test(val);

    const isCheckinFormValid = (model) => {
      const isValid = this.validateCheckinForm(model);
      return isValid;
    };

    const checkinWithMPlink = `${config.UAL_BASE_URL}${config.CHECKIN_WITH_MP_NUMBER_URL}`;
    const checkinProcessingLink = `${config.UAL_BASE_URL}${config.CHECKIN_PROCESSING_URL}`;

    const intl = this.props.intl;

    return (
      <Form
        model="bookCheckinModel"
        id="bookFlightCheckin"
        className={styles.bookCheckinForm}
        onSubmit={(model) => this.onFlightCheckin(model)}
        validators={{
          '': { isCheckinFormValid },
        }}
      >
        <div className={styles.checkinHeader}>{intl.formatMessage(messages.checkInHeader)}</div>
        <div className={styles.checkinDetails}>
          <span aria-hidden="true">{intl.formatMessage(messages.checkInDetailsA)}</span>
          <a
            tabIndex="0"
            href={checkinProcessingLink}
            className={styles.checkinDetailsLink}
            aria-label={intl.formatMessage(messages.checkInDetailsLinkAriaLabel)}
          >{intl.formatMessage(messages.checkInDetailsLink)}</a>
          <span aria-hidden="true">{intl.formatMessage(messages.checkInDetailsB)}</span>
        </div>
        <div className={styles.checkinWithMPlinkContainer}>
          <a
            tabIndex="0"
            className={styles.checkinWithMPlink}
            href={checkinWithMPlink}
            aria-label={intl.formatMessage(messages.checkinWithMPariaLabel)}
          >{intl.formatMessage(messages.checkinWithMPLink)}</a>
        </div>
        <div className={styles.confirmationNumberField} aria-label={intl.formatMessage(messages.confirmationNumberFieldAriaLabelTxt)}>
          <FormattedMessage {...messages.confirmationNumberPlaceholderTxt}>
            {(placeholder) => (
              <SlidingInput
                modelName=".confirmationNumber"
                inputId="flightCheckInConfNumber"
                inputType="text"
                placeholder={placeholder}
                inputLabel={intl.formatMessage(messages.confirmationNumberLabelTxt)}
                inputErrorMsg={intl.formatMessage(messages.confirmationNumberErrorMsg)}
                screenReaderLabel={intl.formatMessage(messages.confirmationNumberFieldAriaLabelTxt)}
                validators={isConfirmationNumberValid}
                isAriaRequired="true"
                showLabel="true"
                maxLength="14"
                makeUppercase="characters"
                fixedLabel="true"
                isCustom="false"
                autocompleteOff="true"
              />
            )}
          </FormattedMessage>
        </div>
        <div className={styles.lastNameField} aria-label={intl.formatMessage(messages.lastNameFieldAriaLabel)}>
          <FormattedMessage {...messages.lastNamePlaceholder}>
            {(placeholder) => (
              <SlidingInput
                modelName=".lastName"
                inputId="flightCheckInLastName"
                inputType="text"
                placeholder={placeholder}
                inputLabel={intl.formatMessage(messages.lastNameLabel)}
                inputErrorMsg={intl.formatMessage(messages.lastNameErrorMsg)}
                screenReaderLabel={intl.formatMessage(messages.lastNameFieldAriaLabel)}
                validators={isLastNameValid}
                isAriaRequired="true"
                maxLength="30"
                showLabel="true"
                fixedLabel="true"
                isCustom="false"
                makeUppercase="words"
                autocompleteOff="true"
              />
            )}
          </FormattedMessage>
        </div>
        <div className={styles.submitCheckinBtnContainer}>
          <button
            className={classNames(styles.submitCheckinBtn, styles.btnDefault, styles.primaryButton)}
            id="formSubmitBtn"
            type="submit"
            tabIndex="0"
          >{intl.formatMessage(messages.submitCheckinBtn)}</button>
        </div>
      </Form>
    );
  }
}

FlightCheckinForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(FlightCheckinForm);
