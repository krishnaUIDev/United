import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import Select from 'react-select';
import { Field, Control, Form, Errors } from 'react-redux-form/lib/immutable';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import config from 'config'; // eslint-disable-line

import AutocompleteLocationContainer from 'containers/AutocompleteLocationContainer';
import BookCalendarRoundtrip from 'components/BookCalendarRoundtrip';
import { CAR_TIME_OPTIONS } from 'containers/BookCarContainer/constants';

import messages from './messages';

import styles from './bookCar.scss';

import hertzLogo from './assets/hertzlogo.png';
import externalLink from './assets/external-link.svg';

const LIST_ITEM_LENGTH = 5;

export class BookCarForm extends Component {
  componentWillMount() {
    this.setValuesFromGlobal(false);
  }

  componentDidMount() {
    this.setValuesFromGlobal(true);
    this.onSetComponentValues(false);
  }

  componentDidUpdate() {
    this.onSetComponentValues(true);
  }

  onSetComponentValues(didUpdate) {
    let newCarModel = this.props.carModel;
    if (didUpdate) {
      if (this.props.sameLocationChecked !== this.props.globalCarSameLocationChecked) {
        newCarModel = newCarModel.set('showDropOffLocation', this.props.globalCarSameLocationChecked);
      }
      if (this.props.hideAgeBox !== this.props.globalCarHideAgeBox) {
        newCarModel = newCarModel.set('hideAgeBox', this.props.globalCarHideAgeBox);
      }
      if (newCarModel.get('pickupTime') && newCarModel.get('dropoffTime')) {
        newCarModel = newCarModel.set('pickupTime', this.props.pickupTime)
          .set('dropoffTime', this.props.dropoffTime);
      }
    } else {
      newCarModel = newCarModel.set('showDropOffLocation', this.props.globalCarSameLocationChecked)
        .set('hideAgeBox', this.props.globalCarHideAgeBox)
        .set('pickupDate', this.props.globalCarPickupDate)
        .set('dropoffDate', this.props.globalCarDropoffDate);
    }
    this.props.onChangeModel('bookCarModel', newCarModel);
  }

  onSameLocationCheckboxCheck(event) {
    const isFalse = event.target.value === 'false';
    this.props.onSelectDropOffLocationChecked(isFalse);
    this.props.onChangeModel('bookCarModel.showDropOffLocation', isFalse);
  }

  onDriverAgeCheckboxCheck(event) {
    const isFalse = event.target.value === 'false';
    this.props.onSelectDriversAgeBoxChecked(isFalse);
    this.props.onChangeModel('bookCarModel.hideAgeBox', isFalse);
  }

  onFindCarsClick(model) {
    window.open(this.submitCarsFormUrl(model), '_blank');
  }

  onLocationSelected(location, locationType, fullModelName, locationCode) {
    const carData = this.props.carData;
    let newCarModel = this.props.carModel;
    if (carData && location) {
      carData.forEach((item) => {
        const fixedNameArray = location.split(',');
        const fixedName = fixedNameArray[0];
        if (item.name === fixedName) {
          switch (locationType) {
            case 'pickupLocation':
              newCarModel = newCarModel.set('puLocationName', item.name)
                .set('puPlaceType', item.placeType)
                .set('puLat', item.lat)
                .set('puLong', item.lng)
                .set('puPlaceKey', item.placeKey)
                .set('puCity', item.city)
                .set('puCountry', item.country)
                .set('puCountryIso', item.countryIso)
                .set('puIata', item.iata)
                .set('puLocationId', item.locationId);
              this.props.onChangeModel('bookCarModel', newCarModel);
              break;
            case 'dropoffLocation':
              newCarModel = newCarModel.set('doLocationName', item.name)
                .set('doPlaceType', item.placeType)
                .set('doLat', item.lat)
                .set('doLong', item.lng)
                .set('doPlaceKey', item.placeKey)
                .set('doCity', item.city)
                .set('doCountry', item.country)
                .set('doCountryIso', item.countryIso)
                .set('doIata', item.iata)
                .set('doLocationId', item.locationId);
              this.props.onChangeModel('bookCarModel', newCarModel);
              break;
            default:
              break;
          }
        }
      });
    }
    this.props.onItemSelected(location, locationType, fullModelName, locationCode);
  }

