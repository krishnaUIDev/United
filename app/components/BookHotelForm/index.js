import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';
import config from 'config'; // eslint-disable-line
import momentPropTypes from 'react-moment-proptypes';

import { Field, Control, Form } from 'react-redux-form/lib/immutable';
import _ from 'lodash';
import moment from 'moment';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import BookCalendarRoundtrip from 'components/BookCalendarRoundtrip';
import { ENTER_KEY, TAB_KEY } from 'containers/App/constants';
import AutocompleteLocationContainer from 'containers/AutocompleteLocationContainer';

import SlidingInput from 'components/SlidingInput';
import BookPassengers from '../BookPassengers';

import messages from './messages';
import styles from './bookHotelForm.scss';

// Images
import flight from './assets/plane.svg';
import hotel from './assets/hotel.svg';
import geography from './assets/geography.svg';

const LIST_ITEM_LENGTH = 5;

export class BookHotelForm extends Component {
  componentDidMount() {
    this.props.onChangeModel('bookHotelModel.rooms', this.props.selectedRoom);
  }
  componentDidUpdate() {
    this.props.updateMobileView(this.props.hideAutocompleteLocation.get('bookHotel'), 'bookHotel');
    this.onSetComponentValues();
  }

  onInputKeyDown(event) {
    const input = event.target;
    const selectedStart = (input) ? input.selectionStart : true;
    const selectedEnd = (input) ? input.selectionEnd : false;
    if (((event.keyCode === TAB_KEY && !event.shiftKey) && ((selectedStart === 0 && selectedEnd === 0) || (selectedStart !== selectedEnd))) || event.keyCode === ENTER_KEY) {
      this.props.onPassengerInputClick(true);
    }
  }

  onSetComponentValues() {
    if ((this.passengerInput) && (this.passengerInput.passengerInput.value !== this.getTravelerCount())) {
      this.props.onChangeModel('bookHotelModel.passengers', this.getTravelerCount());
    }
  }

  onFindHotelsClick(model) {
    window.location = this.getFindHotelsUrl(model);
  }

