import { spy } from 'sinon';
import 'react-dates/initialize';

// AutocompleteLocationContainer
import {
  onHideAutocompleteLocationDropdown,
  setAutolocationAriaLabel,
  onUpdateMobileView,
} from '../actions';

import { mapDispatchToProps } from '../index';

describe('FlightStatusContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call onHideAutocompleteLocationDropdown action', () => {
      const dispatchSpy = spy();
      const { hideAutocompleteLocationDropdown } = mapDispatchToProps(dispatchSpy);
      hideAutocompleteLocationDropdown(true, 'foo');
      const expectedAction = onHideAutocompleteLocationDropdown(true, 'foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toHide).toEqual(expectedAction.toHide);
      expect(spyLastCall.id).toEqual(spyLastCall.id);
    });
    it('should call setAutolocationAriaLabel action', () => {
      const dispatchSpy = spy();
      const { onSetAutolocationAriaLabel } = mapDispatchToProps(dispatchSpy);
      onSetAutolocationAriaLabel('foo');
      const expectedAction = setAutolocationAriaLabel('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.ariaLabel).toEqual(expectedAction.ariaLabel);
    });
    it('should call onUpdateMobileView action', () => {
      const dispatchSpy = spy();
      const { updateMobileView } = mapDispatchToProps(dispatchSpy);
      updateMobileView(true, 'foo');
      const expectedAction = onUpdateMobileView(true, 'foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toHide).toEqual(expectedAction.toHide);
      expect(spyLastCall.id).toEqual(expectedAction.id);
    });
  });
});