  setValuesFromGlobal(didMount) {
    if (didMount) {
      this.props.onSelectDropOffLocationChecked(this.props.globalCarSameLocationChecked);
      this.props.onSelectDriversAgeBoxChecked(this.props.globalCarHideAgeBox);
    } else {
      this.props.setDepart(this.props.globalCarPickupDate);
      this.props.setReturn(this.props.globalCarDropoffDate);
    }
  }

  getCarArray() {
    const responseArray = this.props.carData;
    const populateArray = [];
    if (responseArray) {
      let id = -1; // -1 so that it starts at 0 when incremented
      responseArray.forEach((item) => {
        id += 1;
        if (id < LIST_ITEM_LENGTH) {
          let itemToPush;
          let firstLineFull;
          let secondLineFull;
          switch (item.placeType) {
            case 'D': {
              firstLineFull = `${item.name}`;
              secondLineFull = `${item.region}, ${item.country}`;
              itemToPush = (item.region) ? { firstLine: `${firstLineFull}`, secondLine: `${secondLineFull}`, id: `${id}`, ariaLocationTxt: `${firstLineFull} ${secondLineFull}` } : { firstLine: `${firstLineFull}`, secondLine: `${item.country}`, id: `${id}`, ariaLocationTxt: `${firstLineFull} ${item.country}` };
              populateArray.push(itemToPush);
              break;
            }
            case 'C': {
              firstLineFull = `${item.name}`;
              secondLineFull = `${item.region}, ${item.country}`;
              itemToPush = (item.region) ? { firstLine: `${firstLineFull}`, secondLine: `${secondLineFull}`, id: `${id}`, ariaLocationTxt: `${firstLineFull} ${secondLineFull}` } : { firstLine: `${firstLineFull}`, secondLine: `${item.country}`, id: `${id}`, ariaLocationTxt: `${firstLineFull} ${item.country}` };
              populateArray.push(itemToPush);
              break;
            }
            case 'A': {
              const airportCode = (item.iata).toUpperCase();
              const countryCode = (item.countryIso).toUpperCase();
              firstLineFull = `${item.name}, ${countryCode} (${airportCode})`;
              secondLineFull = `${item.region}, ${item.country}`;
              itemToPush = (item.region) ? {
                firstLine: `${firstLineFull}`,
                secondLine: `${secondLineFull}`,
                id: `${id}`,
                ariaLocationTxt: `${firstLineFull} ${secondLineFull}`,
              } : {
                firstLine: `${firstLineFull}`,
                secondLine: `${item.country}`,
                id: `${id}`,
                ariaLocationTxt: `${firstLineFull} ${item.country}`,
              };
              populateArray.push(itemToPush);
              break;
            }
            default:
              itemToPush = { firstLine: `${item.name}`, secondLine: '', id: `${id}`, ariaLocationTxt: `${item.name}` };
              populateArray.push(itemToPush);
              break;
          }
        }
      });
    }
    return populateArray;
  }

