import {
  LOAD_FOOTER_DATA,
  LOAD_FOOTER_DATA_SUCCESS,
  LOAD_FOOTER_DATA_ERROR,
} from './constants';

export function loadFooter(retry = false) {
  return {
    type: LOAD_FOOTER_DATA,
    retry,
  };
}

export function footerLoaded(data) {
  return {
    type: LOAD_FOOTER_DATA_SUCCESS,
    data,
  };
}

export function footerLoadingError(error) {
  return {
    type: LOAD_FOOTER_DATA_ERROR,
    error,
  };
}
