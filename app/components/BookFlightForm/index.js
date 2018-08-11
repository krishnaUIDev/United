import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';

import { Field, Control, Form } from 'react-redux-form/lib/immutable';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import config from 'config'; // eslint-disable-line

import AutocompleteLocationContainer from 'containers/AutocompleteLocationContainer';
import { ENTER_KEY, TAB_KEY } from 'containers/App/constants';
import BookCalendar from 'containers/BookCalendar';
import FlexibleDates from 'components/FlexibleDates';
import SlidingInput from 'components/SlidingInput';
import BookPassengers from '../BookPassengers';

import { isIPhone } from '../../utils/deviceSpecific';

import messages from './messages';
import styles from './bookFlightForm.scss';

export class BookFlightForm extends Component {
  componentWillMount() {
    this.setValuesFromGlobal(false);
  }

  componentDidMount() {
    this.setValuesFromGlobal(true);
    this.onSetComponentValues(false);

    if (isIPhone()) {
      try {
        const cabinClassSelectBox = findDOMNode(this.cabinClassSelectBox);
        const valueNode = cabinClassSelectBox.getElementsByClassName('Select-value')[0];
        if (valueNode) valueNode.setAttribute('aria-hidden', 'true');
      } catch (e) {
        // no need to log the error, we just need to make sure that
        // findDOMNode exception does not break the whole app
      }
    }
  }

  componentDidUpdate() {
    this.onSetComponentValues(true);
  }

  onSetComponentValues(didUpdate) {
    let newFlightModel = this.props.flightModel;
    const flightType = (this.props.globalRoundtripChecked) ? 'roundTrip' : 'oneWay';
    // If component updated, only dispatch actions for the values that actually changed. If component did not update, but did mount, then dispatch actions for all so that all values are set when user has returned to the page.
    if (didUpdate) {
      if (this.props.flightOrigin !== this.props.globalFlightOrigin) {
        newFlightModel = newFlightModel.set('Origin', this.props.globalFlightOrigin);
      }
      if (this.props.flightDestination !== this.props.globalFlightDestination) {
        newFlightModel = newFlightModel.set('Destination', this.props.globalFlightDestination);
      }
      if ((this.passengerInput) && (this.passengerInput.passengerInput.value !== this.getTravelerCount())) {
        newFlightModel = newFlightModel.set('passengers', this.getTravelerCount());
      }
      if (this.props.flexibleDatesChecked !== this.props.globalFlexibleDatesChecked) {
        newFlightModel = newFlightModel.set('Flexible', this.props.globalFlexibleDatesChecked);
      }
      if (this.props.flexMonth !== this.props.globalFlexMonth) {
        newFlightModel = newFlightModel.set('flexMonth', this.props.globalFlexMonth);
      }
      if (this.props.tripLength !== this.props.globalTripLength) {
        newFlightModel = newFlightModel.set('tripLength', this.props.globalTripLength);
      }
      if (this.props.nonstopChecked !== this.props.globalNonstopFlightChecked) {
        newFlightModel = newFlightModel.set('NonStopOnly', this.props.globalNonstopFlightChecked);
      }
      if (this.props.corporateBook !== this.props.globalCorporateBookChecked) {
        newFlightModel = newFlightModel.set('CorporateBooking', this.props.globalCorporateBookChecked);
      }
      if ((this.awardCheckbox) && (this.awardCheckbox.props.value !== this.props.globalAwardTravelIsSelected)) {
        newFlightModel = newFlightModel.set('AwardTravel', this.props.globalAwardTravelIsSelected);
      }
      if (this.props.roundtripChecked !== this.props.globalRoundtripChecked) {
        newFlightModel = newFlightModel.set('flightType', flightType);
      }
    } else {
      newFlightModel = newFlightModel.set('Origin', this.props.globalFlightOrigin)
        .set('Destination', this.props.globalFlightDestination)
        .set('passengers', this.getTravelerCount())
        .set('Flexible', this.props.globalFlexibleDatesChecked)
        .set('NonStopOnly', this.props.globalNonstopFlightChecked)
        .set('CorporateBooking', this.props.globalCorporateBookChecked)
        .set('AwardTravel', this.props.globalAwardTravelIsSelected)
        .set('flightType', flightType)
        .set('flexMonth', this.props.globalFlexMonth)
        .set('tripLength', this.props.globalTripLength);
    }
    // Dispatch once  before component updated and once after component updated to avoid browser Caching issue.
    newFlightModel = newFlightModel.set('DepartDate', this.props.globalFlightStartDate);
    newFlightModel = newFlightModel.set('ReturnDate', this.props.globalFlightEndDate);
    this.props.onChangeModel('bookFlightModel', newFlightModel);
  }

  onAwardChecked(event) {
    this.props.selectAwardTravel(event.target.value === 'false');
    this.setCabinSelected();
  }

  onInputKeyDown(event) {
    const input = event.target;
    const selectedStart = (input) ? input.selectionStart : true;
    const selectedEnd = (input) ? input.selectionEnd : false;
    // 9 is tab, 13 is enter
    if (((event.keyCode === TAB_KEY && !event.shiftKey) && ((selectedStart === 0 && selectedEnd === 0) || (selectedStart !== selectedEnd))) || event.keyCode === ENTER_KEY) {
      this.props.onPassengerInputClick(true);
    }
  }

