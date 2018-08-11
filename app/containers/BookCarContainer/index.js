import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import BookCarForm from 'components/BookCarForm';

import {
  setActiveField,
  loadCarLocations,
} from 'containers/HomePage/actions';
import {
  makeSelectCarLocationsData,
} from 'containers/HomePage/selectors';
import {
  makeSelectGlobalCarSameLocationChecked,
  makeSelectGlobalHideAgeBoxChecked,
  makeSelectGlobalCarPickupDate,
  makeSelectGlobalCarDropoffDate,
  makeSelectGlobalCalendarFocusedInput,
} from 'containers/App/selectors';
import {
  onUpdateMobileView,
} from 'containers/AutocompleteLocationContainer/actions';
import {
  makeSelectHasCarCalendarErrors,
} from 'containers/BookCalendar/selectors';
import { onSetFocusedInput } from 'containers/BookCalendar/actions';
import {
  onBookCarPickupTimeSelected,
  onBookCarDropoffTimeSelected,
  onBookCarDriversAgeSelected,
  onDropOffLocationChecked,
  onHideAgeBoxChecked,
  onSetCarPickupDate,
  onSetCarDropoffDate,
  dropoffLocationChange,
  selectCarPickupLocation,
  onSetCalendarError,
} from './actions';

import {
  makeSelectCarPickupTime,
  makeSelectCarDriversAge,
  makeSelectCarDropoffTime,
  makeSelectCarSameLocationChecked,
  makeSelectHideAgeBoxChecked,
  makeSelectCarPickupDate,
  makeSelectCarDropoffDate,
  makeSelectDropoffLocation,
  makeSelectPickupLocation,
  selectCarModel,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  carData: makeSelectCarLocationsData(),
  carModel: selectCarModel,
  driversAge: makeSelectCarDriversAge(),
  dropoffDate: makeSelectCarDropoffDate(),
  dropoffTime: makeSelectCarDropoffTime(),
  dropoffLocation: makeSelectDropoffLocation(),
  hideAgeBox: makeSelectHideAgeBoxChecked(),
  pickupDate: makeSelectCarPickupDate(),
  pickupTime: makeSelectCarPickupTime(),
  sameLocationChecked: makeSelectCarSameLocationChecked(),
  globalCarDropoffDate: makeSelectGlobalCarDropoffDate(),
  globalCarHideAgeBox: makeSelectGlobalHideAgeBoxChecked(),
  globalCarPickupDate: makeSelectGlobalCarPickupDate(),
  globalCarSameLocationChecked: makeSelectGlobalCarSameLocationChecked(),
  hasCalendarErrors: makeSelectHasCarCalendarErrors(),
  pickupLocation: makeSelectPickupLocation(),
  globalCalendarFocusedInput: makeSelectGlobalCalendarFocusedInput(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDropoffLocationChange: (location) => dispatch(dropoffLocationChange(location)),
    onLoadCarLocations: (searchString) => dispatch(loadCarLocations(searchString)),
    onSetActiveField: (activeField) => dispatch(setActiveField(activeField)),
    onSelectPickupTime: (pickupTime) => dispatch(onBookCarPickupTimeSelected(pickupTime)),
    onSelectDropoffTime: (dropoffTime) => dispatch(onBookCarDropoffTimeSelected(dropoffTime)),
    onSelectCarPickupLocation: (location) => dispatch(selectCarPickupLocation(location)),
    onSelectDriversAge(driversAge) {
      dispatch(onBookCarDriversAgeSelected(driversAge));
    },
    onSelectDropOffLocationChecked(isChecked) {
      dispatch(onDropOffLocationChecked(isChecked));
    },
    onSelectDriversAgeBoxChecked(isChecked) {
      dispatch(onHideAgeBoxChecked(isChecked));
    },
    setDepart(startDate) {
      dispatch(onSetCarPickupDate(startDate));
    },
    setReturn(endDate) {
      dispatch(onSetCarDropoffDate(endDate));
    },
    setCalendarError: (errorType, errorState) => dispatch(onSetCalendarError(errorType, errorState)),
    updateMobileView(toHideDropdown, id) {
      if (screen.width < 786) {
        if (toHideDropdown === 'hidden') {
          dispatch(onUpdateMobileView('relative', id));
        } else {
          dispatch(onUpdateMobileView('fixed', id));
        }
      }
    },
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    setFocusedInput: (focusedInput) => dispatch(onSetFocusedInput(focusedInput)),
    dispatch,
  };
}

const BookCarContainer = connect(mapStateToProps, mapDispatchToProps)(BookCarForm);

export default BookCarContainer;
