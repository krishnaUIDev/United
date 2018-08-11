/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const EXPAND_HOME_TOP = 'unitedapp/App/EXPAND_HOME_TOP';
export const COLLAPSE_HOME_TOP = 'unitedapp/App/COLLAPSE_HOME_TOP';
export const EXPAND_COLLAPSE_MOBILE_HOME_PAGE = 'unitedapp/App/EXPAND_COLLAPSE_MOBILE_HOME_PAGE';
export const SET_PRIMARY_ACTIVE_TAB = 'unitedapp/App/SET_PRIMARY_ACTIVE_TAB';
export const SET_SECONDARY_ACTIVE_TAB = 'unitedapp/App/SET_SECONDARY_ACTIVE_TAB';
export const AWARD_TRAVEL_SELECTED = 'unitedapp/App/AWARD_TRAVEL_SELECTED';
export const BOOK_WITH_MILES_SELECTED = 'unitedapp/App/BOOK_WITH_MILES_SELECTED';
export const FIRST_CLASS_TRAVEL_SELECTED = 'unitedapp/App/FIRST_CLASS_TRAVEL_SELECTED';
export const CABIN_CLASS_SELECTED = 'unitedapp/App/CABIN_CLASS_SELECTED';
export const ROOMS_SELECTED = 'unitedapp/App/ROOMS_SELECTED';
export const LOAD_AIRPORTS = 'unitedapp/App/LOAD_AIRPORTS';
export const LOAD_AIRPORTS_SUCCESS = 'unitedapp/App/LOAD_AIRPORTS_SUCCESS';
export const LOAD_AIRPORTS_ERROR = 'unitedapp/App/LOAD_AIRPORTS_ERROR';
export const CABIN_CLASS_SELECTED_LABEL = 'unitedapp/App/CABIN_CLASS_SELECTED_LABEL';
export const ROOMS_SELECTED_LABEL = 'unitedapp/App/ROOMS_SELECTED_LABEL';
export const ACTIVE_FIELD = 'unitedapp/App/ACTIVE_FIELD';
export const IS_KEYBOARD_USER = 'unitedapp/App/IS_KEYBOARD_USER';
export const LOAD_CAR_LOCATIONS = 'unitedapp/App/LOAD_CAR_LOCATIONS';
export const LOAD_CAR_LOCATIONS_SUCCESS = 'unitedapp/App/LOAD_CAR_LOCATIONS_SUCCESS';
export const LOAD_CAR_LOCATIONS_ERROR = 'unitedapp/App/LOAD_CAR_LOCATIONS_ERROR';
export const LOAD_HOTEL_LOCATIONS = 'unitedapp/App/LOAD_HOTEL_LOCATIONS';
export const LOAD_HOTEL_LOCATIONS_SUCCESS = 'unitedapp/App/LOAD_HOTEL_LOCATIONS_SUCCESS';
export const LOAD_HOTEL_LOCATIONS_ERROR = 'unitedapp/App/LOAD_HOTEL_LOCATIONS_ERROR';
export const UPDATE_CHECKIN_DETAILS_INDEX = 'unitedapp/App/UPDATE_CHECKIN_DETAILS_INDEX';
export const UNITED_FLIGHTNUMBER_PREFIX = ['9K', 'RP', 'C5', 'XE', 'G7', 'YV', 'YX', 'S5', 'OO', 'AX', 'EV', 'ZW', 'UA'];
export const OPEN_RIGHT_PANEL_MODAL = 'unitedapp/App/OPEN_RIGHT_PANEL_MODAL';
export const SET_ARIA_LIVE_MESSAGE = 'unitedapp/App/SET_ARIA_LIVE_MESSAGE';
export const TO_FOCUS_FLIGHT_STATUS_NUMBER = 'unitedapp/App/TO_FOCUS_FLIGHT_STATUS_NUMBER';
export const LOAD_ADVISORIES_STATUS_SUCCESS = 'unitedapp/App/LOAD_ADVISORIES_STATUS_SUCCESS';
export const LOAD_ADVISORIES_STATUS_ERROR = 'unitedapp/App/LOAD_ADVISORIES_STATUS_ERROR';
export const LOAD_ADVISORIES_STATUS = 'unitedapp/App/LOAD_ADVISORIES_STATUS';
export const API_ADVISORIES_REQUEST_URL = '/api/home/advisories';
export const SHOW_ADVISORIES = 'unitedapp/App/SHOW_ADVISORIES';
export const TO_FOCUS_FLIGHT_CHECKIN_NUMBER = 'unitedapp/App/TO_FOCUS_FLIGHT_CHECKIN_NUMBER';
