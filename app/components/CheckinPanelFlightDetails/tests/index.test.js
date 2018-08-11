import React from 'react';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import CheckinPanelFlightDetails from '../index';

describe('<CheckinPanelFlightDetails />', () => {
  const renderedComponent = shallowWithIntl(
    <CheckinPanelFlightDetails
      boardingTime="9:00pm"
      departureTime="10:30pm"
      terminal="4A"
      gate="35"
    />
  ).dive();
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(11);
  });
  it('should render spans', () => {
    expect(renderedComponent.find('span').length).toEqual(7);
  });
});
