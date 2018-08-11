import { fromJS } from 'immutable';

import {
  LOAD_MILEAGEPLUS_PROFILE,
  LOAD_MILEAGEPLUS_PROFILE_SUCCESS,
  LOAD_COUNTRY_LIST,
  LOAD_COUNTRY_LIST_SUCCESS,
  NATIONALITY_SELECTED,
  COUNTRYOFRESIDENCE_SELECTED,
} from './constants';

const initialState = fromJS({
  mileagePlusProfile: {
    error: false,
    loading: false,
    data: null,
    mpUsername: '',
    loggedIn: false,
    retryCount: 0,
  },
  countryList: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
  },
});

function mileagePlusReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COUNTRY_LIST:
      return state
      .setIn(['countryList', 'error'], false)
      .setIn(['countryList', 'data'], null)
      .setIn(['countryList', 'loading'], true)
      .updateIn(['countryList', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_COUNTRY_LIST_SUCCESS:
      return state
      .setIn(['countryList', 'error'], false)
      .setIn(['countryList', 'data'], action.countryList)
      .setIn(['countryList', 'retryCount'], 0);
    case LOAD_MILEAGEPLUS_PROFILE:
      return state
        .setIn(['mileagePlusProfile', 'error'], false)
        .setIn(['mileagePlusProfile', 'loading'], true)
        .updateIn(['mileagePlusProfile', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_MILEAGEPLUS_PROFILE_SUCCESS:
      return state
        .setIn(['mileagePlusProfile', 'data'], action.profile);
        // .setIn(['mileagePlusProfile', 'mpUsername'], action.mpUsername)
        // .setIn(['mileagePlusProfile', 'loading'], false)
        // .setIn(['mileagePlusProfile', 'loggedIn'], true)
        // .setIn(['mileagePlusProfile', 'retryCount'], 0);
    default:
      return state;
  }
}

export default mileagePlusReducer;
