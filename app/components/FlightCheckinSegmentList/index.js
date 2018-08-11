import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from 'config'; // eslint-disable-line

import { UNITED_FLIGHTNUMBER_PREFIX } from 'containers/HomePage/constants';

import flightIcon from './assets/flight_icon.svg';
import checkedIn from './assets/checked_in_icon.svg';
import styles from './flightCheckinSegmentList.scss';
import messages from './messages';
import WeatherIcons from '../WeatherIcons';
import appIcon from '../RightPanelComponent/assets/iphone_app.png';


const isTablet = (screen.width <= 768);
const isMobile = (screen.width < 768);

export class FlightCheckinSegmentList extends Component {

  componentDidMount() {
    if (this.flightCheckinHeader) {
      this.flightCheckinHeader.focus();
    }
  }

  onOpenCheckinDetails(index) {
    this.props.onUpdateCheckinDetailsIndex(index);
    this.props.openRightPanelModal(true);
  }
  getSegmentDetail() {
    const checkinData = [];
    const flightCheckinObj = this.props.flightCheckinData;
    const flightTrips = flightCheckinObj.trips;
    flightTrips.sort((a, b) => {
      let firstTrip;
      let secondTrip;
      let returnValue = 1;
      if (a.FlightStatusLegs && a.FlightStatusLegs[0] && a.FlightStatusLegs[0].ScheduledFlightSegments) {
        firstTrip = moment(a.FlightStatusLegs[0].ScheduledFlightSegments[0].DepartureUTCDateTime);
      }
      if (b.FlightStatusLegs && b.FlightStatusLegs[0] && b.FlightStatusLegs[0].ScheduledFlightSegments) {
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
    const flightWeather = flightCheckinObj.currentWeather;
    const tripsCount = flightTrips.length;
    const emptyPlaceholder = '--';
    flightTrips.map((flightTrip, index) => {
      let selectedSegment = this.props.flightCheckinSegmentSelectedIndex;
      selectedSegment = (selectedSegment === '' && !isTablet) ? 0 : selectedSegment;

      const flightNumber = flightTrip.FlightSegments[0].FlightSegment.OperatingAirlineCode + flightTrip.FlightSegments[0].FlightSegment.FlightNumber;
      const isCheckedIn = flightTrip.Travelers[0].IsCheckedIn === 'Y';
      const departureDate = moment(flightTrip.FlightSegments[0].FlightSegment.DepartureDateTime).format('ddd, MMM DD, YY');
      const departureTime = moment(flightTrip.FlightSegments[0].FlightSegment.DepartureDateTime).format('LT');
      const arrivalDate = moment(flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalDateTime).format('ddd, MMM DD, YY');
      const arrivalTime = moment(flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalDateTime).format('LT');

      let durationTime = moment.duration();
      flightTrip.FlightSegments.forEach((segment) => {
        const arrivalUTCtime = segment.FlightSegment.ArrivalUTCDateTime || segment.FlightSegment.ArrivalDateTime;
        const departureUTCtime = segment.FlightSegment.DepartureUTCDateTime || segment.FlightSegment.DepartureDateTime;
        const timesExist = (arrivalUTCtime && departureUTCtime);
        const timeA = ((timesExist) && moment(arrivalUTCtime) > moment(departureUTCtime)) ? arrivalUTCtime : departureUTCtime;
        const timeB = ((timesExist) && moment(arrivalUTCtime) > moment(departureUTCtime)) ? departureUTCtime : arrivalUTCtime;
        durationTime = (timesExist) ? durationTime.add(moment(timeA).diff(timeB)) : emptyPlaceholder;
      });
      const departureAirportCode = flightTrip.FlightSegments[0].FlightSegment.DepartureAirport.IATACode;
      const arrivalAirportCode = flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalAirport.IATACode;
      const departureCityName = flightTrip.FlightSegments[0].FlightSegment.DepartureAirport.Name && flightTrip.FlightSegments[0].FlightSegment.DepartureAirport.Name.split(',').length && flightTrip.FlightSegments[0].FlightSegment.DepartureAirport.Name.split(',')[0];
      const arrivalCityName = flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalAirport.Name && flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalAirport.Name.split(',').length && flightTrip.FlightSegments[flightTrip.FlightSegments.length - 1].FlightSegment.ArrivalAirport.Name.split(',')[0];
      let departureTemperature = 0;
      let departureSkyImg = '';
      let departureWeatherStatus;
      flightWeather.map((weather) => {
        if (weather.AirportCode === departureAirportCode) {
          departureTemperature = weather.Temperature.Farenheit;
          departureSkyImg = WeatherIcons(weather.Sky, true).weatherIcon;
          departureWeatherStatus = WeatherIcons(weather.Sky, true).weatherDsc;
        }
        return true;
      });
      let arrivalTemperature = 0;
      let arrivalSkyImg = '';
      let arrivalWeatherStatus;
      flightWeather.map((weather) => {
        if (weather.AirportCode === arrivalAirportCode) {
          arrivalTemperature = weather.Temperature.Farenheit;
          arrivalSkyImg = WeatherIcons(weather.Sky, true).weatherIcon;
          arrivalWeatherStatus = WeatherIcons(weather.Sky, true).weatherDsc;
        }
        return true;
      });
      const stopCount = flightTrip.FlightSegments.length - 1;
      const dayCount = (durationTime !== emptyPlaceholder) ? durationTime.days() : emptyPlaceholder;
      const stopCityName = stopCount === 1 ? flightTrip.FlightSegments[0].FlightSegment.ArrivalAirport.Name.split(',').length && flightTrip.FlightSegments[0].FlightSegment.ArrivalAirport.Name.split(',')[0] : '';

      const { intl } = this.props;

      const departureSectionAriaLabel = `${intl.formatMessage(messages.departureLabel)} ${intl.formatMessage(messages.on)} ${departureDate} ${intl.formatMessage(messages.scheduledDepartureTime)} ${departureTime} ${intl.formatMessage(messages.from)} ${departureAirportCode} ${departureCityName} ${intl.formatMessage(messages.weatherStatus)} ${departureWeatherStatus} ${intl.formatMessage(messages.temperatureStatus)} ${departureTemperature} ${intl.formatMessage(messages.temperatureDegrees)}`;

      const arrivalSectionAriaLabel = `${intl.formatMessage(messages.arrivalLabel)} ${intl.formatMessage(messages.on)} ${arrivalDate} ${intl.formatMessage(messages.scheduledArrivalTime)} ${arrivalTime} ${intl.formatMessage(messages.to)} ${arrivalAirportCode} ${arrivalCityName} ${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherStatus} ${intl.formatMessage(messages.temperatureStatus)} ${arrivalTemperature} ${intl.formatMessage(messages.temperatureDegrees)}`;

      const dayCountAria = (dayCount === 1) ? intl.formatMessage(messages.nextDay) : `${intl.formatMessage(messages.in)} ${dayCount} ${intl.formatMessage(messages.daysCountLabel)}`;
      const arrivingAriaLabel = (dayCount) ? `${intl.formatMessage(messages.arriving)} ${dayCountAria}` : '';
      const durationAriaLabel = (durationTime !== emptyPlaceholder) ? `${intl.formatMessage(messages.totalFlightDuration)} ${durationTime.hours()} ${intl.formatMessage(messages.hours)} ${durationTime.minutes()} ${intl.formatMessage(messages.minutes)}` : intl.formatMessage(messages.notAvailable);
      const stopCountAriaLabel = (stopCount === 1) ? intl.formatMessage(messages.stopCountLabel) : intl.formatMessage(messages.stopsCountLabel);
      const stopCityAriaLabel = (stopCount === 1) ? `${intl.formatMessage(messages.in)} ${stopCityName}` : '';
      const durationSectionAriaLabel = `${arrivingAriaLabel} ${durationAriaLabel} ${intl.formatMessage(messages.with)} ${stopCount} ${stopCountAriaLabel} ${stopCityAriaLabel}`;

      const viewDetailsAriaLabel = (isTablet) ? intl.formatMessage(messages.mobileViewDetails) : intl.formatMessage(messages.clickToViewDetails);
      const segmentAriaLabel = `${intl.formatMessage(messages.segment)} ${index + 1} ${intl.formatMessage(messages.outOf)} ${flightTrips.length} ${intl.formatMessage(messages.selected)}`;

      const checkInAria = (isCheckedIn) ? intl.formatMessage(messages.checkedInLabelTxt) : '';
      const fullSectionAriaLabel = `${intl.formatMessage(messages.flightLabel)} ${flightNumber} ${checkInAria} ${segmentAriaLabel} ${departureSectionAriaLabel} ${durationSectionAriaLabel} ${arrivalSectionAriaLabel} ${viewDetailsAriaLabel}`;

      const viewBtnDisplay = (this.props.toFocusFlightNumber) ? styles.modalOpenDisplay : styles.modalClosedDisplay;

      const checkinContent = (
        <div className={classNames(styles.checkinSegmentDetail, (selectedSegment === index && !isTablet) ? styles.selectedBorder : styles.notSelectedBorder)}>
          {(isTablet) ?
            <div aria-label={fullSectionAriaLabel} tabIndex="0" className={styles.srOnly}>{fullSectionAriaLabel}</div>
          : ''}
          <div className={styles.flightCheckIn} aria-label={`${intl.formatMessage(messages.flightLabel)} ${flightNumber}`}>
            <span
              className={styles.flightNumber}
              id="flightNumberLabel"
              aria-label={`${intl.formatMessage(messages.flightLabel)} ${flightNumber}`}
            >
              {`${intl.formatMessage(messages.flightLabel)} ${flightNumber}`}
            </span>
            { (isCheckedIn) ?
              <span
                id="checkedInLabel"
                aria-label={intl.formatMessage(messages.checkedInLabelTxt)}
              >
                <FormattedMessage {...messages.checkedInLabelTxt} />
                <div className={styles.iconCheckin} aria-hidden="true">
                  <img src={checkedIn} alt="" role="presentation" />
                </div>
              </span>
            : ''}
          </div>
          <div className={styles.flightSegment}>
            <div className={styles.departureColumn}>
              <span
                className={styles.departure}
                id="departureLabel"
                aria-label={intl.formatMessage(messages.departureLabel)}
              >{intl.formatMessage(messages.departureLabel)}
              </span>
              <span
                className={styles.date}
                id="departureDateLabel"
                aria-label={`${intl.formatMessage(messages.on)} ${departureDate}`}
              >{departureDate}
              </span>
              <span
                className={styles.time}
                id="departureTimeLabel"
                aria-label={`${intl.formatMessage(messages.scheduledDepartureTime)} ${departureTime}`}
              >{departureTime}
              </span>
              <div className={styles.airportDataBlock} aria-label={`${intl.formatMessage(messages.from)} ${departureAirportCode} ${departureCityName}`}>
                <div className={styles.airportCodeCityName}>
                  <span
                    className={styles.airportCode}
                    id="departureAirportCodeLabel"
                    aria-label={departureAirportCode}
                  >{departureAirportCode}
                  </span>
                  <span
                    className={styles.cityName}
                    id="departureCityNameLabel"
                    aria-label={departureCityName}
                  >{departureCityName}
                  </span>
                </div>
                <div className={styles.weatherIconTemperature}>
                  <div className={styles.iconWeather} aria-label={`${intl.formatMessage(messages.weatherStatus)} ${departureWeatherStatus}`}>
                    <img
                      src={departureSkyImg}
                      alt=""
                      role="presentation"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={styles.temperature}
                    id="departureTemperatureLabel"
                    aria-label={`${intl.formatMessage(messages.temperatureStatus)} ${departureTemperature} ${intl.formatMessage(messages.temperatureDegrees)}`}
                  >
                    <span className={styles.srOnly} aria-label={`${intl.formatMessage(messages.weatherStatus)} ${departureWeatherStatus}`}>{`${intl.formatMessage(messages.weatherStatus)} ${departureWeatherStatus}`}</span>
                    {`${departureTemperature}${intl.formatMessage(messages.temperatureSymbol)}`}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.flightColumn}>
              <div
                className={(dayCount !== emptyPlaceholder && dayCount > 0 && stopCount > 0) ? styles.dayCountBlock : styles.onlyFlightIcon}
                aria-label={`${arrivingAriaLabel} ${durationAriaLabel} ${intl.formatMessage(messages.with)} ${stopCount} ${stopCountAriaLabel} ${stopCityAriaLabel}`}
              >
                {(dayCount !== emptyPlaceholder && dayCount > 0) ?
                  <div
                    className={styles.dayCount}
                    id="dayCountLabel"
                  >
                    {`+${dayCount} ${intl.formatMessage(messages.dayCountLabel)}`}
                  </div>
                  : ''
                }
              </div>
              <div className={styles.flightIconDuration}>
                <div className={styles.flightIcon} aria-hidden="true">
                  <img src={flightIcon} alt="" role="presentation" />
                </div>
                <span
                  className={styles.timeDuration}
                  id="timeDurationLabel"
                >
                  {(durationTime !== emptyPlaceholder) ? `${durationTime.hours()}${intl.formatMessage(messages.letterH)} ${durationTime.minutes()}${intl.formatMessage(messages.letterM)}` : emptyPlaceholder}
                </span>
              </div>
              <div className={styles.stopCountCityName}>
                {(stopCount) ?
                  <span
                    className={styles.stopCount}
                    id="stopCountLabel"
                  >
                    {stopCount} {(stopCount === 1) ? <FormattedMessage {...messages.stopCountLabel} /> : <FormattedMessage {...messages.stopsCountLabel} />}
                  </span>
                  : ''}
                {(stopCount === 1) ?
                  <span
                    className={styles.stopCityName}
                    id="stopCityNameLabel"
                  >
                    {stopCityName}
                  </span>
                  : ''}
              </div>
            </div>
            <div className={styles.arrivalColumn}>
              <span
                className={styles.departure}
                id="arrivalLabel"
                aria-label={intl.formatMessage(messages.arrivalLabel)}
              ><FormattedMessage {...messages.arrivalLabel} />
              </span>
              <span
                className={styles.date}
                id="arrivalDateLabel"
                aria-label={`${intl.formatMessage(messages.on)} ${arrivalDate}`}
              >{arrivalDate}
              </span>
              <span
                className={styles.time}
                id="arrivalTimeLabel"
                aria-label={`${intl.formatMessage(messages.scheduledArrivalTime)} ${arrivalTime}`}
              >{arrivalTime}
              </span>
              <div className={styles.airportDataBlock}>
                <div className={styles.airportCodeCityName} aria-label={`${intl.formatMessage(messages.to)} ${arrivalAirportCode} ${arrivalCityName}`}>
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
                <div className={styles.weatherIconTemperature}>
                  <div className={styles.iconWeather} aria-label={`${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherStatus}`}>
                    <img
                      src={arrivalSkyImg}
                      alt=""
                      role="presentation"
                      aria-hidden="true"
                      className={styles.iconWeather}
                    />
                  </div>
                  <span
                    className={styles.temperature}
                    id="arrivalTemperatureLabel"
                    aria-label={`${arrivalTemperature} ${intl.formatMessage(messages.temperatureDegrees)}`}
                  >
                    <span className={styles.srOnly} aria-label={`${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherStatus}`}>{`${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherStatus}`}</span>
                    {`${arrivalTemperature}${intl.formatMessage(messages.temperatureSymbol)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {(isTablet) ?
            <div className={styles.viewDetailBtn}>
              <button
                title={intl.formatMessage(messages.viewDetailsTxt)}
                className={viewBtnDisplay}
                onClick={() => { this.onOpenCheckinDetails(index); }}
                tabIndex="0"
              >
                <FormattedMessage {...messages.viewDetailsTxt} />
              </button>
            </div>
            : ''}
          {(isTablet && index < tripsCount - 1) ?
            <div className={styles.horizontalLine}>
            </div>
            : ''}
        </div>
      );

      checkinData.push(
        (isTablet) ?
          <div className={classNames(styles.buttonContainer)} key={index}>
            {checkinContent}
          </div>
          : <button
            key={index}
            tabIndex="0"
            onClick={() => { this.props.onUpdateCheckinDetailsIndex(index); }}
            className={classNames(styles.buttonContainer)}
            aria-label={fullSectionAriaLabel}
          >
            {checkinContent}
          </button>
      );
      return true;
    });
    return checkinData;
  }
  render() {
    const { intl } = this.props;
    const flightCheckinObj = this.props.flightCheckinData;
    const flightTrips = flightCheckinObj.trips;
    const tripsCount = flightTrips.length;

    const united = UNITED_FLIGHTNUMBER_PREFIX;
    let isSelectedOperatedByUA;
    if (flightTrips) {
      flightTrips.forEach((item) => {
        const operatingAirline = (item.FlightSegments && item.FlightSegments[0] && item.FlightSegments[0].FlightSegment) ? item.FlightSegments[0].FlightSegment.OperatingAirlineCode : '';
        isSelectedOperatedByUA = (isSelectedOperatedByUA) || united.find((current) => current === operatingAirline);
      });
    }

    const checkinHeaderTxt = (tripsCount === 1) ? intl.formatMessage(messages.flightCheckinHeaderEndLabelSingular) : intl.formatMessage(messages.flightCheckinHeaderEndLabel);

    return (
      <div className={styles.flightCheckinContainer}>
        <div
          className={styles.flightCheckinHeader}
          id="flightCheckinHeaderLabel"
          ref={(input) => { this.flightCheckinHeader = input; }}
          tabIndex="0"
        > {`${intl.formatMessage(messages.flightCheckinHeaderStartLabel)} ${tripsCount} ${checkinHeaderTxt}`} </div>
        <div className={styles.flightCheckinSegmentContainer} tabIndex="-1">
          {this.getSegmentDetail()}
        </div>
        <div className={styles.checkinAnotherTripLink}>
          <button
            title={intl.formatMessage(messages.checkinAnotherFlightLabel)}
            onClick={() => { this.props.onUpdateCheckinDetailsIndex(''); this.props.resetFlightCheckinData(); }}
            tabIndex="0"
          >
            <FormattedMessage {...messages.checkinAnotherFlightLabel} />
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
FlightCheckinSegmentList.propTypes = {
  flightCheckinData: PropTypes.object,
  flightCheckinSegmentSelectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  intl: intlShape.isRequired,
  onUpdateCheckinDetailsIndex: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  resetFlightCheckinData: PropTypes.func,
  toFocusFlightNumber: PropTypes.bool,
};

export default injectIntl(FlightCheckinSegmentList);
