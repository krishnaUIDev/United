import {
  LOAD_ADS,
  LOAD_ADS_SUCCESS,
  LOAD_ADS_ERROR,
} from './constants';

export function loadAds(retry = false) {
  return {
    type: LOAD_ADS,
    retry,
  };
}

export function adsLoaded(data) {
  return {
    type: LOAD_ADS_SUCCESS,
    data,
  };
}

export function adsLoadingError(error) {
  return {
    type: LOAD_ADS_ERROR,
    error,
  };
}
