import { createSelector } from 'reselect';
const selectHome = (state) => state.get('home');

// const makeSelectError = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('error')
// );

const makeSelectAirportsData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['airports', 'data'])
);
const makeSelectAirportsSearchString = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['airports', 'searchString'])
);
const makeSelectAirportsRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['airports', 'retryCount'])
);

const makeSelectCarLocationsData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['carLocations', 'data'])
);
const makeSelectCarLocationsSearchString = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['carLocations', 'searchString'])
);

const makeSelectAdvisoriesData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['advisories', 'data'])
);

const makeSelectShowAdvisories = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['advisories', 'show'])
);

const makeSelectCarLocationsRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['carLocations', 'retryCount'])
);

const makeSelectHotelLocationsData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['hotelLocations', 'data'])
);
const makeSelectHotelLocationsSearchString = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['hotelLocations', 'searchString'])
);

const makeSelectExpanded = () => createSelector(
  selectHome,
  (homeState) => homeState.get('expanded'),
);
const makeSelectActiveSubTab = () => createSelector(
  selectHome,
  (homeState) => homeState.get('activeSubTab'),
);
const makeSelectAwardTravelChecked = () => createSelector(
  selectHome,
  (homeState) => homeState.get('awardTravel'),
);
const makeSelectBookWithMilesChecked = () => createSelector(
  selectHome,
  (homeState) => homeState.get('bookWithMiles'),
);
const makeSelectCabinSelected = () => createSelector(
  selectHome,
  (homeState) => homeState.get('cabinSelected'),
);
const makeSelectRoomsSelected = () => createSelector(
  selectHome,
  (homeState) => homeState.get('roomsSelected'),
);
const makeSelectFirstClassSelected = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isFirstClassSelected'),
);
const makeCabinSelectedLabel = () => createSelector(
  selectHome,
  (homeState) => homeState.get('cabinSelectedLabel'),
);
const makeSelectRoomsSelectedLabel = () => createSelector(
  selectHome,
  (homeState) => homeState.get('roomsSelectedLabel'),
);
const makeSelectActiveField = () => createSelector(
  selectHome,
  (homeState) => homeState.get('activeField'),
);
const makeKeyboardUser = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isKeyboardUser'),
);

const makeSelectUserProfileData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'data'])
);

const makeSelectUserProfileError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'error'])
);

const makeSelectUserProfileLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'loading'])
);

const makeSelectUserProfileMpUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'mpUsername'])
);

const makeSelectUserProfileRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'retryCount'])
);

const makeSelectFlightStatusData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'data'])
);

const makeSelectFlightStatusError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'error'])
);

const makeSelectFlightStatusLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'loading'])
);

const makeSelectFlightStatusRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'retryCount'])
);

const makeSelectFlightStatusFlightNumber = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'flightNumber'])
);

const makeSelectFlightCheckinData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightCheckin', 'data'])
);

const makeSelectFlightCheckinError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightCheckin', 'error'])
);

const makeSelectFlightCheckinLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightCheckin', 'loading'])
);

const makeSelectAriaLiveMessage = () => createSelector(
  selectHome,
  (homeState) => homeState.get('ariaLiveMessage')
);

const makeSelectFlightCheckinRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightCheckin', 'retryCount'])
);

const makeSelectUserLoggedIn = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userProfile', 'loggedIn'])
);

const makeSelectActiveTab = () => createSelector(
  selectHome,
  (homeState) => homeState.get('activeTab')
);

const makeSelectRightPanelModal = () => createSelector(
  selectHome,
  (homeState) => homeState.get('isRightPanelModalOpen')
);

const makeSelectCheckinDetailsIndex = () => createSelector(
  selectHome,
  (homeState) => homeState.get('checkinDetailsIndex')
);

const makeSelectAdvisoriesRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['advisories', 'retryCount'])
);

const makeSelectMyTripsData = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['myTrips', 'data'])
);

const makeSelectMyTripsError = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['myTrips', 'error'])
);

const makeSelectMyTripsLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['myTrips', 'loading'])
);

const makeSelectMyTripsRetryCount = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['myTrips', 'retryCount'])
);

