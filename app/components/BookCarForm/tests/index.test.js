import React from 'react';
import { spy } from 'sinon';
import Immutable from 'immutable';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';
import BookCarForm from '../index';

describe('<BookCarForm />', () => {
  const bookCarSpy = spy();
  const setDropdownSpy = spy();
  const departDateSpy = spy();
  const returnDateSpy = spy();
  const selectPickupTimeSpy = spy();
  const selectDropoffTimeSpy = spy();
  const selectDriverAgeBoxSpy = spy();
  const onChangeSpy = spy();
  const itemSelectedSpy = spy();
  const checkLocationDropoffSpy = spy();
  const mobileView = Immutable.Map({
    bookCarOrigin: 'relative',
    bookHotel: 'relative',
    bookFlightOrigin: 'relative',
    bookFlightDestination: 'relative',
  });
  const hideAutoLocation = Immutable.Map({
    bookCarOrigin: 'visible',
    bookHotel: 'hidden',
    bookFlightOrigin: 'hidden',
    bookFlightDestination: 'hidden',
  });
  let carArray = [
    {
      country: 'United Kingdom',
      city: 'London',
      name: 'Heathrow Airport',
      region: 'Greater London',
      placeType: 'A',
      iata: 'LHR',
      countryIso: 'gb',
    },
  ];
  const bookCarModel = Immutable.Map({
    driversAge: '18',
    dropoffDate: 'March 21',
    dropoffLocation: 'London',
    dropoffTime: '10|0',
    hideAgeBox: true,
    pickupLocation: 'London',
    pickupDate: 'March 30',
    pickupTime: '10|0',
    showDropOffLocation: true,
  });
  const renderedComponent = shallowWithIntl(
    <BookCarForm
      onClick={bookCarSpy}
      hideAutocompleteLocationDropdown={bookCarSpy}
      onSelectBookCarLocation={bookCarSpy}
      updateMobileView={bookCarSpy}
      hideAutocompleteLocation={hideAutoLocation}
      bookCarLocation="foo"
      mobileView={mobileView}
      activeTab="bookCarTab"
      carData={carArray}
      setDepart={departDateSpy}
      setReturn={returnDateSpy}
      onSelectPickupTime={selectPickupTimeSpy}
      onSelectDropoffTime={selectDropoffTimeSpy}
      onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
      onChangeModel={onChangeSpy}
      onItemSelected={itemSelectedSpy}
      onSelectDropOffLocationChecked={checkLocationDropoffSpy}
      carModel={bookCarModel}
    />
  ).dive();
  beforeEach(() => {
    bookCarSpy.reset();
    setDropdownSpy.reset();
    departDateSpy.reset();
    returnDateSpy.reset();
    selectPickupTimeSpy.reset();
    selectDropoffTimeSpy.reset();
    selectDriverAgeBoxSpy.reset();
    onChangeSpy.reset();
    itemSelectedSpy.reset();
    checkLocationDropoffSpy.reset();
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(20);
  });
  it('should render labels', () => {
    expect(renderedComponent.find('label').length).toEqual(5);
  });
  it('should handle onChange for Select pick-up time dropdown', () => {
    renderedComponent.find('#pickupTime').simulate('change', { value: 'foo' });
    expect(selectPickupTimeSpy.called).toEqual(true);
  });
  it('should handle onChange for Select drop-off time dropdown', () => {
    renderedComponent.find('#dropoffTime').simulate('change', { value: 'foo' });
    expect(selectDropoffTimeSpy.called).toEqual(true);
  });
  it('should handle onChange hide age checkbox', () => {
    renderedComponent.find('#hideAgeBox').simulate('change', { target: { value: 'foo' } });
    expect(selectDriverAgeBoxSpy.called).toEqual(true);
    expect(onChangeSpy.called).toEqual(true);
  });
  it('should handle onLocationSelected() for pickupLocation', () => {
    renderedComponent.instance().onLocationSelected('Heathrow Airport', 'pickupLocation', 'foo', 'bar');
    expect(itemSelectedSpy.called).toEqual(true);
    expect(onChangeSpy.called).toEqual(true);
  });
  it('should handle onLocationSelected() for dropoffLocation', () => {
    renderedComponent.instance().onLocationSelected('Heathrow Airport', 'dropoffLocation', 'foo', 'bar');
    expect(itemSelectedSpy.called).toEqual(true);
    expect(onChangeSpy.called).toEqual(true);
  });
  it('should handle onLocationSelected() for neither dropoffLocation nor pickupLocation', () => {
    // location, locationType, fullModelName, locationCode
    renderedComponent.instance().onLocationSelected('Heathrow Airport', 'foobar', 'foo', 'bar');
    expect(itemSelectedSpy.called).toEqual(true);
    expect(onChangeSpy.called).toEqual(false);
  });
  it('should handle onSameLocationCheckboxCheck()', () => {
    renderedComponent.instance().onSameLocationCheckboxCheck({ target: { value: 'false' } });
    expect(checkLocationDropoffSpy.called).toEqual(true);
    expect(onChangeSpy.called).toEqual(true);
  });
  it('should handle onSetComponentValues() for sameLocationChecked', () => {
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        sameLocationChecked
        globalCarSameLocationChecked={false}
        hideAgeBox
        globalCarHideAgeBox={false}
        carModel={bookCarModel}
      />
    ).dive();
    rendered.instance().onSetComponentValues(true);
    expect(onChangeSpy.called).toEqual(true);
  });
  it('should handle getCarArray() for placeType A with a region', () => {
    const expected = [{
      firstLine: 'Heathrow Airport, GB (LHR)',
      secondLine: 'Greater London, United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport, GB (LHR) Greater London, United Kingdom',
    }];
    expect(renderedComponent.instance().getCarArray()).toEqual(expected);
  });
  it('should handle getCarArray() for placeType A without a region', () => {
    carArray = [
      {
        country: 'United Kingdom',
        city: 'London',
        name: 'Heathrow Airport',
        placeType: 'A',
        iata: 'LHR',
        countryIso: 'gb',
      },
    ];
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    const expected = [{
      firstLine: 'Heathrow Airport, GB (LHR)',
      secondLine: 'United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport, GB (LHR) United Kingdom',
    }];
    expect(rendered.instance().getCarArray()).toEqual(expected);
  });
  it('should handle getCarArray() for placeType C with a city and region', () => {
    carArray = [
      {
        country: 'United Kingdom',
        city: 'London',
        name: 'Heathrow Airport',
        placeType: 'C',
        countryIso: 'gb',
        region: 'Greater London',
      },
    ];
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    const expected = [{
      firstLine: 'Heathrow Airport',
      secondLine: 'Greater London, United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport Greater London, United Kingdom',
    }];
    expect(rendered.instance().getCarArray()).toEqual(expected);
  });
  it('should handle getCarArray() for placeType C with a city and NO region', () => {
    carArray = [
      {
        country: 'United Kingdom',
        city: 'London',
        name: 'Heathrow Airport',
        placeType: 'C',
        iata: 'LHR',
        countryIso: 'gb',
      },
    ];
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    const expected = [{
      firstLine: 'Heathrow Airport',
      secondLine: 'United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport United Kingdom',
    }];
    expect(rendered.instance().getCarArray()).toEqual(expected);
  });
  it('should handle getCarArray() for placeType D without a city but with a country and region', () => {
    carArray = [
      {
        country: 'United Kingdom',
        name: 'Heathrow Airport',
        placeType: 'D',
        iata: 'LHR',
        countryIso: 'gb',
        region: 'Greater London',
      },
    ];
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    const expected = [{
      firstLine: 'Heathrow Airport',
      secondLine: 'Greater London, United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport Greater London, United Kingdom',
    }];
    expect(rendered.instance().getCarArray()).toEqual(expected);
  });
  it('should handle getCarArray() for placeType C without a city or region but with a country', () => {
    carArray = [
      {
        country: 'United Kingdom',
        name: 'Heathrow Airport',
        placeType: 'C',
        iata: 'LHR',
        countryIso: 'gb',
      },
    ];
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookCarTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    const expected = [{
      firstLine: 'Heathrow Airport',
      secondLine: 'United Kingdom',
      id: '0',
      ariaLocationTxt: 'Heathrow Airport United Kingdom',
    }];
    expect(rendered.instance().getCarArray()).toEqual(expected);
  });
  // it('should pass correct mobilePaddingLeft prop if mobileView is fixed', () => {
  //   const mobView = Immutable.Map({
  //     bookCarOrigin: 'relative',
  //     bookHotel: 'relative',
  //     bookFlightOrigin: 'relative',
  //     bookFlightDestination: 'relative',
  //     pickupLocation: 'fixed',
  //     dropoffLocation: 'fixed',
  //   });
  //   const rendered = shallow(
  //     <BookCarForm
  //       onClick={bookCarSpy}
  //       hideAutocompleteLocationDropdown={bookCarSpy}
  //       onSelectBookCarLocation={bookCarSpy}
  //       updateMobileView={bookCarSpy}
  //       hideAutocompleteLocation={hideAutoLocation}
  //       bookCarLocation="foo"
  //       mobileView={mobView}
  //       activeTab="bookCarTab"
  //       carData={carArray}
  //       setDepart={departDateSpy}
  //       setReturn={returnDateSpy}
  //       onSelectPickupTime={selectPickupTimeSpy}
  //       onSelectDropoffTime={selectDropoffTimeSpy}
  //       onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
  //       onChangeModel={onChangeSpy}
  //       onItemSelected={itemSelectedSpy}
  //       onSelectDropOffLocationChecked={checkLocationDropoffSpy}
  //       carModel={bookCarModel}
  //     />
  //   );
  // });
  it('should not rendere AutocompleteDropdown if active tab is not bookCarTab', () => {
    const rendered = shallowWithIntl(
      <BookCarForm
        onClick={bookCarSpy}
        hideAutocompleteLocationDropdown={bookCarSpy}
        onSelectBookCarLocation={bookCarSpy}
        updateMobileView={bookCarSpy}
        hideAutocompleteLocation={hideAutoLocation}
        bookCarLocation="foo"
        mobileView={mobileView}
        activeTab="bookHotelTab"
        carData={carArray}
        setDepart={departDateSpy}
        setReturn={returnDateSpy}
        onSelectPickupTime={selectPickupTimeSpy}
        onSelectDropoffTime={selectDropoffTimeSpy}
        onSelectDriversAgeBoxChecked={selectDriverAgeBoxSpy}
        onChangeModel={onChangeSpy}
        onItemSelected={itemSelectedSpy}
        onSelectDropOffLocationChecked={checkLocationDropoffSpy}
        carModel={bookCarModel}
      />
    ).dive();
    expect(rendered.find('AutocompleteLocationContainer').length).toEqual(0);
  });
});
