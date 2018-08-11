import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import FlightCheckin from '..';

describe('<FlightCheckin />', () => {
  const isLoading = true;
  const setAriaLiveMessageSpy = spy();
  const flightCheckinData =
    {
      flightLegs: [
        {
        },
      ],
      currentWeather: [
      ],
    };
  const renderedComponentwithLoadingTrue = shallow(
    <FlightCheckin
      isLoading={isLoading}
      flightCheckinData={flightCheckinData}
      setAriaLiveMessage={setAriaLiveMessageSpy}
    />);

  const renderedComponentwithLoadingFalse = shallow(
    <FlightCheckin
      isLoading={false}
      flightCheckinData={flightCheckinData}
      setAriaLiveMessage={setAriaLiveMessageSpy}
    />);
  it('renderedComponentwithLoadingTrue should render divs', () => {
    expect(renderedComponentwithLoadingTrue.find('div').length).toEqual(2);
  });
  it('renderedComponentwithLoadingFalse should render divs', () => {
    expect(renderedComponentwithLoadingFalse.find('div').length).toEqual(1);
  });
});
