import { spy } from 'sinon';
import 'react-dates/initialize';

import {
  onRoomsSelected,
} from 'containers/HomePage/actions';

import { mapDispatchToProps } from '../index';
import {
  displayHotelMenu,
  updateHotelInfo,
  disableHotelButtons,
  updateFullHotel,
} from '../actions';

describe('BookHotelFormContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call displayHotelMenu action', () => {
      const dispatchSpy = spy();
      const { onPassengerInputClick } = mapDispatchToProps(dispatchSpy);
      onPassengerInputClick(true);
      const expectedAction = displayHotelMenu(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toOpen).toEqual(expectedAction.toOpen);
    });
  });
  it('should call updateHotelInfo action', () => {
    const dispatchSpy = spy();
    const { onChangePassenger } = mapDispatchToProps(dispatchSpy);
    onChangePassenger('Adults', '3');
    const expectedAction = updateHotelInfo('Adults', '3');
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.hotelSection).toEqual(expectedAction.hotelSection);
    expect(spyLastCall.hotelCount).toEqual(expectedAction.hotelCount);
  });
  it('should call disableHotelButtons action', () => {
    const dispatchSpy = spy();
    const { onDisableTravelerButtons } = mapDispatchToProps(dispatchSpy);
    onDisableTravelerButtons('plusBtn', true);
    const expectedAction = disableHotelButtons('plusBtn', true);
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.btnType).toEqual(expectedAction.btnType);
    expect(spyLastCall.toDisable).toEqual(expectedAction.toDisable);
  });
  it('should call onRoomsSelected action', () => {
    const dispatchSpy = spy();
    const { onSelectRooms } = mapDispatchToProps(dispatchSpy);
    onSelectRooms('foo');
    const expectedAction = onRoomsSelected('foo');
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.roomsSelected).toEqual(expectedAction.roomsSelected);
  });
  it('should call updateFullHotel action', () => {
    const dispatchSpy = spy();
    const { updateFullPassengers } = mapDispatchToProps(dispatchSpy);
    updateFullPassengers('foo', 2);
    const expectedAction = updateFullHotel('foo', 2);
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.type).toEqual(expectedAction.type);
    expect(spyLastCall.hotelSection).toEqual(expectedAction.hotelSection);
    expect(spyLastCall.hotelCount).toEqual(expectedAction.hotelCount);
  });
});
