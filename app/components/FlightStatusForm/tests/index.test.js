import React from 'react';
import { spy } from 'sinon';
import Immutable from 'immutable';
import 'react-dates/initialize';
import moment from 'moment';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import FlightStatusForm from '../index';

describe('<FlightStatusForm />', () => {
  const flightRequestSpy = spy();
  const changeModelSpy = spy();
  const dateSelectedSpy = spy();
  const hideAutoSpy = spy();
  const onFlightStatusSubmitSpy = spy();
  const onSelectFlightStatusOriginLocationSpy = spy();
  const onSelectFlightStatusDestinationLocationSpy = spy();
  const updateFlightStatusSpy = spy();
  const openRightPanelModalSpy = spy();
  const mobileView = Immutable.Map({
    flightStatusOrigin: 'fixed',
    flightStatusDestination: 'relative',
  });
  const flightStatusModelData = Immutable.Map({
    StatusOrigin: '',
    StatusDestination: '',
    flightNumber: '',
    dates: '',
  });
  const renderedComponent = shallowWithIntl(
    <FlightStatusForm
      getFlightRequestResponse={flightRequestSpy}
      activeTab="statusTab"
      onChangeModel={changeModelSpy}
      onFlightStatusSubmit={onFlightStatusSubmitSpy}
      setDateSelected={dateSelectedSpy}
      mobileView={mobileView}
      hideAutocompleteLocationDropdown={hideAutoSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onUpdateFlightStatusDate={updateFlightStatusSpy}
      openRightPanelModal={openRightPanelModalSpy}
      globalFlightStatusOriginLocationCode="ORD"
      globalFlightStatusDestinationLocationCode="LGA"
      flightStatusModel={flightStatusModelData}
    />
  ).dive();
  beforeEach(() => {
    flightRequestSpy.reset();
    changeModelSpy.reset();
    onFlightStatusSubmitSpy.reset();
    dateSelectedSpy.reset();
    hideAutoSpy.reset();
    onSelectFlightStatusOriginLocationSpy.reset();
    onSelectFlightStatusDestinationLocationSpy.reset();
    updateFlightStatusSpy.reset();
    openRightPanelModalSpy.reset();
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(11);
  });
  it('should render labels', () => {
    expect(renderedComponent.find('label').length).toEqual(1);
  });
  it('should render a', () => {
    expect(renderedComponent.find('a').length).toEqual(1);
  });
  it('should render Select', () => {
    expect(renderedComponent.find('Select').length).toEqual(1);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  describe('should handle handleFlightStatusSubmit()', () => {
    it('should handle with flightNumber parameter', () => {
      const model = Immutable.Map({
        flightNumber: '707',
        dates: 'DEC 29, 2017',
      });
      renderedComponent.instance().handleFlightStatusSubmit(model);
      expect(onFlightStatusSubmitSpy.called).toEqual(true);
    });
    it('should handle without flightNumber parameter', () => {
      const model = Immutable.Map({
        flightNumber: '',
        dates: 'DEC 29, 2017',
      });
      renderedComponent.instance().handleFlightStatusSubmit(model);
    });
  });
  describe('should handle getSelectedDateFormatted()', () => {
    let currentDate;
    beforeEach(() => {
      currentDate = moment();
    });
    it('should handle with yesterdayDateAria', () => {
      expect(renderedComponent.instance().getSelectedDateFormatted('1', true)).toEqual(moment(currentDate).subtract(1, 'days').format('MMMM DD, YYYY'));
    });
    it('should handle with tomorrowDateAria', () => {
      expect(renderedComponent.instance().getSelectedDateFormatted('3', true)).toEqual(moment(currentDate).add(1, 'days').format('MMMM DD, YYYY'));
    });
    it('should handle with dayAfterTomorrowDateAria', () => {
      expect(renderedComponent.instance().getSelectedDateFormatted('4', true)).toEqual(moment(currentDate).add(2, 'days').format('MMMM DD, YYYY'));
    });
  });
  it('should handle updateDateSelected()', () => {
    renderedComponent.instance().updateDateSelected({ label: 'Tue, Dec 18', value: '1' });
    expect(changeModelSpy.called).toEqual(true);
    expect(dateSelectedSpy.called).toEqual(true);
  });
  it('should handle onChange for Select', () => {
    const datesDropdown = renderedComponent.find('#datesDropdown');
    datesDropdown.simulate('change', { label: 'Tue, Dec 18', value: '1' });
    expect(changeModelSpy.called).toEqual(true);
    expect(dateSelectedSpy.called).toEqual(true);
  });
  it('should handle form submit', () => {
    const model = Immutable.Map({
      flightNumber: '1234',
      dates: '12/02/2030',
    });
    renderedComponent.find('#flightStatusModel').simulate('submit', model);
    expect(updateFlightStatusSpy.called).toEqual(true);
    expect(onFlightStatusSubmitSpy.called).toEqual(true);
  });
});
