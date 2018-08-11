import React from 'react';
import { spy } from 'sinon';
import Immutable from 'immutable';
import 'react-dates/initialize';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';
import BookHotelForm from '..';

describe('<BookHotelForm />', () => {
  const setDepartSpy = spy();
  const setReturnSpy = spy();
  const updateMobileViewSpy = spy();
  const bookPassengerSpy = spy();
  const bookWithMilesSpy = spy();
  const onChangeModelSpy = spy();
  const setRoomsLabelSpy = spy();
  const onSelectRoomsSpy = spy();
  const mobileView = Immutable.Map({
    bookCarOrigin: 'relative',
    bookCarDropoff: 'relative',
    bookHotel: 'relative',
    bookFlightOrigin: 'relative',
    bookFlightDestination: 'relative',
  });
  const hideAutoLocation = Immutable.Map({
    bookCarOrigin: 'visible',
    bookCarDropoff: 'visible',
    bookHotel: 'hidden',
    bookFlightOrigin: 'hidden',
    bookFlightDestination: 'hidden',
  });
  const hotelArray = [
    {
      group: 'CITY_GROUP',
      entities: [{
        caption: '<span class=\'highlighted\'>New</span>castle-upon-Tyne, United Kingdom',
        type: 'CITY',
      }],
    },
  ];
  const renderedComponent = shallowWithIntl(
    <BookHotelForm
      setDepartDate={setDepartSpy}
      setReturnDate={setReturnSpy}
      hideAutocompleteLocation={hideAutoLocation}
      onPassengerInputClick={bookPassengerSpy}
      updateMobileView={updateMobileViewSpy}
      selectAwardTravel={bookWithMilesSpy}
      onChangeModel={onChangeModelSpy}
      setRoomsLabel={setRoomsLabelSpy}
      onSelectRooms={onSelectRoomsSpy}
      passengersToBook={Immutable.Map({
        Adults: 1,
        Children: 0,
      })}
      mobileView={mobileView}
      activeTab="bookHotelTab"
      hotelData={hotelArray}
    />
  ).dive();
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(11);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render labels', () => {
    expect(renderedComponent.find('label').length).toEqual(3);
  });
  it('should render Select', () => {
    expect(renderedComponent.find('Select').length).toEqual(1);
  });
  it('should handle getHotelArray()', () => {
    const expectedBody = [
      {
        firstLine: "<b><span class='highlighted'>New</span></b>castle-upon-Tyne, United Kingdom",
        id: '0',
        ariaLocationTxt: 'Newcastle-upon-Tyne, United Kingdom',
        imgSrc: 'IMAGE_MOCK',
        imgStyle: 'undefined',
        locationTxt: 'Newcastle-upon-Tyne, United Kingdom',
      }];
    expect(renderedComponent.instance().getHotelArray()).toEqual(expectedBody);
  });
  it('should return correct values for getImageStyles()', () => {
    let getStyle = renderedComponent.instance().getImageStyles('CITY_GROUP');
    const expected = { imgSrc: 'IMAGE_MOCK', imgStyle: 'undefined' };
    expect(getStyle).toEqual(expected);
    getStyle = renderedComponent.instance().getImageStyles('LANDMARK_GROUP');
    expect(getStyle).toEqual(expected);
    getStyle = renderedComponent.instance().getImageStyles('TRANSPORT_GROUP');
    expect(getStyle).toEqual(expected);
    getStyle = renderedComponent.instance().getImageStyles('HOTEL_GROUP');
    expect(getStyle).toEqual(expected);
  });
  it('should return default for getImageStyles()', () => {
    const getStyle = renderedComponent.instance().getImageStyles('foo');
    const expected = { imgSrc: 'undefined', imgStyle: 'undefined' };
    expect(getStyle).toEqual(expected);
  });
  it('should handle onInputKeyDown() with keycode 13', () => {
    renderedComponent.instance().onInputKeyDown({ keyCode: 13 });
    expect(bookPassengerSpy.calledOnce).toEqual(true);
  });
  it('should handle onInputKeyDown() with keycode 9', () => {
    renderedComponent.instance().onInputKeyDown({ keyCode: 9 });
    expect(bookPassengerSpy.calledTwice).toEqual(true);
  });
  describe('should handle updateRoomsNumber()', () => {
    it('should handle newValue.value=1 ', () => {
      renderedComponent.instance().updateRoomsNumber({ value: 1 });
      expect(onChangeModelSpy.calledOnce).toEqual(true);
      expect(setRoomsLabelSpy.calledOnce).toEqual(true);
      expect(onSelectRoomsSpy.calledOnce).toEqual(true);
    });
  });
});
