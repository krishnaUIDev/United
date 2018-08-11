import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import 'react-dates/initialize';


import BookTravel from '../index';

describe('<BookTravel />', () => {
  const onCollapseInputSpy = spy();
  const preventDefaultSpy = spy();
  const focusModelSpy = spy();
  const selectFlightOriginSpy = spy();
  const selectFlightDestinationSpy = spy();
  const onSetTabSpy = spy();
  const hideAutoSpy = spy();
  const changeModelSpy = spy();
  const setOriginLocationCodeSpy = spy();
  const setDestinationLocationCodeSpy = spy();
  const setFlightStatusOriginLocationCodeSpy = spy();
  const setFlightStatusDestinationLocationCodeSpy = spy();
  const onSelectFlightStatusOriginLocationSpy = spy();
  const onSelectFlightStatusDestinationLocationSpy = spy();
  const inputSelectedSpy = spy();
  const selectCarPickupSpy = spy();
  const setAriaLiveMessageSpy = spy();
  const selectFlightCheckinSpy = spy();
  const selectMyTripsSpy = spy();
  const airportDataArray = [
    {
      Airport: {
        Name: 'London, England',
        ShortName: 'London, England',
        IATACode: 'LON',
      },
    },
  ];
  const renderedComponent = shallow(
    <BookTravel
      onCollapseInputSelected={onCollapseInputSpy}
      onFocusModel={focusModelSpy}
      onSelectFlightOriginLocation={selectFlightOriginSpy}
      onSelectFlightDestinationLocation={selectFlightDestinationSpy}
      setTab={onSetTabSpy}
      hideAutocompleteLocationDropdown={hideAutoSpy}
      onChangeModel={changeModelSpy}
      setOriginLocationCode={setOriginLocationCodeSpy}
      setDestinationLocationCode={setDestinationLocationCodeSpy}
      setFlightStatusOriginLocationCode={setFlightStatusOriginLocationCodeSpy}
      setFlightStatusDestinationLocationCode={setFlightStatusDestinationLocationCodeSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onInputSelected={inputSelectedSpy}
      expanded
      activeTab="activeTab"
      airportData={airportDataArray}
      onSelectCarPickupLocation={selectCarPickupSpy}
      setAriaLiveMessage={setAriaLiveMessageSpy}
      onSelectFlightCheckinLoad={selectFlightCheckinSpy}
      onSelectMyTripsLoad={selectMyTripsSpy}
    />
  );
  const renderedComponentNotExpanded = shallow(
    <BookTravel
      onCollapseInputSelected={onCollapseInputSpy}
      onFocusModel={focusModelSpy}
      onSelectFlightOriginLocation={selectFlightOriginSpy}
      onSelectFlightDestinationLocation={selectFlightDestinationSpy}
      setTab={onSetTabSpy}
      hideAutocompleteLocationDropdown={hideAutoSpy}
      onChangeModel={changeModelSpy}
      setOriginLocationCode={setOriginLocationCodeSpy}
      setDestinationLocationCode={setDestinationLocationCodeSpy}
      setFlightStatusOriginLocationCode={setFlightStatusOriginLocationCodeSpy}
      setFlightStatusDestinationLocationCode={setFlightStatusDestinationLocationCodeSpy}
      onSelectFlightStatusOriginLocation={onSelectFlightStatusOriginLocationSpy}
      onSelectFlightStatusDestinationLocation={onSelectFlightStatusDestinationLocationSpy}
      onInputSelected={inputSelectedSpy}
      activeTab="activeTab"
      airportData={airportDataArray}
      onSelectCarPickupLocation={selectCarPickupSpy}
      setAriaLiveMessage={setAriaLiveMessageSpy}
      onSelectFlightCheckinLoad={selectFlightCheckinSpy}
      onSelectMyTripsLoad={selectMyTripsSpy}
    />
  );
  const wrapper = renderedComponent.instance();
  beforeEach(() => {
    onCollapseInputSpy.reset();
    preventDefaultSpy.reset();
    selectFlightOriginSpy.reset();
    selectFlightDestinationSpy.reset();
    onSetTabSpy.reset();
    hideAutoSpy.reset();
    changeModelSpy.reset();
    setOriginLocationCodeSpy.reset();
    setDestinationLocationCodeSpy.reset();
    setFlightStatusOriginLocationCodeSpy.reset();
    setFlightStatusDestinationLocationCodeSpy.reset();
    onSelectFlightStatusOriginLocationSpy.reset();
    onSelectFlightStatusDestinationLocationSpy.reset();
    inputSelectedSpy.reset();
    selectCarPickupSpy.reset();
    setAriaLiveMessageSpy.reset();
    selectFlightCheckinSpy.reset();
    selectMyTripsSpy.reset();
  });
  it('render BookTravel Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  it('render component prop expanded', () => {
    expect(wrapper.props.expanded).toEqual(true);
  });
  it('should load handle input select', () => {
    wrapper.props.onInputSelected();
    expect(inputSelectedSpy.called).toEqual(true);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(6);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(4);
  });
  describe('should handle onArrowKeyDown()', () => {
    it('should handle keycode 38 for pickupLocation', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'bookCarModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'pickupLocation', 'bookCarModel.pickupLocation', 'ORD', 1, 'bookCarModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for pickupLocation', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'bookCarModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'pickupLocation', 'bookCarModel.pickupLocation', 'ORD', 1, 'bookCarModel');
      expect(preventDefaultSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for pickupLocation', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'bookCarModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'pickupLocation', 'bookCarModel.pickupLocation', 'ORD', 1, 'bookCarModel');
      expect(hideAutoSpy.called).toEqual(true);
    });
    it('should handle keycode 38 for bookHotel', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'bookHotelModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookHotel', 'bookHotelModel.hotelAutoLocation', 'ORD', 1, 'bookHotelModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for bookHotel', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'bookHotelModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookHotel', 'bookHotelModel.hotelAutoLocation', 'ORD', 1, 'bookHotelModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for bookHotel', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'bookHotelModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookHotel', 'bookHotelModel.hotelAutoLocation', 'ORD', 1, 'bookHotelModel');
      expect(hideAutoSpy.called).toEqual(true);
      expect(changeModelSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for bookFlightOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightOrigin', 'bookFlightModel.Origin', 'ORD', 1, 'bookFlightModel');
      expect(selectFlightOriginSpy.called).toEqual(true);
      expect(hideAutoSpy.called).toEqual(true);
      expect(changeModelSpy.called).toEqual(true);
      expect(setOriginLocationCodeSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for bookFlightOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightOrigin', 'bookFlightModel.Origin', 'ORD', 1, 'bookFlightModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 38 for bookFlightOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightOrigin', 'bookFlightModel.Origin', 'ORD', 1, 'bookFlightModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for bookFlightDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightDestination', 'bookFlightModel.Destination', 'ORD', 1, 'bookFlightModel');
      expect(selectFlightDestinationSpy.called).toEqual(true);
      expect(hideAutoSpy.called).toEqual(true);
      expect(changeModelSpy.called).toEqual(true);
      expect(setDestinationLocationCodeSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for bookFlightDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightDestination', 'bookFlightModel.Destination', 'ORD', 1, 'bookFlightModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 38 for bookFlightDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'bookFlightModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'bookFlightDestination', 'bookFlightModel.Destination', 'ORD', 1, 'bookFlightModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for flightStatusOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusOrigin', 'flightStatusModel.StatusOrigin', 'ORD', 1, 'flightStatusModel');
      expect(onSelectFlightStatusOriginLocationSpy.called).toEqual(true);
      expect(hideAutoSpy.called).toEqual(true);
      expect(changeModelSpy.called).toEqual(true);
      expect(setFlightStatusOriginLocationCodeSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for flightStatusOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusOrigin', 'flightStatusModel.StatusOrigin', 'ORD', 1, 'flightStatusModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 38 for flightStatusOriginInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusOrigin', 'flightStatusModel.StatusOrigin', 'ORD', 1, 'flightStatusModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 13 for flightStatusDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 13, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusDestination', 'flightStatusModel.StatusDestination', 'ORD', 1, 'flightStatusModel');
      expect(onSelectFlightStatusDestinationLocationSpy.called).toEqual(true);
      expect(hideAutoSpy.called).toEqual(true);
      expect(changeModelSpy.called).toEqual(true);
      expect(setFlightStatusDestinationLocationCodeSpy.called).toEqual(true);
    });
    it('should handle keycode 40 for flightStatusDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 40, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusDestination', 'flightStatusModel.StatusDestination', 'ORD', 1, 'flightStatusModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
    it('should handle keycode 38 for flightStatusDestinationInput', () => {
      renderedComponent.instance().onArrowKeyDown({ keyCode: 38, target: { name: 'flightStatusModel.0' }, preventDefault: preventDefaultSpy }, 'Chicago', 'flightStatusDestination', 'flightStatusModel.StatusDestination', 'ORD', 1, 'flightStatusModel');
      expect(preventDefaultSpy.called).toEqual(true);
      expect(focusModelSpy.called).toEqual(true);
    });
  });
  it('should handle onItemSelected() for hotel', () => {
    const itemSelected = renderedComponent.instance().onItemSelected('London', 'bookHotelInput', 'bookHotel', 'LON');
    expect(focusModelSpy.called).toEqual(true);
    expect(itemSelected).toEqual('London');
  });
  it('should handle onItemSelected() for car origin', () => {
    const itemSelected = renderedComponent.instance().onItemSelected('London', 'bookCarOrigin', 'bookCarOrigin', 'LON');
    expect(focusModelSpy.called).toEqual(true);
    expect(itemSelected).toEqual('London');
  });
  it('should handle onItemSelected() for car dropoff', () => {
    const itemSelected = renderedComponent.instance().onItemSelected('London', 'bookCarDropoff', 'bookCarDropoff', 'LON');
    expect(focusModelSpy.called).toEqual(true);
    expect(itemSelected).toEqual('London');
  });
  it('should handle onItemSelected() for flight origin', () => {
    const itemSelected = renderedComponent.instance().onItemSelected('London', 'bookFlightOrigin', 'bookFlightOrigin', 'LON');
    expect(selectFlightOriginSpy.called).toEqual(true);
    expect(setOriginLocationCodeSpy.called).toEqual(true);
    expect(itemSelected).toEqual('London');
  });
  it('should handle onItemSelected() for flight destination', () => {
    const itemSelected = renderedComponent.instance().onItemSelected('London', 'bookFlightDestination', 'bookFlightDestination', 'LON');
    expect(selectFlightDestinationSpy.called).toEqual(true);
    expect(setDestinationLocationCodeSpy.called).toEqual(true);
    expect(itemSelected).toEqual('London');
  });
  it('should handle onItemSelected() for status origin', () => {
    renderedComponent.instance().onItemSelected('London', 'flightStatusOrigin', 'flightStatusModel.StatusOrigin', 'LON');
    expect(onSelectFlightStatusOriginLocationSpy.called).toEqual(true);
    expect(changeModelSpy.called).toEqual(true);
    expect(hideAutoSpy.called).toEqual(true);
    expect(setFlightStatusOriginLocationCodeSpy.called).toEqual(true);
  });
  it('should handle onItemSelected() for status destination', () => {
    renderedComponent.instance().onItemSelected('London', 'flightStatusDestination', 'flightStatusModel.StatusDestination', 'LON');
    expect(onSelectFlightStatusDestinationLocationSpy.called).toEqual(true);
    expect(changeModelSpy.called).toEqual(true);
    expect(hideAutoSpy.called).toEqual(true);
    expect(setFlightStatusDestinationLocationCodeSpy.called).toEqual(true);
  });
  it('should handle onCloseButton()', () => {
    renderedComponent.instance().onCloseButton();
    expect(onCollapseInputSpy.called).toEqual(true);
  });
  it('should handle setTab() for travelTab', () => {
    renderedComponent.instance().setTab('travelTab');
    expect(inputSelectedSpy.called).toEqual(true);
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should handle setTab() if expanded and not travelTab', () => {
    renderedComponent.instance().setTab('foo');
    expect(onCollapseInputSpy.called).toEqual(true);
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should handle collapseTab() if param equals tab prop', () => {
    renderedComponent.instance().collapseTab('activeTab');
    expect(onCollapseInputSpy.called).toEqual(true);
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should handle collapseTab() if param does not equal tab prop', () => {
    renderedComponent.instance().collapseTab('foo');
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should handle getFlightRequestResponse()', () => {
    const expected = [
      {
        firstLine: 'London, England',
        displayName: 'London LON',
        id: '0',
        ariaLocationTxt: 'London, England',
        locationCode: 'LON',
      },
    ];
    expect(renderedComponent.instance().getFlightRequestResponse()).toEqual(expected);
  });
  it('should handle book tab click', () => {
    renderedComponentNotExpanded.find('#travelTab').simulate('click');
    expect(inputSelectedSpy.called).toEqual(true);
  });
  it('should handle flight status tab click', () => {
    renderedComponent.find('#statusTab').simulate('click');
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should handle checkin tab click', () => {
    renderedComponent.find('#checkInTab').simulate('click');
    expect(onSetTabSpy.called).toEqual(true);
    expect(selectFlightCheckinSpy.called).toEqual(true);
  });
  it('should handle trips tab click', () => {
    renderedComponent.find('#tripsTab').simulate('click');
    expect(onSetTabSpy.called).toEqual(true);
    expect(selectMyTripsSpy.called).toEqual(true);
  });
});