  onFlightTypeChange(event) {
    const isChecked = (event.target.value === 'roundTrip');
    this.props.onRoundtripChecked(isChecked);
    setTimeout(() => {
      const flightType = (this.props.globalRoundtripChecked) ? 'roundTrip' : 'oneWay';
      this.props.onChangeModel('bookFlightModel.flightType', flightType);
    }, 1);
  }

  onFlexibleDatesCheckboxCheck(event) {
    const isFalse = event.target.value === 'false';
    this.props.onFlexibleDatesChecked(isFalse);
    this.props.onChangeModel('bookFlightModel.Flexible', isFalse);
  }

  onFindFlightFormSubmit(model) {
    setTimeout(() => {
      window.location = this.getFindFlightsURL(model);
    }, 1);
  }

  getFindFlightsURL(model) {
    // get location code from global reducer rather than model location string
    const originLocation = `f=${this.props.globalOriginLocationCode}`;
    const destinationLocation = `&t=${this.props.globalDestinationLocationCode}`;

    // Add the trip length value to the start date DD value
    const flexMonthValue = moment(model.get('flexMonth'), 'YYYY-MM-DD').add(model.get('tripLength'), 'day').format('YYYY-MM-DD');
    const flexOrTripLength = (model.get('Flexible')) ? `&r=${flexMonthValue}` : `&r=${moment(model.get('ReturnDate')).format('YYYY-MM-DD')}`;

    // convert dates to YYYY-MM-DD formatted string or use flexMonth prop
    const startDate = (model.get('Flexible')) ? `&d=${model.get('flexMonth')}` : `&d=${moment(model.get('DepartDate')).format('YYYY-MM-DD')}`;
    const endDate = (this.props.globalRoundtripChecked) ? flexOrTripLength : '';
    const tripType = (!this.props.globalRoundtripChecked) ? '&tt=1' : '';
    const awardTravelChecked = (this.props.globalAwardTravelIsSelected) ? '&at=1' : '';
    let nonstopChecked = '';
    const isRoundtrip = model.get('flightType') === 'roundTrip';
    if (model.get('NonStopOnly')) {
      if (isRoundtrip) {
        nonstopChecked = '&sc=1,7'; // sc=7,7 if nonstop IS checked and roundtrip
      } else {
        nonstopChecked = '&sc=1'; // sc=7 if nonstop IS checked and oneway
      }
    } else if (isRoundtrip) {
      nonstopChecked = '&sc=7,7'; // sc=7,7 if nonstop is NOT checked and roundtrip
    } else {
      nonstopChecked = '&sc=7'; // sc=7 if nonstop is NOT checked and oneway
    }
    let cabinType = '';
    if (this.props.isFirstClassSelected) {
      cabinType = '&act=2&ct=1';
    } else if (this.props.selectedCabin === 'awardBusinessFirst') {
      cabinType = '&act=1&ct=1';
    } else if (this.props.selectedCabin === 'businessFirst') {
      cabinType = '&ct=1';
    }

    const flexibleDatesChecked = (model.get('Flexible')) ? `&fm=${model.get('flexMonth')}&tl=${model.get('tripLength')}&co=1` : '';
    const travelers = this.getTravelersUrlString();
    const url = `${config.UAL_BASE_URL}${config.FIND_FLIGHTS_URL}rev?${originLocation}${destinationLocation}${startDate}${endDate}${flexibleDatesChecked}${tripType}${awardTravelChecked}${nonstopChecked}${cabinType}${travelers}&taxng=1`;
    return url;
  }
  getTravelersUrlString() {
    const adults = this.getTravelerParam('Adults (18-64)');
    const seniors = this.getTravelerParam('Seniors (65+)');
    const infantsUnder2 = this.getTravelerParam('Infants (under 2)');
    const infantsLap = this.getTravelerParam('Infants on lap');
    const children16to17 = this.getTravelerParam('Children (15-17)');
    const children12to15 = this.getTravelerParam('Children (12-14)');
    const children5to11 = this.getTravelerParam('Children (5-11)');
    const children2to4 = this.getTravelerParam('Children (2-4)');
    let travelers = `&px=${adults},${seniors},${children2to4},${children5to11},${children12to15},${children16to17},${infantsUnder2},${infantsLap}`;
    const adultVal = this.props.globalPassengersToBook.get('Adults (18-64)');
    travelers = (travelers === `&px=${adultVal},,,,,,,`) ? `&px=${adultVal}` : travelers;
    return travelers;
  }

  getTravelerParam(travelers) {
    const value = this.props.globalPassengersToBook.get(travelers);
    const valueCountInt = parseInt(value, 10);
    const valueToReturn = (valueCountInt > 0) ? value : '';
    return valueToReturn;
  }

  setValuesFromGlobal(didMount) {
    if (didMount) {
      this.props.corporateBookChecked(this.props.globalCorporateBookChecked);
      this.props.onNonstopChecked(this.props.globalNonstopFlightChecked);
      this.props.onFlexibleDatesChecked(this.props.globalFlexibleDatesChecked);
      this.props.selectAwardTravel(this.props.globalAwardTravelIsSelected);
      this.updateCabinClassValue({ value: this.props.globalCabinClassSelected });
      this.props.onRoundtripChecked(this.props.globalRoundtripChecked);
    } else {
      this.props.setDepart(this.props.globalFlightStartDate);
      this.props.setReturn(this.props.globalFlightEndDate);
      this.props.onSelectFlightOriginLocation(this.props.globalFlightOrigin);
      this.props.onSelectFlightDestinationLocation(this.props.globalFlightDestination);
      this.props.updateFullPassengers(this.props.globalPassengersToBook);
    }
  }

