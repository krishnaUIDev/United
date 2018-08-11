import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import config from 'config'; // eslint-disable-line
import { UNITED_FLIGHTNUMBER_PREFIX } from 'containers/HomePage/constants';

import messages from './messages';

import flightIcon from './assets/flight_icon.svg';
import appIcon from '../RightPanelComponent/assets/iphone_app.png';

import styles from './flightStatusSegmentList.scss';


const isMobile = (screen.width < 768);
const isTablet = (screen.width <= 768);

export class FlightStatusSegmentList extends Component {
  componentDidMount() {
    if (this.flightStatusLabel && !isTablet && !this.props.toFocusFlightNumber) {
      this.flightStatusLabel.focus();
    }
  }
  getSelectedDateFormatted(value) {
    let date;
    const currentDate = moment();
    const currentDateFormatted = currentDate.format('dddd, MMMM DD, YYYY');
    const yesterdayDate = moment(currentDate).subtract(1, 'days').format('dddd, MMMM DD, YYYY');

    const tomorrowDate = moment(currentDate).add(1, 'days').format('dddd, MMMM DD, YYYY');

    const dayAfterTomorrowDate = moment(currentDate).add(2, 'days').format('dddd, MMMM DD, YYYY');
    switch (value) {
      case '1':
        date = yesterdayDate;
        break;
      case '2':
        date = currentDateFormatted;
        break;
      case '3':
        date = tomorrowDate;
        break;
      case '4':
        date = dayAfterTomorrowDate;
        break;
      default:
        break;
    }
    return date;
  }