  getTravelerCount() {
    const passengers = this.props.passengersToBook;
    const passengersCountArr = [];
    let totalCount = 0;
    let hasOneInput;
    passengers.keySeq().forEach((currValue) => {
      const currValCount = this.props.passengersToBook.get(currValue);
      if (currValCount > 0) {
        let curValSplit = currValue;
        if (currValue.indexOf('(') >= 0) {
          curValSplit = currValue.substr(0, currValue.indexOf('('));
        }
        const label = curValSplit;
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

  getImageStyles(type) {
    let locationImgSrc;
    let buttonImgStyle;
    switch (type) {
      case 'CITY_GROUP':
        locationImgSrc = geography;
        buttonImgStyle = styles.geoImg;
        break;
      case 'LANDMARK_GROUP':
        locationImgSrc = geography;
        buttonImgStyle = styles.geoImg;
        break;
      case 'TRANSPORT_GROUP':
        locationImgSrc = flight;
        buttonImgStyle = styles.flightIcon;
        break;
      case 'HOTEL_GROUP':
        locationImgSrc = hotel;
        buttonImgStyle = styles.hotelImg;
        break;
      default:
        break;
    }
    return { imgSrc: `${locationImgSrc}`, imgStyle: `${buttonImgStyle}` };
  }

  getHotelArray() {
    const responseArray = this.props.hotelData;
    const populateArray = [];
    let index = 0;
    _.forEach(responseArray, (currValue) => {
      const type = currValue.group;
      _.forEach(currValue.entities, (currEntity) => {
        if (index < LIST_ITEM_LENGTH) {
          let caption = currEntity.caption;
          caption = caption.replace('<span', '<b><span');
          caption = caption.replace('</span>', '</span></b>');
          const locationTxt = caption.replace(/<[^>]+>/g, '');
          const imgStyles = this.getImageStyles(type);
          const imgSrc = imgStyles.imgSrc;
          const imgStyle = imgStyles.imgStyle;
          populateArray.push({ firstLine: `${caption}`, imgSrc: `${imgSrc}`, imgStyle: `${imgStyle}`, id: `${index}`, locationTxt: `${locationTxt}`, ariaLocationTxt: `${locationTxt}` });
          index += 1;
        }
      });
    });
    return populateArray;
  }

  getFindHotelsUrl(model) {
    const destination = `&q-destination=${model.get('destination')}`;
    const departDate = `&q-check-in=${moment(model.get('checkInDate')).format('YYYY-MM-DD')}`;
    const returnDate = `&q-check-out=${moment(model.get('checkoutDate')).format('YYYY-MM-DD')}`;
    const roomModelVal = model.get('rooms');
    const rooms = `&q-rooms=${roomModelVal}`;
    let adults = '';
    let children = '';
    let childAge = '';
    const adultsValue = this.props.passengersToBook.get('Adults');
    const childrenValue = this.props.passengersToBook.get('Children');
    if (roomModelVal === '1') {
      adults = `&q-room-0-adults=${adultsValue}`;
      children = `&q-room-0-children=${childrenValue}`;
      if (childrenValue > 0) {
        let i = 0;
        while (i < childrenValue) {
          childAge = `${childAge}&q-room-0-child-${i}-age=17`;
          i += 1;
        }
      }
    } else {
      let i = 0;
      while (i < parseInt(roomModelVal, 10)) {
        adults = `${adults}&q-room-${i}-adults=${adultsValue}`;
        children = `${children}&q-room-${i}-children=0`;
        i += 1;
      }
    }
    const bookWithMiles = (model.get('BookWithMiles')) ? '&points=true' : '';
    const url = `${config.FIND_HOTELS_URL}${destination}${departDate}${returnDate}${rooms}${bookWithMiles}${adults}${children}${childAge}&wapb3=|c.496751|l.en_us|t.site|s.homepage`;
    return url;
  }

  updateRoomsNumber(newValue) {
    const intl = this.props.intl;
    this.props.onChangeModel('bookHotelModel.rooms', newValue.value);
    if (newValue) {
      switch (newValue.value) {
        case '1':
          this.props.setRoomsLabel(intl.formatMessage(messages.oneRoom));
          break;
        case '2':
          this.props.setRoomsLabel(intl.formatMessage(messages.twoRoom));
          break;
        case '3':
          this.props.setRoomsLabel(intl.formatMessage(messages.threeRoom));
          break;
        case '4':
          this.props.setRoomsLabel(intl.formatMessage(messages.fourRoom));
          break;
        case '5':
          this.props.setRoomsLabel(intl.formatMessage(messages.fiveRoom));
          break;
        case '6':
          this.props.setRoomsLabel(intl.formatMessage(messages.sixRoom));
          break;
        case '7':
          this.props.setRoomsLabel(intl.formatMessage(messages.sevenRoom));
          break;
        case '8':
          this.props.setRoomsLabel(intl.formatMessage(messages.eightRoom));
          break;
        default:
          this.props.setRoomsLabel(intl.formatMessage(messages.oneRoom));
      }
      this.props.onSelectRooms(newValue.value);
    }
  }

  populateDropdownArray(responseArray) {
    this.props.setHotelDropdownList([]); // reset list so no overlap
    const populateArray = this.getHotelArray(responseArray);
    this.props.setHotelDropdownList(populateArray);
    return populateArray;
  }

  render() {
    const intl = this.props.intl;
    const dataArray = this.getHotelArray();

    const adultsTitle = intl.formatMessage(messages.adultsTitle); // 'Adults'
    const childrenTitle = intl.formatMessage(messages.childrenTitle); // 'Children'

    const passengerArrayA = [adultsTitle, childrenTitle];

    const travelers = this.getTravelerCount();
    const passengersVisibility = (this.props.selectedRoom === '1') ? 'visible' : 'hidden';

    const roomsOptions = [
      {
        value: '1',
        label: intl.formatMessage(messages.oneRoom),
      },
      {
        value: '2',
        label: intl.formatMessage(messages.twoRoom),
      },
      {
        value: '3',
        label: intl.formatMessage(messages.threeRoom),
      },
      {
        value: '4',
        label: intl.formatMessage(messages.fourRoom),
      },
      {
        value: '5',
        label: intl.formatMessage(messages.fiveRoom),
      },
      {
        value: '6',
        label: intl.formatMessage(messages.sixRoom),
      },
      {
        value: '7',
        label: intl.formatMessage(messages.sevenRoom),
      },
      {
        value: '8',
        label: intl.formatMessage(messages.eightRoom),
      },
    ];

    const bookPassengersContainer = (this.props.showTravelerMenu) ? (
      <BookPassengers
        change={(model, value) => this.props.onChangeModel(model, value)}
        parent="bookHotelModel"
        modelName=".passengers"
        aria-label="Passengers"
        arrayA={passengerArrayA}
        fullArray={passengerArrayA}
        onPassengerInputClick={() => this.props.onPassengerInputClick(false)}
        onSetActiveField={(active) => this.props.onSetActiveField(active)}
        reducerDefaultToOne="Adults"
        clearReducerArray={['Children']}
        modelDefaultToOne=".Adults"
        clearModelArray={['Children']}
        parentModel="bookHotelModel"
        mainActiveField="bookPassengers"
        isDesktopTitleArrayA={[adultsTitle, childrenTitle]}
        isMobileTitleArrayA={[adultsTitle, childrenTitle]}
        isDesktopDetailArrayA={['(18+)', '(0-17)']}
        isMobileDetailArrayA={['(18+)', '(0-17)']}
        containerStyle={styles.passengerDropdownContainerHotel}
        legendId="bookPassengersLegendHotel"
        arrayIndexsA={['0', '1']}
        sectionMaxLimit={16}
        individualMaxLimit={8}
        areMultipleSections="false"
        showDivider="false"
        containsInfants="false"
        numberOfTravelersTotal="2"
        acceptableFocus={['Adults', 'Children', 'clearPassengers', 'passengersCloseBtn', 'passengersCloseBtn', 'dropdownContainer', 'applyPassengersBtn', 'bookPassengersLegendHotel']}
        ariaSectionStyle={styles.ariaSelection}
        sectionAstyle={styles.passengersA}
        showTravelerMenu={this.props.showTravelerMenu}
        passengersToBook={this.props.passengersToBook}
        toDisableBtns={this.props.toDisableBtns}
        onChangePassenger={this.props.onChangePassenger}
        onFocusModel={this.props.onFocusModel}
        onDisableTravelerButtons={this.props.onDisableTravelerButtons}
        onChangeModel={this.props.onChangeModel}
        minValueIsOne="Adults"
        disableIndividualSections="true"
      />
    ) : '';

    const isHotelFormValid = (model) => {
      const destination = model.get('destination');
      const departDate = model.get('checkInDate');
      const returnDate = model.get('checkoutDate');
      const isValidTripLength = departDate && returnDate && moment(returnDate).diff(moment(departDate), 'days') < 29;
      const rooms = model.get('rooms');
      const passengers = model.get('passengers');
      if (!departDate && !returnDate) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesSubmitError));
      } else if (!departDate && returnDate) {
        this.props.setCalendarError('hasStartError', true);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesStartError));
      } else if (departDate && !returnDate) {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.datesEndError));
      } else {
        this.props.setCalendarError('hasStartError', false);
        this.props.setCalendarError('hasEndError', false);
        this.props.setCalendarError('errorMsg', '');
      }
      if (!isValidTripLength) {
        this.props.setCalendarError('hasStayLengthError', true);
        this.props.setCalendarError('errorMsg', intl.formatMessage(messages.stayLengthError));
      }
      if (destination && departDate && returnDate && rooms && passengers && isValidTripLength) {
        return true;
      }
      return false;
    };
    const isStartDateFocused = this.props.globalCalendarFocusedInput === 'startDate';
    const isReturnDateFocused = this.props.globalCalendarFocusedInput === 'endDate';
    let ariaMessageDisplay;
    if (isStartDateFocused) {
      ariaMessageDisplay = this.props.globalHotelCheckinDate ? intl.formatMessage(messages.checkinDateSelectedAriaLabel) : intl.formatMessage(messages.checkinDateAriaLabel);
    } else if (isReturnDateFocused) {
      ariaMessageDisplay = this.props.globalHotelCheckoutDate ? intl.formatMessage(messages.checkoutDateSelectedAriaLabel) : intl.formatMessage(messages.checkoutDateAriaLabel);
    }
    return (
      <Form
        model="bookHotelModel"
        className={styles.bookHotelForm}
        onSubmit={(model) => this.onFindHotelsClick(model)}
        validators={{
          '': { isHotelFormValid },
        }}
        validateOn="submit"
      >
        <div className={styles.topPanel}>
          <div>
            <div
              id="pickupContainer"
              className={styles.pickupContainer}
              ref={(input) => { this.pickupContainer = input; }}
              style={{ position: `${this.props.mobileView.get('bookHotel')}` }}
            >
              {(this.props.activeTab === 'bookHotelTab') ?
                <AutocompleteLocationContainer
                  onArrowKeyDown={this.props.onArrowKeyDown}
                  onItemSelected={this.props.onItemSelected}
                  locationType="bookHotel"
                  inputId="bookHotelInput"
                  inputType="text"
                  isAriaRequired="true"
                  inputFieldPlaceholder={intl.formatMessage(messages.to)}
                  inputErrorMsg={intl.formatMessage(messages.toErrorMsg)}
                  inputFieldAriaLabel={intl.formatMessage(messages.toLabel)}
                  closePanelAriaLabel={intl.formatMessage(messages.closePanelAriaLabel)}
                  threeCharAutocomplete={intl.formatMessage(messages.threeCharAutocomplete)}
                  mobilePaddingLeft={(this.props.mobileView.get('bookHotel') === 'fixed') ? '24px' : '0'}
                  modelName=".destination"
                  fullModelName="bookHotelModel.destination"
                  parentModel="bookHotelModel"
                  showLabel="true"
                  containerPaddingBottom="10px"
                  getRequestData={this.props.onLoadHotelLocations}
                  dataToPopulate={dataArray}
                  useImageIcons="true"
                  listItemId="hotelDestinationListItem"
                />
              : '' }
            </div>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.bookCalendar}>
              <label
                htmlFor="booHotelModel.dates"
                className={styles.bookCalendarLabel}
              >
                <FormattedMessage {...messages.datesLabels} />
              </label>
              <Field
                component={BookCalendarRoundtrip}
                setFocus={this.hiddenFocusDiv}
                model=".dates"
                startDate={this.props.globalHotelCheckinDate}
                startDateId="bookHotelCheckinDate"
                endDate={this.props.globalHotelCheckoutDate}
                endDateId="bookHotelCheckoutDate"
                departModel="bookHotelModel.checkInDate"
                returnModel="bookHotelModel.checkoutDate"
                startDatePlaceholderText={intl.formatMessage(messages.datesDeparture)}
                endDatePlaceholderText={intl.formatMessage(messages.datesReturn)}
                screenReaderInputMessage={ariaMessageDisplay}
                infoPanelText={intl.formatMessage(messages.datesInfoPanel)}
                errorMessage={intl.formatMessage(messages.datesError)}
                stayLengthErrorMsg={intl.formatMessage(messages.stayLengthError)}
                setFocusedInput={this.props.setFocusedInput}
                setDepart={this.props.setDepart}
                setReturn={this.props.setReturn}
                displayFormat="MMM DD, YYYY"
                maximumStayLength={28}
                startDateErrorLabel="check-in"
                endDateErrorLabel="check-out"
                setCalendarError={this.props.setCalendarError}
                hasCalendarErrors={this.props.hasCalendarErrors}
              />
            </div>
          </div>
        </div>
        <div id="hiddenFocusDiv" ref={(input) => { this.hiddenFocusDiv = input; }} tabIndex="-1" className={styles.invisible}>
        </div>
        <div
          className={styles.bottomPanel}
        >
          <div
            className={styles.hotelRoomContainer}
          >
            <Field
              className={styles.roomField}
              model=".rooms"
            >
              <label
                htmlFor="rooms"
                className={styles.roomsLabelHotel}
              >
                {intl.formatMessage(messages.rooms)}
              </label>
              <Select
                id="roomsDropdown"
                name="rooms"
                options={roomsOptions}
                onChange={(newValue) => this.updateRoomsNumber(newValue)}
                value={this.props.selectedRoom}
                clearable={false}
                openOnFocus
                inputProps={{
                  'aria-controls': 'roomsLabel',
                }}
              />
              <div
                className={styles.srOnly}
                id="roomsLabel"
                aria-label={`${this.props.roomsSelectedLabel} selected`}
                aria-live="polite"
              >
                <FormattedMessage {...messages.roomsAriaLabel} />
              </div>
            </Field>
          </div>
          <div className={styles.hotelTravelersContainer} style={{ visibility: passengersVisibility }} aria-hidden={(this.props.selectedRoom !== '1')}>
            <FormattedMessage {...messages.travelers}>
              {(placeholder) => (
                <FormattedMessage {...messages.travelersLabel}>
                  {() => (
                    <SlidingInput
                      modelName=".passengers"
                      inputId="bookHotelModel.passengers"
                      inputType="text"
                      isRequired="true"
                      isAriaRequired="true"
                      placeholder={placeholder}
                      showTravelerMenu={this.props.showTravelerMenu}
                      inputLabel={placeholder}
                      inputErrorMsg="Required"
                      screenReaderLabel={`Number of travelers, ${travelers}, enter to open and update number of travelers`}
                      inputValue={travelers}
                      // validators={required}
                      showLabel="true"
                      onInputClick={() => this.props.onPassengerInputClick(true)}
                      onInputKeyDown={(event) => this.onInputKeyDown(event)}
                      activeField={this.props.activeField}
                      onSetActiveField={this.props.onSetActiveField}
                      ref={(input) => { this.passengerInput = input; }}
                      isCustom="true"
                      isActiveLabel="bookPassengers"
                      noErrorPadding="24px"
                      isErrorPadding="4px"
                    />
                  )}
                </FormattedMessage>
              )}
            </FormattedMessage>
            {(this.props.activeTab === 'bookHotelTab') ?
              <div className={styles.bookHotelPassengersDiv}>
                {(screen.width > 786) ?
                  bookPassengersContainer
                  : <Modal
                    className={styles.hotelPassengersModal}
                    isOpen={this.props.showTravelerMenu}
                  >
                    {bookPassengersContainer}
                  </Modal>
                }
              </div>
            : '' }
          </div>
        </div>
        <ul className={styles.hotelOptions}>
          <li className={styles.checkboxWrapper}>
            <Control.checkbox
              model=".BookWithMiles"
              id="BookWithMiles"
              className={styles.customCheckbox}
              aria-label={intl.formatMessage(messages.bookWithMiles)}
            />
            <label
              className={styles.bookWithMilesLabel}
              htmlFor="BookWithMiles"
            >
              <FormattedMessage {...messages.bookWithMiles} />
            </label>
          </li>
        </ul>
        <button
          type="submit"
          role="button"
          className={classNames(styles.btnDefault, styles.primaryButton)}
          aria-label={intl.formatMessage(messages.findHotelButton)}
        >
          <FormattedMessage {...messages.findHotelButton} />
        </button>
      </Form>
    );
  }
}

