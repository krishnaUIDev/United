import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import BookTravel from 'components/BookTravel';

// HomePage
import {
  makeSelectExpanded,
  makeSelectActiveTab,
  makeSelectAirportsData,
  makeKeyboardUser,
  makeSelectAriaLiveMessage,
} from 'containers/HomePage/selectors';
import {
  setPrimaryTab,
  expandHomeTop,
  collapseHomeTop,
  setKeyboardUser,
  onSetAriaLiveMessage,
} from '../HomePage/actions';
// App
import { loadFlightCheckin, loadMyTrips } from '../App/actions';
// AutocompleteLocationDropdown
import {
  onHideAutocompleteLocationDropdown,
} from '../AutocompleteLocationContainer/actions';

// BookFlightContainer
import {
  onBookFlightOriginLocationSelected,
  onBookFlightDestinationLocationSelected,
  onSetOriginLocationCode,
  onSetDestinationLocationCode,
} from '../BookFlightContainer/actions';

// FlightStatusContainer
import {
  onSetFlightStatusOriginLocationCode,
  onSetFlightStatusDestinationLocationCode,
  onFlightStatusOriginLocationSelected,
  onFlightStatusDestinationLocationSelected,
} from '../FlightStatusContainer/actions';

// BookCarContainer
import {
  selectCarPickupLocation,
} from '../BookCarContainer/actions';

const mapStateToProps = createStructuredSelector({
  activeTab: makeSelectActiveTab(),
  airportData: makeSelectAirportsData(),
  expanded: makeSelectExpanded(),
  isKeyboardUser: makeKeyboardUser(),
  ariaLiveMessage: makeSelectAriaLiveMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideAutocompleteLocationDropdown: (toHide, id) => dispatch(onHideAutocompleteLocationDropdown(toHide, id)),
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    onCollapseInputSelected: () => dispatch(collapseHomeTop()),
    onInputSelected: () => dispatch(expandHomeTop()),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    onSelectFlightOriginLocation(bookFlightOriginLocation) {
      dispatch(onBookFlightOriginLocationSelected(bookFlightOriginLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    onSelectFlightDestinationLocation(bookFlightDestinationLocation) {
      dispatch(onBookFlightDestinationLocationSelected(bookFlightDestinationLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    onSelectFlightStatusOriginLocation(flightStatusOriginLocation) {
      dispatch(onFlightStatusOriginLocationSelected(flightStatusOriginLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    onSelectFlightStatusDestinationLocation(bookFlightStatusDestinationLocation) {
      dispatch(onFlightStatusDestinationLocationSelected(bookFlightStatusDestinationLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    setDestinationLocationCode: (code) => dispatch(onSetDestinationLocationCode(code)),
    onSetKeyboardUser: (isKeyboardUser) => dispatch(setKeyboardUser(isKeyboardUser)),
    onSelectCarPickupLocation: (location) => dispatch(selectCarPickupLocation(location)),
    setOriginLocationCode: (code) => dispatch(onSetOriginLocationCode(code)),
    setFlightStatusOriginLocationCode: (code) => dispatch(onSetFlightStatusOriginLocationCode(code)),
    setFlightStatusDestinationLocationCode: (code) => dispatch(onSetFlightStatusDestinationLocationCode(code)),
    setTab: (newActiveTabId) => dispatch(setPrimaryTab(newActiveTabId)),
    onSelectFlightCheckinLoad: () => dispatch(loadFlightCheckin()),
    setAriaLiveMessage: (message) => dispatch(onSetAriaLiveMessage(message)),
    onSelectMyTripsLoad: () => dispatch(loadMyTrips()),
    dispatch,
  };
}

const BookTravelContainer = connect(mapStateToProps, mapDispatchToProps)(BookTravel);

export default BookTravelContainer;
