import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoaderIndicatorRing from 'components/LoaderIndicatorRing';
import messages from './messages';
import Style from './flightCheckin.scss';
import FlightCheckinForm from '../FlightCheckinForm/index';
import FlightCheckinSegmentList from '../FlightCheckinSegmentList/index';


export class FlightCheckin extends Component {
  setAriaMessage() {
    setTimeout(() => { this.props.setAriaLiveMessage(messages.ariaLiveMessage.defaultMessage); }, 100);
  }
  showCheckinData() {
    const showFlightCheckinResult = this.props.flightCheckinData;
    return (this.props.isLoggedIn && showFlightCheckinResult) ?
      <FlightCheckinSegmentList
        flightCheckinData={this.props.flightCheckinData}
        flightCheckinSegmentSelectedIndex={this.props.flightCheckinSegmentSelectedIndex}
        onUpdateCheckinDetailsIndex={this.props.onUpdateCheckinDetailsIndex}
        openRightPanelModal={this.props.openRightPanelModal}
        resetFlightCheckinData={this.props.resetFlightCheckinData}
        onToFocusFlightNumber={this.props.onToFocusFlightNumber}
        toFocusFlightNumber={this.props.toFocusFlightNumber}
      />
     :
        <FlightCheckinForm />;
  }

  render() {
    return (
      <div>
        {(this.props.isLoading) ? this.setAriaMessage() : ''}
        {(this.props.isLoading) ?
          <div className={Style.loadingContainer}>
            <LoaderIndicatorRing
              className={Style.ldsRingBlue}
            />
          </div>
          : this.showCheckinData()
        }
      </div>
    );
  }
}

FlightCheckin.propTypes = {
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  flightCheckinData: PropTypes.object,
  flightCheckinSegmentSelectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUpdateCheckinDetailsIndex: PropTypes.func,
  onToFocusFlightNumber: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  resetFlightCheckinData: PropTypes.func,
  setAriaLiveMessage: PropTypes.func,
  toFocusFlightNumber: PropTypes.bool,
};

export default FlightCheckin;
