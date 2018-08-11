/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const TOKEN_ANON = 'unitedapp/App/TOKEN_ANON';
export const TOKEN_ANON_SUCCESS = 'unitedapp/App/TOKEN_ANON_SUCCESS';
export const TOKEN_ANON_ERROR = 'unitedapp/App/TOKEN_ANON_ERROR';

export const TOKEN_REFRESH = 'unitedapp/App/TOKEN_REFRESH';
export const TOKEN_REFRESH_SUCCESS = 'unitedapp/App/TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_ERROR = 'unitedapp/App/TOKEN_REFRESH_ERROR';
export const DEFAULT_LOCALE = 'en';
export const ROUTE_LOADED = 'unitedapp/App/ROUTE_LOADED';

// non-redux app constants
export const API_TOKEN_REQUEST_URL = '/api/token/anonymous';
export const API_TOKEN_REFRESH_URL = '/api/token/refresh';
export const API_AIRPORTS_REQUEST_URL = '/api/airports/lookup';
export const API_SIGN_IN_REQUEST_URL = '/api/user/signIn';
export const API_SIGN_OUT_REQUEST_URL = '/api/user/signOut';
export const API_PROFILE_REQUEST_URL = '/api/user/profile';
export const API_HOTEL_LOCATION_REQUEST_URL = '/extapi/hotels/1/suggest/v1.3/json?locale=en_GB&boostConfig=config-boost-9&excludeLpa=false&query=';
export const API_FLIGHT_STATUS_REQUEST_URL = '/api/flight/status';
export const API_FLIGHT_CHECKIN_REQUEST_URL = '/api/user/trips/checkin';
export const API_FLIGHT_TRIPS_REQUEST_URL = '/api/user/trips';
export const API_CAROUSEL_REQUEST_URL = '/api/home/heroCarousel';
export const API_HEADER_FOOTER_REQUEST_URL = '/api/home/headerFooter';

// MP sign in constants
export const LOAD_SIGN_IN = 'unitedapp/App/LOAD_SIGN_IN';
export const LOAD_SIGN_IN_SUCCESS = 'unitedapp/App/LOAD_SIGN_IN_SUCCESS';
export const LOAD_SIGN_IN_ERROR = 'unitedapp/App/LOAD_SIGN_IN_ERROR';
export const REMEMBER_ME_CHECKED = 'unitedapp/App/REMEMBER_ME_CHECKED';

export const DO_SIGN_OUT = 'unitedapp/App/DO_SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'unitedapp/App/SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'unitedapp/App/SIGN_OUT_ERROR';

// load profile
export const LOAD_PROFILE = 'unitedapp/App/LOAD_PROFILE';
export const LOAD_PROFILE_SUCCESS = 'unitedapp/App/LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_ERROR = 'unitedapp/App/LOAD_PROFILE_ERROR';

// Get Flight Status
export const LOAD_FLIGHT_STATUS = 'unitedapp/App/LOAD_FLIGHT_STATUS';
export const LOAD_FLIGHT_STATUS_SUCCESS = 'unitedapp/App/LOAD_FLIGHT_STATUS_SUCCESS';
export const LOAD_FLIGHT_STATUS_ERROR = 'unitedapp/App/LOAD_FLIGHT_STATUS_EROOR';
export const RESET_FLIGHT_STATUS_DATA = 'unitedapp/App/RESET_FLIGHT_STATUS_DATA';

// Load Check-in Flight Details
export const LOAD_FLIGHT_CHECKIN = 'unitedapp/App/LOAD_FLIGHT_CHECKIN';
export const LOAD_FLIGHT_CHECKIN_SUCCESS = 'unitedapp/App/LOAD_FLIGHT_CHECKIN_SUCCESS';
export const LOAD_FLIGHT_CHECKIN_ERROR = 'unitedapp/App/LOAD_FLIGHT_CHECKIN_ERROR';
export const LOAD_FLIGHT_CHECKIN_RESET = 'unitedapp/App/LOAD_FLIGHT_CHECKIN_RESET';

// Get My Trip Details
export const LOAD_MY_TRIPS = 'unitedapp/App/LOAD_MY_TRIPS';
export const LOAD_MY_TRIPS_SUCCESS = 'unitedapp/App/LOAD_MY_TRIPS _SUCCESS';
export const LOAD_MY_TRIPS_ERROR = 'unitedapp/App/LOAD_MY_TRIPS _ERROR';
export const LOAD_MY_TRIPS_RESET = 'unitedapp/App/LOAD_MY_TRIPS _RESET';

// Keycode constants
export const ENTER_KEY = 13;
export const TAB_KEY = 9;
export const DOWN_ARROW_KEY = 40;
export const UP_ARROW_KEY = 38;
export const LEFT_ARROW_KEY = 37;
export const RIGHT_ARROW_KEY = 39;
export const ESC_KEY = 27;

// Login Error constants
export const INVALID_CREDENTIALS = 403;
export const ACCOUNT_LOCKED = 423;

// Application constants
export const NON_EXPIRATION_CHASE_CARD_TYPES = ['0266', '0341', '0415', '0478', '0479'];
export const TIMEOUT_SET_MODAL = 'unitedapp/App/TIMEOUT_CLOSE_MODAL';

