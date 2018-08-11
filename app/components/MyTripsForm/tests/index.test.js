import React from 'react';
import Immutable from 'immutable';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import MyTripsForm from '../index';

describe('<MyTripsForm />', () => {
  const bookMyTripsModel = Immutable.Map({
    confirmationNumber: 'ABCDEF',
    lastName: 'ecomm',
  });
  const renderedComponent = shallowWithIntl(
    <MyTripsForm />
  ).dive();
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(5);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render links', () => {
    expect(renderedComponent.find('a').length).toEqual(1);
  });
  it('should handle setFormHiddenField()', () => {
    renderedComponent.instance().setFormHiddenField('foo', 'bar');
  });
  it('should handle onMyTripsSubmit()', () => {
    renderedComponent.instance().onMyTripsSubmit(bookMyTripsModel);
  });
  it('should handle form submit', () => {
    const form = renderedComponent.find('#bookMyTrips');
    form.simulate('submit', bookMyTripsModel);
  });
  it('should handle submit button click', () => {
    const button = renderedComponent.find('#myTripsSubmitBtn');
    button.simulate('click', bookMyTripsModel);
  });
  it('should handle validateCheckinForm() with valid inputs', () => {
    expect(renderedComponent.instance().validateCheckinForm(bookMyTripsModel)).toEqual(true);
  });
  it('should handle validateCheckinForm() with invalid inputs', () => {
    const checkinModel = Immutable.Map({
      confirmationNumber: '',
      lastName: '',
    });
    expect(renderedComponent.instance().validateCheckinForm(checkinModel)).toEqual(false);
  });
});
