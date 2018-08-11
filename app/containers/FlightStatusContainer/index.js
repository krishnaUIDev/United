import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

// HomePage
import {
  makeSelectFlightStatusData,
  makeSelectFlightStatusLoading,
  makeSelectFocusFlightStatusNumber,
} from 'containers/HomePage/selectors';
import {
  loadAirports,
  onOpenRightPanelModal,
  toFocusFlightStatusNumber,
} from 'containers/HomePage/actions';
import {
  loadFlightStatus,
  onResetFlightStatusData,
} from 'containers/App/actions';
import {
  makeSelectFlightStatusOriginLocationCode,
  makeSelectFlightStatusDestinationLocationCode,
} from 'containers/App/selectors';
import {
  makeSelectHideAutocompleteLocation,
  makeSelectMobileView,
} from 'containers/AutocompleteLocationContainer/selectors';

// AutocompleteLocationContainer
import {
  onHideAutocompleteLocationDropdown,
} from 'containers/AutocompleteLocationContainer/actions';

// FlightStatusContainer
import {
  onDateSelected,
  onFlightStatusOriginLocationSelected,
  onFlightStatusDestinationLocationSelected,
  onSetFlightStatusOriginLocationCode,
  onSetFlightStatusDestinationLocationCode,
  updateFlightStatusDate,
  selectedFlight,
} from './actions';
import {
  makeSelectDate,
  makeSelectFlightDataSelected,
} from './selectors';
import { FlightStatus } from '../../components/FlightStatus/index';


const mapStateToProps = createStructuredSelector({
  flightsStatusData: makeSelectFlightStatusData(),
  isLoading: makeSelectFlightStatusLoading(),
  hideAutocompleteLocation: makeSelectHideAutocompleteLocation(),
  mobileView: makeSelectMobileView(),
  selectedStatusDate: makeSelectDate(),
  flightInformationData: makeSelectFlightStatusData(),
  selectFlightDataIndex: makeSelectFlightDataSelected(),
  globalFlightStatusOriginLocationCode: makeSelectFlightStatusOriginLocationCode(),
  globalFlightStatusDestinationLocationCode: makeSelectFlightStatusDestinationLocationCode(),
  toFocusFlightNumber: makeSelectFocusFlightStatusNumber(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    onSelectFlightStatusOriginLocation(flightStatusOriginLocation) {
      dispatch(onFlightStatusOriginLocationSelected(flightStatusOriginLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    onSelectFlightStatusDestinationLocation(flightStatusDestinationLocation) {
      dispatch(onFlightStatusDestinationLocationSelected(flightStatusDestinationLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    setFlightStatusOriginLocationCode: (code) => dispatch(onSetFlightStatusOriginLocationCode(code)),
    setFlightStatusDestinationLocationCode: (code) => dispatch(onSetFlightStatusDestinationLocationCode(code)),
    selectedFlight: (data) => {
      dispatch(selectedFlight(data));
      dispatch(toFocusFlightStatusNumber(true));
    },
    onLoadAirports: (searchString) => dispatch(loadAirports(searchString)),
    setDateSelected: (dateSelected) => dispatch(onDateSelected(dateSelected)),
    onFlightStatusSubmit: (origin, destination, flightNumber, statusDate) => { dispatch(loadFlightStatus(origin, destination, flightNumber, statusDate)); },
    onNewFlightStatusSearch: () => dispatch(onResetFlightStatusData()),
    onUpdateFlightStatusDate: (date) => dispatch(updateFlightStatusDate(date)),
    openRightPanelModal: (toOpen) => dispatch(onOpenRightPanelModal(toOpen)),
    dispatch,
  };
}

const FlightStatusContainer = connect(mapStateToProps, mapDispatchToProps)(FlightStatus);

export default FlightStatusContainer;
