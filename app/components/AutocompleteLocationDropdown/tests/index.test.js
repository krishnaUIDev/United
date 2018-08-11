import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Immutable from 'immutable';
import { UP_ARROW_KEY, DOWN_ARROW_KEY } from 'containers/App/constants';
import AutocompleteLocationDropdown from '../index';

describe('<AutocompleteLocationDropdown />', () => {
  const arrowDownSpy = spy();
  const inputSpy = spy();
  const hideDropdownSpy = spy();
  const selectBookHotelSpy = spy();
  const mobileViewSpy = spy();
  const itemSelectedSpy = spy();
  const loadAirportSpy = jest.fn((value) => value);
  const setAriaSpy = spy();
  const dropdownListSpy = spy();
  const focusModelSpy = spy();
  const preventDefaultSpy = spy();
  const resetLocationCodeSpy = spy();
  const resetDisplayTextSpy = spy();
  const getRequestDataSpy = spy();
  const hideAutoLocation = Immutable.Map({
    bookCarOrigin: 'hidden',
    bookCarDropoff: 'hidden',
    bookHotel: 'visible',
    bookFlightOrigin: 'hidden',
    bookFlightDestination: 'hidden',
  });
  const mobileView = Immutable.Map({
    bookCarOrigin: 'relative',
    bookCarDropoff: 'relative',
    bookHotel: 'relative',
    bookFlightOrigin: 'relative',
    bookFlightDestination: 'relative',
  });
  const airportsList = ['YYZ', 'YKK', 'HFX', 'TOR', 'FRA'];
  let renderedComponent = shallow(
    <AutocompleteLocationDropdown
      hideAutocompleteLocation={hideAutoLocation}
      onArrowKeyDown={arrowDownSpy}
      hideAutocompleteLocationDropdown={hideDropdownSpy}
      onSelectInputItem={selectBookHotelSpy}
      updateMobileView={mobileViewSpy}
      mobileView={mobileView}
      onLoadAirports={loadAirportSpy}
      inputFieldValue={'foo'}
      inputFieldAriaLabel={'ariaLabel'}
      closePanelAriaLabel={'ariaLabel'}
      inputId="bookHotelInput"
      locationType="bookHotel"
      mobilePaddingLeft="8px"
      modelName="foo"
      inputType="text"
      inputFieldPlaceholder="placeholder"
      isRequired="true"
      isAriaRequired="true"
      onSetAutolocationAriaLabel={setAriaSpy}
      dropdownListFocus={dropdownListSpy}
      dataToPopulate={[{ foo: 'bar' }]}
      onFocusModel={focusModelSpy}
      locationCode="LAX"
      resetLocationCode={resetLocationCodeSpy}
      resetDisplayText={resetDisplayTextSpy}
      getRequestData={getRequestDataSpy}
      useImageIcons="true"
      listItemId="fooItem"
    />
  );
  const wrapper = renderedComponent.instance();
  beforeEach(() => {
    arrowDownSpy.reset();
    inputSpy.reset();
    hideDropdownSpy.reset();
    selectBookHotelSpy.reset();
    mobileViewSpy.reset();
    itemSelectedSpy.reset();
    // loadAirportSpy.reset();
    setAriaSpy.reset();
    dropdownListSpy.reset();
    focusModelSpy.reset();
    preventDefaultSpy.reset();
    resetLocationCodeSpy.reset();
    resetDisplayTextSpy.reset();
    getRequestDataSpy.reset();
  });
  it('render AutocompleteLocationDropdown Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  it('render component prop locationCode', () => {
    expect(wrapper.props.locationCode).toEqual('LAX');
  });
  it('should load Airport', () => {
    wrapper.props.onLoadAirports(airportsList);
    expect(loadAirportSpy).toBeCalledWith(airportsList);
  });

  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(6);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('#bookHotelInput').length).toEqual(1);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should handle input keydown', () => {
    const input = renderedComponent.find('#bookHotelInput');
    input.simulate('keydown');
    expect(arrowDownSpy.called).toEqual(true);
  });
  it('should handle onPickupLocationChange()', () => {
    expect(renderedComponent.instance().onPickupLocationChange({ target: { value: 'ch' } })).toEqual(false);
  });
  it('should render getDropdownItem()', () => {
    const dataArray = [{
      firstLine: 'Limburg',
      secondLine: 'Germany',
      id: '3',
    }];
    const item = renderedComponent.instance().getDropdownItem(dataArray)[0].props;
    expect(item.firstLineText).toEqual('Limburg');
    expect(item.topLineId).toEqual('topLine3');
    expect(item.locationType).toEqual('bookHotel');
    expect(item.bottomLineId).toEqual('bottomLine3');
    expect(item.bottomLineText).toEqual('Germany');
  });
  it('should handle Control.text onFocus', () => {
    const component = renderedComponent.find('#bookHotelInput');
    component.simulate('focus', { target: { value: 'foo' } });
    expect(inputSpy.called).toEqual(false);
  });
  it('should handle close panel button click', () => {
    const btn = renderedComponent.find('#locationListCloseBtn');
    btn.simulate('click');
    setTimeout(() => {
      expect(hideDropdownSpy.called).toEqual(true);
    }, 1);
  });
  it('should handle close panel button blur', () => {
    const btn = renderedComponent.find('#locationListCloseBtn');
    btn.simulate('focus');
    btn.simulate('blur');
    setTimeout(() => {
      expect(hideDropdownSpy.called).toEqual(true);
    }, 1);
  });
  it('should handle close panel button down arrow key down', () => {
    const btn = renderedComponent.find('#locationListCloseBtn');
    btn.simulate('keydown', { preventDefault: preventDefaultSpy, keyCode: DOWN_ARROW_KEY, target: { id: 'locationListCloseBtn' } });
    expect(preventDefaultSpy.called).toEqual(true);
    expect(focusModelSpy.called).toEqual(true);
  });
  it('should handle close panel button down arrow key up', () => {
    const btn = renderedComponent.find('#locationListCloseBtn');
    btn.simulate('keydown', { preventDefault: preventDefaultSpy, keyCode: UP_ARROW_KEY, target: { id: 'locationListCloseBtn' } });
    expect(preventDefaultSpy.called).toEqual(true);
    expect(focusModelSpy.called).toEqual(true);
  });
  it('should handle getAriaLabel()', () => {
    renderedComponent.instance().getAriaLabel();
    expect(setAriaSpy.called).toEqual(true);
  });
  it('should return true for onCheckAcceptedActiveElements() with the param listItem', () => {
    expect(renderedComponent.instance().onCheckAcceptedActiveElements('listItem'));
  });
  it('should return false for onCheckAcceptedActiveElements() with the param foo', () => {
    expect(renderedComponent.instance().onCheckAcceptedActiveElements('foo'));
  });
  it('should handle close button blur', () => {
    renderedComponent.find('#locationListCloseBtn').simulate('blur');
    setTimeout(() => {
      expect(hideDropdownSpy.called).toEqual(true);
    }, 1);
  });
  it('should handle input field blur', () => {
    renderedComponent.find('#bookHotelInput').simulate('blur');
  });
  it('should handle input field onChange', () => {
    renderedComponent.find('#bookHotelInput').simulate('change', { target: { value: 'foo' } });
    expect(resetLocationCodeSpy.called).toEqual(true);
    expect(resetDisplayTextSpy.called).toEqual(true);
    expect(getRequestDataSpy.called).toEqual(true);
  });
  it('should handle getAriaLabel() with inputValue length less than 3', () => {
    renderedComponent.instance().getAriaLabel('lo');
    expect(setAriaSpy.called).toEqual(true);
  });
  it('should handle getAriaLabel() with inputValue length equal to 3 and visible dropdown', () => {
    renderedComponent.instance().getAriaLabel('lon');
    expect(setAriaSpy.called).toEqual(true);
  });
  it('should handle getAriaLabel() with inputValue length greater than 2 with dropdown hidden', () => {
    renderedComponent = shallow(
      <AutocompleteLocationDropdown
        hideAutocompleteLocation={hideAutoLocation}
        onArrowKeyDown={arrowDownSpy}
        hideAutocompleteLocationDropdown={hideDropdownSpy}
        onSelectInputItem={selectBookHotelSpy}
        updateMobileView={mobileViewSpy}
        mobileView={mobileView}
        onLoadAirports={loadAirportSpy}
        inputFieldValue={'foo'}
        inputFieldAriaLabel={'ariaLabel'}
        closePanelAriaLabel={'ariaLabel'}
        inputId="bookHotelInput"
        locationType="bookHotel"
        mobilePaddingLeft="8px"
        modelName="foo"
        inputType="text"
        inputFieldPlaceholder="placeholder"
        isRequired="true"
        isAriaRequired="true"
        onSetAutolocationAriaLabel={setAriaSpy}
        dropdownListFocus={dropdownListSpy}
        dataToPopulate={[{ foo: 'bar' }]}
        onFocusModel={focusModelSpy}
        locationCode="LAX"
        resetLocationCode={resetLocationCodeSpy}
        resetDisplayText={resetDisplayTextSpy}
        getRequestData={getRequestDataSpy}
      />
    );
    renderedComponent.instance().getAriaLabel('london');
    expect(setAriaSpy.called).toEqual(true);
  });
});
