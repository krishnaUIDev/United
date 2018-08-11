/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// Containers
import InspirationBlock from 'containers/InspirationBlock';

// Components
import HomeTop from 'components/HomeTop';
import InfoBlock from 'components/InfoBlock';
import MileagePlusAdContainer from 'containers/MileagePlusAdContainer';

// actions
import { loadFlightStatus } from '../App/actions';

// Selectors
import {
  makeSelectFlightStatusDate,
  makeSelectFlightDataSelected,
} from '../FlightStatusContainer/selectors';
import {
  makeSelectFlightStatusOriginLocationCode,
  makeSelectFlightStatusDestinationLocationCode,
} from '../App/selectors';
import {
  makeSelectFlightStatusData,
  makeSelectActiveTab,
  makeSelectRightPanelModal,
  makeSelectFlightStatusLoading,
  makeSelectFlightCheckinData,
  makeSelectFlightCheckinLoading,
  makeSelectCheckinDetailsIndex,
  makeSelectUserLoggedIn,
  makeSelectExpanded,
  makeSelectMyTripsLoading,
  makeSelectMyTripsData,
  makeSelectFocusFlightStatusNumber,
  makeSelectFocusFlightCheckinNumber,
} from './selectors';

import {
  onOpenRightPanelModal,
  updateCheckinDetailsIndex,
  toFocusFlightStatusNumber,
  setPrimaryTab,
  collapseHomeTop,
  toFocusFlightCheckinNumber,
} from './actions';

export function HomePage(props) {
  return (
    <main className="homeContainer" role="main">
      <HomeTop
        activeTab={props.activeTab}
        checkinDetailsIndex={props.checkinDetailsIndex}
        flightCheckinData={props.flightCheckinData}
        flightStatusData={props.flightStatusData}
        flightStatusDate={props.flightStatusDate}
        flightStatusDestinationLocationCode={props.flightStatusDestinationLocationCode}
        flightStatusOriginLocationCode={props.flightStatusOriginLocationCode}
        isCheckinDataLoading={props.isCheckinDataLoading}
        isLoggedIn={props.isLoggedIn}
        isFlightStatusLoading={props.isFlightStatusLoading}
        isMyTripsDataLoading={props.isMyTripsDataLoading}
        isRightPanelModalOpen={props.isRightPanelModalOpen}
        isHomeTopExpanded={props.isHomeTopExpanded}
        myTripsData={props.myTripsData}
        onToFocusFlightStatusNumber={props.onToFocusFlightStatusNumber}
        onToFocusFlightCheckinNumber={props.onToFocusFlightCheckinNumber}
        onUpdateCheckinDetailsIndex={props.onUpdateCheckinDetailsIndex}
        openRightPanelModal={props.openRightPanelModal}
        onCollapseInputSelected={props.onCollapseInputSelected}
        reloadFlightStatusService={props.reloadFlightStatusService}
        selectFlightData={props.selectFlightData}
        setTab={props.setTab}
        toFocusFlightStatusNumber={props.toFocusFlightStatusNumber}
        toFocusFlightCheckinNumber={props.toFocusFlightCheckinNumber}
      />
      <InspirationBlock />
      <InfoBlock />
      <MileagePlusAdContainer />
    </main>
  );
}

HomePage.propTypes = {
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
  isMyTripsDataLoading: PropTypes.bool,
  isRightPanelModalOpen: PropTypes.bool,
  myTripsData: PropTypes.array,
  onToFocusFlightStatusNumber: PropTypes.func,
  onToFocusFlightCheckinNumber: PropTypes.func,
  onUpdateCheckinDetailsIndex: PropTypes.func,
  onCollapseInputSelected: PropTypes.func,
  openRightPanelModal: PropTypes.func,
  reloadFlightStatusService: PropTypes.func,
  selectFlightData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setTab: PropTypes.func,
  toFocusFlightStatusNumber: PropTypes.bool,
  toFocusFlightCheckinNumber: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  activeTab: makeSelectActiveTab(),
  checkinDetailsIndex: makeSelectCheckinDetailsIndex(),
  toFocusFlightStatusNumber: makeSelectFocusFlightStatusNumber(),
  toFocusFlightCheckinNumber: makeSelectFocusFlightCheckinNumber(),
  flightCheckinData: makeSelectFlightCheckinData(),
  flightStatusData: makeSelectFlightStatusData(),
  flightStatusDate: makeSelectFlightStatusDate(),
  flightStatusOriginLocationCode: makeSelectFlightStatusOriginLocationCode(),
  flightStatusDestinationLocationCode: makeSelectFlightStatusDestinationLocationCode(),
  isCheckinDataLoading: makeSelectFlightCheckinLoading(),
  isFlightStatusLoading: makeSelectFlightStatusLoading(),
  isHomeTopExpanded: makeSelectExpanded(),
  isLoggedIn: makeSelectUserLoggedIn(),
  isMyTripsDataLoading: makeSelectMyTripsLoading(),
  isRightPanelModalOpen: makeSelectRightPanelModal(),
  myTripsData: makeSelectMyTripsData(),
  selectFlightData: makeSelectFlightDataSelected(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToFocusFlightStatusNumber: (toFocus) => dispatch(toFocusFlightStatusNumber(toFocus)),
    onToFocusFlightCheckinNumber: (toFocus) => dispatch(toFocusFlightCheckinNumber(toFocus)),
    openRightPanelModal: (toClose) => dispatch(onOpenRightPanelModal(toClose)),
    onUpdateCheckinDetailsIndex: (index) => dispatch(updateCheckinDetailsIndex(index)),
    reloadFlightStatusService: (origin, destination, flightNumber, statusDate) => { dispatch(loadFlightStatus(origin, destination, flightNumber, statusDate)); },
    setTab: (newActiveTabId) => dispatch(setPrimaryTab(newActiveTabId)),
    onCollapseInputSelected: () => dispatch(collapseHomeTop()),
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
