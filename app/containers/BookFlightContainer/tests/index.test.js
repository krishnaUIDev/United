import { spy } from 'sinon';
import 'react-dates/initialize';
import { mapDispatchToProps } from '../index';
import {
  onBookFlightDestinationLocationSelected,
  onBookFlightOriginLocationSelected,
  updatePassengerInfo,
  disableTravelerButtons,
} from '../actions';
import {
  onHideAutocompleteLocationDropdown,
  onUpdateMobileView,
} from '../../AutocompleteLocationContainer/actions';
import {
  setActiveField,
  setSecondaryTab,
  loadAirports,
} from '../../HomePage/actions';

describe('BookFlightContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call updateMobileView action with hidden parameter', () => {
      const dispatchSpy = spy();
      const { updateMobileView } = mapDispatchToProps(dispatchSpy);
      updateMobileView('hidden');
      const expectedAction = onUpdateMobileView('relative');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.style).toEqual(expectedAction.style);
    });
    it('should call updateMobileView action without hidden parameter', () => {
      const dispatchSpy = spy();
      const { updateMobileView } = mapDispatchToProps(dispatchSpy);
      updateMobileView();
      const expectedAction = onUpdateMobileView('fixed');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.style).toEqual(expectedAction.style);
    });
    it('should call onSelectFlightOriginLocation', () => {
      const dispatchSpy = spy();
      const { onSelectFlightOriginLocation } = mapDispatchToProps(dispatchSpy);
      onSelectFlightOriginLocation('New York');
      const expectedActionA = onBookFlightOriginLocationSelected('New York');
      const expectedActionB = onHideAutocompleteLocationDropdown('hidden');
      const spyLastCallA = dispatchSpy.args[0][0];
      const spyLastCallB = dispatchSpy.args[1][0];
      expect(spyLastCallA.type).toEqual(expectedActionA.type);
      expect(spyLastCallA.bookFlightOriginLocation).toEqual(expectedActionA.bookFlightOriginLocation);
      expect(spyLastCallB.type).toEqual(expectedActionB.type);
      expect(spyLastCallB.toHide).toEqual(spyLastCallB.toHide);
      expect(spyLastCallB.id).toEqual(spyLastCallB.id);
    });
    it('should call onBookFlightDestinationLocationSelected', () => {
      const dispatchSpy = spy();
      const { onSelectFlightDestinationLocation } = mapDispatchToProps(dispatchSpy);
      onSelectFlightDestinationLocation('Chicago');
      const expectedActionA = onBookFlightDestinationLocationSelected('Chicago');
      const expectedActionB = onHideAutocompleteLocationDropdown('hidden');
      const spyLastCallA = dispatchSpy.args[0][0];
      const spyLastCallB = dispatchSpy.args[1][0];
      expect(spyLastCallA.type).toEqual(expectedActionA.type);
      expect(spyLastCallA.bookFlightDestinationLocation).toEqual(expectedActionA.bookFlightDestinationLocation);
      expect(spyLastCallB.type).toEqual(expectedActionB.type);
      expect(spyLastCallB.toHide).toEqual(spyLastCallB.toHide);
      expect(spyLastCallB.id).toEqual(spyLastCallB.id);
    });
    it('should call updatePassengerInfo action', () => {
      const dispatchSpy = spy();
      const { onChangePassenger } = mapDispatchToProps(dispatchSpy);
      onChangePassenger('Adults', '3');
      const expectedAction = updatePassengerInfo('Adults', '3');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.passengerSection).toEqual(expectedAction.passengerSection);
      expect(spyLastCall.passengerCount).toEqual(expectedAction.passengerCount);
    });
    it('should call disableTravelerButtons action', () => {
      const dispatchSpy = spy();
      const { onDisableTravelerButtons } = mapDispatchToProps(dispatchSpy);
      onDisableTravelerButtons('plusBtn', true);
      const expectedAction = disableTravelerButtons('plusBtn', true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.btnType).toEqual(expectedAction.btnType);
      expect(spyLastCall.toDisable).toEqual(expectedAction.toDisable);
    });
    it('should call setActiveField action', () => {
      const dispatchSpy = spy();
      const { onSetActiveField } = mapDispatchToProps(dispatchSpy);
      onSetActiveField('plusBtn');
      const expectedAction = setActiveField('plusBtn');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.activeField).toEqual(expectedAction.activeField);
    });
    it('should call setSecondaryTab action', () => {
      const dispatchSpy = spy();
      const { setTab } = mapDispatchToProps(dispatchSpy);
      setTab('status');
      const expectedAction = setSecondaryTab('status');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.newActiveTabId).toEqual(expectedAction.newActiveTabId);
    });
    it('should call loadAirports action', () => {
      const dispatchSpy = spy();
      const { onLoadAirports } = mapDispatchToProps(dispatchSpy);
      onLoadAirports('status');
      const expectedAction = loadAirports('status');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.searchString).toEqual(expectedAction.searchString);
      expect(spyLastCall.retry).toEqual(expectedAction.retry);
    });
  });
});
