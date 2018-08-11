/*
 * HomeTop
 *
 * This contains several components related to booking flights, cars, etc.
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import config from 'config'; // eslint-disable-line

import CarouselContainer from 'containers/CarouselContainer';
import BookTravelContainer from 'containers/BookTravelContainer';
import HomeTopRightPanel from 'components/HomeTopRightPanel';

import styles from './homeTop.scss';

const isTablet = (screen.width <= 768);

export default class HomeTop extends Component { // eslint-disable-line
  renderCarousel(showDefault) {
    return (
      <div className={classNames(styles.gridChild, styles.rightPanelStyleForCarousel)}>
        <CarouselContainer showDefault={showDefault} />
      </div>
    );
  }
  renderRightPanel(isLoading, showRightPanel, validFlightStatus, validCheckin, data, dataIndex) {
    return (
      <div className={styles.rightPanelStyle}>
        <HomeTopRightPanel
          data={data}
          dataIndex={dataIndex}
          flightStatusDate={this.props.flightStatusDate}
          flightStatusDestinationLocationCode={this.props.flightStatusDestinationLocationCode}
          flightStatusOriginLocationCode={this.props.flightStatusOriginLocationCode}
          isLoggedIn={this.props.isLoggedIn}
          isLoading={isLoading}
          isRightPanelModalOpen={this.props.isRightPanelModalOpen}
          onUpdateCheckinDetailsIndex={this.props.onUpdateCheckinDetailsIndex}
          onToFocusFlightStatusNumber={this.props.onToFocusFlightStatusNumber}
          onToFocusFlightCheckinNumber={this.props.onToFocusFlightCheckinNumber}
          openRightPanelModal={this.props.openRightPanelModal}
          reloadFlightStatusService={this.props.reloadFlightStatusService}
          showRightPanel={showRightPanel}
          isFlightStatusLoading={this.props.isFlightStatusLoading}
          isCheckinDataLoading={this.props.isCheckinDataLoading}
          toFocusFlightStatusNumber={this.props.toFocusFlightStatusNumber}
          toFocusFlightCheckinNumber={this.props.toFocusFlightCheckinNumber}
          validCheckin={validCheckin}
          validFlightStatus={validFlightStatus}
        />
      </div>);
  }

  render() {
    // Flight status
    const flightStatusData = this.props.flightStatusData;
    const isStatusTabActive = (this.props.activeTab === 'statusTab');
    let isFlightStatusData = (flightStatusData && (Object.keys(flightStatusData).length > 0) && (isStatusTabActive));
    isFlightStatusData = (isFlightStatusData === null) ? false : isFlightStatusData;
    const validFlightStatus = (isFlightStatusData && isStatusTabActive);

    // Flight check-in
    const flightCheckinData = this.props.flightCheckinData;
    const isCheckinTabActive = (this.props.activeTab === 'checkInTab');
    let isCheckinData = (flightCheckinData && (Object.keys(flightCheckinData).length > 0) && (isCheckinTabActive));
    isCheckinData = (isCheckinData === null) ? false : isCheckinData;
    const validCheckin = (isCheckinData && isCheckinTabActive);

    const isLoading = (((this.props.isFlightStatusLoading === true) && (this.props.activeTab === 'statusTab'))
      || ((this.props.isCheckinDataLoading) && ((this.props.activeTab === 'checkInTab'))));

    let data;
    let dataIndex;
    if (validCheckin) {
      data = flightCheckinData;
      dataIndex = (this.props.checkinDetailsIndex === '' && !isTablet) ? 0 : this.props.checkinDetailsIndex;
    } else if (validFlightStatus) {
      data = flightStatusData;
      dataIndex = (!(this.props.selectFlightData) && !(isTablet)) ? 0 : this.props.selectFlightData;
    }

    const showRightPanel = (dataIndex || dataIndex === 0) && ((isFlightStatusData) || (isCheckinData && this.props.isLoggedIn));

    // Need to hide visibility of background while modal is open, otherwise focus will stay on background and not enter modal.
    let focusFlightNumber;
    if (this.props.activeTab === 'checkInTab') {
      focusFlightNumber = this.props.toFocusFlightCheckinNumber;
    } else if (this.props.activeTab === 'statusTab') {
      focusFlightNumber = this.props.toFocusFlightStatusNumber;
    }
    const visibilityStyle = ((focusFlightNumber || isLoading) && isTablet && showRightPanel) ? styles.modalOpenDisplay : styles.modalClosedDisplay;

    return (
      <section className={styles.homeTop}>
        <div className={styles.gridParent}>
          <div className={classNames(styles.bookerContainer, (this.props.isHomeTopExpanded) ? styles.bookerContainerExpanded : styles.bookerContainerNotExpanded, visibilityStyle)}>
            <BookTravelContainer />
          </div>
          {((showRightPanel || isLoading) && this.renderRightPanel(isLoading, showRightPanel, validFlightStatus, validCheckin, data, dataIndex))}
          {(!showRightPanel && !isLoading) ? this.renderCarousel() : this.renderCarousel(true)}
        </div>
      </section>
    );
  }
}

HomeTop.propTypes = {
  activeTab: PropTypes.string,
  checkinDetailsIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flightCheckinData: PropTypes.object,
  flightStatusData: PropTypes.object,
  flightStatusDate: PropTypes.string,
  flightStatusDestinationLocationCode: PropTypes.string,
  flightStatusOriginLocationCode: PropTypes.string,
  isCheckinDataLoading: PropTypes.bool,
  isFlightStatusLoading: PropTypes.bool,
  isHomeTopExpanded: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isRightPanelModalOpen: PropTypes.bool,
  onToFocusFlightStatusNumber: PropTypes.func,
  onToFocusFlightCheckinNumber: PropTypes.func,
  onUpdateCheckinDetailsIndex: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  reloadFlightStatusService: PropTypes.func,
  selectFlightData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toFocusFlightCheckinNumber: PropTypes.bool,
  toFocusFlightStatusNumber: PropTypes.bool,
};