  setCabinSelected() {
    // The following function determines what to switch the input option to when switching between award travel since the names are different. (ex: econ vs awardEcon)
    if (this.props.awardTravelChecked) {
      switch (this.props.selectedCabin) {
        case 'awardEcon':
          this.updateCabinClassValue({ value: 'econ' });
          break;
        case 'awardBusinessFirst':
          this.updateCabinClassValue({ value: 'businessFirst' });
          break;
        case 'awardFirst': // Set this to the businessFirst as it doesn't exist in the other array, but can still be remembered by this.props.isFirstClassSelected
          this.updateCabinClassValue({ value: 'businessFirst' });
          break;
        default:
          this.updateCabinClassValue({ value: 'econ' });
      }
    } else {
      switch (this.props.selectedCabin) {
        case 'econ':
          this.updateCabinClassValue({ value: 'awardEcon' });
          break;
        case 'businessFirst':
          if (this.props.isFirstClassSelected) {
            this.updateCabinClassValue({ value: 'awardFirst' });
          } else {
            this.updateCabinClassValue({ value: 'awardBusinessFirst' });
          }
          break;
        default:
          this.updateCabinClassValue({ value: 'awardEcon' });
      }
    }
  }

  getTravelerCount() {
    const passengers = this.props.globalPassengersToBook;
    const passengersCountArr = [];
    let totalCount = 0;
    let hasOneInput;
    passengers.keySeq().forEach((currValue) => {
      const currValCount = this.props.globalPassengersToBook.get(currValue);
      if (currValCount > 0) {
        let curValSplit = currValue;
        if (currValue.indexOf('(') >= 0) {
          curValSplit = currValue.substr(0, currValue.indexOf('('));
        }
        const label = (curValSplit === 'Infants on lap') ? 'Infants' : curValSplit;
        passengersCountArr.push(`${currValCount} ${label.toLowerCase()}`);
        totalCount += parseInt(currValCount, 10);
        hasOneInput = (totalCount === 1);
      }
    });
    let travelersForInput;
    if (passengersCountArr.length > 1) {
      travelersForInput = `${totalCount} travelers`;
    } else if (passengersCountArr.length === 1) {
      travelersForInput = passengersCountArr[0];
      if (hasOneInput) {
        travelersForInput = travelersForInput.trim();
        if (travelersForInput.slice(-1) === 's') {
          travelersForInput = travelersForInput.substring(0, travelersForInput.length - 1);
        } else {
          travelersForInput = '1 child';
        }
      }
    }
    return travelersForInput;
  }

  setFormHiddenField(name, value) {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', name);
    hiddenField.setAttribute('value', value);
    return hiddenField;
  }

  updateCabinClassValue(newValue) {
    const intl = this.props.intl;
    if (newValue) {
      // Determine which option is selected and retain this.props.isFirstClassSelected if businessFirst is checked, otherwise set to false. This is to retain First class selection on Award travel searches.
      switch (newValue.value) {
        case 'econ':
          this.props.setCabinLabel(intl.formatMessage(messages.economy));
          break;
        case 'awardEcon':
          this.props.setCabinLabel(intl.formatMessage(messages.economy));
          break;
        case 'businessFirst':
          this.props.setCabinLabel(intl.formatMessage(messages.businessFirst));
          break;
        case 'awardBusinessFirst':
          this.props.setCabinLabel(intl.formatMessage(messages.business));
          break;
        case 'awardFirst':
          this.props.onSelectFirstClass(true);
          this.props.setCabinLabel(intl.formatMessage(messages.first));
          break;
        default:
          this.props.onSelectFirstClass(false);
      }
      this.props.onSelectCabinClass(newValue.value);
    }
  }