const makeSelectMyTripsFlightData = () => createSelector(
  selectHome,
  (homeState) => {
    const val = homeState.getIn(['myTrips', 'data']);
    const returnObject = [];
    if (val && val.length) {
      val.forEach((trip) => {
        const tripArray = {};
        const nickName = trip.NickName;
        const nickNameArray = nickName && nickName.split(')');
        const depData = nickNameArray.length > 0 && nickNameArray[0];
        const depDataArray = depData && depData.split(',');
        const arrData = nickNameArray.length > 1 && nickNameArray[1];
        const arrDataArray = arrData && arrData.split(',');
        const depCityName = (depDataArray && depDataArray.length > 0 && depDataArray[0].split(':').length > 1 && depDataArray[0].split(':')[1]) || '';
        tripArray.departureCityName = depDataArray && depDataArray.length === 3 ? `${depCityName},${depDataArray[1]}` : depData && depData.split('(') && depData.split('(').length && depData.split('(')[0];
        tripArray.departureAirportCode = (depDataArray && depDataArray.length === 3) ? (depDataArray[2].split('(').length > 1 && depDataArray[2].split('(')[1].slice(0, 3)) || '' : (depDataArray[1].split('(').length > 1 && depDataArray[1].split('(')[1].slice(0, 3)) || '';
        const arrCityName = (arrDataArray && arrDataArray.length > 0 && arrDataArray[0].split(' to ').length > 1 && arrDataArray[0].split(' to ')[1]) || '';
        tripArray.arrivalCityName = arrDataArray && arrDataArray.length === 3 ? `${arrCityName},${arrDataArray[1]}` : arrData.split('(') && arrData.split('(').length && arrData.split('(')[0];
        tripArray.arrivalAirportCode = (arrDataArray && arrDataArray.length === 3) ? (arrDataArray[2].split('(').length > 1 && arrDataArray[2].split('(')[1].slice(0, 3)) || '' : (arrDataArray[1].split('(').length > 1 && arrDataArray[1].split('(')[1].slice(0, 3)) || '';
        tripArray.confirmationNumber = trip.ConfirmationID;
        returnObject.push(tripArray);
      });
    }
    return returnObject;
  }
);

const makeSelectFocusFlightStatusNumber = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightStatus', 'focusFlightNumberHeader'])
);

const makeSelectFocusFlightCheckinNumber = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['flightCheckin', 'focusFlightNumberHeader'])
);

export {
  selectHome,
  makeSelectAirportsData,
  makeSelectAirportsSearchString,
  makeSelectAirportsRetryCount,
  makeSelectExpanded,
  makeSelectActiveSubTab,
  makeSelectAwardTravelChecked,
  makeSelectCabinSelected,
  makeSelectFirstClassSelected,
  makeCabinSelectedLabel,
  makeSelectActiveField,
  makeSelectRoomsSelected,
  makeSelectRoomsSelectedLabel,
  makeKeyboardUser,
  makeSelectBookWithMilesChecked,
  makeSelectCarLocationsData,
  makeSelectCarLocationsSearchString,
  makeSelectCarLocationsRetryCount,
  makeSelectHotelLocationsData,
  makeSelectHotelLocationsSearchString,
  makeSelectUserProfileData,
  makeSelectUserProfileError,
  makeSelectUserProfileLoading,
  makeSelectUserProfileMpUsername,
  makeSelectUserProfileRetryCount,
  makeSelectUserLoggedIn,
  makeSelectActiveTab,
  makeSelectFlightStatusData,
  makeSelectFlightStatusError,
  makeSelectFlightStatusLoading,
  makeSelectFlightStatusRetryCount,
  makeSelectFlightStatusFlightNumber,
  makeSelectFlightCheckinData,
  makeSelectFlightCheckinError,
  makeSelectFlightCheckinLoading,
  makeSelectFlightCheckinRetryCount,
  makeSelectRightPanelModal,
  makeSelectCheckinDetailsIndex,
  makeSelectAriaLiveMessage,
  makeSelectAdvisoriesData,
  makeSelectAdvisoriesRetryCount,
  makeSelectMyTripsData,
  makeSelectMyTripsError,
  makeSelectMyTripsLoading,
  makeSelectMyTripsRetryCount,
  makeSelectMyTripsFlightData,
  makeSelectShowAdvisories,
  makeSelectFocusFlightStatusNumber,
  makeSelectFocusFlightCheckinNumber,
};
