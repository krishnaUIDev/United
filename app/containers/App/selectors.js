/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectApp = (state) => state.get('app');

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('apiToken')
);

const makeSelectHydrated = () => createSelector(
  selectApp,
  (appState) => appState.get('hydrated')
);

const makeSelectSessionTimeoutVisibility = () => createSelector(
  selectApp,
  (appState) => appState.get('sessionTimeoutModalVisibility')
);

const makeSelectGlobalRoundtripChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('roundtripChecked')
);

const makeSelectGlobalFlexibleDatesChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flexibleDatesChecked')
);

const makeSelectGlobalNonstopFlightChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nonstopFlightChecked')
);

const makeSelectGlobalCorporateBookChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('corporateBookChecked')
);

const makeSelectGlobalFlightDestination = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightDestination')
);

const makeSelectGlobalFlightOrigin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightOrigin')
);

const makeSelectGlobalFlightStartDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightStartDate')
);

const makeSelectGlobalCalendarFocusedInput = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('calendarFocusedInput')
);

const makeSelectGlobalFlightEndDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightEndDate')
);

const makeSelectGlobalPassengersToBook = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('passengersToBook')
);

const makeSelectGlobalAwardTravelIsSelected = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('awardTravelSelected')
);

const makeSelectGlobalCabinClassSelected = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('cabinSelected'),
);

const makeSelectOriginLocationCode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('originLocationCode'),
);

const makeSelectDestinationLocationCode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('destinationLocationCode'),
);


const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    /* istanbul ignore next */
    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectGlobalHotelCheckinDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('hotelStartDate')
);

const makeSelectGlobalHotelCheckoutDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('hotelEndDate')
);

const makeSelectGlobalHotelTravelersToBook = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('travelersToBook')
);

const makeSelectGlobalUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('mpUsername')
);

const makeSelectGlobalUsernameCrypto = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('mpUsernameCrypto')
);

const makeSelectRememberMeChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('rememberMeChecked'),
);

const makeSelectGlobalFlexMonth = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flexMonth')
);

const makeSelectGlobalTripLength = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('tripLength')
);

const makeSelectGlobalCarSameLocationChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('carSameLocationChecked')
);

const makeSelectGlobalHideAgeBoxChecked = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('carHideAgeBox')
);

const makeSelectGlobalCarPickupDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('carPickupDate')
);

const makeSelectGlobalCarDropoffDate = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('carDropoffDate')
);

const makeSelectFlightStatusOriginLocationCode = () => createSelector(
  selectGlobal,
  (statusState) => statusState.get('flightStatusOriginLocationCode'),
);

const makeSelectFlightStatusDestinationLocationCode = () => createSelector(
  selectGlobal,
  (statusState) => statusState.get('flightStatusDestinationLocationCode'),
);

const makeSelectGlobalFlightStatusDestination = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightStatusDestination')
);

const makeSelectGlobalFlightStatusOrigin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('flightStatusOrigin')
);


export {
  selectGlobal,
  makeSelectHydrated,
  makeSelectError,
  makeSelectLocationState,
  makeSelectToken,
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
  makeSelectGlobalHotelCheckinDate,
  makeSelectGlobalHotelCheckoutDate,
  makeSelectGlobalHotelTravelersToBook,
  makeSelectGlobalUsername,
  makeSelectGlobalUsernameCrypto,
  makeSelectRememberMeChecked,
  makeSelectGlobalFlexMonth,
  makeSelectGlobalTripLength,
  makeSelectGlobalFlightStatusDestination,
  makeSelectGlobalFlightStatusOrigin,
  makeSelectFlightStatusOriginLocationCode,
  makeSelectFlightStatusDestinationLocationCode,
  makeSelectGlobalCarSameLocationChecked,
  makeSelectGlobalCarPickupDate,
  makeSelectGlobalCarDropoffDate,
  makeSelectGlobalHideAgeBoxChecked,
  makeSelectSessionTimeoutVisibility,
  makeSelectGlobalCalendarFocusedInput,
};
