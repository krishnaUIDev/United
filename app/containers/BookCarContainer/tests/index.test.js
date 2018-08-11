import { spy } from 'sinon';
import 'react-dates/initialize';

import {
  loadCarLocations,
  setActiveField,
} from 'containers/HomePage/actions';

import { mapDispatchToProps } from '../index';
import {
  dropoffLocationChange,
  selectCarPickupLocation,
  onSetCarDropoffDate,
  onSetCarPickupDate,
  onHideAgeBoxChecked,
  onDropOffLocationChecked,
  onBookCarDriversAgeSelected,
  onBookCarDropoffTimeSelected,
  onBookCarPickupTimeSelected,
} from '../actions';

describe('BookCarContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call onDropoffLocationChange action', () => {
      const dispatchSpy = spy();
      const { onDropoffLocationChange } = mapDispatchToProps(dispatchSpy);
      onDropoffLocationChange('foo');
      const expectedAction = dropoffLocationChange('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.location).toEqual(expectedAction.location);
    });
    it('should call selectCarPickupLocation action', () => {
      const dispatchSpy = spy();
      const { onSelectCarPickupLocation } = mapDispatchToProps(dispatchSpy);
      onSelectCarPickupLocation('foo');
      const expectedAction = selectCarPickupLocation('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.location).toEqual(expectedAction.location);
    });
    it('should call onSetCarDropoffDate action', () => {
      const dispatchSpy = spy();
      const { setReturn } = mapDispatchToProps(dispatchSpy);
      setReturn('Wednesday');
      const expectedAction = onSetCarDropoffDate('Wednesday');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.endDate).toEqual(expectedAction.endDate);
    });
    it('should call onSetCarPickupDate action', () => {
      const dispatchSpy = spy();
      const { setDepart } = mapDispatchToProps(dispatchSpy);
      setDepart('Wednesday');
      const expectedAction = onSetCarPickupDate('Wednesday');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.startDate).toEqual(expectedAction.startDate);
    });
    it('should call onHideAgeBoxChecked action', () => {
      const dispatchSpy = spy();
      const { onSelectDriversAgeBoxChecked } = mapDispatchToProps(dispatchSpy);
      onSelectDriversAgeBoxChecked(true);
      const expectedAction = onHideAgeBoxChecked(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isChecked).toEqual(expectedAction.isChecked);
    });
    it('should call onDropOffLocationChecked action', () => {
      const dispatchSpy = spy();
      const { onSelectDropOffLocationChecked } = mapDispatchToProps(dispatchSpy);
      onSelectDropOffLocationChecked(true);
      const expectedAction = onDropOffLocationChecked(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isChecked).toEqual(expectedAction.isChecked);
    });
    it('should call onBookCarDriversAgeSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectDriversAge } = mapDispatchToProps(dispatchSpy);
      onSelectDriversAge('18');
      const expectedAction = onBookCarDriversAgeSelected('18');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.driversAge).toEqual(expectedAction.driversAge);
    });
    it('should call onBookCarDropoffTimeSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectDropoffTime } = mapDispatchToProps(dispatchSpy);
      onSelectDropoffTime('2pm');
      const expectedAction = onBookCarDropoffTimeSelected('2pm');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.dropoffTime).toEqual(expectedAction.dropoffTime);
    });
    it('should call onBookCarPickupTimeSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectPickupTime } = mapDispatchToProps(dispatchSpy);
      onSelectPickupTime('2pm');
      const expectedAction = onBookCarPickupTimeSelected('2pm');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.pickupTime).toEqual(expectedAction.pickupTime);
    });
    it('should call loadCarLocations action', () => {
      const dispatchSpy = spy();
      const { onLoadCarLocations } = mapDispatchToProps(dispatchSpy);
      onLoadCarLocations('London');
      const expectedAction = loadCarLocations('London');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.searchString).toEqual(expectedAction.searchString);
    });
    it('should call setActiveField action', () => {
      const dispatchSpy = spy();
      const { onSetActiveField } = mapDispatchToProps(dispatchSpy);
      onSetActiveField('foo');
      const expectedAction = setActiveField('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.activeField).toEqual(expectedAction.activeField);
    });
  });
});