  submitFORM(params, isAllSearch) {
    const method = 'post';
    const path = `${config.UAL_BASE_URL}${config.ADVANCED_FLIGHT_SEARCH_URL}`;

    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    // Move the submit function to another variable so that it doesn't get overwritten.
    form.submitFunction = form.submit;

    let hiddenField = document.createElement('input');
    // add 'more' parameter if from all search link
    if (isAllSearch) {
      hiddenField = this.setFormHiddenField('more', 'more');
      form.appendChild(hiddenField);
    }
    // append extra parameters
    hiddenField = this.setFormHiddenField('multiple', 'multiple');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('FareTypes', 'lf');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('hdnMaxAllowedTravelersCount', '9');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('autoCompAirportText', 'See full airport list');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('clearHisText', 'Clear history');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('recentsearchLazyload', 'True');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('recentSearchSubmit', 'False');
    form.appendChild(hiddenField);
    hiddenField = this.setFormHiddenField('recentsearchTripCloning', 'True');
    form.appendChild(hiddenField);
    // append passengers to book age types
    const passengersArray = [
      { stateName: 'Adults (18-64)', modelName: 'NumOfAdults' },
      { stateName: 'Seniors (65+)', modelName: 'NumOfSeniors' },
      { stateName: 'Infants (under 2)', modelName: 'NumOfInfants' },
      { stateName: 'Infants on lap', modelName: 'NumOfLapInfants' },
      { stateName: 'Children (15-17)', modelName: 'NumOfChildren04' },
      { stateName: 'Children (12-14)', modelName: 'NumOfChildren03' },
      { stateName: 'Children (5-11)', modelName: 'NumOfChildren02' },
      { stateName: 'Children (2-4)', modelName: 'NumOfChildren01' },
    ];
    for (const item of passengersArray) { // eslint-disable-line
      hiddenField = this.setFormHiddenField(item.modelName, this.props.globalPassengersToBook.get(item.stateName));
      form.appendChild(hiddenField);
    }
    // append flightType (aka SearchTypeMain)
    const flightTypeValue = (this.props.globalRoundtripChecked) ? 'roundTrip' : 'oneWay';
    hiddenField = this.setFormHiddenField('SearchTypeMain', flightTypeValue);
    form.appendChild(hiddenField);
    // append elements in form
    for (const key of params[0]) { // eslint-disable-line
      switch (key.name) {
        case 'bookFlightModel.Origin':
          hiddenField = this.setFormHiddenField('Origin', this.props.globalOriginLocationCode);
          break;
        case 'bookFlightModel.Destination':
          hiddenField = this.setFormHiddenField('Destination', this.props.globalDestinationLocationCode);
          break;
        default:
          hiddenField = this.setFormHiddenField(key.name, key.value);
          break;
      }
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    setTimeout(() => {
      form.submitFunction();
    }, 100);
  }

  render() {
    const intl = this.props.intl;
    const dataArray = this.props.getFlightRequestResponse();

    const childrenTitle = intl.formatMessage(messages.childrenTitle); // Children
    const adultTitle = intl.formatMessage(messages.adultTitle); // Adults
    const seniorsTitle = intl.formatMessage(messages.seniorsTitle); // Seniors
    const infantsTitle = intl.formatMessage(messages.infantsTitle); // Infants
    const lapInfantsTitle = intl.formatMessage(messages.lapInfantsTitle); // Infants on lap

    const adultRange = intl.formatMessage(messages.adultRange); // 18-64
    const seniorRange = intl.formatMessage(messages.seniorRange); // 65
    const infantRange = intl.formatMessage(messages.infantRange); // under 2
    const childrenRangeA = intl.formatMessage(messages.childrenRangeA); // 15-17
    const childrenRangeB = intl.formatMessage(messages.childrenRangeB); // 12-14
    const childrenRangeC = intl.formatMessage(messages.childrenRangeC); // 5-11
    const childrenRangeD = intl.formatMessage(messages.childrenRangeD); // 2-4

    const adultFull = intl.formatMessage(messages.adultFull); // Adults (18-64)
    const seniorFull = intl.formatMessage(messages.seniorFull); // Seniors (65+)
    const infantsFull = intl.formatMessage(messages.infantsFull); // Infants (under 2)
    const childrenFullA = intl.formatMessage(messages.childrenFullA); // Children (15-17)
    const childrenFullB = intl.formatMessage(messages.childrenFullB); // Children (12-14)
    const childrenFullC = intl.formatMessage(messages.childrenFullC); // Children (5-11)
    const childrenFullD = intl.formatMessage(messages.childrenFullD); // Children (2-4)

    const passengerArrayA = (screen.width > 786) ? [adultFull, seniorFull, infantsFull, lapInfantsTitle] : [adultFull, seniorFull, childrenFullA, childrenFullB];
    const passengerArrayB = (screen.width > 786) ? [childrenFullA, childrenFullB, childrenFullC, childrenFullD] : [childrenFullC, childrenFullD, infantsFull, lapInfantsTitle];
    const fullPassArr = passengerArrayA.concat(passengerArrayB);

    const travelers = this.getTravelerCount();

    const cabinClassOptions = (!this.props.globalAwardTravelIsSelected) ? [
      {
        value: 'econ',
        label: intl.formatMessage(messages.economy),
      },
      {
        value: 'businessFirst',
        label: intl.formatMessage(messages.businessFirst),
      },
    ] : [
      {
        value: 'awardEcon',
        label: intl.formatMessage(messages.economy),
      },
      {
        value: 'awardBusinessFirst',
        label: intl.formatMessage(messages.business),
      },
      {
        value: 'awardFirst',
        label: intl.formatMessage(messages.first),
      },
    ];

    const passengerModelObject = {
      'Adults (18-64)': 'NumOfAdults',
      'Seniors (65+)': 'NumOfSeniors',
      'Infants (under 2)': 'NumOfInfants',
      'Infants on lap': 'NumOfLapInfants',
      'Children (15-17)': 'NumOfChildren04',
      'Children (12-14)': 'NumOfChildren03',
      'Children (5-11)': 'NumOfChildren02',
      'Children (2-4)': 'NumOfChildren01',
    };
    const bookPassengersContainer = (this.props.showTravelerMenu) ? (
      <BookPassengers
        parent="bookFlightModel"
        modelName=".passengers"
        aria-label="Passengers"
        arrayA={passengerArrayA}
        arrayB={passengerArrayB}
        fullArray={fullPassArr}
        onPassengerInputClick={() => this.props.onPassengerInputClick(false)}
        onSetActiveField={(active) => this.props.onSetActiveField(active)}
        reducerDefaultToOne={'Adults (18-64)'}
        clearReducerArray={['Seniors (65+)', 'Infants (under 2)', 'Infants on lap', 'Children (15-17)', 'Children (12-14)', 'Children (5-11)', 'Children (2-4)']}
        modelDefaultToOne=".NumOfAdults"
        clearModelArray={['NumOfSeniors', 'NumOfInfants', 'NumOfLapInfants', 'NumOfChildren04', 'NumOfChildren03', 'NumOfChildren02', 'NumOfChildren01']}
        parentModel="bookFlightModel"
        mainActiveField="bookPassengers"
        isDesktopTitleArrayA={[adultTitle, seniorsTitle, infantsTitle, lapInfantsTitle]}
        isMobileTitleArrayA={[adultTitle, seniorsTitle, childrenTitle, childrenTitle]}
        isDesktopDetailArrayA={[adultRange, seniorRange, infantRange, '']}
        isMobileDetailArrayA={[adultRange, seniorRange, childrenRangeA, childrenRangeB]}
        isDesktopTitleArrayB={[childrenTitle, childrenTitle, childrenTitle, childrenTitle]}
        isMobileTitleArrayB={[childrenTitle, childrenTitle, infantsTitle, lapInfantsTitle]}
        isDesktopDetailArrayB={[childrenRangeA, childrenRangeB, childrenRangeC, childrenRangeD]}
        isMobileDetailArrayB={[childrenRangeC, childrenRangeD, infantRange, '']}
        containerStyle={styles.passengerDropdownContainer}
        legendId="bookPassengersLegend"
        arrayIndexsA={['0', '1', '2', '3']}
        arrayIndexsB={['0', '1', '2', '3']}
        sectionMaxLimit={9}
        areMultipleSections="true"
        showDivider="true"
        passengerModelObject={passengerModelObject}
        containsInfants="true"
        infantTitleA={infantsFull}
        infantTitleB={lapInfantsTitle}
        numberOfTravelersTotal="8"
        acceptableFocus={['Adults', 'Seniors', 'Infants', 'Children', 'clearPassengers', 'passengersCloseBtn', 'passengersCloseBtn', 'dropdownContainer', 'applyPassengersBtn', 'bookPassengersLegend']}
        ariaSectionStyle={styles.ariaSelection}
        sectionAstyle={styles.passengersA}
        showTravelerMenu={this.props.showTravelerMenu}
        passengersToBook={this.props.passengersToBook}
        toDisableBtns={this.props.toDisableBtns}
        onChangePassenger={this.props.onChangePassenger}
        onFocusModel={this.props.onFocusModel}
        onDisableTravelerButtons={this.props.onDisableTravelerButtons}
        onChangeModel={this.props.onChangeModel}
      />
    ) : '';

    const isFlightFormValid = (fullModel) => {
      const origin = fullModel.get('Origin');
      const destination = fullModel.get('Destination');
      const passengers = fullModel.get('passengers');
      const cabinType = (fullModel.get('AwardTravel')) ? 'awardCabinType' : 'cabinType';
      const cabinClass = fullModel.get(cabinType);
      const startDate = (this.props.globalFlexibleDatesChecked) ? this.props.globalFlexMonth : fullModel.get('DepartDate');
      const endDate = (this.props.globalRoundtripChecked) ? fullModel.get('ReturnDate') : true;
      const tripLength = this.props.globalTripLength;
      if (!startDate && !endDate && this.props.globalRoundtripChecked) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesSubmitError));
      } else if (!startDate && this.props.globalRoundtripChecked && endDate) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesStartError));
      } else if (startDate && this.props.globalRoundtripChecked && !endDate) {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesEndError));
      } else {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', '');
      }
      if (origin && destination && passengers && cabinClass && startDate && (endDate || tripLength)) {
        return true;
      }
      return false;
    };
    let ariaMessageDisplay;
    const isStartDateFocused = this.props.globalCalendarFocusedInput === 'startDate';
    const isReturnDateFocused = this.props.globalCalendarFocusedInput === 'endDate';
    if (this.props.globalRoundtripChecked) {
      if (isStartDateFocused) {
        ariaMessageDisplay = this.props.globalFlightStartDate ? intl.formatMessage(messages.departDateSelectedAriaLabel) : intl.formatMessage(messages.departDateAriaLabel);
      } else if (isReturnDateFocused) {
        ariaMessageDisplay = this.props.globalFlightEndDate ? intl.formatMessage(messages.returnDateSelectedAriaLabel) : intl.formatMessage(messages.returnDateAriaLabel);
      }
    } else {
      ariaMessageDisplay = this.props.globalFlightStartDate ? intl.formatMessage(messages.departDateSelectedAriaLabel) : intl.formatMessage(messages.departDateAriaLabel);
    }
    return (
      <Form
        model="bookFlightModel"
        onSubmit={(model) => this.onFindFlightFormSubmit(model)}
        validators={{
          '': { isFlightFormValid },
        }}
        id="bookFlightForm"
        className={styles.bookFlightForm}
        validateOn="submit"
      >
        <div
          aria-hidden={(this.props.expanded ? 'false' : 'true')}
          className={(!this.props.expanded ? classNames(styles.hideWhenCollapsed, styles.formHeader) : styles.formHeader)}
        >
          <Field
            model=".flightType"
            name="flightType"
            className={styles.radioFieldGroup}
            component="fieldset"
            dynamic={false}
          >
            <div className={styles.radioContainer}>
              <label htmlFor="roundtrip" className={styles.radioBtnContainer} >
                <FormattedMessage {...messages.roundtrip} />
                <input
                  type="radio"
                  id="roundtrip"
                  onChange={(event) => this.onFlightTypeChange(event)}
                  aria-label={intl.formatMessage(messages.roundtripAriaLabel)}
                  value="roundTrip"
                  tabIndex="0"
                  checked={this.props.globalRoundtripChecked}
                />
                <span
                  className={styles.checkmark}
                  ref={(input) => { this.roundtripSpan = input; }}
                />
              </label>
              <label htmlFor="oneway" className={styles.radioBtnContainer} >
                <FormattedMessage {...messages.oneway} />
                <input
                  tabIndex="0"
                  type="radio"
                  id="oneway"
                  onChange={(event) => this.onFlightTypeChange(event)}
                  value="oneWay"
                  aria-label={intl.formatMessage(messages.onewayAriaLabel)}
                  checked={!(this.props.globalRoundtripChecked)}
                />
                <span
                  className={styles.checkmark}
                  ref={(input) => { this.onewaySpan = input; }}
                />
              </label>
              <button
                type="button"
                className={styles.multiCity}
                title={intl.formatMessage(messages.multicity)}
                onClick={() => this.submitFORM(document.getElementsByTagName('form'), false)}
                tabIndex="0"
              >
                <FormattedMessage {...messages.multicity} />
              </button>
            </div>
          </Field>
        </div>
        <div
          className={(this.props.expanded ? classNames(styles.locationField, styles.expanded) : styles.locationField)}
        >
          <div
            id="pickupContainer"
            className={styles.pickupContainer}
            style={{ position: `${this.props.mobileView.get('bookFlightOrigin')}` }}
          >
            {(this.props.activeTab === 'bookFlightTab') ?
              <AutocompleteLocationContainer
                onArrowKeyDown={this.props.onArrowKeyDown}
                onItemSelected={this.props.onItemSelected}
                locationType="bookFlightOrigin"
                inputId="bookFlightOriginInput"
                listItemId="flightOriginListItem"
                inputType="text"
                isRequired="true"
                isAriaRequired="true"
                inputFieldPlaceholder={intl.formatMessage(messages.fromLabelTxt)}
                inputErrorMsg={intl.formatMessage(messages.fromError)}
                inputFieldAriaLabel={intl.formatMessage(messages.fromAriaLabel)}
                closePanelAriaLabel={intl.formatMessage(messages.formClosePanelAriaLabel)}
                threeCharAutocomplete={intl.formatMessage(messages.formThreeCharAutocomplete)}
                mobilePaddingLeft={(this.props.mobileView.get('bookFlightOrigin') === 'fixed') ? '24px' : '0'}
                modelName=".Origin"
                fullModelName="bookFlightModel.Origin"
                parentModel="bookFlightModel"
                showLabel="true"
                containerPaddingBottom="0px"
                getRequestData={this.props.onLoadAirports}
                dataToPopulate={dataArray}
                selectFirstItemOnBlur="true"
                locationCode={this.props.globalOriginLocationCode}
                resetLocationCode={this.props.onSetOriginLocationCode}
                onLocationSelected={this.props.onSelectFlightOriginLocation}
                resetDisplayText={this.props.onSelectFlightOriginLocation}
              />
          : ''}
          </div>
          <div
            id="destinationPickupContainer"
            className={styles.destinationPickupContainer}
            style={{ position: `${this.props.mobileView.get('bookFlightDestination')}` }}
          >
            {(this.props.activeTab === 'bookFlightTab') ?
              <AutocompleteLocationContainer
                onArrowKeyDown={this.props.onArrowKeyDown}
                onItemSelected={this.props.onItemSelected}
                locationType="bookFlightDestination"
                inputId="bookFlightDestinationInput"
                listItemId="flightDestinationListItem"
                inputType="text"
                isRequired="true"
                isAriaRequired="true"
                inputFieldPlaceholder={intl.formatMessage(messages.toLabel)}
                inputErrorMsg={intl.formatMessage(messages.toError)}
                inputFieldAriaLabel={intl.formatMessage(messages.toAriaLabel)}
                closePanelAriaLabel={intl.formatMessage(messages.formClosePanelAriaLabel)}
                threeCharAutocomplete={intl.formatMessage(messages.formToThreeCharAutocomplete)}
                mobilePaddingLeft={(this.props.mobileView.get('bookFlightDestination') === 'fixed') ? '24px' : '0'}
                modelName=".Destination"
                fullModelName="bookFlightModel.Destination"
                parentModel="bookFlightModel"
                showLabel="true"
                containerPaddingBottom="0px"
                getRequestData={this.props.onLoadAirports}
                dataToPopulate={dataArray}
                selectFirstItemOnBlur="true"
                locationCode={this.props.globalDestinationLocationCode}
                resetLocationCode={this.props.onSetDestinationLocationCode}
                onLocationSelected={this.props.onSelectFlightDestinationLocation}
                resetDisplayText={this.props.onSelectFlightDestinationLocation}
              />
        : ''}
          </div>
        </div>
        <div
          className={(this.props.expanded ? styles.dateField : classNames(styles.hideWhenCollapsed, styles.dateField))}
          aria-hidden={(this.props.expanded ? 'false' : 'true')}
          id="passengersSlidingInputContainer"
        >
          <div
            className={classNames(styles.checkboxWrapper, styles.flexibleDatesContainer)}
          >
            <Control.checkbox
              className={styles.customCheckbox}
              value={(this.props.globalFlexibleDatesChecked)}
              onChange={(event) => this.onFlexibleDatesCheckboxCheck(event)}
              model=".Flexible"
              name="Flexible"
              id="flexibleDates"
              aria-labelledby="flexDatesLabel"
            />
            <label htmlFor="flexibleDates" aria-hidden="true" id="flexDatesLabel">
              <FormattedMessage {...messages.flexibleDates} />
            </label>
          </div>
          <div className={styles.bookCalendar}>
            <label
              htmlFor="bookFlightModel.dates"
              id="bookFlightModel_dates_label"
              className={styles.bookCalendarLabel}
            >
              <FormattedMessage {...messages.datesLabel} />
            </label>
            <Field
              name="dates"
              component={(!this.props.globalFlexibleDatesChecked) ? BookCalendar : FlexibleDates}
              setFocus={this.passengerInput}
              model=".dates"
              startDateId="DepartDate"
              endDateId="ReturnDate"
              departModel="bookFlightModel.DepartDate"
              returnModel="bookFlightModel.ReturnDate"
              startDatePlaceholderText={intl.formatMessage(messages.datesDeparture)}
              endDatePlaceholderText={intl.formatMessage(messages.datesReturn)}
              screenReaderInputMessage={ariaMessageDisplay}
              infoPanelText={intl.formatMessage(messages.datesInfoPanel)}
              setDepart={this.props.setDepart}
              setReturn={this.props.setReturn}
              setFocusedInput={this.props.setFocusedInput}
              setCalendarError={this.props.setCalendarError}
              displayFormat="MMM DD, YYYY"
              errorMessage={intl.formatMessage(messages.datesError)}
              startDateErrorLabel="departure"
              endDateErrorLabel="return"
            />
          </div>
          <FormattedMessage {...messages.travelersLabel}>
            {(placeholder) => (
              <SlidingInput
                modelName=".passengers"
                inputId="bookFlightModel.passengers"
                inputType="text"
                isRequired="true"
                isAriaRequired="true"
                placeholder={placeholder}
                showTravelerMenu={this.props.showTravelerMenu}
                inputLabel={placeholder}
                inputErrorMsg="Required"
                screenReaderLabel={`Number of travelers, ${travelers}, enter to open and update number of travelers`}
                inputValue={travelers}
                showLabel="true"
                onInputClick={() => this.props.onPassengerInputClick(true)}
                onInputKeyDown={(event) => this.onInputKeyDown(event)}
                activeField={this.props.activeField}
                onSetActiveField={(field) => this.props.onSetActiveField(field)}
                ref={(input) => { this.passengerInput = input; }}
                isCustom="true"
                isActiveLabel="bookPassengers"
                noErrorPadding="24px"
                isErrorPadding="12px"
              />
        )}
          </FormattedMessage>
          {(this.props.activeTab === 'bookFlightTab') ?
            <div className={styles.bookPassengersDiv}>
              {(screen.width > 786) ?
            bookPassengersContainer
            : <Modal
              className={styles.passengersModal}
              isOpen={this.props.showTravelerMenu}
            >
              {bookPassengersContainer}
            </Modal>
          }
            </div>
          : '' }
        </div>
        <ul
          className={(this.props.expanded ? styles.optionFields : classNames(styles.optionFields, styles.hideWhenCollapsed))}
          aria-hidden={(this.props.expanded ? 'false' : 'true')}
        >
          <li
            aria-hidden={(this.props.expanded ? 'false' : 'true')}
            aria-labelledby="cabinClassLabel"
            className={styles.cabinSelectField}
          >
            <Field model={(this.props.awardTravelChecked) ? '.awardCabinType' : '.cabinType'}>
              <Select
                id="cabinClass"
                name={(this.props.awardTravelChecked) ? 'awardCabinType' : 'cabinType'}
                options={cabinClassOptions}
                onChange={(newValue) => this.updateCabinClassValue(newValue)}
                value={this.props.globalCabinClassSelected}
                clearable={false}
                openOnFocus
                aria-label={`${intl.formatMessage(messages.cabinClassAria)} ${this.props.cabinSelectedLabel}`}
                ref={(el) => { this.cabinClassSelectBox = el; }}
                inputProps={
                  isIPhone() ? {
                    className: styles.blockDisplay,
                    inputClassName: styles.fillParentBox,
                  } : {
                    'aria-controls': 'cabinClassLabel',
                  }
                }
              />
              <div
                className={styles.srOnly}
                id="cabinClassLabel"
                aria-label={`${intl.formatMessage(messages.cabinClassAria)} ${this.props.cabinSelectedLabel} selected`}
                aria-live="polite"
              ></div>
            </Field>
          </li>
          <li className={styles.checkboxWrapper} style={{ display: 'none' }}> {/* TODO: change this display: none when corporate booking story is picked up */}
            <Control.checkbox
              model=".CorporateBooking"
              name="CorporateBooking"
              className={styles.customCheckbox}
              onChange={(event) => this.props.corporateBookChecked(event.target.value === 'false')}
              id="corporateBook"
              aria-label={intl.formatMessage(messages.corporateBookAriaLabel)}
              value={(this.props.corporateBook)}
            />
            <label htmlFor="corporateBook">
              <FormattedMessage {...messages.corporateBook} />
            </label>
          </li>
          <li className={styles.checkboxWrapper}>
            <Control.checkbox
              model=".NonStopOnly"
              name="NonStopOnly"
              onChange={(event) => this.props.onNonstopChecked(event.target.value === 'false')}
              className={styles.customCheckbox}
              id="nonstop"
              aria-label={intl.formatMessage(messages.nonstopAriaLabel)}
              value={(this.props.nonstopChecked)}
            />
            <label htmlFor="nonstop">
              <FormattedMessage {...messages.nonstop} />
            </label>
          </li>
          <li className={styles.checkboxWrapper}>
            <Control.checkbox
              model=".AwardTravel"
              name="AwardTravel"
              ref={(input) => { this.awardCheckbox = input; }}
              className={styles.customCheckbox}
              id="award"
              aria-label={intl.formatMessage(messages.awardAriaLabel)}
              onChange={(event) => this.onAwardChecked(event)}
              value={(this.props.awardTravelChecked)}
            />
            <label htmlFor="award">
              <FormattedMessage {...messages.award} />
            </label>
          </li>
        </ul>
        <div className={(this.props.expanded) ? classNames(styles.flightBottomRow, styles.expanded) : styles.flightBottomRow}>
          <div className={styles.allSearchOptions}>
            <button
              className={styles.allSearchBtn}
              title={intl.formatMessage(messages.allSearch)}
              id="submitBtn"
              onClick={() => this.submitFORM(document.getElementsByTagName('form'), true)}
              tabIndex="0"
            >
              <FormattedMessage {...messages.allSearch} />
            </button>
          </div>
          <div
            className={(this.props.expanded) ? styles.bagRules : classNames(styles.bagRules, styles.hideWhenCollapsed)}
            aria-hidden={(this.props.expanded ? 'false' : 'true')}
          >
            <a
              href={`${config.UAL_BASE_URL}${config.BAG_RULES_URL}`}
              title={intl.formatMessage(messages.bagRules)}
            >
              <FormattedMessage {...messages.bagRules} />
            </a>
            &nbsp; and &nbsp;
            <a
              href={`${config.UAL_BASE_URL}${config.OPT_SVC_URL}`}
              title={intl.formatMessage(messages.optionalSvc)}
            >
              <FormattedMessage {...messages.optionalSvc} />
            </a>
          </div>
          {/* NOTE: button needs to be last since it is last in SO for accessibility */}
          <button
            type="submit"
            className={classNames(styles.findFlightBtn, styles.btnDefault, styles.primaryButton)}
            aria-label={intl.formatMessage(messages.findflightsAriaLabel)}
          >
            <FormattedMessage {...messages.findflights} />
          </button>
        </div>
      </Form>
    );
  }
}