  submitCarsFormUrl(model) {
    // Pickup Location Variables
    const pickupLocationText = (model.get('puIata') && model.get('puIata') !== '') ? encodeURIComponent(`${model.get('puLocationName')} (${model.get('puIata')})`) : encodeURIComponent(`${model.get('puLocationName')}`);
    const pickupDateText = moment(model.get('pickupDate')).format('DD-MM-YYYY');
    const pickupDateTextArray = pickupDateText.split('-');
    const pickupTimeTextArray = model.get('pickupTime').split('|');
    const pickupTimeTextCombined = encodeURIComponent(model.get('pickupTime'));
    const pickupCoordinates = `${model.get('puLat')}%2C${model.get('puLong')}`;
    let pickupCity;
    if (model.get('puPlaceType') === 'A') {
      pickupCity = encodeURIComponent(model.get('puCity').trim());
    } else {
      pickupCity = '';
    }
    const pickupCountry = encodeURIComponent(model.get('puCountry').trim());
    const pickupLocationType = (model.get('puPlaceType') === 'A') ? 'airport' : 'location';
    const pickupIata = (model.get('puIata') && model.get('puIata') !== '') ? model.get('puIata') : '';

    const dropoffDateText = moment(model.get('dropoffDate')).format('DD-MM-YYYY');
    const dropoffDateTextArray = dropoffDateText.split('-');
    const dropoffTimeTextArray = model.get('dropoffTime').split('|');
    const dropoffTimeTextCombined = encodeURIComponent(model.get('dropoffTime'));

    let dropoffLocationText;
    let dropoffCoordinates;
    let dropoffCity;
    let dropoffCountry;
    let dropoffLocationType;
    let dropoffIata;
    let dropoffLocationId;
    let dropoffCountryIso;
    let dropoffPlaceType;
    let dropoffPlaceKey;
    if (!this.props.sameLocationChecked) { // Same location is unchecked
      if (model.get('doLocationName') && model.get('doLat') && model.get('doLong') && model.get('doCountry') && model.get('doPlaceType') && model.get('doPlaceKey')) {
        // Values exist in State, set values to vars.
        if (model.get('doIata') && model.get('doIata') !== '') { // optional airport code
          dropoffLocationText = encodeURIComponent(`${model.get('doLocationName')} (${model.get('doIata')})`);
          dropoffIata = model.get('doIata');
        } else {
          dropoffLocationText = encodeURIComponent(`${model.get('doLocationName')}`);
          dropoffIata = pickupIata;
        }
        dropoffCoordinates = `${model.get('doLat')}%2C${model.get('doLong')}`;
        if (model.get('doPlaceType') === 'A') {
          dropoffCity = encodeURIComponent(model.get('doCity').trim());
        } else {
          dropoffCity = '';
        }
        dropoffCountry = encodeURIComponent(model.get('doCountry').trim());
        dropoffLocationType = (model.get('doPlaceType') === 'A') ? 'airport' : 'location';
        dropoffLocationId = model.get('doLocationId');
        dropoffCountryIso = model.get('doCountryIso');
        dropoffPlaceType = model.get('doPlaceType');
        dropoffPlaceKey = model.get('doPlaceKey');
      } else { // assign all dropoff values to pickup if do not exist/blank
        dropoffLocationText = pickupLocationText;
        dropoffCoordinates = pickupCoordinates;
        if (model.get('puPlaceType') === 'A') {
          dropoffCity = pickupCity;
        } else {
          dropoffCity = '';
        }
        dropoffCountry = pickupCountry;
        dropoffLocationType = pickupLocationType;
        dropoffIata = pickupIata;
        dropoffLocationId = model.get('puLocationId');
        dropoffCountryIso = model.get('puCountryIso');
        dropoffPlaceType = model.get('puPlaceType');
        dropoffPlaceKey = model.get('puPlaceKey');
      }
    } else { // Set all values to PickUp
      dropoffLocationText = pickupLocationText;
      dropoffCoordinates = pickupCoordinates;
      dropoffCity = pickupCity;
      dropoffCountry = pickupCountry;
      dropoffLocationType = pickupLocationType;
      dropoffIata = pickupIata;
      dropoffLocationId = model.get('puLocationId');
      dropoffCountryIso = model.get('puCountryIso');
      dropoffPlaceType = model.get('puPlaceType');
      dropoffPlaceKey = model.get('puPlaceKey');
    }
    let driversAgeCheck;
    if (!this.props.hideAgeBox) { // box is unchecked, set age to model
      driversAgeCheck = (model.get('driversAge') === '') ? '40' : model.get('driversAge');
    } else {
      driversAgeCheck = '40';
    }

    // Build the URL strings
    const pickupLocation = `&puLocationType=${pickupLocationType}&puSearchInput=${pickupLocationText}&coordinates=${pickupCoordinates}&ftsEntry=${model.get('puPlaceKey')}&ftsSearch=geosearch&ftsIata=${pickupIata}&location=${model.get('puLocationId')}&ftsLocation=${model.get('puLocationId')}&ftsLocationSearch=${model.get('puLocationId')}&ftsLocationName=${pickupLocationText}&ftsType=${model.get('puPlaceType')}&city=${pickupCity}&ftsCity=${pickupCity}&country=${pickupCountry}&ftsCountry=${pickupCountry}&locationName=${pickupLocationText}&countryCode=${model.get('puCountryIso')}&countryIso=${model.get('puCountryIso')}`;
    const dropoffLocation = `&dropFtsEntry=${dropoffPlaceKey}&dropFtsSearch=geosearch&dropFtsIata=${dropoffIata}&dropCoordinates=${dropoffCoordinates}&dropLocation=${dropoffLocationId}&dropFtsLocation=${dropoffLocationId}&dropFtsLocationSearch=${dropoffLocationId}&dropFtsLocationName=${dropoffLocationText}&dropFtsType=${dropoffPlaceType}&dropCity=${dropoffCity}&dropCountry=${dropoffCountry}&dropFtsCountry=${dropoffCountry}&dropLocationName=${dropoffLocationText}&dropCountryCode=${dropoffCountryIso}&doSearchInput=${dropoffLocationText}&doLocationType=${dropoffLocationType}`;
    const pickupDate = `&puDay=${pickupDateTextArray[0]}&puMonth=${pickupDateTextArray[1]}&puYear=${pickupDateTextArray[2]}`;
    const dropoffDate = `&doDay=${dropoffDateTextArray[0]}&doMonth=${dropoffDateTextArray[1]}&doYear=${dropoffDateTextArray[2]}`;
    const pickupTime = `&puHour=${pickupTimeTextArray[0]}&puMinute=${pickupTimeTextArray[1]}&puTimeCombined=${pickupTimeTextCombined}`;
    const dropoffTime = `&doHour=${dropoffTimeTextArray[0]}&doMinute=${dropoffTimeTextArray[1]}&doTimeCombined=${dropoffTimeTextCombined}`;
    const driversAge = `&driversAge=${driversAgeCheck}`;

    const url = `${config.FIND_CARS_URL}&fromLocChoose=true${driversAge}&puHourAndMinutes=undefined&doHourAndMinutes=undefined${pickupLocation}&searchFromAutoSuggest=true&newSearchResults=true&searchType=geosearch${dropoffLocation}${pickupTime}${pickupDate}${dropoffTime}${dropoffDate}&filterFrom=0&filterTo=1000&doFiltering=false&preflang=en&affUrl=${config.FIND_CARS_URL_BASE}&target=parent`;
    return url;
  }

