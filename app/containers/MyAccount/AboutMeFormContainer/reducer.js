import { fromJS } from 'immutable';

import {
  NATIONALITY_SELECTED,
  COUNTRYOFRESIDENCE_SELECTED,
  ABOUTME_DATA_LOADED,
} from './constants';

const initialState = fromJS({
  aboutMe: {
    name: '',
    dateOfBirth: '',
    gender: '',
  },
  nationality: '',
  countryOfResidence: '',
});

function aboutMeReducer(state = initialState, action) {
  switch (action.type) {
    case NATIONALITY_SELECTED:
      return state
        .set('nationality', action.nationality);
    case COUNTRYOFRESIDENCE_SELECTED:
      return state
        .set('countryOfResidence', action.countryOfResidence);
    case ABOUTME_DATA_LOADED:
      return state
        .set('aboutMe', action.aboutMe);
    default:
      return state;
  }
}

export default aboutMeReducer;
