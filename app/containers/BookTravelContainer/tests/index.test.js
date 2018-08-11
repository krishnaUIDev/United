import { spy } from 'sinon';
import 'react-dates/initialize';

import { mapDispatchToProps } from '../index';

// AutocompleteLocationDropdown
import {
  onHideAutocompleteLocationDropdown,
} from '../../AutocompleteLocationContainer/actions';

// HomePage
import {
  setPrimaryTab,
  expandHomeTop,
  collapseHomeTop,
  setKeyboardUser,
} from '../../HomePage/actions';

// BookFlightContainer
import {
  onBookFlightOriginLocationSelected,
  onBookFlightDestinationLocationSelected,
  onSetOriginLocationCode,
  onSetDestinationLocationCode,
} from '../../BookFlightContainer/actions';

// FlightStatusContainer
import {
  onSetFlightStatusOriginLocationCode,
  onSetFlightStatusDestinationLocationCode,
  onFlightStatusOriginLocationSelected,
  onFlightStatusDestinationLocationSelected,
} from '../../FlightStatusContainer/actions';

describe('BookTravelContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call onHideAutocompleteLocationDropdown action', () => {
      const dispatchSpy = spy();
      const { hideAutocompleteLocationDropdown } = mapDispatchToProps(dispatchSpy);
      hideAutocompleteLocationDropdown(true, 'foo');
      const expectedAction = onHideAutocompleteLocationDropdown(true, 'foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toHide).toEqual(expectedAction.toHide);
      expect(spyLastCall.id).toEqual(expectedAction.id);
    });
    it('should call collapseHomeTop action', () => {
      const dispatchSpy = spy();
      const { onCollapseInputSelected } = mapDispatchToProps(dispatchSpy);
      onCollapseInputSelected();
      const expectedAction = collapseHomeTop();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });
    it('should call expandHomeTop action', () => {
      const dispatchSpy = spy();
      const { onInputSelected } = mapDispatchToProps(dispatchSpy);
      onInputSelected();
      const expectedAction = expandHomeTop();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });
    it('should call onBookFlightOriginLocationSelected', () => {
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
      expect(spyLastCallB.toHide).toEqual(expectedActionB.toHide);
      expect(spyLastCallB.id).toEqual(expectedActionB.id);
    });
    it('should call onBookFlightDestinationLocationSelected', () => {
      const dispatchSpy = spy();
      const { onSelectFlightDestinationLocation } = mapDispatchToProps(dispatchSpy);
      onSelectFlightDestinationLocation('New York');
      const expectedActionA = onBookFlightDestinationLocationSelected('New York');
      const expectedActionB = onHideAutocompleteLocationDropdown('hidden');
      const spyLastCallA = dispatchSpy.args[0][0];
      const spyLastCallB = dispatchSpy.args[1][0];
      expect(spyLastCallA.type).toEqual(expectedActionA.type);
      expect(spyLastCallA.bookFlightDestinationLocation).toEqual(expectedActionA.bookFlightDestinationLocation);
      expect(spyLastCallB.type).toEqual(expectedActionB.type);
      expect(spyLastCallB.toHide).toEqual(expectedActionB.toHide);
      expect(spyLastCallB.id).toEqual(expectedActionB.id);
    });
    it('should call onSetDestinationLocationCode action', () => {
      const dispatchSpy = spy();
      const { setDestinationLocationCode } = mapDispatchToProps(dispatchSpy);
      setDestinationLocationCode('LAX');
      const expectedAction = onSetDestinationLocationCode('LAX');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call onSetOriginLocationCode action', () => {
      const dispatchSpy = spy();
      const { setOriginLocationCode } = mapDispatchToProps(dispatchSpy);
      setOriginLocationCode('LAX');
      const expectedAction = onSetOriginLocationCode('LAX');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call setPrimaryTab action', () => {
      const dispatchSpy = spy();
      const { setTab } = mapDispatchToProps(dispatchSpy);
      setTab('newId');
      const expectedAction = setPrimaryTab('newId');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.newActiveTabId).toEqual(expectedAction.newActiveTabId);
    });
    it('should call setKeyboardUser action', () => {
      const dispatchSpy = spy();
      const { onSetKeyboardUser } = mapDispatchToProps(dispatchSpy);
      onSetKeyboardUser(true);
      const expectedAction = setKeyboardUser(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isKeyboardUser).toEqual(expectedAction.isKeyboardUser);
    });
    it('should call onSetFlightStatusOriginLocationCode action', () => {
      const dispatchSpy = spy();
      const { setFlightStatusOriginLocationCode } = mapDispatchToProps(dispatchSpy);
      setFlightStatusOriginLocationCode('LAX');
      const expectedAction = onSetFlightStatusOriginLocationCode('LAX');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call onSetFlightStatusOriginLocationCode action', () => {
      const dispatchSpy = spy();
      const { setFlightStatusDestinationLocationCode } = mapDispatchToProps(dispatchSpy);
      setFlightStatusDestinationLocationCode('LAX');
      const expectedAction = onSetFlightStatusDestinationLocationCode('LAX');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call onSelectFlightStatusOriginLocation action', () => {
      const dispatchSpy = spy();
      const { onSelectFlightStatusOriginLocation } = mapDispatchToProps(dispatchSpy);
      onSelectFlightStatusOriginLocation('London');
      const expectedAction = onFlightStatusOriginLocationSelected('London');
      const expectedActionB = onHideAutocompleteLocationDropdown('hidden');
      const spyLastCall = dispatchSpy.args[0][0];
      const spyLastCallB = dispatchSpy.args[1][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.flightStatusOriginLocation).toEqual(expectedAction.flightStatusOriginLocation);
      expect(spyLastCallB.type).toEqual(expectedActionB.type);
      expect(spyLastCallB.toHide).toEqual(expectedActionB.toHide);
      expect(spyLastCallB.id).toEqual(expectedActionB.id);
    });
    it('should call onFlightStatusDestinationLocationSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectFlightStatusDestinationLocation } = mapDispatchToProps(dispatchSpy);
      onSelectFlightStatusDestinationLocation('London');
      const expectedAction = onFlightStatusDestinationLocationSelected('London');
      const expectedActionB = onHideAutocompleteLocationDropdown('hidden');
      const spyLastCall = dispatchSpy.args[0][0];
      const spyLastCallB = dispatchSpy.args[1][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.flightStatusOriginLocation).toEqual(expectedAction.flightStatusOriginLocation);
      expect(spyLastCallB.type).toEqual(expectedActionB.type);
      expect(spyLastCallB.toHide).toEqual(expectedActionB.toHide);
      expect(spyLastCallB.id).toEqual(expectedActionB.id);
    });
  });
});
