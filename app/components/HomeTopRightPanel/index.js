/*
 * HomeTop
 *
 * This contains several components related to booking flights, cars, etc.
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import { intlShape, injectIntl } from 'react-intl';

import config from 'config'; // eslint-disable-line
import { UNITED_FLIGHTNUMBER_PREFIX } from 'containers/HomePage/constants';

import RightPanelComponent from '../RightPanelComponent';
import FlightStatusTimeAndTemp from '../FlightStatusTimeAndTemp';
import FlightStatusTerminalDetails from '../FlightStatusTerminalDetails';
import CheckinPanelFlightDetails from '../CheckinPanelFlightDetails';

import styles from './homeTopRightPanel.scss';
import messages from './messages';

// Images
import wifiIcon from './assets/wifi_icon.svg';
import powerIcon from './assets/power_icon.svg';
import tvIcon from './assets/tv_icon.svg';

const isMobile = (screen.width < 768);
// Use document body width rather than screen width so it sizes the browser itself (not device)
const isTablet = (document.body.clientWidth < 944);
const EMPTY_DATA = '--';
const FLIGHT_STATUS_TYPE = 'flightStatus';
const CHECKIN_TYPE = 'checkin';

class HomeTopRightPanel extends Component { // eslint-disable-line
  onCloseModal(toClose) {
    this.props.onUpdateCheckinDetailsIndex(0);
    this.props.openRightPanelModal(toClose);
  }

  getBottomTxtIcon(iconType) {
    let icon;
    switch (iconType) {
      case 'Wifi':
        icon = wifiIcon;
        break;
      case 'Power':
        icon = powerIcon;
        break;
      case 'DirectTV':
        icon = tvIcon;
        break;
      default:
        break;
    }
    return icon;
  }

  getRightPanelValues(panelType, panelData) {
    const dataIndex = this.props.dataIndex;
    // Initialize to dashes in case any values are missing, or if there is no operationalFlightSegments returned
    let flightNumberUA = EMPTY_DATA;
    let firstLineTxt;
    let departureFlightStatus;
    let secondSectionContainer;
    let thirdComponentToRender;
    let secondLineTxt;
    let appTxt;
    let appLink;
    let downloadAppLink;
    let bottomTxtA;
    let bottomTxtB;
    let bottomTxtC;
    let bottomTxtD;
    let thirdLineTxt;
    let buttonAction;
    let bottomHeader;
    let bottomTxtIconA;
    let bottomTxtIconB;
    let bottomTxtIconC;
    let bottomURLa;
    let bottomURLb;
    let bottomURLc;
    let bottomURLd;
    let thirdLineURL;
    let linkURLS;
    let hasBottomTypeLink = false;
    let onToFocusFlightNumber;
    let toFocusFlightNumber;

    const intl = this.props.intl;

    if (panelType === FLIGHT_STATUS_TYPE || panelType === CHECKIN_TYPE) {
      appTxt = intl.formatMessage(messages.appTxt);
      appLink = intl.formatMessage(messages.appLink);
      downloadAppLink = `${config.UAL_BASE_URL}${config.DOWNLOAD_APP_LINK}`;
    }

    if (panelType === FLIGHT_STATUS_TYPE) {
      onToFocusFlightNumber = this.props.onToFocusFlightStatusNumber;
      toFocusFlightNumber = this.props.toFocusFlightStatusNumber;
      const flightLegs = (panelData !== null) ? panelData.flightLegs[0] : '';
      const operationalFlightSegments = (flightLegs && flightLegs.OperationalFlightSegments) ? flightLegs.OperationalFlightSegments[0] : '';
      if (operationalFlightSegments) {
        const inputFlightNumber = panelData.Flight.flightNumber ? parseInt(panelData.Flight.flightNumber, 10) : '';
        const defaultFlightNumber = operationalFlightSegments.FlightNumber || '';
        let flightNumber = Number.isInteger(inputFlightNumber) ? inputFlightNumber : defaultFlightNumber;
        const MarketedFlightSegment = (flightLegs.ScheduledFlightSegments && flightLegs.ScheduledFlightSegments[0].MarketedFlightSegment) ? flightLegs.ScheduledFlightSegments[0].MarketedFlightSegment : '';
        if (MarketedFlightSegment) {
          const marketedUASegment = MarketedFlightSegment.find((flightSegment) => flightSegment.MarketingAirlineCode === 'UA' ? flightSegment.FlightNumber : '');
          flightNumber = marketedUASegment ? marketedUASegment.FlightNumber : flightNumber;
        }

        let operatingAirline = operationalFlightSegments.OperatingAirline.Name;
        operatingAirline = (operatingAirline) ? `${intl.formatMessage(messages.operatedBy)} ${operatingAirline}` : '';
        let tailNumber = operationalFlightSegments.Equipment.NoseNumber || operationalFlightSegments.Equipment.TailNumber;
        tailNumber = (tailNumber) ? `${intl.formatMessage(messages.tailNumber)} ${tailNumber}` : '';
        flightNumberUA = (flightNumber) ? `${intl.formatMessage(messages.uaFlightLabel)} ${flightNumber}` : flightNumberUA;
        const flightModel = (operationalFlightSegments.Equipment.Model.Description) || '';
        const comma = (operatingAirline && (flightModel || tailNumber)) ? ',' : '';
        secondLineTxt = `${operatingAirline}${comma} ${flightModel} ${tailNumber}`;
        secondSectionContainer = (
          <FlightStatusTimeAndTemp
            flightStatusData={panelData}
            isMobile={isMobile}
            selectFlightData={dataIndex}
          />);
        thirdComponentToRender = (
          <FlightStatusTerminalDetails
            flightStatusData={panelData}
            isMobile={isMobile}
            selectFlightData={dataIndex}
          />);
        const isUnited = panelData ? this.flighttype(panelData.flightLegs[dataIndex].OperationalFlightSegments[0].OperatingAirline.IATACode) : '';
        if (isUnited) {
          bottomTxtA = intl.formatMessage(messages.upgradeList);
          bottomURLa = `${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}`;
          bottomTxtB = intl.formatMessage(messages.standbyList);
          bottomURLb = bottomURLa;
          bottomTxtC = intl.formatMessage(messages.seatMap);
          bottomURLc = bottomURLa;
          bottomTxtD = intl.formatMessage(messages.amenities);
          bottomURLd = bottomURLa;
        }
        const inboundFlightSegment = operationalFlightSegments.InboundFlightSegment;
        if (inboundFlightSegment) {
          const inboundDepartureTime = (inboundFlightSegment.DepartureDate) ? moment(inboundFlightSegment.DepartureDate).format('MM/DD/YYYY') : '';
          const inboutFlightNumber = inboundFlightSegment.FlightNumber || '';
          const inboundDepartureAirport = inboundFlightSegment.DepartureAirport || '';
          const inboundArrivalAirport = inboundFlightSegment.ArrivalAirport || '';
          const inboundCarrierCode = inboundFlightSegment.CarrierCode || '';
          if (inboundDepartureTime && inboutFlightNumber && inboundDepartureAirport && inboundArrivalAirport && inboundCarrierCode) {
            thirdLineTxt = intl.formatMessage(messages.locateFlight);
            thirdLineURL = `${config.UAL_BASE_URL}${config.PREVIOUS_FLIGHT_STATUS_URL}FLN=${inboutFlightNumber}&FLD=${inboundDepartureTime}&FSO=${inboundDepartureAirport}&FSD=${inboundArrivalAirport}&CC=${inboundCarrierCode}&MobileOff=1`;
          }
        }
        linkURLS = this.formURL(panelData, dataIndex);
        buttonAction = () => {
          this.props.reloadFlightStatusService(this.props.flightStatusOriginLocationCode, this.props.flightStatusDestinationLocationCode, flightNumber, this.props.flightStatusDate);
          this.props.onToFocusFlightStatusNumber(true);
        };
        departureFlightStatus = dataIndex ? panelData.flightLegs[dataIndex].OperationalFlightSegments[0].FlightStatuses[3].Description : panelData.flightLegs[0].OperationalFlightSegments[0].FlightStatuses[3].Description;
        const departureFlightStatusDescription = dataIndex ? panelData.flightLegs[dataIndex].OperationalFlightSegments[0].FlightStatuses[1].Description : panelData.flightLegs[0].OperationalFlightSegments[0].FlightStatuses[1].Description;

        departureFlightStatus = departureFlightStatus || '';
        firstLineTxt = departureFlightStatusDescription || '';
        hasBottomTypeLink = true;
      }
    } else if (panelType === CHECKIN_TYPE) {
      onToFocusFlightNumber = this.props.onToFocusFlightCheckinNumber;
      toFocusFlightNumber = this.props.toFocusFlightCheckinNumber;
      const isUnited = (panelData && panelData.trips && panelData.trips[dataIndex] && panelData.trips[dataIndex].FlightStatusLegs && panelData.trips[dataIndex].FlightStatusLegs[0]) ? this.flighttype(panelData.trips[dataIndex].FlightStatusLegs[0].OperationalFlightSegments[0].OperatingAirline.IATACode) : '';
      // TODO: add actual values for hasInFlightAmenities once the data is added to the backend... setting to false by default for now
      const hasInFlightAmenities = (isUnited && false);
      // Trips
      const flightTrips = panelData.trips[dataIndex];
      const flightNumber = flightTrips.FlightSegments[0].FlightSegment.OperatingAirlineCode + flightTrips.FlightSegments[0].FlightSegment.FlightNumber;
      flightNumberUA = flightNumber || flightNumberUA;
      if (hasInFlightAmenities) {
        bottomHeader = intl.formatMessage(messages.amenitiesHeaderTxt);
        bottomTxtA = intl.formatMessage(messages.wifiTxt);
        bottomTxtIconA = this.getBottomTxtIcon(bottomTxtA);
        bottomTxtB = intl.formatMessage(messages.power);
        bottomTxtIconB = this.getBottomTxtIcon(bottomTxtB);
        bottomTxtC = intl.formatMessage(messages.directTVLabelTxt);
        bottomTxtIconC = this.getBottomTxtIcon(bottomTxtC);
      }
      const travelers = flightTrips.Travelers;
      const passengerNumber = travelers.length;
      let passengerNames = '';
      travelers.forEach((traveler) => {
        const newPassenger = `${traveler.Person.GivenName} ${traveler.Person.Surname}`;
        passengerNames = (passengerNames !== '') ? `${passengerNames}, ${newPassenger}` : `${passengerNames} ${newPassenger}`;
      });
      // Note: all travelers need to be checked-in in order for the "view boarding pass" button to show
      let isUserCheckedIn = true;
      travelers.forEach((traveler) => {
        isUserCheckedIn = (travelers && isUserCheckedIn && (traveler.IsCheckedIn === 'Y'));
      });
      const links = flightTrips.Links;
      let boardingPassURL;
      let checkinURL;
      if (links) {
        links.forEach((item) => {
          if (item.LinkType === 'Boarding Pass') {
            boardingPassURL = item.Href;
          } else if (item.LinkType === 'Checkin Now') {
            checkinURL = item.Href;
          }
        });
      }
      const buttonActionURL = (isUserCheckedIn) ? boardingPassURL : checkinURL;
      buttonAction = () => {
        window.location = buttonActionURL;
      };
      const passengerHeaderTxt = (passengerNumber === 1) ? intl.formatMessage(messages.singleTraveler) : intl.formatMessage(messages.travelers);
      const passengerSectionAriaLabel = `${passengerNumber} ${passengerHeaderTxt} ${passengerNames}`;
      secondSectionContainer = (
        <div className={styles.passengerContainer}>
          <div tabIndex="0" className={styles.srOnly}>{passengerSectionAriaLabel}</div>
          <div className={styles.passengerHeader}>{passengerNumber} {passengerHeaderTxt}</div>
          <div className={styles.passengerNames}>{passengerNames}</div>
        </div>
      );

      // Flight segments. NOTE: we only care about showing the flight data for the first leg, which is why we only check for the first item in the OperationalFlightSegments array.
      const flightLegs = (flightTrips.FlightSegments) ? flightTrips.FlightSegments[0] : '';
      const flightSegments = (flightLegs && flightLegs.FlightSegment) ? flightLegs.FlightSegment : '';
      let boardingTimeFormatted = EMPTY_DATA;
      let departureTime = EMPTY_DATA;
      let gate = EMPTY_DATA;
      let terminal = EMPTY_DATA;
      if (flightSegments) {
        const boardingTime = flightSegments.BoardTime;
        boardingTimeFormatted = (boardingTime) ? moment(boardingTime).format('HH.mm') : boardingTimeFormatted;
        departureTime = (flightSegments.DepartureDateTime) ? moment(flightSegments.DepartureDateTime).format('HH.mm') : departureTime;
        gate = flightSegments.DepartureGate || gate;
        terminal = flightSegments.DepartureTerminal || terminal;
        const status = flightSegments.FlightStatuses;
        departureFlightStatus = `${intl.formatMessage(messages.checkinStatus)} ${status[0].Description}`;
      }
      thirdComponentToRender = (
        <CheckinPanelFlightDetails
          boardingTime={boardingTimeFormatted}
          departureTime={departureTime}
          gate={gate}
          terminal={terminal}
        />
      );
    }
    return { flightNumberUA, departureFlightStatus, firstLineTxt, secondSectionContainer, thirdComponentToRender, secondLineTxt, appTxt, appLink, downloadAppLink, bottomTxtA, bottomTxtB, bottomTxtC, bottomTxtD, thirdLineTxt, buttonAction, hasBottomTypeLink, bottomURLa, bottomURLb, bottomURLc, bottomURLd, thirdLineURL, bottomHeader, bottomTxtIconA, bottomTxtIconB, bottomTxtIconC, linkURLS, panelType, onToFocusFlightNumber, toFocusFlightNumber };
  }

  formURL(flightStatusData, selectFlightData) {
    const fetchdate = flightStatusData ? (flightStatusData.flightLegs[selectFlightData].OperationalFlightSegments[0].DepartureDateTime) : '';
    const fso = flightStatusData.flightLegs[selectFlightData].OperationalFlightSegments[0].DepartureAirport.IATACode;
    const fsd = flightStatusData.flightLegs[selectFlightData].OperationalFlightSegments[0].ArrivalAirport.IATACode;
    const fno = flightStatusData.flightLegs[selectFlightData].OperationalFlightSegments[0].FlightNumber;
    const upgradeURL = `${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}?FLN=${fno}&FLD=${fetchdate}&FSO=${fso}&FSD=${fsd}&CC=UA&NFT=US&MobileOff=1`;
    const standbyURL = `${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}?FLN=${fno}&FLD=${fetchdate}&FSO=${fso}&FSD=${fsd}&CC=UA&NFT=FS&MobileOff=1`;
    const seatmapURL = `${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}?FLN=${fno}&FLD=${fetchdate}&FSO=${fso}&FSD=${fsd}&CC=UA&NFT=SM&MobileOff=1`;
    const amenitiesURL = `${config.UAL_BASE_URL}${config.UPGRADE_LIST_URL}?FLN=${fno}&FLD=${fetchdate}&FSO=${fso}&FSD=${fsd}&CC=UA&NFT=AM&MobileOff=1`;
    const urls = { upgradeURL, standbyURL, seatmapURL, amenitiesURL };
    return urls;
  }

  flighttype(operatingAirline) {
    const united = UNITED_FLIGHTNUMBER_PREFIX;
    const flightlegtype = united.find((current) => current === operatingAirline);
    return flightlegtype;
  }

  render() {
    const data = this.props.data;
    const dataIndex = this.props.dataIndex;
    const isDataIndex = dataIndex || dataIndex === 0;

    // Flight check-in
    const flightTrips = (data && this.props.validCheckin && isDataIndex) ? data.trips[dataIndex] : '';
    const irrops = (flightTrips) ? flightTrips.IrropsReasonCode : '';
    let operatingAirlineData;
    if (this.props.validFlightStatus && isDataIndex && data.flightLegs) {
      operatingAirlineData = data.flightLegs[dataIndex].OperationalFlightSegments[0].OperatingAirline.IATACode;
    } else if (this.props.validCheckin && isDataIndex && data.trips) {
      operatingAirlineData = (data.trips && data.trips[dataIndex] && data.trips[dataIndex].FlightStatusLegs && data.trips[dataIndex].FlightStatusLegs[0]) ? data.trips[dataIndex].FlightStatusLegs[0].OperationalFlightSegments[0].OperatingAirline.IATACode : '';
    }
    const isUnited = (operatingAirlineData) ? this.flighttype(operatingAirlineData) : '';

    let rightPanelValues;

    const intl = this.props.intl;

    let buttonTxt;
    let alertmsg;
    let isUserCheckedIn = true;
    if (isDataIndex) {
      if (this.props.validFlightStatus) {
        buttonTxt = intl.formatMessage(messages.flightStatusButtonText);
        rightPanelValues = this.getRightPanelValues(FLIGHT_STATUS_TYPE, this.props.data);
      } else if (this.props.validCheckin) {
        const travelers = flightTrips.Travelers;
        travelers.forEach((traveler) => {
          isUserCheckedIn = (travelers && isUserCheckedIn && (traveler.IsCheckedIn === 'Y'));
        });
        if (isUserCheckedIn) {
          buttonTxt = intl.formatMessage(messages.viewBoardingPassTxt);
        } else if (!isUserCheckedIn && irrops) {
          buttonTxt = intl.formatMessage(messages.viewTripsButtonText);
          alertmsg = '';
        } else {
          buttonTxt = intl.formatMessage(messages.checkinNowBtnTxt);
        }
        rightPanelValues = this.getRightPanelValues(CHECKIN_TYPE, this.props.data);
      }
    }

    const showRightPanel = isDataIndex && ((this.props.validFlightStatus) || (this.props.validCheckin && this.props.isLoggedIn));

    const rightPanel = (
      <div className={(!isMobile) ? classNames(styles.rightPanelContainer) : ''}>
        {(rightPanelValues) ?
          <RightPanelComponent
            appLink={rightPanelValues.appLink}
            appTxt={rightPanelValues.appTxt}
            bottomHeader={rightPanelValues.bottomHeader}
            buttonAction={rightPanelValues.buttonAction}
            buttonTxt={buttonTxt}
            bottomTxtA={rightPanelValues.bottomTxtA}
            bottomTxtB={rightPanelValues.bottomTxtB}
            bottomTxtC={rightPanelValues.bottomTxtC}
            bottomTxtD={rightPanelValues.bottomTxtD}
            bottomURLa={rightPanelValues.bottomURLa}
            bottomURLb={rightPanelValues.bottomURLb}
            bottomURLc={rightPanelValues.bottomURLc}
            bottomURLd={rightPanelValues.bottomURLd}
            bottomTxtIconA={rightPanelValues.bottomTxtIconA}
            bottomTxtIconB={rightPanelValues.bottomTxtIconB}
            bottomTxtIconC={rightPanelValues.bottomTxtIconC}
            downloadAppLink={rightPanelValues.downloadAppLink}
            firstLineTxt={alertmsg || rightPanelValues.firstLineTxt}
            flightNumber={rightPanelValues.flightNumberUA}
            hasBottomTypeLink={rightPanelValues.hasBottomTypeLink}
            isMobile={isMobile}
            isTablet={isTablet}
            onCloseModal={(toClose) => this.onCloseModal(toClose)}
            secondLineTxt={rightPanelValues.secondLineTxt}
            secondSectionComponenet={rightPanelValues.secondSectionContainer}
            status={rightPanelValues.departureFlightStatus}
            thirdComponentToRender={rightPanelValues.thirdComponentToRender}
            thirdLineTxt={rightPanelValues.thirdLineTxt}
            isUnited={isUnited}
            thirdLineURL={rightPanelValues.thirdLineURL}
            linkURLS={rightPanelValues.linkURLS}
            isLoading={this.props.isLoading}
            panelType={rightPanelValues.panelType}
            toFocusFlightNumber={rightPanelValues.toFocusFlightNumber}
            onToFocusFlightNumber={rightPanelValues.onToFocusFlightNumber}
          />
          : <RightPanelComponent isLoading={this.props.isLoading} />}
      </div>);

    const rightPanelComponent = (isTablet) ?
    (<Modal
      isOpen={(showRightPanel && this.props.isRightPanelModalOpen) || this.props.isLoading}
      className={styles.panelModal}
    >
      {rightPanel}</Modal>)
    : (
      rightPanel
    );

    return (
      <div className={styles.gridParent}>
        {rightPanelComponent}
      </div>
    );
  }
}

HomeTopRightPanel.propTypes = {
  data: PropTypes.object,
  dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flightStatusDate: PropTypes.string,
  flightStatusDestinationLocationCode: PropTypes.string,
  flightStatusOriginLocationCode: PropTypes.string,
  intl: intlShape.isRequired,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isRightPanelModalOpen: PropTypes.bool,
  onUpdateCheckinDetailsIndex: PropTypes.func,
  onToFocusFlightStatusNumber: PropTypes.func,
  onToFocusFlightCheckinNumber: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  reloadFlightStatusService: PropTypes.func,
  toFocusFlightStatusNumber: PropTypes.bool,
  toFocusFlightCheckinNumber: PropTypes.bool,
  validCheckin: PropTypes.bool,
  validFlightStatus: PropTypes.bool,
};

export default injectIntl(HomeTopRightPanel);
