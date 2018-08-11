import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import BookFlight from 'components/BookFlight';

import {
  onHideAutocompleteLocationDropdown,
  onUpdateMobileView,
} from 'containers/AutocompleteLocationContainer/actions';
import {
  setSecondaryTab,
  loadAirports,
  setActiveField,
} from 'containers/HomePage/actions';
import {
  makeSelectExpanded,
  makeSelectActiveSubTab,
  makeSelectActiveField,
} from 'containers/HomePage/selectors';
import {
  makeSelectHideAutocompleteLocation,
  makeSelectMobileView,
} from 'containers/AutocompleteLocationContainer/selectors';
import {
  onBookFlightOriginLocationSelected,
  onBookFlightDestinationLocationSelected,
  onSetOriginLocationCode,
  onSetDestinationLocationCode,
  updatePassengerInfo,
  disableTravelerButtons,
} from './actions';
import {
  makeSelectShowTravelerMenu,
  makeSelectPassengersToBook,
  makeSelectDisableBtns,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  expanded: makeSelectExpanded(),
  activeSubTab: makeSelectActiveSubTab(),
  hideAutocompleteLocation: makeSelectHideAutocompleteLocation(),
  mobileView: makeSelectMobileView(),
  activeField: makeSelectActiveField(),
  showTravelerMenu: makeSelectShowTravelerMenu(),
  passengersToBook: makeSelectPassengersToBook(),
  toDisableBtns: makeSelectDisableBtns(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setTab: (newActiveTabId) => dispatch(setSecondaryTab(newActiveTabId)),
    onSelectFlightOriginLocation(bookFlightOriginLocation) {
      dispatch(onBookFlightOriginLocationSelected(bookFlightOriginLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    onSelectFlightDestinationLocation(bookFlightDestinationLocation) {
      dispatch(onBookFlightDestinationLocationSelected(bookFlightDestinationLocation));
      dispatch(onHideAutocompleteLocationDropdown('hidden'));
    },
    updateMobileView(toHideDropdown, id) {
      if (screen.width < 786) {
        if (toHideDropdown === 'hidden') {
          dispatch(onUpdateMobileView('relative', id));
        } else {
          dispatch(onUpdateMobileView('fixed', id));
        }
      }
    },
    onLoadAirports(searchString) {
      dispatch(loadAirports(searchString));
    },
    onSetActiveField: (activeField) => dispatch(setActiveField(activeField)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    onSetOriginLocationCode: (code) => dispatch(onSetOriginLocationCode(code)),
    onSetDestinationLocationCode: (code) => dispatch(onSetDestinationLocationCode(code)),
    onChangePassenger(sectionInfo, passengercount) {
      dispatch(updatePassengerInfo(sectionInfo, passengercount));
    },
    onDisableTravelerButtons(btnType, toDisable) {
      dispatch(disableTravelerButtons(btnType, toDisable));
    },
    dispatch,
  };
}

const BookFlightContainer = connect(mapStateToProps, mapDispatchToProps)(BookFlight);

export default BookFlightContainer;
