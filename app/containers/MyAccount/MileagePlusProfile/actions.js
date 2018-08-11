/* Mileage Plus Profile Actions */

import {
  LOAD_MILEAGEPLUS_PROFILE,
  LOAD_MILEAGEPLUS_PROFILE_SUCCESS,
  LOAD_COUNTRY_LIST,
  LOAD_COUNTRY_LIST_SUCCESS,
} from './constants';

export function loadMileagePlusProfile() {
  return { type: LOAD_MILEAGEPLUS_PROFILE };
}
export function mileagePlusProfileLoaded(profile) {
  return { type: LOAD_MILEAGEPLUS_PROFILE_SUCCESS, profile };
}
export function loadCountryList() {
  return { type: LOAD_COUNTRY_LIST };
}

export function countryListLoaded(countryList) {
  return { type: LOAD_COUNTRY_LIST_SUCCESS, countryList };
}
