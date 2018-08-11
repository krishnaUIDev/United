import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { IntlProvider } from 'react-intl';
import MyTrips from '..';

describe('<MyTrips />', () => {
  const isLoading = true;
  const setAriaLiveMessageSpy = spy();
  const resetMyTripsDataSpy = spy();
  const myTripsData = [{
    FlightStatusLegs: [
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
            ArrivalUTCDateTime: '2018-01-11T12:33:00',
            ArrivalDateTime: '2018-01-11T12:33:00',
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
            DepartureDateTime: '2018-01-11T08:30:00',
            FlightNumber: 680,
            ReasonStatuses: [],
            OperatingAirline: {
              IATACode: 'UA',
            },
          },
        ],
      },
    ],
    Characteristic: [
      {
        Code: 'STOPCOUNT',
        Value: '1',
      },
    ],
    FlightSegments: [
      {
        FlightSegment: {
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
          ArrivalDateTime: '01/23/2018 16:49',
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
          DepartureDateTime: '01/22/2018 16:49',
        },
      },
    ],
    Travelers: [
      {
        IsCheckedIn: 'Y',
      },
    ],
  }];
  const renderedComponentNotLoading = mount(
    <IntlProvider locale="en">
      <MyTrips
        isLoggedIn
        isLoading={false}
        myTripsData={myTripsData}
        setAriaLiveMessage={setAriaLiveMessageSpy}
        resetMyTripsData={resetMyTripsDataSpy}
      />
    </IntlProvider>
    );
  const renderedComponentwithLoadingTrue = mount(
    <IntlProvider locale="en">
      <MyTrips
        isLoading={isLoading}
        isLoggedIn
        myTripsData={myTripsData}
        setAriaLiveMessage={setAriaLiveMessageSpy}
        resetMyTripsData={resetMyTripsDataSpy}
      />
    </IntlProvider>
    );

  it('renderedComponentNotLoading should render divs', () => {
    expect(renderedComponentNotLoading.find('div').length).toEqual(19);
  });
  it('renderedComponentwithLoadingTrue should render divs', () => {
    expect(renderedComponentwithLoadingTrue.find('div').length).toEqual(9);
  });
});
