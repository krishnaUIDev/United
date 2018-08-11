import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MyTrips from 'components/MyTrips';

import {
  makeSelectUserLoggedIn,
  makeSelectMyTripsData,
  makeSelectMyTripsLoading,
  makeSelectMyTripsFlightData,
 } from 'containers/HomePage/selectors';

import {
  onResetMyTripsData,
} from 'containers/App/actions';

import {
  onSetAriaLiveMessage,
} from '../HomePage/actions';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectUserLoggedIn(),
  myTripsData: makeSelectMyTripsData(),
  isLoading: makeSelectMyTripsLoading(),
  tripInfoFormattedData: makeSelectMyTripsFlightData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    resetMyTripsData: () => dispatch(onResetMyTripsData()),
    setAriaLiveMessage: (message) => dispatch(onSetAriaLiveMessage(message)),
    dispatch,
  };
}

const MyTripsContainer = connect(mapStateToProps, mapDispatchToProps)(MyTrips);

export default MyTripsContainer;
