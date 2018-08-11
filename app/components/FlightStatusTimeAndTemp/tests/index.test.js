import React from 'react';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import FlightStatusTimeAndTemp from '../index';

describe('<FlightStatusTimeAndTemp />', () => {
  const flightStatusData = {
    currentWeather: [
      {
        AirportCode: 'SFO',
        Temperature: {
          Farenheit: '32',
        },
      },
      {
        AirportCode: 'CHI',
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
              IATACode: 'CHI',
              IATACountryCode: {
                CountryCode: 'USA',
              },
              Name: 'Chicago, IL, US (ORD - O Hare)',
              ShortName: 'O`HARE INTL',
            },
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
            OperatingAirline: {
              IATACode: 'UA',
            },
            FlightNumber: 680,
            ReasonStatuses: [],
          },
        ],
        ScheduledFlightSegments: [
          {
            DepartureUTCDateTime: '2018-01-11T08:30:00',
            ArrivalUTCDateTime: '2018-01-11T12:33:00',
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
              ShortName: 'SAN FRANCISCO INTL',
            },
            FlightNumber: 680,
            OperatingAirline: {
              IATACode: 'UA',
            },
            ReasonStatuses: [],
          },
        ],
        ScheduledFlightSegments: [
          {
            DepartureUTCDateTime: '2018-01-11T08:30:00',
            ArrivalUTCDateTime: '2018-01-11T12:33:00',
          },
        ],
      },
    ],
  };
  const renderedComponent = shallowWithIntl(
    <FlightStatusTimeAndTemp
      flightStatusData={flightStatusData}
      selectFlightData={''}
      isMobile={false}
    />
  ).dive();
  const renderedComponentMobile = shallowWithIntl(
    <FlightStatusTimeAndTemp
      flightStatusData={flightStatusData}
      selectFlightData={''}
      isMobile
    />
  ).dive();
  const renderedComponentMissingFields = shallowWithIntl(
    <FlightStatusTimeAndTemp
      flightStatusData={flightStatusDataMissingFields}
      selectFlightData={''}
    />
  ).dive();
  it('should render divs for desktop', () => {
    expect(renderedComponent.find('div').length).toEqual(22);
  });
  it('should render spans for desktop', () => {
    expect(renderedComponent.find('span').length).toEqual(6);
  });
  it('should render img for desktop', () => {
    expect(renderedComponent.find('img').length).toEqual(3);
  });
  it('should render divs for mobile', () => {
    expect(renderedComponentMobile.find('div').length).toEqual(16);
  });
  it('should render spans for mobile', () => {
    expect(renderedComponentMobile.find('span').length).toEqual(4);
  });
  it('should render img for mobile', () => {
    expect(renderedComponentMobile.find('img').length).toEqual(3);
  });
  it('should render dashes for missing fields', () => {
    const arrivalCode = renderedComponentMissingFields.find('#arrivalAirportCode');
    const departureCode = renderedComponentMissingFields.find('#departureAirportCode');
    const arrivalCity = renderedComponentMissingFields.find('#arrivalCity');
    const departureCity = renderedComponentMissingFields.find('#departureCity');
    const arrivalTemperature = renderedComponentMissingFields.find('#arrivalTemperature');
    const departureTemperature = renderedComponentMissingFields.find('#departureTemperature');
    expect(arrivalCode.text()).toEqual('----');
    expect(departureCode.text()).toEqual('----');
    expect(arrivalCity.text()).toEqual('--');
    expect(departureCity.text()).toEqual('--');
    expect(arrivalTemperature.text()).toEqual('--');
    expect(departureTemperature.text()).toEqual('--');
  });
});
