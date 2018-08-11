import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import AutocompleteLocationDropdown from 'components/AutocompleteLocationDropdown';

import {
  onHideAutocompleteLocationDropdown,
  setAutolocationAriaLabel,
  onUpdateMobileView,
} from './actions';
import {
  makeSelectHideAutocompleteLocation,
  makeSelectMobileView,
  makeSelectAutoAriaLabel,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  autolocationAriaLabel: makeSelectAutoAriaLabel(),
  hideAutocompleteLocation: makeSelectHideAutocompleteLocation(),
  mobileView: makeSelectMobileView(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideAutocompleteLocationDropdown: (toHide, id) => dispatch(onHideAutocompleteLocationDropdown(toHide, id)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    onSetAutolocationAriaLabel: (ariaLabel) => dispatch(setAutolocationAriaLabel(ariaLabel)),
    dispatch,
    updateMobileView(toHideDropdown, id) {
      if (screen.width < 786) {
        if (toHideDropdown === 'hidden') {
          dispatch(onUpdateMobileView('relative', id));
        } else {
          dispatch(onUpdateMobileView('fixed', id));
        }
      }
    },
  };
}

const FlightStatusContainer = connect(mapStateToProps, mapDispatchToProps)(AutocompleteLocationDropdown);

export default FlightStatusContainer;
