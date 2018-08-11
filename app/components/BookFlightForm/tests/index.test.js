import React from 'react';
import Immutable from 'immutable';
import { spy } from 'sinon';
import 'react-dates/initialize';
import config from '../../../config/development';
import BookFlightForm from '../index';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';


describe('<BookFlightForm />', () => {
  const onChangeSpy = spy();
  const selectAwardSpy = spy();
  const firstClassSpy = spy();
  const selectCabinSpy = spy();
  const setCabinLabelSpy = spy();
  const bookPassengerSpy = spy();
  const roundtripCheckedSpy = spy();
  const corporateCheckedSpy = spy();
  const nonstopCheckedSpy = spy();
  const flexibleDatesSpy = spy();
  const selectFlightOriginSpy = spy();
  const selectFlightDestinationSpy = spy();
  const departDateSpy = spy();
  const returnDateSpy = spy();
  const updateAllPass = spy();
  const changeModelSpy = spy();
  const flightRequestSpy = spy();
  const mobileView = Immutable.Map({
    bookCarOrigin: 'relative',
    bookCarDropoff: 'relative',
    bookHotel: 'relative',
    bookFlightOrigin: 'relative',
    bookFlightDestination: 'relative',
  });
  const airportDataArray = [
    {
      Airport: {
        Name: 'London, England',
        ShortName: 'London, England',
        IATACode: 'LON',
      },
    },
  ];
  const currentDate = new Date('2040/03/21');
  let futureDate = new Date();
  futureDate = futureDate.setDate(currentDate.getDate() + 1);
  const renderedComponent = shallowWithIntl(
    <BookFlightForm
      // store={store}
      airportData={airportDataArray}
      onChange={onChangeSpy}
      selectAwardTravel={selectAwardSpy}
      onSelectFirstClass={firstClassSpy}
      onSelectCabinClass={selectCabinSpy}
      setCabinLabel={setCabinLabelSpy}
      onPassengerInputClick={bookPassengerSpy}
      mobileView={mobileView}
      globalPassengersToBook={Immutable.Map({
        'Adults (18-64)': 1,
        'Seniors (65+)': 0,
        'Infants (under 2)': 0,
        'Infants on lap': 0,
        'Children (15-17)': 0,
        'Children (12-14)': 0,
        'Children (5-11)': 0,
        'Children (2-4)': 0,
      })}
      activeTab="bookFlightTab"
      onRoundtripChecked={roundtripCheckedSpy}
      corporateBookChecked={corporateCheckedSpy}
      onNonstopChecked={nonstopCheckedSpy}
      onFlexibleDatesChecked={flexibleDatesSpy}
      onSelectFlightOriginLocation={selectFlightOriginSpy}
      onSelectFlightDestinationLocation={selectFlightDestinationSpy}
      setDepart={departDateSpy}
      setReturn={returnDateSpy}
      updateFullPassengers={updateAllPass}
      globalStartDate={currentDate}
      globalEndDate={futureDate}
      onChangeModel={changeModelSpy}
      globalOriginLocationCode="LON"
      globalDestinationLocationCode="LAX"
      globalFlightOrigin="London"
      globalFlightDestination="Los Angeles"
      getFlightRequestResponse={flightRequestSpy}
    />
  ).dive();
  it('should render labels', () => {
    expect(renderedComponent.find('label').length).toEqual(7);
  });
  it('should render inputs', () => {
    expect(renderedComponent.find('input').length).toEqual(2);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(3);
  });
  it('should render links', () => {
    expect(renderedComponent.find('a').length).toEqual(2);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(13);
  });
  it('should render ul', () => {
    expect(renderedComponent.find('ul').length).toEqual(1);
  });
  it('should render li', () => {
    expect(renderedComponent.find('li').length).toEqual(4);
  });
  it('should return whether checkbox is checked', () => {
    const checkbox = renderedComponent.find('#award');
    checkbox.simulate('change', { target: { value: true } });
    expect(selectAwardSpy.called).toEqual(true);
    expect(firstClassSpy.called).toEqual(false);
    expect(selectCabinSpy.called).toEqual(true);
    expect(setCabinLabelSpy.called).toEqual(true);
  });
  it('should handle onInputKeyDown() with keycode 13', () => {
    renderedComponent.instance().onInputKeyDown({ keyCode: 13 });
    expect(bookPassengerSpy.calledOnce).toEqual(true);
  });
  it('should handle onInputKeyDown() with keycode 9', () => {
    renderedComponent.instance().onInputKeyDown({ keyCode: 9 });
    expect(bookPassengerSpy.calledTwice).toEqual(true);
  });
  it('should handle onFlightTypeChange()', () => {
    renderedComponent.instance().onFlightTypeChange({ target: { value: 'oneWay' } });
    expect(roundtripCheckedSpy.called).toEqual(true);
  });
  it('should handle corporate booking checkbox checked', () => {
    const checkbox = renderedComponent.find('#corporateBook');
    checkbox.simulate('change', { target: { value: 'false' } });
    expect(corporateCheckedSpy.called).toEqual(true);
  });
  it('should handle nonstop checkbox checked', () => {
    const checkbox = renderedComponent.find('#nonstop');
    checkbox.simulate('change', { target: { value: 'false' } });
    expect(nonstopCheckedSpy.called).toEqual(true);
  });
  it('should handle award checkbox checked', () => {
    const checkbox = renderedComponent.find('#award');
    checkbox.simulate('change', { target: { value: 'false' } });
    expect(nonstopCheckedSpy.called).toEqual(true);
  });
  it('should handle flexibleDates checkbox checked', () => {
    const checkbox = renderedComponent.find('#flexibleDates');
    checkbox.simulate('change', { target: { value: 'false' } });
    expect(flexibleDatesSpy.called).toEqual(true);
    expect(changeModelSpy.called).toEqual(true);
  });
  it('should handle cabin class change', () => {
    const checkbox = renderedComponent.find('#cabinClass');
    checkbox.simulate('change', 'foo');
    expect(selectCabinSpy.called).toEqual(true);
  });
  describe('setValuesFromGlobal()', () => {
    it('should handle true parameter', () => {
      renderedComponent.instance().setValuesFromGlobal(true);
      expect(corporateCheckedSpy.called).toEqual(true);
      expect(nonstopCheckedSpy.called).toEqual(true);
      expect(selectAwardSpy.called).toEqual(true);
      expect(flexibleDatesSpy.called).toEqual(true);
      expect(setCabinLabelSpy.called).toEqual(true);
      expect(setCabinLabelSpy.called).toEqual(true);
      expect(roundtripCheckedSpy.called).toEqual(true);
    });
    it('should handle false parameter', () => {
      renderedComponent.instance().setValuesFromGlobal(false);
      expect(selectFlightOriginSpy.called).toEqual(true);
      expect(selectFlightDestinationSpy.called).toEqual(true);
      expect(updateAllPass.called).toEqual(true);
    });
  });
  describe('should handle getTravelerParam()', () => {
    it('should handle Adults (18-64)', () => {
      expect(renderedComponent.instance().getTravelerParam('Adults (18-64)')).toEqual(1);
    });
    it('should handle Seniors (65+)', () => {
      expect(renderedComponent.instance().getTravelerParam('Seniors (65+)')).toEqual('');
    });
    it('should handle Infants (under 2)', () => {
      expect(renderedComponent.instance().getTravelerParam('Infants (under 2)')).toEqual('');
    });
    it('should handle Infants on lap', () => {
      expect(renderedComponent.instance().getTravelerParam('Infants on lap')).toEqual('');
    });
    it('should handle Children (15-17)', () => {
      expect(renderedComponent.instance().getTravelerParam('Children (15-17)')).toEqual('');
    });
    it('should handle Children (12-14)', () => {
      expect(renderedComponent.instance().getTravelerParam('Children (12-14)')).toEqual('');
    });
    it('should handle Children (5-11)', () => {
      expect(renderedComponent.instance().getTravelerParam('Children (5-11)')).toEqual('');
    });
    it('should handle Children (2-4)', () => {
      expect(renderedComponent.instance().getTravelerParam('Children (2-4)')).toEqual('');
    });
  });
  it('should handle getTravelersUrlString()', () => {
    expect(renderedComponent.instance().getTravelersUrlString()).toEqual('&px=1');
  });
  it('should handle getFindFlightsURL()', () => {
    const model = Immutable.Map({
      flightType: 'oneWay',
      NonStopOnly: false,
      AwardTravel: true,
      DepartDate: currentDate,
    });
    const date = currentDate.toISOString().substring(0, 10);
    const expected = `${config.UAL_BASE_URL}/ual/en/us/flight-search/book-a-flight/results/rev?f=LON&t=LAX&d=${date}&tt=1&sc=7&px=1&taxng=1`;
    expect(renderedComponent.instance().getFindFlightsURL(model)).toEqual(expected);
  });
});
