import React from 'react';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import FlightStatusTerminalDetails from '../index';

describe('<FlightStatusTerminalDetails />', () => {
  const flightStatusData = {
    currentWeather: [
      {
        Temperature: {
          Farenheit: '32',
        },
      },
      {
        Temperature: {
          Farenheit: '7',
        },
      },
    ],
    flightLegs: [
      {
        OperationalFlightSegments: [
          {
            ArrivalAirport: {
              Address: {
                City: 'CHICAGO',
                StateProvince: {
                  Name: 'IL',
                },
              },
              IATACode: 'ORD',
              IATACountryCode: {
                CountryCode: 'USA',
              },
              Name: 'Chicago, IL, US (ORD - O Hare)',
              ShortName: 'O`HARE INTL',
            },
            ArrivalGate: 'C',
            ArrivalTermimal: '2',
            DepartureGate: 'F12',
            DepartureTerminal: 'B',
            ArrivalUTCDateTime: '2018-01-11T12:33:00',
            DepartureAirport: {
              Address: {
                City: 'SAN FRANCISCO',
                StateProvince: {
                  Name: 'CA',
                },
              },
              IATACode: 'SFO',
              IATACountryCode: {
                CountryCode: 'USA',
              },
              Name: 'San Francisco, CA, US (SFO)',
              ShortName: 'SAN FRANCISCO INTL',
            },
            DepartureUTCDateTime: '2018-01-11T08:30:00',
            FlightNumber: 680,
            ReasonStatuses: [],
          },
        ],
        ScheduledFlightSegments: [
          {
            DepartureUTCDateTime: '2018-01-11T08:30:00',
            ArrivalUTCDateTime: '2018-01-11T12:33:00',
            DepartureDateTime: '2018-01-11T08:30:00',
            ArrivalDateTime: '2018-01-11T12:33:00',
          },
        ],
      },
    ],
  };
  const flightStatusDataMissingFields = {
    currentWeather: [
      {
        Temperature: {},
      },
      {
        Temperature: {},
      },
    ],
    flightLegs: [
      {
        OperationalFlightSegments: [
          {
            ArrivalAirport: {
              Address: {
                StateProvince: {
                  Name: 'IL',
                },
              },
              IATACountryCode: {
                CountryCode: 'USA',
              },
              Name: 'Chicago, IL, US (ORD - O Hare)',
              ShortName: 'O`HARE INTL',
            },
            DepartureAirport: {
              Address: {
                StateProvince: {
                  Name: 'CA',
                },
              },
              IATACountryCode: {
                CountryCode: 'USA',
              },
              Name: 'San Francisco, CA, US (SFO)',
              ShortName: 'SAN FRANCISCO INTL',
            },
            FlightNumber: 680,
            ReasonStatuses: [],
          },
        ],
        ScheduledFlightSegments: [],
      },
    ],
  };
  const renderedComponent = shallowWithIntl(
    <FlightStatusTerminalDetails
      flightStatusData={flightStatusData}
      isMobile={false}
      selectFlightData={0}
    />
  ).dive();
  const renderedComponentMobile = shallowWithIntl(
    <FlightStatusTerminalDetails
      flightStatusData={flightStatusData}
      isMobile
      selectFlightData={0}
    />
  ).dive();
  const renderedComponentMissingFields =
  shallowWithIntl(
    <FlightStatusTerminalDetails
      flightStatusData={flightStatusDataMissingFields}
      isMobile
      selectFlightData={0}
    />
  ).dive();
  it('should render divs for desktop', () => {
    expect(renderedComponent.find('div').length).toEqual(11);
  });
  it('should render spans for desktop', () => {
    expect(renderedComponent.find('span').length).toEqual(6);
  });
  it('should render divs for mobile', () => {
    expect(renderedComponentMobile.find('div').length).toEqual(16);
  });
  it('should render spans for mobile', () => {
    expect(renderedComponentMobile.find('span').length).toEqual(8);
  });
  it('should render dashes for missing fields', () => {
    const arrivalGateDetails = renderedComponentMissingFields.find('#arrivalGateDetails');
    const arrivalTerminalDetails = renderedComponentMissingFields.find('#arrivalTerminalDetails');
    const departureGateDetails = renderedComponentMissingFields.find('#departureGateDetails');
    const departureTerminalDetails = renderedComponentMissingFields.find('#departureTerminalDetails');

    expect(arrivalGateDetails.text()).toEqual('Gate not assigned');
    expect(arrivalTerminalDetails.text()).toEqual('--Not assigned');
    expect(departureGateDetails.text()).toEqual('Gate not assigned');
    expect(departureTerminalDetails.text()).toEqual('--Not assigned');
  });
});
