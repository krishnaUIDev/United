import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import BookHotelForm from 'components/BookHotelForm';

import {
  bookWithMilesSelected,
  setRoomsSelectedLabel,
  onRoomsSelected,
  setActiveField,
  loadHotelLocations,
} from 'containers/HomePage/actions';
import {
  makeSelectActiveField,
  makeSelectBookWithMilesChecked,
  makeSelectRoomsSelected,
  makeSelectRoomsSelectedLabel,
  makeSelectHotelLocationsData,
} from 'containers/HomePage/selectors';
import {
  makeSelectGlobalHotelCheckinDate,
  makeSelectGlobalHotelCheckoutDate,
  makeSelectGlobalHotelTravelersToBook,
  makeSelectGlobalCalendarFocusedInput,
} from 'containers/App/selectors';
import { onSetFocusedInput } from 'containers/BookCalendar/actions';

import {
  makeSelectHasHotelCalendarErrors,
} from 'containers/BookCalendar/selectors';
import {
  makeSelectShowHotelMenu,
  makeSelectHotelToBook,
  makeSelectDisableBtnsHotel,
  makeSelectHotelCheckinDate,
  makeSelectHotelCheckoutDate,
} from './selectors';
import {
  displayHotelMenu,
  updateFullHotel,
  updateHotelInfo,
  disableHotelButtons,
  setHotelDepartDate,
  setHotelReturnDate,
  onSetCalendarError,
} from './actions';

const mapStateToProps = createStructuredSelector({
  hotelData: makeSelectHotelLocationsData(),
  awardTravelChecked: makeSelectBookWithMilesChecked(),
  selectedRoom: makeSelectRoomsSelected(),
  roomsSelectedLabel: makeSelectRoomsSelectedLabel(),
  showTravelerMenu: makeSelectShowHotelMenu(),
  passengersToBook: makeSelectHotelToBook(),
  toDisableBtns: makeSelectDisableBtnsHotel(),
  activeField: makeSelectActiveField(),
  checkinDate: makeSelectHotelCheckinDate(),
  checkoutDate: makeSelectHotelCheckoutDate(),
  globalHotelCheckinDate: makeSelectGlobalHotelCheckinDate(),
  globalHotelCheckoutDate: makeSelectGlobalHotelCheckoutDate(),
  globalHotelTravelersToBook: makeSelectGlobalHotelTravelersToBook(),
  hasCalendarErrors: makeSelectHasHotelCalendarErrors(),
  globalCalendarFocusedInput: makeSelectGlobalCalendarFocusedInput(),
});

export function mapDispatchToProps(dispatch) {
  return {
    selectAwardTravel: (isChecked) => dispatch(bookWithMilesSelected(isChecked)),
    onPassengerInputClick: (toOpenHotel) => dispatch(displayHotelMenu(toOpenHotel)),
    onSetActiveField: (activeField) => dispatch(setActiveField(activeField)),
    setDepart(startDate) {
      dispatch(setHotelDepartDate(startDate));
    },
    setReturn(endDate) {
      dispatch(setHotelReturnDate(endDate));
    },
    setCalendarError: (errorType, errorState) => dispatch(onSetCalendarError(errorType, errorState)),
    setRoomsLabel: (roomsSelectedLabel) => dispatch(setRoomsSelectedLabel(roomsSelectedLabel)),
    onSelectRooms: (roomsSelected) => dispatch(onRoomsSelected(roomsSelected)),
    updateFullPassengers: (passengers) => dispatch(updateFullHotel(passengers)),
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    onLoadHotelLocations: (searchString) => dispatch(loadHotelLocations(searchString)),
    onChangePassenger: (sectionInfo, passengercount) => dispatch(updateHotelInfo(sectionInfo, passengercount)),
    onDisableTravelerButtons: (btnTypeHotel, toDisableHotel) => dispatch(disableHotelButtons(btnTypeHotel, toDisableHotel)),
    setFocusedInput: (focusedInput) => dispatch(onSetFocusedInput(focusedInput)),
    dispatch,
  };
}

const BookHotelFormContainer = connect(mapStateToProps, mapDispatchToProps)(BookHotelForm);

export default BookHotelFormContainer;
