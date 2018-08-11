import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import moment from 'moment';

import { Field, Form } from 'react-redux-form/lib/immutable';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import config from 'config'; // eslint-disable-line

import AutocompleteLocationContainer from 'containers/AutocompleteLocationContainer';
import SlidingInput from '../SlidingInput';

import styles from './flightStatus.scss';
import messages from './messages';

export class FlightStatusForm extends Component {

  getSelectedDateFormatted(value, isAria) {
    let date;
    const currentDate = moment();
    const currentDateFormatted = currentDate.format('MMM DD, YYYY');
    const currentDateAria = currentDate.format('MMMM DD, YYYY');

    const yesterdayDate = moment(currentDate).subtract(1, 'days').format('MMM DD, YYYY');
    const yesterdayDateAria = moment(currentDate).subtract(1, 'days').format('MMMM DD, YYYY');

    const tomorrowDate = moment(currentDate).add(1, 'days').format('MMM DD, YYYY');
    const tomorrowDateAria = moment(currentDate).add(1, 'days').format('MMMM DD, YYYY');

    const dayAfterTomorrowDate = moment(currentDate).add(2, 'days').format('MMM DD, YYYY');
    const dayAfterTomorrowDateAria = moment(currentDate).add(2, 'days').format('MMMM DD, YYYY');

    switch (value) {
      case '1':
        date = isAria ? yesterdayDateAria : yesterdayDate;
        break;
      case '2':
        date = isAria ? currentDateAria : currentDateFormatted;
        break;
      case '3':
        date = isAria ? tomorrowDateAria : tomorrowDate;
        break;
      case '4':
        date = isAria ? dayAfterTomorrowDateAria : dayAfterTomorrowDate;
        break;
      default:
        break;
    }
    return date;
  }
  handleFlightStatusSubmit(model) {
    const statusOrigin = this.props.globalFlightStatusOriginLocationCode;
    const statusDestination = this.props.globalFlightStatusDestinationLocationCode;
    const flightNumber = model.get('flightNumber');
    const statusDateApiFormat = moment(this.getSelectedDateFormatted(model.get('dates'), false), 'MMM DD, YYYY').format('YYYY-MM-DD');
    this.props.onUpdateFlightStatusDate(statusDateApiFormat);
    const statusDateExtLinkFormat = moment(this.getSelectedDateFormatted(model.get('dates'), false), 'MMM DD, YYYY').format('MM/DD/YYYY');
    if ((statusOrigin && statusDestination && flightNumber) || (flightNumber && !statusOrigin && !statusDestination)) {
      this.props.onFlightStatusSubmit(statusOrigin, statusDestination, flightNumber, statusDateApiFormat);
    } else {
      const extURL = `${config.UAL_BASE_URL}${config.TIME_TABLE_RESULTS}Origin=${statusOrigin}&Destination=${statusDestination}&Date=${statusDateExtLinkFormat}`;
      window.location.assign(extURL);
    }
  }
  updateDateSelected(newValue) {
    this.props.onChangeModel('flightStatusModel.dates', newValue.value);
    if (newValue) {
      this.props.setDateSelected(newValue.value);
    }
  }
  render() {
    const intl = this.props.intl;
    const dataArray = this.props.getFlightRequestResponse();
    const flightNumberPattern = /^-?\d+\.?\d*$/;
    const isValidFlightNumberInput = (val) => val ? flightNumberPattern.test(val) : true;
    const dateOptions = [
      {
        value: '1',
        label: this.getSelectedDateFormatted('1'),
      },
      {
        value: '2',
        label: this.getSelectedDateFormatted('2'),
      },
      {
        value: '3',
        label: this.getSelectedDateFormatted('3'),
      },
      {
        value: '4',
        label: this.getSelectedDateFormatted('4'),
      },
    ];

    const dateAriaLabel = () => this.getSelectedDateFormatted(this.props.selectedStatusDate, true);
    let toFieldZindex;
    if (this.props.mobileView.get('flightStatusOrigin') === 'fixed') {
      toFieldZindex = '1';
    } else if (this.props.mobileView.get('flightStatusDestination') === 'fixed') {
      toFieldZindex = '3';
    } else {
      toFieldZindex = 'auto';
    }
    const isFlightStatusFormValid = (fullModel) => {
      const statusOrigin = fullModel.get('StatusOrigin');
      const statusDestination = fullModel.get('StatusDestination');
      const flightNumber = fullModel.get('flightNumber');
      const statusDate = this.getSelectedDateFormatted(fullModel.get('dates'), false);
      if (((statusOrigin && statusDestination) || flightNumber) && statusDate) {
        return true;
      }
      return false;
    };
    return (
      <Form
        model="flightStatusModel"
        id="flightStatusModel"
        onSubmit={(model) => this.handleFlightStatusSubmit(model)}
        validators={{
          '': { isFlightStatusFormValid },
        }}
      >
        <div
          className={styles.statusForm}
        >
          <div className={styles.statusNotificationLink} >
            <a
              href={`${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}`}
              aria-label={intl.formatMessage(messages.statusNotificationLinkTxtAriaLabel)}
            >
              {intl.formatMessage(messages.statusNotificationLinkTxt)}
            </a>
          </div>
          <div
            className={styles.flightStatusHeader}
            tabIndex="0"
            aria-label={intl.formatMessage(messages.flightStatusAriaLabel)}
          >{intl.formatMessage(messages.flightStatusHeader)}
            <span className={styles.flightStatusHeaderAriaStyle}>{intl.formatMessage(messages.flightStatusAriaLabel)}</span>
          </div>
          <div className={styles.fromLocationContainer}>
            <div
              className={styles.fromLocation}
              style={{ position: `${this.props.mobileView.get('flightStatusOrigin')}` }}
            >
              {(this.props.activeTab === 'statusTab') ?
                <AutocompleteLocationContainer
                  onArrowKeyDown={this.props.onArrowKeyDown}
                  onItemSelected={this.props.onItemSelected}
                  locationType="flightStatusOrigin"
                  inputId="flightStatusOriginInput"
                  listItemId="flightStatusOriginListItem"
                  inputType="text"
                  isRequired="true"
                  inputFieldPlaceholder={intl.formatMessage(messages.fromLabel)}
                  inputErrorMsg={intl.formatMessage(messages.fromError)}
                  inputFieldAriaLabel={intl.formatMessage(messages.fromAriaLabel)}
                  closePanelAriaLabel={intl.formatMessage(messages.formClosePanelAriaLabel)}
                  threeCharAutocomplete={intl.formatMessage(messages.formThreeCharAutocomplete)}
                  mobilePaddingLeft={(this.props.mobileView.get('flightStatusOrigin') === 'fixed') ? '24px' : '0'}
                  modelName=".StatusOrigin"
                  fullModelName="flightStatusModel.StatusOrigin"
                  parentModel="flightStatusModel"
                  showLabel="true"
                  containerPaddingBottom="0px"
                  getRequestData={this.props.onLoadAirports}
                  dataToPopulate={dataArray}
                  selectFirstItemOnBlur="true"
                  locationCode={this.props.globalFlightStatusOriginLocationCode}
                  resetLocationCode={this.props.setFlightStatusOriginLocationCode}
                  resetDisplayText={this.props.onSelectFlightStatusOriginLocation}
                  isValidatorRequired="false"
                />
              : ''}
            </div>
          </div>
          <div className={styles.toLocationContainer}>
            <div
              className={styles.toLocation}
              style={{ position: `${this.props.mobileView.get('flightStatusDestination')}`, zIndex: toFieldZindex }}
            >
              {(this.props.activeTab === 'statusTab') ?
                <AutocompleteLocationContainer
                  onArrowKeyDown={this.props.onArrowKeyDown}
                  onItemSelected={this.props.onItemSelected}
                  locationType="flightStatusDestination"
                  inputId="flightStatusDestinationInput"
                  listItemId="flightStatusDestinationListItem"
                  inputType="text"
                  isRequired="true"
                  inputFieldPlaceholder={intl.formatMessage(messages.toLabel)}
                  inputErrorMsg={intl.formatMessage(messages.toError)}
                  inputFieldAriaLabel={intl.formatMessage(messages.toAriaLabel)}
                  closePanelAriaLabel={intl.formatMessage(messages.formClosePanelAriaLabel)}
                  threeCharAutocomplete={intl.formatMessage(messages.toThreeCharAutocomplete)}
                  mobilePaddingLeft={(this.props.mobileView.get('flightStatusDestination') === 'fixed') ? '24px' : '0'}
                  modelName=".StatusDestination"
                  fullModelName="flightStatusModel.StatusDestination"
                  parentModel="flightStatusModel"
                  showLabel="true"
                  containerPaddingBottom="0px"
                  getRequestData={this.props.onLoadAirports}
                  dataToPopulate={dataArray}
                  selectFirstItemOnBlur="true"
                  locationCode={this.props.globalFlightStatusDestinationLocationCode}
                  resetLocationCode={this.props.setFlightStatusDestinationLocationCode}
                  resetDisplayText={this.props.onSelectFlightStatusDestinationLocation}
                  isValidatorRequired="false"
                />
              : ''}
            </div>
          </div>
          <div className={styles.andOr}>{intl.formatMessage(messages.andOr)}</div>
          <div className={styles.flightNumber}>
            <FormattedMessage {...messages.flightNumberPlaceholderTxt}>
              {(placeholder) => (
                <SlidingInput
                  modelName=".flightNumber"
                  inputId="flightStatusModel.flightNumber"
                  inputType="tel"
                  placeholder={placeholder}
                  inputLabel={intl.formatMessage(messages.flightNumberLabel)}
                  inputErrorMsg={intl.formatMessage(messages.flightNumberError)}
                  screenReaderLabel={intl.formatMessage(messages.flightNumberAriaLabel)}
                  validators={isValidFlightNumberInput}
                  isAriaRequired="false"
                  showLabel="true"
                  maxLength="4"
                  autocompleteOff="off"
                />
              )}
            </FormattedMessage>
          </div>
          <div
            className={styles.datesContainer}
          >
            <Field
              className={styles.dateField}
              model=".dates"
            >
              <label
                htmlFor="dates"
                className={styles.dateLabel}
              >
                {intl.formatMessage(messages.dateLabel)}
              </label>
              <Select
                id="datesDropdown"
                name="dates"
                options={dateOptions}
                onChange={(newValue) => this.updateDateSelected(newValue)}
                value={this.props.selectedStatusDate}
                clearable={false}
                aria-label={` ${dateAriaLabel()} selected. ${intl.formatMessage(messages.dateAriaLabel)}`}
                aria-live="polite"
                openOnFocus
                inputProps={{
                  'aria-controls': 'datesLabel',
                }}
              />
              <div
                className={styles.srOnly}
                id="datesLabel"
                aria-label={`${dateAriaLabel()} selected`}
                aria-live="assertive"
              >
                <FormattedMessage {...messages.dateAriaLabel} />
              </div>
            </Field>
          </div>
          <button
            type="submit"
            className={classNames(styles.findFlightStatusBtn, styles.btnDefault, styles.primaryButton)}
            aria-label={intl.formatMessage(messages.findFlightStatusAriaLabel)}
          >
            <FormattedMessage {...messages.findFlightStatus} />
          </button>
        </div>
      </Form>
    );
  }
}

FlightStatusForm.propTypes = {
  activeTab: PropTypes.string,
  getFlightRequestResponse: PropTypes.func,
  intl: intlShape.isRequired,
  mobileView: PropTypes.object,
  onArrowKeyDown: PropTypes.func,
  onChangeModel: PropTypes.func,
  onItemSelected: PropTypes.func,
  onSelectFlightStatusOriginLocation: PropTypes.func,
  onSelectFlightStatusDestinationLocation: PropTypes.func,
  onLoadAirports: PropTypes.func,
  onUpdateFlightStatusDate: PropTypes.func,
  globalFlightStatusDestinationLocationCode: PropTypes.string,
  globalFlightStatusOriginLocationCode: PropTypes.string,
  selectedStatusDate: PropTypes.string,
  setDateSelected: PropTypes.func,
  onFlightStatusSubmit: PropTypes.func,
  setFlightStatusOriginLocationCode: PropTypes.func,
  setFlightStatusDestinationLocationCode: PropTypes.func,
};

export default injectIntl(FlightStatusForm);