BookHotelForm.propTypes = {
  onChangeModel: PropTypes.func,
  showTravelerMenu: PropTypes.bool,
  onPassengerInputClick: PropTypes.func,
  onArrowKeyDown: PropTypes.func,
  hideAutocompleteLocation: PropTypes.object,
  updateMobileView: PropTypes.func,
  onItemSelected: PropTypes.func,
  mobileView: PropTypes.object,
  activeField: PropTypes.string,
  onSetActiveField: PropTypes.func,
  activeTab: PropTypes.string,
  setHotelDropdownList: PropTypes.func,
  passengersToBook: PropTypes.object,
  onFocusModel: PropTypes.func,
  setRoomsLabel: PropTypes.func,
  onSelectRooms: PropTypes.func,
  roomsSelectedLabel: PropTypes.string,
  selectedRoom: PropTypes.string,
  onLoadHotelLocations: PropTypes.func,
  hotelData: PropTypes.array,
  toDisableBtns: PropTypes.object,
  onChangePassenger: PropTypes.func,
  onDisableTravelerButtons: PropTypes.func,
  setDepart: PropTypes.func,
  setReturn: PropTypes.func,
  setCalendarError: PropTypes.func,
  hasCalendarErrors: PropTypes.object,
  setFocusedInput: PropTypes.func,
  globalCalendarFocusedInput: PropTypes.string,
  globalHotelCheckinDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  globalHotelCheckoutDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(BookHotelForm);
