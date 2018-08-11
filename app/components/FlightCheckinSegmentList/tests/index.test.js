import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { IntlProvider } from 'react-intl';

import FlightCheckinSegmentList from '..';


describe('<FlightCheckinSegmentList />', () => {
  const flightCheckinResult =
    {
      trips: [{
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
      },
      ],
      Flight:
      {
        flightNumber: '8837',
        FlightOriginationDate: '2018-01-19',
      },
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
              OperatingAirline: {
                IATACode: 'UA',
              },
            },
          ],
        },
      ],
      currentWeather: [
        {
          AirportCode: 'ORD',
          Sky: '34',
          Temperature: {
            Celsius: 3,
            Farenheit: 37,
          },
        },
        {
          AirportCode: 'SFO',
          Sky: '38',
          Temperature: {
            Celsius: 3,
            Farenheit: 40,
          },
        },
      ],
    };

  const openRightPanelModalSpy = spy();
  const onToFocusFlightNumberSpy = spy();
  const renderedComponent = mount(
    <IntlProvider locale="en">
      <FlightCheckinSegmentList
        flightCheckinData={flightCheckinResult}
        openRightPanelModal={openRightPanelModalSpy}
        onToFocusFlightNumber={onToFocusFlightNumberSpy}
      />
    </IntlProvider>);

  it('renderedComponent should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(27);
  });
  it('should render spans', () => {
    expect(renderedComponent.find('span').length).toEqual(21);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(4);
  });
});
