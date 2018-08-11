import React from 'react';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import HomeTopRightPanel from '../index';

// images
import wifiIcon from '../assets/wifi_icon.svg';
import powerIcon from '../assets/power_icon.svg';
import tvIcon from '../assets/tv_icon.svg';

describe('<HomeTopRightPanel />', () => {
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

  const renderedComponent = shallowWithIntl(
    <HomeTopRightPanel
      data={flightStatusData}
      dataIndex={0}
    />
  ).dive();

  const renderedComponentValidFlight = shallowWithIntl(
    <HomeTopRightPanel
      validFlightStatus
      data={flightStatusData}
      dataIndex={0}
    />
  ).dive();

  const renderedComponentValidCheckin = shallowWithIntl(
    <HomeTopRightPanel
      validCheckin
      data={checkinData}
      dataIndex={0}
    />
  ).dive();

  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(2);
  });
  it('should render divs for valid flight', () => {
    expect(renderedComponentValidFlight.find('div').length).toEqual(2);
  });
  it('should render divs for valid checkin', () => {
    expect(renderedComponentValidCheckin.find('div').length).toEqual(2);
  });
  it('should return correct values from getRightPanelValues() for flight status type', () => {
    const flightNumberUA = 'UA 680';
    const secondLineTxt = 'Operated by United Airlines, Boeing 787-9 # N38955';
    const appTxt = 'Download the latest United app and enjoy free access to latest movies and TV on your personal device.';
    const appLink = 'Download';
    const bottomTxtA = 'Upgrade list';
    const bottomTxtB = 'Standby list';
    const bottomTxtC = 'Seat map';
    const bottomTxtD = 'Amenities';
    const thirdLineTxt = 'Where is this aircraft coming from?';
    const hasBottomTypeLink = true;


    const rightPanelValue = renderedComponent.instance().getRightPanelValues('flightStatus', flightStatusData, 0);
    expect(rightPanelValue.flightNumberUA).toEqual(flightNumberUA);
    expect(rightPanelValue.departureFlightStatus).toEqual(departureFlightStatus);
    expect(rightPanelValue.firstLineTxt).toEqual(departureFlightStatusDescription);
    expect(rightPanelValue.secondLineTxt).toEqual(secondLineTxt);
    expect(rightPanelValue.appTxt).toEqual(appTxt);
    expect(rightPanelValue.appLink).toEqual(appLink);
    expect(rightPanelValue.bottomTxtA).toEqual(bottomTxtA);
    expect(rightPanelValue.bottomTxtB).toEqual(bottomTxtB);
    expect(rightPanelValue.bottomTxtC).toEqual(bottomTxtC);
    expect(rightPanelValue.bottomTxtD).toEqual(bottomTxtD);
    expect(rightPanelValue.thirdLineTxt).toEqual(thirdLineTxt);
    expect(rightPanelValue.hasBottomTypeLink).toEqual(hasBottomTypeLink);
  });
  it('should return correct value for getBottomTxtIcon()', () => {
    expect(renderedComponent.instance().getBottomTxtIcon('Wifi')).toEqual(wifiIcon);
    expect(renderedComponent.instance().getBottomTxtIcon('Power')).toEqual(powerIcon);
    expect(renderedComponent.instance().getBottomTxtIcon('DirectTV')).toEqual(tvIcon);
  });
});
