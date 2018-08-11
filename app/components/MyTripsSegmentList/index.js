import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import config from 'config'; // eslint-disable-line

import { UNITED_FLIGHTNUMBER_PREFIX } from 'containers/HomePage/constants';

import flightIcon from './assets/flight_icon.svg';
import appIcon from '../RightPanelComponent/assets/iphone_app.png';
import styles from './myTripsSegmentList.scss';
import messages from './messages';

const isMobile = (screen.width < 768);

export class MyTripsSegmentList extends Component {
  getTripSegmentDetail() {
    const tripsData = [];
    const flightTrips = this.props.myTripsData;
    flightTrips.sort((a, b) => {
      let firstTrip;
      let secondTrip;
      let returnValue = 1;
      if (a.FlightStatusLegs && a.FlightStatusLegs.length && a.FlightStatusLegs[0].ScheduledFlightSegments) {
        firstTrip = moment(a.FlightStatusLegs[0].ScheduledFlightSegments[0].DepartureUTCDateTime);
      }
      if (b.FlightStatusLegs && b.FlightStatusLegs.length && b.FlightStatusLegs[0].ScheduledFlightSegments) {
        secondTrip = moment(b.FlightStatusLegs[0].ScheduledFlightSegments[0].DepartureUTCDateTime);
      }
      if (!firstTrip || !secondTrip) {
        returnValue = 1;
      } else if (firstTrip < secondTrip) {
        returnValue = -1;
      } else if (firstTrip === secondTrip) {
        returnValue = 0;
      }
      return returnValue;
    });
    const intl = this.props.intl;
    const tripFlightDetail = this.props.tripInfoFormattedData;
    flightTrips.map((flightTrip, index) => {
      const currentTrip = tripFlightDetail && tripFlightDetail.filter((trip) => trip.confirmationNumber === flightTrip.ConfirmationID);
      const departureCityName = currentTrip && currentTrip[0].departureCityName;
      const departureAirportCode = currentTrip && currentTrip[0].departureAirportCode;
      const arrivalCityName = currentTrip && currentTrip[0].arrivalCityName;
      const arrivalAirportCode = currentTrip && currentTrip[0].arrivalAirportCode;
      const firstFlightSegment = flightTrip.FlightSegments.length && flightTrip.FlightSegments[0].FlightSegment && flightTrip.FlightSegments[0].FlightSegment;
      const confirmationNumber = (flightTrip) ? flightTrip.ConfirmationID : '';
      const encryptedConfirmationId = flightTrip.EncryptedConfirmationID;
      const departureDate = (firstFlightSegment && moment(firstFlightSegment.DepartureDateTime).format('ddd, MMM DD, YYYY')) || '';
      const sectionAriaLabel = `${intl.formatMessage(messages.tripToLabel)} ${arrivalCityName}, ${index + 1} ${intl.formatMessage(messages.of)}
       ${flightTrips.length}, ${intl.formatMessage(messages.confirmationNumberLabel)} ${confirmationNumber}
       ${intl.formatMessage(messages.dateAriaMessage)}
        ${departureDate} ${intl.formatMessage(messages.departAriaMessage)} ${departureAirportCode} ${departureCityName} ${intl.formatMessage(messages.arrivalAriaMessage)}
         ${arrivalAirportCode} ${arrivalCityName}`;
      const unitedflights = UNITED_FLIGHTNUMBER_PREFIX;
      const selectedflight = flightTrip.FlightSegments[0].FlightSegment.OperatingAirlineCode;
      const isUnited = unitedflights.find((current) => current === (selectedflight && selectedflight.trim()));
      tripsData.push(
        <div className={styles.tripsSegment} key={index}>
          <button key={index} aria-label={sectionAriaLabel} className={styles.buttonContainer}>
            <div className={styles.tripToRow}>
              <span
                className={styles.tripTo}
                id="tripToLabel"
              >
                <FormattedMessage {...messages.tripToLabel} /> {arrivalCityName}
              </span>
            </div>
            <div className={styles.confirmationNumberRow}>
              <span
                className={styles.confirmationNumber}
                id="confirmationNumberLabel"
              >
                <FormattedMessage {...messages.confirmationNumberLabel} /> {confirmationNumber}
              </span>
            </div>
            <div className={styles.dateRow}>
              <span
                className={styles.departureDate}
                id="departureDateLabel"
              >
                {departureDate}
              </span>
            </div>
            <div className={styles.flightSegmentRow}>
              <div className={styles.departureColumn}>
                <span
                  className={styles.airportCode}
                  id="departureAirportCodeLabel"
                >{departureAirportCode}
                </span>
                <span
                  className={styles.cityName}
                  id="departureCityNameLabel"
                >{departureCityName}
                </span>
              </div>
              <div className={styles.flightColumn}>
                <div className={styles.flightIconDuration}>
                  <div className={styles.flightIcon} aria-hidden="true">
                    <img src={flightIcon} alt="" role="presentation" />
                  </div>
                </div>
              </div>
              <div className={styles.arrivalColumn}>
                <span
                  className={styles.airportCode}
                  id="arrivalAirportCodeLabel"
                >{arrivalAirportCode}
                </span>
                <span
                  className={styles.cityName}
                  id="arrivalCityNameLabel"
                >{arrivalCityName}
                </span>
              </div>
            </div>
          </button>
          <div className={styles.buttonRow}>
            {(isUnited) ?
              <div className={styles.changeSeatsLink}>
                <a
                  href={`${config.UAL_BASE_URL}${config.FLIGHT_SEATS_URL}?cn=${encryptedConfirmationId}`}
                  tabIndex="0"
                >
                  <FormattedMessage {...messages.changeSeatsLinkLabelTxt} />
                </a>
              </div> : ''
            }
            <div className={styles.manageLink}>
              <a
                href={`${config.UAL_BASE_URL}${config.FLIGHT_MANAGE_URL}?cn=${encryptedConfirmationId}`}
                tabIndex="0"
              >
                <FormattedMessage {...messages.manageLinkLabel} />
              </a>
            </div>
          </div>
        </div>
      );
      return true;
    });
    return tripsData;
  }
  viewAllTrip() {
    const viewAllTripsUrl = `${config.UAL_BASE_URL}${config.MYTRIPS_RESERVATION_URL}`;
    window.location.assign(viewAllTripsUrl);
  }
  render() {
    const flightTrips = this.props.myTripsData;
    const intl = this.props.intl;
    const united = UNITED_FLIGHTNUMBER_PREFIX;
    let isSelectedOperatedByUA;
    if (flightTrips) {
      flightTrips.forEach((item) => {
        const operatingAirline = (item.FlightSegments && item.FlightSegments[0] && item.FlightSegments[0].FlightSegment) ? item.FlightSegments[0].FlightSegment.OperatingAirlineCode : '';
        const trimOA = operatingAirline && operatingAirline.trim();
        isSelectedOperatedByUA = (isSelectedOperatedByUA) || united.find((current) => current === trimOA);
      });
    }
    return (
      <div className={styles.myTripsContainer}>
        <div
          className={styles.tripsHeader}
          id="tripsHeaderLabel"
          tabIndex="0"
        ><FormattedMessage {...messages.tripsHeaderLabel} />
        </div>
        <div className={styles.tripsSegmentContainer} tabIndex="-1">
          {this.getTripSegmentDetail()}
        </div>
        <div className={styles.viewAllTripLink}>
          <button
            title={intl.formatMessage(messages.viewAllTripLinkText)}
            role="button"
            aria-label={intl.formatMessage(messages.viewAllTripsMessage)}
            onClick={() => { this.viewAllTrip(); }}
            tabIndex="0"
          >
            <FormattedMessage {...messages.viewAllTripLinkText} />
          </button>
        </div>
        <div className={styles.findAnotherTripLink}>
          <button
            title={intl.formatMessage(messages.findAnotherTripLinkText)}
            role="button"
            aria-label={intl.formatMessage(messages.findAnotherTripLinkText)}
            onClick={() => { this.props.resetMyTripsData(); }}
            tabIndex="0"
          >
            <FormattedMessage {...messages.findAnotherTripLinkText} />
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
MyTripsSegmentList.propTypes = {
  myTripsData: PropTypes.array,
  resetMyTripsData: PropTypes.func,
  tripInfoFormattedData: PropTypes.array,
  intl: intlShape.isRequired,
};
export default injectIntl(MyTripsSegmentList);
