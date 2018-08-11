/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/persistentReducer';
import appReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import bookingReducer from 'containers/BookFlightContainer/reducer';
import autocompleteLocationReducer from 'containers/AutocompleteLocationContainer/reducer';
import bookCarReducer from 'containers/BookCarContainer/reducer';
import bookHotelReducer from 'containers/BookHotelFormContainer/reducer';
import flightStatusReducer from 'containers/FlightStatusContainer/reducer';
import calendarReducer from 'containers/BookCalendar/reducer';
import headerFooterReducer from 'containers/GlobalFooterContainer/reducer';
import carouselReducer from 'containers/CarouselContainer/reducer';
import aboutMeReducer from 'containers/MyAccount/AboutMeFormContainer/reducer';
import createAppForms from './forms';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    global: globalReducer,
    language: languageProviderReducer,
    booking: bookingReducer,
    autocompleteLocation: autocompleteLocationReducer,
    bookCar: bookCarReducer,
    bookHotel: bookHotelReducer,
    calendar: calendarReducer,
    status: flightStatusReducer,
    headerFooter: headerFooterReducer,
    carousel: carouselReducer,
    aboutMe: aboutMeReducer,
    storage: (state = {}) => state,
    ...createAppForms(),
    ...asyncReducers,
  });
}
