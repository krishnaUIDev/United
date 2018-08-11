import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { intlShape, injectIntl } from 'react-intl';

import messages from './messages';
import styles from './checkinPanelFlightDetails.scss';

const isTablet = (screen.width <= 768);
const EMPTY_DATA = '--';

export function CheckinPanelFlightDetails(props) {
  const intl = props.intl;

  const departureTimeFormatted = (props.departureTime) ? moment(props.departureTime, 'h:mm A').format('h:mm') : '';
  const departureTimePeriod = (props.departureTime) ? moment(props.departureTime, 'h:mm A').format('A') : '';
  const boardingTimeFormatted = (props.boardingTime) ? moment(props.boardingTime, 'h:mm A').format('h:mm') : '';
  const boardingTimePeriod = (props.boardingTime) ? moment(props.boardingTime, 'h:mm A').format('A') : '';

  const terminalAriaLabel = (props.terminal === EMPTY_DATA) ? intl.formatMessage(messages.notAssigned) : props.terminal;
  const terminalAriaHidden = (props.terminal === EMPTY_DATA) ? 'true' : 'false';
  const sectionAriaLabel = `${intl.formatMessage(messages.departureHeader)} ${departureTimeFormatted} ${departureTimePeriod} ${intl.formatMessage(messages.boardingHeader)} ${boardingTimeFormatted} ${boardingTimePeriod} ${intl.formatMessage(messages.terminalHeader)} ${terminalAriaLabel} ${intl.formatMessage(messages.gateHeader)} ${props.gate} ${intl.formatMessage(messages.assignmentMayChangeTxt)}`;
  return (
    <div className={styles.parentContainer}>
      <div tabIndex="0" className={styles.srOnly}>{sectionAriaLabel}</div>
      <div className={styles.departureContainer}>
        <span className={styles.headerStyle}>{intl.formatMessage(messages.departureHeader)}</span>
        <div className={styles.details}>
          {departureTimeFormatted}
          <span className={styles.timePeriodStyle}>{departureTimePeriod}</span>
        </div>
      </div>
      <div className={styles.boardingContainer}>
        <span className={styles.headerStyle}>{intl.formatMessage(messages.boardingHeader)}</span>
        <div className={styles.details}>
          {boardingTimeFormatted}
          <span className={styles.timePeriodStyle}>{boardingTimePeriod}</span>
        </div>
      </div>
      <div className={styles.terminalContainer}>
        <span className={styles.headerStyle}>{intl.formatMessage(messages.terminalHeader)}</span>
        <div className={styles.details}>
          <span aria-hidden={terminalAriaHidden}>{props.terminal}</span>
          {(isTablet && (props.terminal === EMPTY_DATA)) ? <span className={styles.srOnly}>{intl.formatMessage(messages.notAssigned)}</span> : ''}
        </div>
      </div>
      <div className={styles.gateContainer}>
        <span className={styles.headerStyle}>{intl.formatMessage(messages.gateHeader)}</span>
        <div className={styles.details}>{props.gate}</div>
      </div>
      <div className={styles.assignmentMayChange}>
        {intl.formatMessage(messages.assignmentMayChangeTxt)}
      </div>
    </div>
  );
}

CheckinPanelFlightDetails.propTypes = {
  boardingTime: PropTypes.string,
  departureTime: PropTypes.string,
  gate: PropTypes.string,
  intl: intlShape.isRequired,
  terminal: PropTypes.string,
};

export default injectIntl(CheckinPanelFlightDetails);