BookFlightForm.propTypes = {
  activeField: PropTypes.string,
  activeTab: PropTypes.string,
  awardTravelChecked: PropTypes.bool,
  cabinSelectedLabel: PropTypes.string,
  corporateBook: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  corporateBookChecked: PropTypes.func,
  expanded: PropTypes.bool,
  flexibleDatesChecked: PropTypes.bool,
  flexMonth: PropTypes.string,
  flightOrigin: PropTypes.string,
  flightDestination: PropTypes.string,
  getFlightRequestResponse: PropTypes.func,
  globalAwardTravelIsSelected: PropTypes.bool,
  globalCabinClassSelected: PropTypes.string,
  globalCorporateBookChecked: PropTypes.bool,
  globalDestinationLocationCode: PropTypes.string,
  globalFlexibleDatesChecked: PropTypes.bool,
  globalFlexMonth: PropTypes.string,
  globalFlightDestination: PropTypes.string,
  globalFlightEndDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  globalFlightOrigin: PropTypes.string,
  globalFlightStartDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  globalNonstopFlightChecked: PropTypes.bool,
  globalOriginLocationCode: PropTypes.string,
  globalPassengersToBook: PropTypes.object,
  globalRoundtripChecked: PropTypes.bool,
  globalTripLength: PropTypes.string,
  isFirstClassSelected: PropTypes.bool,
  mobileView: PropTypes.object,
  nonstopChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onArrowKeyDown: PropTypes.func,
  onChangeModel: PropTypes.func,
  onChangePassenger: PropTypes.func,
  onDisableTravelerButtons: PropTypes.func,
  onFlexibleDatesChecked: PropTypes.func,
  onFocusModel: PropTypes.func,
  onItemSelected: PropTypes.func,
  onLoadAirports: PropTypes.func,
  onNonstopChecked: PropTypes.func,
  onPassengerInputClick: PropTypes.func,
  onRoundtripChecked: PropTypes.func,
  onSelectCabinClass: PropTypes.func,
  onSelectFirstClass: PropTypes.func,
  onSelectFlightDestinationLocation: PropTypes.func,
  onSelectFlightOriginLocation: PropTypes.func,
  onSetActiveField: PropTypes.func,
  onSetDestinationLocationCode: PropTypes.func,
  onSetOriginLocationCode: PropTypes.func,
  passengersToBook: PropTypes.object,
  roundtripChecked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showTravelerMenu: PropTypes.bool,
  selectAwardTravel: PropTypes.func,
  setCabinLabel: PropTypes.func,
  selectedCabin: PropTypes.string,
  setCalendarError: PropTypes.func,
  setDepart: PropTypes.func,
  setReturn: PropTypes.func,
  toDisableBtns: PropTypes.object,
  tripLength: PropTypes.string,
  updateFullPassengers: PropTypes.func,
  flightModel: PropTypes.object,
  setFocusedInput: PropTypes.func,
  globalCalendarFocusedInput: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(BookFlightForm);
