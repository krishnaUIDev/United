/**
 * Test the HomePage
 */

import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { loadFlightStatus } from '../../App/actions';
import { HomePage, mapDispatchToProps } from '../index';
import {
  onOpenRightPanelModal,
  toFocusFlightStatusNumber,
  setPrimaryTab,
  toFocusFlightCheckinNumber,
} from '../actions';

describe('<HomePage />', () => {
  const renderedComponent = shallow(
    <HomePage />
  );
  it('should render HomeTop', () => {
    expect(renderedComponent.find('HomeTop').length).toEqual(1);
  });
  it('should render InspirationBlock', () => {
    expect(renderedComponent.find('InspirationBlock').length).toEqual(1);
  });
  it('should render InfoBlock', () => {
    expect(renderedComponent.find('InfoBlock').length).toEqual(1);
  });
  describe('mapDispatchToProps', () => {
    it('should call loadFlightStatus action', () => {
      const dispatchSpy = spy();
      const { reloadFlightStatusService } = mapDispatchToProps(dispatchSpy);
      reloadFlightStatusService('Chicago', 'New York', '1234', 'Thursday');
      const expectedAction = loadFlightStatus('Chicago', 'New York', '1234', 'Thursday');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.origin).toEqual(expectedAction.origin);
      expect(spyLastCall.destination).toEqual(expectedAction.destination);
      expect(spyLastCall.flightNumber).toEqual(expectedAction.flightNumber);
      expect(spyLastCall.statusDate).toEqual(expectedAction.statusDate);
    });
    it('should call onOpenRightPanelModal', () => {
      const dispatchSpy = spy();
      const { openRightPanelModal } = mapDispatchToProps(dispatchSpy);
      openRightPanelModal(true);
      const expectedAction = onOpenRightPanelModal(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toClose).toEqual(expectedAction.toClose);
    });
    it('should call toFocusFlightStatusNumber', () => {
      const dispatchSpy = spy();
      const { onToFocusFlightStatusNumber } = mapDispatchToProps(dispatchSpy);
      onToFocusFlightStatusNumber(true);
      const expectedAction = toFocusFlightStatusNumber(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toFocus).toEqual(expectedAction.toFocus);
    });
    it('should call setPrimaryTab', () => {
      const dispatchSpy = spy();
      const { setTab } = mapDispatchToProps(dispatchSpy);
      setTab('foo');
      const expectedAction = setPrimaryTab('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.newActiveTabId).toEqual(expectedAction.newActiveTabId);
    });
  });
  it('should call toFocusFlightStatusNumber', () => {
    const dispatchSpy = spy();
    const { onToFocusFlightCheckinNumber } = mapDispatchToProps(dispatchSpy);
    onToFocusFlightCheckinNumber(true);
    const expectedAction = toFocusFlightCheckinNumber(true);
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.toFocus).toEqual(expectedAction.toFocus);
  });
});