  getSegmentDetail(flightLegs) {
    const intl = this.props.intl;
    const segmentData = [];
    const patternAirportName = /[^(]*/;
    const flightSegmentsCount = flightLegs.length - 1;

    flightLegs.map((flightLeg, index) => {
      const selectedSegment = this.props.selectFlightDataIndex;
      const indexer = parseInt(index, 10);
      const departureTime = moment(flightLeg.OperationalFlightSegments[0].DepartureDateTime).format('LT');
      const arrivalTime = moment(flightLeg.OperationalFlightSegments[0].ArrivalDateTime).format('LT');
      const departureAirportCode = flightLeg.OperationalFlightSegments[0].DepartureAirport.IATACode;
      const arrivalAirportCode = flightLeg.OperationalFlightSegments[0].ArrivalAirport.IATACode;
      const departureAirportShortHand = patternAirportName.exec(flightLeg.OperationalFlightSegments[0].DepartureAirport.Name)[0];
      const arrivalAirportShortHand = patternAirportName.exec(flightLeg.OperationalFlightSegments[0].ArrivalAirport.Name)[0];

      const sectionAriaLabel = `${intl.formatMessage(messages.segment)} ${index + 1} ${intl.formatMessage(messages.of)} ${flightLegs.length}. ${intl.formatMessage(messages.departureFrom)} ${departureAirportCode} ${departureAirportShortHand} ${intl.formatMessage(messages.to)} ${arrivalAirportCode} ${arrivalAirportShortHand}. ${intl.formatMessage(messages.clickToViewDetails)}`;

      const viewBtnDisplay = (this.props.toFocusFlightNumber) ? styles.modalOpenDisplay : styles.modalClosedDisplay;


      const segmentContent = (
        <div className={classNames(styles.segmentData, (selectedSegment === index && !isTablet) ? styles.selectedBorder : styles.notSelectedBorder)}>
          {(index === 0 && !isTablet) ?
            <div aria-label={sectionAriaLabel} className={styles.srOnly}>{sectionAriaLabel}</div>
          : ''}
          <div className={styles.segmentDetail}>
            <div className={styles.departureColumn}>
              <span
                className={styles.departureLabel}
                ref={(input) => { this.departureLabel = input; }}
                id="departureLabel"
              ><FormattedMessage {...messages.departureLabel} />
              </span>
              <span
                className={styles.time}
                ref={(input) => { this.departureTimeLabel = input; }}
                id="departureTimeLabel"
              >{departureTime}
              </span>
              <span
                className={styles.airportCode}
                ref={(input) => { this.departureAirportCodeLabel = input; }}
                id="departureAirportCodeLabel"
              >{departureAirportCode}
              </span>
              <span
                className={styles.airportShorthand}
                ref={(input) => { this.departureAirportShorthandLabel = input; }}
                id="departureAirportShorthandLabel"
              >{departureAirportShortHand}
              </span>
            </div>
            <div className={styles.flightColumn}>
              <div className={styles.flightIcon} aria-hidden="true">
                <img src={flightIcon} alt="" role="presentation" />
              </div>
            </div>
            <div className={styles.arrivalColumn}>
              <span
                className={styles.departureLabel}
                ref={(input) => { this.arrivalLabel = input; }}
                id="arrivalLabel"
              ><FormattedMessage {...messages.arrivalLabel} />
              </span>
              <span
                className={styles.time}
                ref={(input) => { this.arrivalTimeLabel = input; }}
                id="arrivalTimeLabel"
              >{arrivalTime}
              </span>
              <span
                className={styles.airportCode}
                ref={(input) => { this.arrivalAirportCodeLabel = input; }}
                id="arrivalAirportCodeLabel"
              >{arrivalAirportCode}
              </span>
              <span
                className={styles.airportShorthand}
                ref={(input) => { this.arrivalAirportShorthandLabel = input; }}
                id="arrivalAirportShorthandLabel"
              >{arrivalAirportShortHand}
              </span>
              {(isTablet) ?
                <div className={styles.viewDetailBtn}>
                  <button
                    title={intl.formatMessage(messages.viewDetailsTxt)}
                    className={viewBtnDisplay}
                    onClick={() => { this.props.selectedFlight(index); this.props.openRightPanelModal(true); }}
                    tabIndex="0"
                  >
                    <FormattedMessage {...messages.viewDetailsTxt} />
                  </button>
                </div>
                : ''}
            </div>
          </div>
          {(isTablet && indexer < flightSegmentsCount) ?
            <div className={styles.horizontalLine}>
            </div>
            : ''}
        </div>
      );

      segmentData.push(
        (isTablet) ?
          <div className={classNames(styles.buttonContainer)} aria-label={sectionAriaLabel} key={index}>
            {segmentContent}
          </div>
          :
          <button
            key={index}
            className={classNames(styles.buttonContainer)}
            onClick={() => { this.props.selectedFlight(index); }}
            role="button"
            tabIndex="0"
            aria-label={sectionAriaLabel}
          >
            {segmentContent}
          </button>
      );
      return true;
    });
    return segmentData;
  }
  render() {
    const formattedDate = this.getSelectedDateFormatted(this.props.selectedStatusDate);
    const flightStatusObj = this.props.flightStatusData;
    const flightLegs = flightStatusObj.flightLegs;
    const isOperationFlightSegmentAvailable = (flightLegs && flightLegs[0].OperationalFlightSegments && flightLegs[0].OperationalFlightSegments[0]);
    const operatingCarrier = 'UA';
    const inputFlightNumber = flightStatusObj.Flight.flightNumber ? parseInt(flightStatusObj.Flight.flightNumber, 10) : '';
    const defaultFlightNumber = (isOperationFlightSegmentAvailable) ? flightLegs[0].OperationalFlightSegments[0].FlightNumber : '';
    let flightNumber = Number.isInteger(inputFlightNumber) ? inputFlightNumber : defaultFlightNumber;
    const MarketedFlightSegment = (flightLegs && flightLegs[0].ScheduledFlightSegments && flightLegs[0].ScheduledFlightSegments[0].MarketedFlightSegment) ? flightLegs[0].ScheduledFlightSegments[0].MarketedFlightSegment : '';
    if (MarketedFlightSegment) {
      const marketedUASegment = MarketedFlightSegment.find((flightSegment) => flightSegment.MarketingAirlineCode === 'UA' ? flightSegment.FlightNumber : '');
      flightNumber = marketedUASegment ? marketedUASegment.FlightNumber : flightNumber;
    }

    const selectedIndex = this.props.selectFlightDataIndex || 0;
    const selectedFlightDataOperationalSegment = (flightStatusObj.flightLegs && flightStatusObj.flightLegs[selectedIndex]) ? flightStatusObj.flightLegs[selectedIndex].OperationalFlightSegments[0] : '';
    const united = UNITED_FLIGHTNUMBER_PREFIX;
    const operatingAirline = (selectedFlightDataOperationalSegment) ? selectedFlightDataOperationalSegment.OperatingAirline.IATACode : '';
    const isSelectedOperatedByUA = united.find((current) => current === operatingAirline);

    const intl = this.props.intl;

    return (
      <div className={styles.flightStatusListContainer}>
        <div
          className={styles.flightStatusLabel}
          ref={(input) => { this.flightStatusLabel = input; }}
          id="flightStatusLabel"
          aria-label={`${intl.formatMessage(messages.flightStatusAria)} ${operatingCarrier} ${flightNumber}`}
          tabIndex="0"
        ><FormattedMessage {...messages.flightStatusLabel} /> {`${operatingCarrier} ${flightNumber}`}</div>
        <div
          className={styles.dateLabel}
          ref={(input) => { this.dateLabel = input; }}
          id="dateLabel"
          aria-label={`${intl.formatMessage(messages.date)} ${formattedDate}`}
        >{formattedDate}</div>
        {(flightLegs.length > 1) ?
          <div
            className={styles.multiSegmentLabel}
            ref={(input) => { this.multiSegmentLabel = input; }}
            id="multiSegmentLabel"
            aria-label={intl.formatMessage(messages.multiSegmentHeaderMsgAriaLabel)}
          >
            <span aria-hidden="true">{intl.formatMessage(messages.multiSegmentHeaderLabel)}</span>
            <span className={styles.srOnly}>{intl.formatMessage(messages.multiSegmentHeaderMsgAriaLabel)}</span>
          </div>
        : ''}
        <div className={styles.segmentBlock} tabIndex="-1">
          {this.getSegmentDetail(flightLegs)}
        </div>
        <div className={styles.newFlightStatusSearch}>
          <button
            title={intl.formatMessage(messages.newFlightStatusSearch)}
            id="newFlightSearchBtn"
            onClick={() => { this.props.selectedFlight(''); this.props.onNewFlightStatusSearch(); }}
            tabIndex="0"
          >
            <FormattedMessage {...messages.newFlightStatusSearch} />
          </button>
        </div>
        {(isMobile && isSelectedOperatedByUA) ?
          <div className={styles.bottomAppImage}>
            <img
              src={appIcon}
              className={styles.appIcon}
              alt=""
              role="presentation"
              aria-hidden="true"
            />
          </div>
        : ''}
        {(isMobile && isSelectedOperatedByUA) ?
          <div className={styles.appTxtStyle}>
            {intl.formatMessage(messages.appTxt)}
            <br></br>
            <a
              tabIndex="0"
              className={styles.appLinkStyle}
              href={`${config.UAL_BASE_URL}${config.DOWNLOAD_APP_LINK}`}
            >{intl.formatMessage(messages.appLink)}</a>
          </div>
        : ''}
      </div>
    );
  }


}

FlightStatusSegmentList.propTypes = {
  flightStatusData: PropTypes.object,
  intl: intlShape.isRequired,
  onNewFlightStatusSearch: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  selectedFlight: PropTypes.func,
  selectFlightDataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedStatusDate: PropTypes.string,
  toFocusFlightNumber: PropTypes.bool,
};

export default injectIntl(FlightStatusSegmentList);
