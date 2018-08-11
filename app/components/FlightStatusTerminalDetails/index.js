import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { intlShape, injectIntl } from 'react-intl';

import styles from './flightStatusTerminalDetails.scss';
import messages from './messages';


const EMPTY_DATA = '--';
const isTablet = (screen.width <= 768);

export function FlightStatusTerminalDetails(props) {
  const intl = props.intl;

  const flightStatusData = props.flightStatusData;
  const selectFlightData = props.selectFlightData;

  // Check to make sure that flightLegs data actually exists
  const flightLegs = (selectFlightData !== '') ? flightStatusData.flightLegs[selectFlightData] : flightStatusData.flightLegs[0];
  const operationalFlightSegments = (flightLegs && flightLegs.OperationalFlightSegments) ? flightLegs.OperationalFlightSegments[0] : '';
  const scheduledFlightSegments = (flightLegs && flightLegs.ScheduledFlightSegments) ? flightLegs.ScheduledFlightSegments[0] : '';

  // Initialize to dashes in case any values are missing, or if there is no flightLegs data
  let departureTime = EMPTY_DATA;
  let arrivalTime = EMPTY_DATA;
  let departureGateDetails = intl.formatMessage(messages.gateNotAssigned);
  let departureTerminalDetails = EMPTY_DATA;
  let arrivalGateDetails = intl.formatMessage(messages.gateNotAssigned);
  let arrivalTerminalDetails = EMPTY_DATA;
  let departureScheduled = EMPTY_DATA;
  let arrivalScheduled = EMPTY_DATA;
  let departureGateFontStyle = styles.gateNotAssigned;
  let arrivalGateFontStyle = styles.gateNotAssigned;
  if (operationalFlightSegments) {
    arrivalGateDetails = (operationalFlightSegments.ArrivalGate) || arrivalGateDetails;
    arrivalGateFontStyle = (arrivalGateDetails !== intl.formatMessage(messages.gateNotAssigned)) ? styles.gateAssigned : arrivalGateFontStyle;
    arrivalTerminalDetails = (operationalFlightSegments.ArrivalTermimal) || arrivalTerminalDetails;
    departureGateDetails = (operationalFlightSegments.DepartureGate) || departureGateDetails;
    departureGateFontStyle = (departureGateDetails !== intl.formatMessage(messages.gateNotAssigned)) ? styles.gateAssigned : departureGateFontStyle;
    departureTerminalDetails = (operationalFlightSegments.DepartureTerminal) || departureTerminalDetails;

    const departureTimeAlternative = operationalFlightSegments.EstimatedDepartureTime || EMPTY_DATA;
    const departureDateTime = (operationalFlightSegments.OutTime && operationalFlightSegments.InTime) ? operationalFlightSegments.OutTime : departureTimeAlternative;
    const arrivalTimeAlternative = operationalFlightSegments.EstimatedArrivalTime || EMPTY_DATA;
    const arrivalDateTime = (operationalFlightSegments.OutTime && operationalFlightSegments.InTime) ? operationalFlightSegments.InTime : arrivalTimeAlternative;
    departureTime = (departureDateTime && moment(departureDateTime).isValid()) ? moment(departureDateTime).format('h:mm a') : departureTime;
    arrivalTime = (arrivalDateTime && moment(arrivalDateTime).isValid()) ? moment(arrivalDateTime).format('h:mm a') : arrivalTime;
  }

  if (scheduledFlightSegments) {
    const scheduledDepartureDateTime = scheduledFlightSegments.DepartureDateTime;
    const scheduledArrivalDateTime = scheduledFlightSegments.ArrivalDateTime;
    departureScheduled = (scheduledDepartureDateTime && moment(scheduledDepartureDateTime).isValid()) ? moment(scheduledDepartureDateTime).format('h:mm a') : departureScheduled;
    arrivalScheduled = (scheduledArrivalDateTime && moment(scheduledArrivalDateTime).isValid()) ? moment(scheduledArrivalDateTime).format('h:mm a') : arrivalScheduled;
  }

  const departureTerminalDetailsAriaLabel = (departureTerminalDetails === EMPTY_DATA) ? intl.formatMessage(messages.notAssigned) : departureTerminalDetails;
  const departureTerminalAriaLabel = `${intl.formatMessage(messages.departureTerminalAriaLabel)} ${departureTerminalDetailsAriaLabel}`;
  const departureGateAriaLabel = `${intl.formatMessage(messages.atGateAriaLabel)} ${departureGateDetails}`;
  const departureSectionAriaLabel = `${departureTerminalAriaLabel} ${departureGateAriaLabel}`;

  const arrivalTerminalDetailsAriaLabel = (arrivalTerminalDetails === EMPTY_DATA) ? intl.formatMessage(messages.notAssigned) : arrivalTerminalDetails;
  const arrivalTerminalAriaLabel = `${intl.formatMessage(messages.arrivalTerminalAriaLabel)} ${arrivalTerminalDetailsAriaLabel}`;
  const arrivalGateAriaLabel = `${intl.formatMessage(messages.atGateAriaLabel)} ${arrivalGateDetails}`;
  const arrivalSectionAriaLabel = `${arrivalTerminalAriaLabel} ${arrivalGateAriaLabel}`;

  const arrivalTerminalAriaHidden = (arrivalTerminalDetails === EMPTY_DATA) ? 'true' : 'false';
  const departureTerminalAriaHidden = (departureTerminalDetails === EMPTY_DATA) ? 'true' : 'false';
  return (
    <div className={styles.parentContainer}>
      <div tabIndex="0" className={styles.srOnly}>{departureSectionAriaLabel}</div>
      {(props.isMobile) ?
        <span className={classNames(styles.departureHeader, styles.headerStyle)}>
          {intl.formatMessage(messages.departed)}
          <div className={styles.timeStyle}>{departureTime}</div>
          <div className={styles.scheduledTime}>
            {`${intl.formatMessage(messages.scheduled)}${departureScheduled}`}
          </div>
        </span>
      : ''}
      <div className={styles.departureTerminalHeader} aria-label={departureTerminalAriaLabel}>
        <span className={classNames(styles.headerStyle)}>
          {intl.formatMessage(messages.terminal)}
          <div className={styles.terminalDetails} id="departureTerminalDetails">
            <span aria-hidden={departureTerminalAriaHidden}>{departureTerminalDetails}</span>
            {(isTablet && (departureTerminalDetails === EMPTY_DATA)) ? <span className={styles.srOnly}>{intl.formatMessage(messages.notAssigned)}</span> : ''}
          </div>
        </span>
      </div>
      <div className={styles.departureGateHeader} aria-label={departureGateAriaLabel}>
        <span className={classNames(styles.headerStyle)}>
          {intl.formatMessage(messages.gate)}
          <div
            className={classNames(styles.gateDetails, departureGateFontStyle)}
            id="departureGateDetails"
          >{departureGateDetails}</div>
        </span>
      </div>
      {(props.isMobile) ?
        <div className={classNames(styles.horizontalDivider)} aria-hidden="true" />
      : ''}
      <div tabIndex="0" className={styles.srOnly}>{arrivalSectionAriaLabel}</div>
      {(props.isMobile) ?
        <span className={classNames(styles.arrivalHeader, styles.headerStyle)}>
          {intl.formatMessage(messages.arrival)}
          <div className={styles.timeStyle}>{arrivalTime}</div>
          <div className={styles.scheduledTime}>
            {`${intl.formatMessage(messages.scheduled)} ${arrivalScheduled}`}
          </div>
        </span>
      : ''}
      <div className={styles.arrivalTerminalHeader} aria-label={arrivalTerminalAriaLabel}>
        <span className={classNames(styles.headerStyle)}>
          {intl.formatMessage(messages.terminal)}
          <div className={styles.terminalDetails} id="arrivalTerminalDetails">
            <span aria-hidden={arrivalTerminalAriaHidden}>{arrivalTerminalDetails}</span>
            {(isTablet && (arrivalTerminalDetails === EMPTY_DATA)) ? <span className={styles.srOnly}>{intl.formatMessage(messages.notAssigned)}</span> : ''}
          </div>
        </span>
      </div>
      <div className={styles.arrivalGateHeaderContainer} aria-label={arrivalGateAriaLabel}>
        <span className={classNames(styles.arrivalGateHeader, styles.headerStyle)}>
          {intl.formatMessage(messages.gate)}
          <div
            className={classNames(styles.gateDetails, arrivalGateFontStyle)}
            id="arrivalGateDetails"
          >{arrivalGateDetails}</div>
        </span>
      </div>
    </div>
  );
}

FlightStatusTerminalDetails.propTypes = {
  flightStatusData: PropTypes.object,
  intl: intlShape.isRequired,
  isMobile: PropTypes.bool,
  selectFlightData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default injectIntl(FlightStatusTerminalDetails);
