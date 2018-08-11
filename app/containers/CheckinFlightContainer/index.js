import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import FlightCheckin from 'components/FlightCheckin';
import {
  makeSelectUserLoggedIn,
  makeSelectFlightCheckinData,
  makeSelectFlightCheckinLoading,
  makeSelectCheckinDetailsIndex,
  makeSelectFocusFlightCheckinNumber,
} from 'containers/HomePage/selectors';

import { onResetFlightCheckinData } from '../App/actions';
import {
  onOpenRightPanelModal,
  updateCheckinDetailsIndex,
  onSetAriaLiveMessage,
  toFocusFlightCheckinNumber,
} from '../HomePage/actions';

const mapStateToProps = createStructuredSelector({
  flightCheckinData: makeSelectFlightCheckinData(),
  flightCheckinSegmentSelectedIndex: makeSelectCheckinDetailsIndex(),
  isLoggedIn: makeSelectUserLoggedIn(),
  isLoading: makeSelectFlightCheckinLoading(),
  toFocusFlightNumber: makeSelectFocusFlightCheckinNumber(),
});

export function mapDispatchToProps(dispatch) {
  return {
    openRightPanelModal: (toClose) => dispatch(onOpenRightPanelModal(toClose)),
    onUpdateCheckinDetailsIndex: (index) => {
      dispatch(updateCheckinDetailsIndex(index));
      dispatch(toFocusFlightCheckinNumber(true));
    },
    resetFlightCheckinData: () => dispatch(onResetFlightCheckinData()),
    setAriaLiveMessage: (message) => dispatch(onSetAriaLiveMessage(message)),
    dispatch,
  };
}

const CheckinFlightContainer = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FlightCheckin));

export default CheckinFlightContainer;
