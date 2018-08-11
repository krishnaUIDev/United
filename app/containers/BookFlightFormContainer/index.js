import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import BookFlightForm from 'components/BookFlightForm';

import {
  awardTravelSelected,
  onCabinClassSelected,
  onFirstClassSelected,
  setCabinClassLabel,
  setActiveField,
} from 'containers/HomePage/actions';
import {
  makeSelectAwardTravelChecked,
  makeSelectCabinSelected,
  makeSelectFirstClassSelected,
  makeCabinSelectedLabel,
  makeSelectActiveField,
} from 'containers/HomePage/selectors';
import {
  onSetDepartDate,
  onSetReturnDate,
  onSetCalendarError,
  onSetFocusedInput,
} from 'containers/BookCalendar/actions';
import {
  onCorporateBookChecked,
  onNonstopChecked,
  onFlexibleDatesChecked,
  onRoundtripChecked,
  displayPassengersMenu,
  updateFullPassengers,
} from 'containers/BookFlightContainer/actions';
import {
  makeSelectCorporateBookChecked,
  makeSelectNonstopChecked,
  makeSelectFlexibleDatesChecked,
  makeSelectFlightDestination,
  makeSelectFlightOrigin,
  makeSelectRoundtripChecked,
  makeSelectShowTravelerMenu,
  makeSelectPassengersToBook,
} from 'containers/BookFlightContainer/selectors';
import {
  makeSelectGlobalRoundtripChecked,
  makeSelectGlobalFlexibleDatesChecked,
  makeSelectGlobalNonstopFlightChecked,
  makeSelectGlobalCorporateBookChecked,
  makeSelectGlobalFlightDestination,
  makeSelectGlobalFlightOrigin,
  makeSelectGlobalFlightStartDate,
  makeSelectGlobalFlightEndDate,
  makeSelectGlobalPassengersToBook,
  makeSelectGlobalAwardTravelIsSelected,
  makeSelectGlobalCabinClassSelected,
  makeSelectOriginLocationCode,
  makeSelectDestinationLocationCode,
  makeSelectGlobalFlexMonth,
  makeSelectGlobalTripLength,
  makeSelectGlobalCalendarFocusedInput,
} from 'containers/App/selectors';

import { selectFlightModel } from './selectors';


const mapStateToProps = createStructuredSelector({
  showTravelerMenu: makeSelectShowTravelerMenu(),
  awardTravelChecked: makeSelectAwardTravelChecked(),
  selectedCabin: makeSelectCabinSelected(),
  passengersToBook: makeSelectPassengersToBook(),
  isFirstClassSelected: makeSelectFirstClassSelected(),
  cabinSelectedLabel: makeCabinSelectedLabel(),
  activeField: makeSelectActiveField(),
  corporateBook: makeSelectCorporateBookChecked(),
  nonstopChecked: makeSelectNonstopChecked(),
  flexibleDatesChecked: makeSelectFlexibleDatesChecked(),
  flightOrigin: makeSelectFlightOrigin(),
  flightDestination: makeSelectFlightDestination(),
  roundtripChecked: makeSelectRoundtripChecked(),
  globalRoundtripChecked: makeSelectGlobalRoundtripChecked(),
  globalFlexibleDatesChecked: makeSelectGlobalFlexibleDatesChecked(),
  globalNonstopFlightChecked: makeSelectGlobalNonstopFlightChecked(),
  globalCorporateBookChecked: makeSelectGlobalCorporateBookChecked(),
  globalFlightDestination: makeSelectGlobalFlightDestination(),
  globalFlightOrigin: makeSelectGlobalFlightOrigin(),
  globalFlightStartDate: makeSelectGlobalFlightStartDate(),
  globalFlightEndDate: makeSelectGlobalFlightEndDate(),
  globalPassengersToBook: makeSelectGlobalPassengersToBook(),
  globalAwardTravelIsSelected: makeSelectGlobalAwardTravelIsSelected(),
  globalCabinClassSelected: makeSelectGlobalCabinClassSelected(),
  globalOriginLocationCode: makeSelectOriginLocationCode(),
  globalDestinationLocationCode: makeSelectDestinationLocationCode(),
  globalFlexMonth: makeSelectGlobalFlexMonth(),
  globalTripLength: makeSelectGlobalTripLength(),
  flightModel: selectFlightModel,
  globalCalendarFocusedInput: makeSelectGlobalCalendarFocusedInput(),
});

export function mapDispatchToProps(dispatch) {
  return {
    selectAwardTravel: (isChecked) => dispatch(awardTravelSelected(isChecked)),
    onSelectFirstClass: (isSelected) => dispatch(onFirstClassSelected(isSelected)),
    onSelectCabinClass: (cabinSelected) => dispatch(onCabinClassSelected(cabinSelected)),
    setCabinLabel: (cabinSelectedLabel) => dispatch(setCabinClassLabel(cabinSelectedLabel)),
    onPassengerInputClick: (toOpen) => dispatch(displayPassengersMenu(toOpen)),
    onSetActiveField: (activeField) => dispatch(setActiveField(activeField)),
    setCalendarError: (errorType, errorState) => dispatch(onSetCalendarError(errorType, errorState)),
    setDepart(startDate) {
      dispatch(onSetDepartDate(startDate));
    },
    setReturn(endDate) {
      dispatch(onSetReturnDate(endDate));
    },
    setFocusedInput: (focusedInput) => dispatch(onSetFocusedInput(focusedInput)),
    corporateBookChecked: (isChecked) => dispatch(onCorporateBookChecked(isChecked)),
    onNonstopChecked: (isChecked) => dispatch(onNonstopChecked(isChecked)),
    onFlexibleDatesChecked: (isChecked) => dispatch(onFlexibleDatesChecked(isChecked)),
    onRoundtripChecked: (isChecked) => dispatch(onRoundtripChecked(isChecked)),
    updateFullPassengers: (passengers) => dispatch(updateFullPassengers(passengers)),
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    dispatch,
  };
}

const BookFlightFormContainer = connect(mapStateToProps, mapDispatchToProps)(BookFlightForm);

export default BookFlightFormContainer;
