import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import FlightStatus from '..';

describe('<FlightStatus />', () => {
  const getFlightRequestResponseSpy = spy();
  const onArrowKeyDownSpy = spy();
  const onChangeModelSpy = spy();
  const onItemSelectedSpy = spy();
  const onSelectFlightStatusOriginLocationSpy = spy();
  const onSelectFlightStatusDestinationLocationSpy = spy();
  const onLoadAirportsSpy = spy();
  const setDateSelectedSpy = spy();
  const setFlightNumberSpy = spy();
  const onFlightStatusSubmitSpy = spy();
  const setFlightStatusOriginLocationCodeSpy = spy();
  const setFlightStatusDestinationLocationCodeSpy = spy();
  const onNewFlightStatusSearchSpy = spy();
  const isLoading = true;
  const flightStatusData =
    {
      data: {
        flightLegs: [
          {
          },
        ],
        currentWeather: [
        ],
      },
    };
  const flightStatusDataEmpty = null;
  const renderedComponentwithLoadingFalse = shallow(
    <FlightStatus
      flightsStatusData={flightStatusData}
      getFlightRequestResponse={getFlightRequestResponseSpy}
      onArrowKeyDown={onArrowKeyDownSpy}
      onChangeModel={onChangeModelSpy}
      onItemSelected={onItemSelectedSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onLoadAirports={onLoadAirportsSpy}
      setDateSelected={setDateSelectedSpy}
      setFlightNumber={setFlightNumberSpy}
      onFlightStatusSubmit={onFlightStatusSubmitSpy}
      setFlightStatusOriginLocationCode={setFlightStatusOriginLocationCodeSpy}
      setFlightStatusDestinationLocationCode={setFlightStatusDestinationLocationCodeSpy}
      onNewFlightStatusSearch={onNewFlightStatusSearchSpy}
    />);

  const renderedComponentwithLoadingFalseDataEmpty = shallow(
    <FlightStatus
      flightsStatusData={flightStatusDataEmpty}
      getFlightRequestResponse={getFlightRequestResponseSpy}
      onArrowKeyDown={onArrowKeyDownSpy}
      onChangeModel={onChangeModelSpy}
      onItemSelected={onItemSelectedSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onLoadAirports={onLoadAirportsSpy}
      setDateSelected={setDateSelectedSpy}
      setFlightNumber={setFlightNumberSpy}
      onFlightStatusSubmit={onFlightStatusSubmitSpy}
      setFlightStatusOriginLocationCode={setFlightStatusOriginLocationCodeSpy}
      setFlightStatusDestinationLocationCode={setFlightStatusDestinationLocationCodeSpy}
      onNewFlightStatusSearch={onNewFlightStatusSearchSpy}
    />);

  const renderedComponentwithLoadingTrue = shallow(
    <FlightStatus
      isLoading={isLoading}
      flightsStatusData={flightStatusData}
      getFlightRequestResponse={getFlightRequestResponseSpy}
      onArrowKeyDown={onArrowKeyDownSpy}
      onChangeModel={onChangeModelSpy}
      onItemSelected={onItemSelectedSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onLoadAirports={onLoadAirportsSpy}
      setDateSelected={setDateSelectedSpy}
      setFlightNumber={setFlightNumberSpy}
      onFlightStatusSubmit={onFlightStatusSubmitSpy}
      setFlightStatusOriginLocationCode={setFlightStatusOriginLocationCodeSpy}
      setFlightStatusDestinationLocationCode={setFlightStatusDestinationLocationCodeSpy}
      onNewFlightStatusSearch={onNewFlightStatusSearchSpy}
    />
  );
  it('renderedComponentwithLoadingFalse should render divs', () => {
    expect(renderedComponentwithLoadingFalse.find('div').length).toEqual(1);
  });
  it('renderedComponentwithLoadingTrue should render divs', () => {
    expect(renderedComponentwithLoadingTrue.find('div').length).toEqual(2);
  });
  it('renderedComponentwithLoadingFalseDataEmpty should render divs', () => {
    expect(renderedComponentwithLoadingFalseDataEmpty.find('div').length).toEqual(1);
  });
});
