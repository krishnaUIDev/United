import React from 'react';
import { shallow } from 'enzyme';

import HomeTop from '../index';

describe('<HomeTop />', () => {
  const departureFlightStatus = 'On time';
  const departureFlightStatusDescription = 'Arrived 5 minutes early';

  const operatingAndSegments = {
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
        Equipment: {
          Model: {
            Description: 'Boeing 787-9',
          },
          TailNumber: 'N38955',
        },
        FlightNumber: 680,
        FlightStatuses: [
          {
            Description: departureFlightStatusDescription,
          },
          {
            Description: departureFlightStatusDescription,
          },
          {
            Description: departureFlightStatus,
          },
          {
            Description: departureFlightStatus,
          },
        ],
        ReasonStatuses: [],
        OperatingAirline:
        {
          Name: 'United Airlines',
          IATACode: 'UA',
        },
        InboundFlightSegment: {
          ArrivalAirport: 'IAH',
          DepartureDate: '2018-01-29T18:55:00',
          FlightNumber: '1029',
          DepartureAirport: 'MEX',
          CarrierCode: 'UA',
        },
      },
    ],
    ScheduledFlightSegments: [
      {
        DepartureUTCDateTime: '2018-01-11T08:30:00',
        ArrivalUTCDateTime: '2018-01-11T12:33:00',
      },
    ],
  };
  const flightStatusData = {
    Flight: {
      flightNumber: 680,
    },
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
      operatingAndSegments,
    ],
  };

  const checkinFlightSegment = {
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
    Equipment: {
      Model: {
        Description: 'Boeing 787-9',
      },
      TailNumber: 'N38955',
    },
    FlightNumber: 680,
    FlightStatuses: [
      {
        Description: departureFlightStatusDescription,
      },
      {
        Description: departureFlightStatusDescription,
      },
      {
        Description: departureFlightStatus,
      },
      {
        Description: departureFlightStatus,
      },
    ],
    ReasonStatuses: [],
    OperatingAirline:
    {
      Name: 'United Airlines',
      IATACode: 'UA',
    },
    InboundFlightSegment: {
      ArrivalAirport: 'IAH',
      DepartureDate: '2018-01-29T18:55:00',
      FlightNumber: '1029',
      DepartureAirport: 'MEX',
      CarrierCode: 'UA',
    },
  };

  const checkinData = {
    Flight: {
      flightNumber: 680,
    },
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
    trips: [
      {
        Links: [
          {
            LinkType: 'Boarding Pass',
            Href: 'url',
          },
          {
            LinkType: 'Checkin Now',
            Href: 'url',
          },
        ],
        Travelers: [
          {
            IsCheckedIn: 'Y',
            Person: {
              GivenName: 'Foo',
              Surname: 'Bar',
            },
          },
        ],
        FlightStatusLegs:
        [
          operatingAndSegments,
        ],
        FlightSegments:
        [
          {
            FlightSegment: checkinFlightSegment,
          },
        ],
      },
    ],
  };
  const renderedComponent = shallow(
    <HomeTop />
  );

  const renderedComponentCheckin = shallow(
    <HomeTop activeTab="checkInTab" flightStatusData={checkinData} />
  );

  const renderedComponentFlightStatus = shallow(
    <HomeTop activeTab="statusTab" flightStatusData={flightStatusData} />
  );

  it('should render sections', () => {
    expect(renderedComponent.find('section').length).toEqual(1);
    expect(renderedComponentCheckin.find('section').length).toEqual(1);
    expect(renderedComponentFlightStatus.find('section').length).toEqual(1);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(3);
    expect(renderedComponentCheckin.find('div').length).toEqual(3);
    expect(renderedComponentFlightStatus.find('div').length).toEqual(3);
  });
});
