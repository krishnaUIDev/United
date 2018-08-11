import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form/lib/immutable';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import config from 'config'; // eslint-disable-line

import SlidingInput from '../SlidingInput';

import messages from './messages';
import styles from './myTripsForm.scss';

export class MyTripsForm extends Component {
  onMyTripsSubmit(model) {
    const method = 'post';
    const path = `${config.UAL_BASE_URL}${config.MYTRIPS_FORM_SUBMIT_URL}`;


    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    // Move the submit function to another variable so that it doesn't get overwritten.
    form.submitFunction = form.submit;

    let hiddenField = document.createElement('input');

    // append parameters
    const confirmationNumber = model.get('confirmationNumber');
    hiddenField = this.setFormHiddenField('flightconfirmationNo', confirmationNumber);
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('flightlastName', model.get('lastName'));
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
    const isLoggedIn = this.props.isLoggedIn;
    const confirmationNumberCharPattern = /^[A-Za-z0-9]{6}$/;
    const isConfirmationNumberValid = (val) => confirmationNumberCharPattern.test(val);

    const lastNamePattern = /^[A-Za-z -]{1,30}$/;
    const isLastNameValid = (val) => lastNamePattern.test(val);

    const isCheckinFormValid = (model) => {
      const isValid = this.validateCheckinForm(model);
      return isValid;
    };

    const myTripsProcessingLink = `${config.UAL_BASE_URL}${config.MYTRIPS_RESERVATION_URL}`;

    const intl = this.props.intl;

    return (
      <Form
        model="bookMyTripsModel"
        id="bookMyTrips"
        className={styles.myTripsForm}
        onSubmit={(model) => this.onMyTripsSubmit(model)}
        validators={{
          '': { isCheckinFormValid },
        }}
      >
        <div className={styles.myTripsHeader}>{intl.formatMessage(messages.myTravelHeader)}</div>
        <div className={styles.myTripsDetails}>
          <a
            tabIndex="0"
            href={`${myTripsProcessingLink}?PastCancel=true`}
            className={styles.myTripsDetailsLink}
            aria-label={intl.formatMessage(messages.findPastFlightsAria)}
          >{(isLoggedIn) ? intl.formatMessage(messages.findPastFlightsLoggedIn) : intl.formatMessage(messages.findPastFlightsLoggedOutTxt)}</a>
        </div>
        <div className={styles.confirmationNumberField} aria-label={intl.formatMessage(messages.confirmationNumberFieldAriaLabel)}>
          <FormattedMessage {...messages.confirmationNumberPlaceholderTxt}>
            {(placeholder) => (
              <SlidingInput
                modelName=".confirmationNumber"
                inputId="myTripsConfirmationNumber"
                inputType="text"
                placeholder={placeholder}
                inputLabel={placeholder}
                inputErrorMsg={intl.formatMessage(messages.confirmationNumberErrorMsg)}
                screenReaderLabel={intl.formatMessage(messages.confirmationNumberFieldAriaLabel)}
                validators={isConfirmationNumberValid}
                isAriaRequired="true"
                showLabel="true"
                maxLength="6"
                makeUppercase="characters"
                fixedLabel="false"
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
                inputId="myTripsLastName"
                inputType="text"
                placeholder={placeholder}
                inputLabel={intl.formatMessage(messages.lastNameLabel)}
                inputErrorMsg={intl.formatMessage(messages.lastNameErrorMsg)}
                screenReaderLabel={intl.formatMessage(messages.lastNameFieldAriaLabel)}
                validators={isLastNameValid}
                isAriaRequired="true"
                maxLength="30"
                showLabel="true"
                fixedLabel="false"
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
            id="myTripsSubmitBtn"
            type="submit"
            tabIndex="0"
          >{intl.formatMessage(messages.submitCheckinBtn)}</button>
        </div>
      </Form>
    );
  }
}

MyTripsForm.propTypes = {
  intl: intlShape.isRequired,
  isLoggedIn: PropTypes.bool,
};


export default injectIntl(MyTripsForm);
