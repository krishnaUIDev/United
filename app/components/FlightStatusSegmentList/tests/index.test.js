import React from 'react';
import { spy } from 'sinon';
import moment from 'moment';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import FlightStatusSegmentList from '..';


describe('<FlightStatusSegmentList />', () => {
  const onNewFlightStatusSearchSpy = spy();
  const selectedFlightSpy = spy();
  const flightStatusResult =
    {
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
    };
  const renderedComponent = shallowWithIntl(
    <FlightStatusSegmentList
      flightStatusData={flightStatusResult}
      onNewFlightStatusSearch={onNewFlightStatusSearchSpy}
      selectedStatusDate={'2'}
      selectFlightDataIndex={0}
      selectedFlight={selectedFlightSpy}
    />).dive();

  beforeEach(() => {
    onNewFlightStatusSearchSpy.reset();
    selectedFlightSpy.reset();
  });
  it('renderedComponent should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(25);
  });
  it('should render spans', () => {
    expect(renderedComponent.find('span').length).toEqual(18);
  });
  it('should handle new flight search button click', () => {
    renderedComponent.find('#newFlightSearchBtn').simulate('click');
    expect(onNewFlightStatusSearchSpy.called).toEqual(true);
    expect(selectedFlightSpy.called).toEqual(true);
  });
  it('should return correct values for getSelectedDateFormatted()', () => {
    const currentDate = moment();
    const currentDateFormatted = currentDate.format('dddd, MMMM DD, YYYY');
    const yesterdayDate = moment(currentDate).subtract(1, 'days').format('dddd, MMMM DD, YYYY');
    const tomorrowDate = moment(currentDate).add(1, 'days').format('dddd, MMMM DD, YYYY');
    const dayAfterTomorrowDate = moment(currentDate).add(2, 'days').format('dddd, MMMM DD, YYYY');

    expect(renderedComponent.instance().getSelectedDateFormatted('1')).toEqual(yesterdayDate);
    expect(renderedComponent.instance().getSelectedDateFormatted('2')).toEqual(currentDateFormatted);
    expect(renderedComponent.instance().getSelectedDateFormatted('3')).toEqual(tomorrowDate);
    expect(renderedComponent.instance().getSelectedDateFormatted('4')).toEqual(dayAfterTomorrowDate);
  });
});
