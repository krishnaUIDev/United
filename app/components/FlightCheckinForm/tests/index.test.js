import React from 'react';
import Immutable from 'immutable';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import FlightCheckinForm from '../index';

describe('<FlightCheckinForm />', () => {
  const checkinFlightModel = Immutable.Map({
    confirmationNumber: 'ABCDEF',
    lastName: 'ecomm',
  });
  const renderedComponent = shallowWithIntl(
    <FlightCheckinForm />
  ).dive();
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(6);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render links', () => {
    expect(renderedComponent.find('a').length).toEqual(2);
  });
  it('should handle setFormHiddenField()', () => {
    renderedComponent.instance().setFormHiddenField('foo', 'bar');
  });
  it('should handle onFlightCheckin()', () => {
    renderedComponent.instance().onFlightCheckin(checkinFlightModel);
  });
  it('should handle form submit', () => {
    const form = renderedComponent.find('#bookFlightCheckin');
    form.simulate('submit', checkinFlightModel);
  });
  it('should handle submit button click', () => {
    const button = renderedComponent.find('#formSubmitBtn');
    button.simulate('click', checkinFlightModel);
  });
  it('should handle validateCheckinForm() with valid inputs', () => {
    expect(renderedComponent.instance().validateCheckinForm(checkinFlightModel)).toEqual(true);
  });
  it('should handle validateCheckinForm() with invalid inputs', () => {
    const checkinModel = Immutable.Map({
      foo: '',
      bar: '',
    });
    expect(renderedComponent.instance().validateCheckinForm(checkinModel)).toEqual(false);
  });
});