  updatePickUpTimeValue(newValue) {
    if (newValue) {
      this.props.onSelectPickupTime(newValue.value);
    }
  }

  updateDropOffTimeValue(newValue) {
    if (newValue) {
      this.props.onSelectDropoffTime(newValue.value);
    }
  }

  render() {
    const dataArray = this.getCarArray();
    const intl = this.props.intl;
    const isCarsFormValid = (model) => {
      // Required fields
      const pickupLocation = model.get('pickupLocation');
      const pickupDate = model.get('pickupDate');
      const dropoffDate = model.get('dropoffDate');
      const pickupTime = model.get('pickupTime');
      const dropoffTime = model.get('dropoffTime');

      if (!pickupDate && !dropoffDate) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesSubmitError));
      } else if (!pickupDate && dropoffDate) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesStartError));
      } else if (pickupDate && !dropoffDate) {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesEndError));
      } else {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', '');
      }

      if (pickupLocation && pickupDate && dropoffDate && pickupTime && dropoffTime) {
        return true;
      }
      return false;
    };
    const isStartDateFocused = this.props.globalCalendarFocusedInput === 'startDate';
    const isReturnDateFocused = this.props.globalCalendarFocusedInput === 'endDate';
    let ariaMessageDisplay;
    if (isStartDateFocused) {
      ariaMessageDisplay = this.props.globalCarPickupDate ? intl.formatMessage(messages.pickupDateSelectedAriaLabel) : intl.formatMessage(messages.pickupDateAriaLabel);
    } else if (isReturnDateFocused) {
      ariaMessageDisplay = this.props.globalCarDropoffDate ? intl.formatMessage(messages.dropoffDateSelectedAriaLabel) : intl.formatMessage(messages.dropoffDateAriaLabel);
    }
    return (
      <Form
        model="bookCarModel"
        id="bookCarForm"
        className={styles.bookCarForm}
        onSubmit={(model) => this.onFindCarsClick(model)}
        validators={{
          '': { isCarsFormValid },
        }}
        validateOn="submit"
      >
        <div className={styles.topPanel}>
          <div
            className={styles.carPickupContainer}
          >
            {(this.props.activeTab === 'bookCarTab') ?
              <div
                id="carPickup"
                className={styles.carPickup}
                ref={(input) => { this.carPickupContainer = input; }}
                style={{ position: `${this.props.mobileView.get('pickupLocation')}` }}
              >
                <AutocompleteLocationContainer
                  onArrowKeyDown={this.props.onArrowKeyDown}
                  onItemSelected={(location, locationType, fullModelName, locationCode) => this.onLocationSelected(location, locationType, fullModelName, locationCode)}
                  locationType="pickupLocation"
                  inputId="pickupLocationInput"
                  listItemId="pickupLocationListItem"
                  inputType="text"
                  isRequired="true"
                  isAriaRequired="true"
                  mobilePaddingLeft={(this.props.mobileView.get('pickupLocation') === 'fixed') ? '24px' : '0'}
                  modelName=".pickupLocation"
                  fullModelName="bookCarModel.pickupLocation"
                  parentModel="bookCarModel"
                  showLabel="true"
                  fixedLabel="false"
                  containerPaddingBottom="0px"
                  getRequestData={this.props.onLoadCarLocations}
                  dataToPopulate={dataArray}
                  mobileContainerPaddingBtm="10px"
                  selectFirstItemOnBlur="false"
                  inputFieldPlaceholder={intl.formatMessage(messages.inputFieldPickupPlaceholder)}
                  inputErrorMsg={intl.formatMessage(messages.inputFieldErrorMsg)}
                  inputFieldAriaLabel={intl.formatMessage(messages.carLocationPickupInputAriaLabel)}
                  closePanelAriaLabel={intl.formatMessage(messages.closePanelPickupAriaLabel)}
                  threeCharAutocomplete={intl.formatMessage(messages.threeCharAutocomplete)}
                  useImageIcons="false"
                />
              </div>
            : ''}
          </div>
          <div className={classNames(styles.checkboxWrapper, styles.carDropoffContainer)}>
            <Control.checkbox
              className={styles.customCheckboxSm}
              value={(this.props.sameLocationChecked)}
              onChange={(event) => this.onSameLocationCheckboxCheck(event)}
              model=".showDropOffLocation"
              name="showDropOffLocation"
              id="showDropOffLocation"
            />
            <label htmlFor="showDropOffLocation">
              <FormattedMessage {...messages.returnCarCheckbox} />
            </label>
            { (!this.props.sameLocationChecked) ?
              <div
                id="carDropoff"
                className={styles.carDropoff}
                ref={(input) => { this.carDropoff = input; }}
                style={{ position: `${this.props.mobileView.get('dropoffLocation')}` }}
              >
                {(this.props.activeTab === 'bookCarTab') ?
                  <AutocompleteLocationContainer
                    onArrowKeyDown={this.props.onArrowKeyDown}
                    onItemSelected={(location, locationType, fullModelName, locationCode) => this.onLocationSelected(location, locationType, fullModelName, locationCode)}
                    locationType="dropoffLocation"
                    inputId="dropoffLocationInput"
                    inputType="text"
                    isRequired="false"
                    isAriaRequired="false"
                    mobilePaddingLeft={(this.props.mobileView.get('dropoffLocation') === 'fixed') ? '24px' : '0'}
                    modelName=".dropoffLocation"
                    fullModelName="bookCarModel.dropoffLocation"
                    parentModel="bookCarModel"
                    showLabel="false"
                    fixedLabel="false"
                    containerPaddingBottom="0px"
                    getRequestData={this.props.onLoadCarLocations}
                    dataToPopulate={dataArray}
                    mobileContainerPaddingBtm="10px"
                    inputFieldPlaceholder={intl.formatMessage(messages.inputFieldDropoffPlaceholder)}
                    inputErrorMsg={intl.formatMessage(messages.inputFieldErrorMsg)}
                    inputFieldAriaLabel={intl.formatMessage(messages.carLocationDropoffInputAriaLabel)}
                    closePanelAriaLabel={intl.formatMessage(messages.closePanelDropoffAriaLabel)}
                    threeCharAutocomplete={intl.formatMessage(messages.threeCharAutocomplete)}
                    onLocationSelected={this.props.onDropoffLocationChange}
                    isValidatorRequired="false"
                  />
                : ''}
              </div>
            : ''}
          </div>
        </div>
        <div className={styles.middlePanel}>
          <div className={styles.bookCarCalendar}>
            <label
              htmlFor="bookCarModel.dates"
              className={styles.bookCalendarLabel}
            >
              <FormattedMessage {...messages.datesLabel} />
            </label>
            <div className={styles.bookCalendar}>
              <Field
                component={BookCalendarRoundtrip}
                setFocus={this.hiddenFocusCarDiv}
                model=".dates"
                startDate={this.props.globalCarPickupDate}
                startDateId="bookCarPickupDate"
                endDate={this.props.globalCarDropoffDate}
                endDateId="bookCarDropoffDate"
                departModel="bookCarModel.pickupDate"
                returnModel="bookCarModel.dropoffDate"
                startDatePlaceholderText={intl.formatMessage(messages.datesDeparture)}
                endDatePlaceholderText={intl.formatMessage(messages.datesReturn)}
                screenReaderInputMessage={ariaMessageDisplay}
                infoPanelText={intl.formatMessage(messages.datesInfoPanel)}
                setFocusedInput={this.props.setFocusedInput}
                setDepart={this.props.setDepart}
                setReturn={this.props.setReturn}
                displayFormat="MMM DD"
                startDateErrorLabel="pick-up"
                endDateErrorLabel="drop-off"
                errorMessage={intl.formatMessage(messages.datesError)}
                setCalendarError={this.props.setCalendarError}
                hasCalendarErrors={this.props.hasCalendarErrors}
              />
            </div>
          </div>
          <div id="hiddenFocusCarDiv" ref={(input) => { this.hiddenFocusCarDiv = input; }} tabIndex="-1" className={styles.invisible}>
          </div>
          <div className={classNames(styles.checkboxWrapper, styles.bookCarDriverAge)}>
            <Control.checkbox
              className={styles.customCheckboxSm}
              onChange={(event) => this.onDriverAgeCheckboxCheck(event)}
              model=".hideAgeBox"
              name="hideAgeBox"
              id="hideAgeBox"
              value={(this.props.hideAgeBox)}
            />
            <label htmlFor="hideAgeBox">
              <FormattedMessage {...messages.showDriverAgeBox} />
            </label>
            {(!this.props.hideAgeBox) ?
              <div className={styles.inputFieldGroup}>
                <Control.text
                  model=".driversAge"
                  id="driversAge"
                  type="number"
                  placeholder={intl.formatMessage(messages.driversAgePlaceholder)}
                  validateOn="blur"
                  aria-label={intl.formatMessage(messages.driversAgePlaceholder)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={styles.inputField}
                  min={10}
                  max={99}
                  required
                />
                <Errors
                  model=".driversAge"
                  show={(field) => field.touched && !field.focus}
                  messages={{
                    valueMissing: intl.formatMessage(messages.invalidAge),
                    rangeUnderflow: intl.formatMessage(messages.invalidAge),
                    rangeOverflow: intl.formatMessage(messages.invalidAge),
                  }}
                  wrapper={() =>
                    <div
                      className={styles.inputFieldErrorMsg}
                      role="alert"
                    >
                      {intl.formatMessage(messages.invalidAge)}
                    </div>
                  }
                />
              </div>
            : ''}
          </div>
        </div>
        <div className={styles.bottomPanel}>
          <div className={styles.pickUpTime}>
            <Field
              model=".pickupTime"
              className={styles.selectInput}
            >
              <label htmlFor="pickupTime">
                <FormattedMessage {...messages.pickUpTime} />
              </label>
              <Select
                id="pickupTime"
                name="pickupTime"
                options={CAR_TIME_OPTIONS}
                onChange={(newValue) => this.updatePickUpTimeValue(newValue)}
                value={this.props.pickupTime}
                openOnFocus
                clearable={false}
                inputProps={{
                  'aria-controls': 'pickupTimeLabel',
                }}
              />
              <div
                className={styles.srOnly}
                id="pickupTimeLabel"
                aria-label={`${moment(this.props.pickupTime, 'H|m').format('h:mm a')} selected`}
                aria-live="polite"
              ></div>
            </Field>
          </div>
          <div className={styles.dropOffTime}>
            <Field
              model=".dropoffTime"
              className={styles.selectInput}
            >
              <label htmlFor="dropoffTime">
                <FormattedMessage {...messages.dropOffTime} />
              </label>
              <Select
                id="dropoffTime"
                name="dropoffTime"
                options={CAR_TIME_OPTIONS}
                onChange={(newValue) => this.updateDropOffTimeValue(newValue)}
                value={this.props.dropoffTime}
                openOnFocus
                clearable={false}
                inputProps={{
                  'aria-describedby': 'dropOffTimeLabel',
                }}
              />
              <div
                className={styles.srOnly}
                id="dropoffTimeLabel"
                aria-label={`${moment(this.props.dropoffTime, 'H|m').format('h:mm a')} selected`}
                aria-live="polite"
              ></div>
            </Field>
          </div>
        </div>
        <div className={styles.submitPanel}>
          <div className={styles.submitBtnContainer}>
            <button
              type="submit"
              role="button"
              className={classNames(styles.findCarsBtn, styles.btnDefault, styles.primaryButton)}
            >
              {intl.formatMessage(messages.findCars)}
              <img src={externalLink} alt="" role="presentation" aria-hidden="true" />
            </button>
          </div>
          <div className={styles.logoPanelContainer}>
            <img src={hertzLogo} alt={intl.formatMessage(messages.hertzLogo)} role="presentation" aria-hidden="true" />
          </div>
          <div className={styles.messagePanelContainer}>
            <FormattedMessage {...messages.unitedDiscount} />
          </div>
        </div>
      </Form>
    );
  }
}

BookCarForm.propTypes = {
  activeTab: PropTypes.string,
  carData: PropTypes.array,
  carModel: PropTypes.object,
  dropoffTime: PropTypes.string,
  globalCarSameLocationChecked: PropTypes.bool,
  globalCarHideAgeBox: PropTypes.bool,
  globalCarPickupDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  globalCarDropoffDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  hasCalendarErrors: PropTypes.object,
  hideAgeBox: PropTypes.bool,
  mobileView: PropTypes.object,
  onArrowKeyDown: PropTypes.func,
  onChangeModel: PropTypes.func,
  onDropoffLocationChange: PropTypes.func,
  onItemSelected: PropTypes.func,
  onLoadCarLocations: PropTypes.func,
  onSelectDropOffLocationChecked: PropTypes.func,
  onSelectDriversAgeBoxChecked: PropTypes.func,
  onSelectPickupTime: PropTypes.func,
  onSelectDropoffTime: PropTypes.func,
  pickupTime: PropTypes.string,
  sameLocationChecked: PropTypes.bool,
  setCalendarError: PropTypes.func,
  setDepart: PropTypes.func,
  setReturn: PropTypes.func,
  setFocusedInput: PropTypes.func,
  globalCalendarFocusedInput: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(BookCarForm);
