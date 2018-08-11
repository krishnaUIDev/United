import { spy } from 'sinon';
import 'react-dates/initialize';

import {
  onHideAutocompleteLocationDropdown,
} from 'containers/AutocompleteLocationContainer/actions';
// HomePage
import {
  loadAirports,
  onOpenRightPanelModal,
} from 'containers/HomePage/actions';
import {
  loadFlightStatus,
  onResetFlightStatusData,
} from 'containers/App/actions';
import { mapDispatchToProps } from '../index';
import {
  onDateSelected,
  onSetFlightStatusOriginLocationCode,
  onSetFlightStatusDestinationLocationCode,
  updateFlightStatusDate,
  onFlightStatusOriginLocationSelected,
  onFlightStatusDestinationLocationSelected,
} from '../actions';

describe('FlightStatusContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call loadAirports action', () => {
      const dispatchSpy = spy();
      const { onLoadAirports } = mapDispatchToProps(dispatchSpy);
      onLoadAirports('foo');
      const expectedAction = loadAirports('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.searchString).toEqual(expectedAction.searchString);
    });
    it('should call onDateSelected action', () => {
      const dispatchSpy = spy();
      const { setDateSelected } = mapDispatchToProps(dispatchSpy);
      setDateSelected('foo');
      const expectedAction = onDateSelected('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.dateSelected).toEqual(expectedAction.dateSelected);
    });
    it('should call onSetFlightStatusOriginLocationCode action', () => {
      const dispatchSpy = spy();
      const { setFlightStatusOriginLocationCode } = mapDispatchToProps(dispatchSpy);
      setFlightStatusOriginLocationCode('foo');
      const expectedAction = onSetFlightStatusOriginLocationCode('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call onSetFlightStatusDestinationLocationCode action', () => {
      const dispatchSpy = spy();
      const { setFlightStatusDestinationLocationCode } = mapDispatchToProps(dispatchSpy);
      setFlightStatusDestinationLocationCode('foo');
      const expectedAction = onSetFlightStatusDestinationLocationCode('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.code).toEqual(expectedAction.code);
    });
    it('should call onFlightStatusSubmit action', () => {
      const dispatchSpy = spy();
      const { onFlightStatusSubmit } = mapDispatchToProps(dispatchSpy);
      onFlightStatusSubmit('ORD', 'DEN', '707', '2017-12-29');
      const expectedAction = loadFlightStatus('ORD', 'DEN', '707', '2017-12-29');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.origin).toEqual(expectedAction.origin);
      expect(spyLastCall.destination).toEqual(expectedAction.destination);
      expect(spyLastCall.flightNumber).toEqual(expectedAction.flightNumber);
      expect(spyLastCall.statusDate).toEqual(expectedAction.statusDate);
    });
    it('should call onResetFlightStatusData action', () => {
      const dispatchSpy = spy();
      const { onNewFlightStatusSearch } = mapDispatchToProps(dispatchSpy);
      onNewFlightStatusSearch();
      const expectedAction = onResetFlightStatusData();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
    });
    it('should call updateFlightStatusDate action', () => {
      const dispatchSpy = spy();
      const { onUpdateFlightStatusDate } = mapDispatchToProps(dispatchSpy);
      onUpdateFlightStatusDate('March 30');
      const expectedAction = updateFlightStatusDate('March 30');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.date).toEqual(expectedAction.date);
    });
    it('should call onOpenRightPanelModal action', () => {
      const dispatchSpy = spy();
      const { openRightPanelModal } = mapDispatchToProps(dispatchSpy);
      openRightPanelModal(true);
      const expectedAction = onOpenRightPanelModal(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toOpen).toEqual(expectedAction.toOpen);
    });
    it('should call onFlightStatusOriginLocationSelected and onHideAutocompleteLocationDropdown actions', () => {
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
      expect(spyLastCallB.toHide).toEqual(spyLastCallB.toHide);
    });
    it('should call onFlightStatusDestinationLocationSelected and onHideAutocompleteLocationDropdown actions', () => {
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
      expect(spyLastCallB.toHide).toEqual(spyLastCallB.toHide);
    });
  });
});
