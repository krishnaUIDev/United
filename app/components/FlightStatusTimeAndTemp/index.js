import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { intlShape, injectIntl } from 'react-intl';

import WeatherIcons from '../WeatherIcons';
import styles from './flightStatusTimeAndTemp.scss';
import messages from './messages';

// Images
import tripIcon from './assets/tripIcon.svg';


const EMPTY_DATA = '--';
const isTablet = (screen.width <= 768);


export function FlightStatusTimeAndTemp(props) {
  const intl = props.intl;
  const flightStatusData = props.flightStatusData;
  const selectFlightData = props.selectFlightData;
  const flightStatusWeather = flightStatusData.currentWeather;
  const flightLegs = (selectFlightData !== '') ? flightStatusData.flightLegs[selectFlightData] : flightStatusData.flightLegs[0];
  const operationalFlightSegments = (flightLegs && flightLegs.OperationalFlightSegments) ? flightLegs.OperationalFlightSegments[0] : '';
  const scheduledFlightSegments = (flightLegs && flightLegs.ScheduledFlightSegments) ? flightLegs.ScheduledFlightSegments[0] : '';

  // Initialize to dashes in case any values are missing, or if there is no operationalFlightSegments returned
  let departureWeather = EMPTY_DATA;
  let arrivalWeather = EMPTY_DATA;
  let operationalArrivalAirport = EMPTY_DATA;
  let operationalDepartureAirport = EMPTY_DATA;
  let departureDateTime = EMPTY_DATA;
  let arrivalDateTime = EMPTY_DATA;
  let departureTime = EMPTY_DATA;
  let arrivalTime = EMPTY_DATA;
  let arrivalDate = EMPTY_DATA;
  let departureDate = EMPTY_DATA;
  let departureScheduled = EMPTY_DATA;
  let arrivalScheduled = EMPTY_DATA;
  let arrivalTimePeriod;
  let departureTimePeriod;
  operationalArrivalAirport = operationalFlightSegments.ArrivalAirport || operationalArrivalAirport;
  operationalDepartureAirport = operationalFlightSegments.DepartureAirport || operationalDepartureAirport;
  const fetchWeatherLeg = [];
  flightStatusWeather.forEach((current) => {
    if (current.AirportCode === operationalArrivalAirport.IATACode || current.AirportCode === operationalDepartureAirport.IATACode) {
      fetchWeatherLeg.push(current);
    }
  });
  departureWeather = fetchWeatherLeg.find((current) => current.AirportCode === operationalDepartureAirport.IATACode);
  arrivalWeather = fetchWeatherLeg.find((current) => current.AirportCode === operationalArrivalAirport.IATACode);
  const departureWeatherIcon = (departureWeather && departureWeather.Sky) ? WeatherIcons(departureWeather.Sky).weatherIcon : null;
  const arrivalWeatherIcon = (arrivalWeather && arrivalWeather.Sky) ? WeatherIcons(arrivalWeather.Sky).weatherIcon : null;
  let durationTime = moment.duration();

  if (operationalFlightSegments) {
    const departureTimeAlternative = operationalFlightSegments.EstimatedDepartureTime || EMPTY_DATA;
    departureDateTime = (operationalFlightSegments.OutTime && operationalFlightSegments.InTime) ? operationalFlightSegments.OutTime : departureTimeAlternative;
    const arrivalTimeAlternative = operationalFlightSegments.EstimatedArrivalTime || EMPTY_DATA;
    arrivalDateTime = (operationalFlightSegments.OutTime && operationalFlightSegments.InTime) ? operationalFlightSegments.InTime : arrivalTimeAlternative;

    arrivalTime = (arrivalDateTime !== EMPTY_DATA) ? moment(arrivalDateTime).format('h:mm') : arrivalTime;
    arrivalTimePeriod = (arrivalDateTime !== EMPTY_DATA) ? moment(arrivalDateTime).format('A') : '';
    departureTime = (departureDateTime !== EMPTY_DATA) ? moment(departureDateTime).format('h:mm') : departureTime;
    departureTimePeriod = (departureDateTime !== EMPTY_DATA) ? moment(departureDateTime).format('A') : '';

    arrivalDate = (arrivalDateTime !== EMPTY_DATA) ? moment(arrivalDateTime).format('ddd, MMM DD') : arrivalDate;
    departureDate = (departureDateTime !== EMPTY_DATA) ? moment(departureDateTime).format('ddd, MMM DD') : departureDateTime;
    const arrivalUTCtime = (operationalFlightSegments.OperatingAirline.IATACode !== 'UA') ? operationalFlightSegments.ArrivalUTCDateTime : operationalFlightSegments.EstimatedArrivalUTCTime;
    const departureUTCtime = (operationalFlightSegments.OperatingAirline.IATACode !== 'UA') ? operationalFlightSegments.DepartureUTCDateTime : operationalFlightSegments.EstimatedDepartureUTCTime;
    const timesExist = (arrivalUTCtime && departureUTCtime);
    const timeA = (timesExist && (moment(arrivalUTCtime) > moment(departureUTCtime))) ? arrivalUTCtime : departureUTCtime;
    const timeB = (timesExist && (moment(arrivalUTCtime) > moment(departureUTCtime))) ? departureUTCtime : arrivalUTCtime;
    durationTime = (timesExist) ? durationTime.add(moment(timeA).diff(timeB)) : '';
  }
  if (scheduledFlightSegments) {
    const scheduledDepartureDateTime = scheduledFlightSegments.DepartureDateTime;
    const sheduledArrivalDateTime = scheduledFlightSegments.ArrivalDateTime;
    departureScheduled = (scheduledDepartureDateTime) ? moment(scheduledDepartureDateTime).format('h:mm A') : departureScheduled;
    arrivalScheduled = (sheduledArrivalDateTime) ? moment(sheduledArrivalDateTime).format('h:mm A') : arrivalScheduled;
  }

  const patternAirportName = /[^(]*/;

  const departureWeatherDsc = (departureWeather && departureWeather.Sky) ? WeatherIcons(departureWeather.Sky).weatherDsc : intl.formatMessage(messages.unknown);
  const arrivalWeatherDsc = (arrivalWeather && arrivalWeather.Sky) ? WeatherIcons(arrivalWeather.Sky).weatherDsc : intl.formatMessage(messages.unknown);

  const departureAirportCode = (operationalDepartureAirport.IATACode) ? operationalDepartureAirport.IATACode : EMPTY_DATA;
  const departureAirportName = (operationalDepartureAirport.Name) ? patternAirportName.exec(operationalDepartureAirport.Name) : EMPTY_DATA;
  const departureTemp = (departureWeather.Temperature.Farenheit) ? `${departureWeather.Temperature.Farenheit}\u00B0F` : EMPTY_DATA;

  const arrivalAirportCode = (operationalArrivalAirport.IATACode) ? operationalArrivalAirport.IATACode : EMPTY_DATA;
  const arrivalAirportName = (operationalArrivalAirport.Name) ? patternAirportName.exec(operationalArrivalAirport.Name) : EMPTY_DATA;
  const arrivalTemp = (arrivalWeather.Temperature.Farenheit) ? `${arrivalWeather.Temperature.Farenheit}\u00B0F` : EMPTY_DATA;

  const currentDepartureTime = (departureDateTime !== EMPTY_DATA) ? moment(departureDateTime).format('h:mm A') : departureTime;
  const departureDateAriaFormat = (departureDateTime !== EMPTY_DATA) ? moment(departureDateTime).format('dddd, MMMM DD') : departureDateTime;
  const departureSectionAriaLabel = `${intl.formatMessage(messages.departure)} ${intl.formatMessage(messages.on)} ${departureDateAriaFormat} ${intl.formatMessage(messages.atActualDepartureTime)} ${currentDepartureTime} ${intl.formatMessage(messages.atScheduledDepartureTime)} ${departureScheduled} ${intl.formatMessage(messages.from)} ${departureAirportCode} ${departureAirportName} ${intl.formatMessage(messages.weatherStatus)} ${departureWeatherDsc} ${intl.formatMessage(messages.tempStatus)} ${departureTemp}`;

  const currentArrivalTime = (arrivalDateTime !== EMPTY_DATA) ? moment(arrivalDateTime).format('h:mm A') : arrivalTime;
  const arrivalDateAriaFormat = (arrivalDateTime !== EMPTY_DATA) ? moment(arrivalDateTime).format('dddd, MMMM DD') : arrivalDate;
  const arrivalSectionAriaLabel = `${intl.formatMessage(messages.arrival)} ${intl.formatMessage(messages.on)} ${arrivalDateAriaFormat} ${intl.formatMessage(messages.atActualArrivalTime)} ${currentArrivalTime} ${intl.formatMessage(messages.atScheduledArrivalTime)} ${arrivalScheduled} ${intl.formatMessage(messages.from)} ${arrivalAirportCode} ${arrivalAirportName} ${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherDsc} ${intl.formatMessage(messages.tempStatus)} ${arrivalTemp}`;

  const hours = (durationTime) ? durationTime.hours() : EMPTY_DATA;
  const minutes = (durationTime) ? durationTime.minutes() : EMPTY_DATA;

  const timeDurationAriaLabel = `${intl.formatMessage(messages.totalFlightDuration)} ${hours} ${intl.formatMessage(messages.hours)} ${minutes} ${intl.formatMessage(messages.minutes)}`;

  return (
    <div className={styles.parentContainer}>
      <div tabIndex="0" className={styles.srOnly}>{departureSectionAriaLabel}</div>
      {(!props.isMobile) ?
        <div
          className={classNames(styles.departureHeader, styles.headerStyle)}
        >{intl.formatMessage(messages.departure)}</div>
      : ''}
      <div className={classNames(styles.departureDate, styles.dates)}>{departureDate}</div>
      {(!props.isMobile) ?
        <div className={classNames(styles.departureTime, styles.time)}>
          {departureTime}
          <span className={styles.timePeriodStyle}>{departureTimePeriod}</span>
        </div>
      : ''}
      {(!props.isMobile) ?
        <div className={classNames(styles.departureScheduled, styles.scheduled)}>{intl.formatMessage(messages.scheduled)} {departureScheduled}</div>
      : ''}
      <div className={classNames(styles.departureAirportCode, styles.airportCode)} id="departureAirportCode">
        <div className={styles.departureAirportContainer}>
          {departureAirportCode}
          <div className={styles.city} id="departureCity">
            {departureAirportName}
          </div>
        </div>
      </div>
      <div className={styles.departureTemperatureIcon}>
        <img
          src={departureWeatherIcon}
          alt=""
          role="presentation"
          aria-hidden="true"
        />
        <span className={styles.srOnly}>{`${intl.formatMessage(messages.weatherStatus)} ${departureWeatherDsc}`}</span>
        <div className={styles.temperature} id="departureTemperature">
          {departureTemp}
        </div>
      </div>
      <div className={styles.tripIcon}>
        <img
          src={tripIcon}
          alt=""
          role="presentation"
          aria-hidden="true"
        />
        <div className={styles.flightDurationTime} tabIndex="0" aria-label={timeDurationAriaLabel}>
          {(isTablet) ? <span className={styles.srOnly}>{timeDurationAriaLabel}</span> : ''}
          <span aria-hidden="true">
            {(durationTime) ? `${hours}${intl.formatMessage(messages.letterH)} ${minutes}${intl.formatMessage(messages.letterM)}` : EMPTY_DATA}
          </span>
        </div>
      </div>
      <div tabIndex="0" className={styles.srOnly}>{arrivalSectionAriaLabel}</div>
      {(!props.isMobile) ?
        <div className={classNames(styles.arrivalHeader, styles.headerStyle)}>{intl.formatMessage(messages.arrival)}</div>
      : ''}
      <div className={classNames(styles.arrivalDate, styles.dates)}>{arrivalDate}</div>
      {(!props.isMobile) ?
        <div className={classNames(styles.arrivalTime, styles.time)}>
          {arrivalTime}
          <span className={styles.timePeriodStyle}>{arrivalTimePeriod}</span>
        </div>
      : ''}
      {(!props.isMobile) ?
        <div className={classNames(styles.arrivalScheduled, styles.scheduled)}>{intl.formatMessage(messages.scheduled)} {arrivalScheduled}</div>
      : ''}
      <div className={classNames(styles.arrivalAirportCode, styles.airportCode)} id="arrivalAirportCode">
        {arrivalAirportCode}
        <div className={styles.city} id="arrivalCity">
          {arrivalAirportName}
        </div>
      </div>
      <div className={styles.arrivalTemperatureIcon}>
        <img
          className={styles.arrivalTempImg}
          src={arrivalWeatherIcon}
          alt=""
          role="presentation"
          aria-hidden="true"
        />
        <span className={styles.srOnly}>{`${intl.formatMessage(messages.weatherStatus)} ${arrivalWeatherDsc}`}</span>
        <div className={styles.temperature} id="arrivalTemperature">
          {arrivalTemp}
        </div>
      </div>
    </div>
  );
}

FlightStatusTimeAndTemp.propTypes = {
  flightStatusData: PropTypes.object,
  intl: intlShape.isRequired,
  isMobile: PropTypes.bool,
  selectFlightData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default injectIntl(FlightStatusTimeAndTemp);
