/*
 * BookCarContainer Actions
 */
import {
  HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN,
  UPDATE_MOBILE_VIEW,
  SET_AUTO_ARIA_LABEL,
} from './constants';

export function onHideAutocompleteLocationDropdown(toHide, id) {
  return {
    type: HIDE_AUTOCOMPLETE_LOCATION_DROPDOWN,
    toHide,
    id,
  };
}

export function onUpdateMobileView(style, id) {
  return {
    type: UPDATE_MOBILE_VIEW,
    style,
    id,
  };
}

export function setAutolocationAriaLabel(ariaLabel) {
  return {
    type: SET_AUTO_ARIA_LABEL,
    ariaLabel,
  };
}
