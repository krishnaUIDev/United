import {
  NATIONALITY_SELECTED,
  COUNTRYOFRESIDENCE_SELECTED,
  ABOUTME_DATA_LOADED,
} from './constants';

export function aboutMeDataLoaded(aboutMe) {
  return { type: ABOUTME_DATA_LOADED, aboutMe };
}
export function nationalitySelected(nationality) {
  return { type: NATIONALITY_SELECTED, nationality };
}

export function countryOfResidenceSelected(countryOfResidence) {
  return { type: COUNTRYOFRESIDENCE_SELECTED, countryOfResidence };
}
