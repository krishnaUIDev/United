import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoaderIndicatorRing from 'components/LoaderIndicatorRing';
import styles from './flightStatus.scss';
import FlightStatusForm from '../FlightStatusForm/index';
import FlightStatusSegmentList from '../FlightStatusSegmentList/index';

export class FlightStatus extends Component {
  renderwithData() {
    if (this.props.flightsStatusData) {
      return (
        <FlightStatusSegmentList
          flightStatusData={this.props.flightsStatusData}
          onNewFlightStatusSearch={this.props.onNewFlightStatusSearch}
          openRightPanelModal={this.props.openRightPanelModal}
          onToFocusFlightNumber={this.props.onToFocusFlightNumber}
          selectedStatusDate={this.props.selectedStatusDate}
          selectedFlight={this.props.selectedFlight}
          selectFlightDataIndex={this.props.selectFlightDataIndex}
          toFocusFlightNumber={this.props.toFocusFlightNumber}
        />
      );
    }
    return (<FlightStatusForm
      onSelectFlightStatusOriginLocation={this.props.onSelectFlightStatusOriginLocation}
      onSelectFlightStatusDestinationLocation={this.props.onSelectFlightStatusDestinationLocation}
      getFlightRequestResponse={this.props.getFlightRequestResponse}
      onArrowKeyDown={this.props.onArrowKeyDown}
      onChangeModel={this.props.onChangeModel}
      onItemSelected={this.props.onItemSelected}
      onLoadAirports={this.props.onLoadAirports}
      setDateSelected={this.props.setDateSelected}
      setFlightNumber={this.props.setFlightNumber}
      onFlightStatusSubmit={this.props.onFlightStatusSubmit}
      setFlightStatusOriginLocationCode={this.props.setFlightStatusOriginLocationCode}
      setFlightStatusDestinationLocationCode={this.props.setFlightStatusDestinationLocationCode}
      activeTab={this.props.activeTab}
      mobileView={this.props.mobileView}
      globalFlightStatusDestinationLocationCode={this.props.globalFlightStatusDestinationLocationCode}
      globalFlightStatusOriginLocationCode={this.props.globalFlightStatusOriginLocationCode}
      selectedStatusDate={this.props.selectedStatusDate}
      onUpdateFlightStatusDate={this.props.onUpdateFlightStatusDate}
    />);
  }

  render() {
    return (
      <div>
        {(!this.props.isLoading) ?
          this.renderwithData()
          :
          <div className={styles.loadingContainer}>
            <LoaderIndicatorRing
              className={styles.ldsRingBlue}
            />
          </div>
        }

      </div>
    );
  }
}
FlightStatus.propTypes = {
  flightsStatusData: PropTypes.object,
  isLoading: PropTypes.bool,
  activeTab: PropTypes.string,
  getFlightRequestResponse: PropTypes.func,
  mobileView: PropTypes.object,
  onArrowKeyDown: PropTypes.func,
  onChangeModel: PropTypes.func,
  onItemSelected: PropTypes.func,
  onSelectFlightStatusOriginLocation: PropTypes.func,
  onSelectFlightStatusDestinationLocation: PropTypes.func,
  onLoadAirports: PropTypes.func,
  globalFlightStatusDestinationLocationCode: PropTypes.string,
  globalFlightStatusOriginLocationCode: PropTypes.string,
  selectedStatusDate: PropTypes.string,
  setDateSelected: PropTypes.func,
  setFlightNumber: PropTypes.func,
  onFlightStatusSubmit: PropTypes.func,
  setFlightStatusOriginLocationCode: PropTypes.func,
  setFlightStatusDestinationLocationCode: PropTypes.func,
  onToFocusFlightNumber: PropTypes.func,
  onNewFlightStatusSearch: PropTypes.func,
  onUpdateFlightStatusDate: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  selectedFlight: PropTypes.func,
  selectFlightDataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toFocusFlightNumber: PropTypes.bool,
};

export default FlightStatus;
