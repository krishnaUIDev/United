import { spy } from 'sinon';
import { displayPassengersMenu } from 'containers/BookFlightContainer/actions';
import { awardTravelSelected, onCabinClassSelected, onFirstClassSelected, setCabinClassLabel } from 'containers/HomePage/actions';
import 'react-dates/initialize';
import { mapDispatchToProps } from '../index';

describe('BookFlightFormContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call updatePassengerInfo action', () => {
      const dispatchSpy = spy();
      const { selectAwardTravel } = mapDispatchToProps(dispatchSpy);
      selectAwardTravel(true);
      const expectedAction = awardTravelSelected(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isChecked).toEqual(expectedAction.isChecked);
    });
    it('should call onFirstClassSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectFirstClass } = mapDispatchToProps(dispatchSpy);
      onSelectFirstClass(true);
      const expectedAction = onFirstClassSelected(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isSelected).toEqual(expectedAction.isSelected);
    });
    it('should call onCabinClassSelected action', () => {
      const dispatchSpy = spy();
      const { onSelectCabinClass } = mapDispatchToProps(dispatchSpy);
      onSelectCabinClass('foo');
      const expectedAction = onCabinClassSelected('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.cabinSelected).toEqual(expectedAction.cabinSelected);
    });
    it('should call setCabinClassLabel action', () => {
      const dispatchSpy = spy();
      const { setCabinLabel } = mapDispatchToProps(dispatchSpy);
      setCabinLabel('foo');
      const expectedAction = setCabinClassLabel('foo');
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.cabinSelectedLabel).toEqual(expectedAction.cabinSelectedLabel);
    });
    it('should call displayPassengersMenu action', () => {
      const dispatchSpy = spy();
      const { onPassengerInputClick } = mapDispatchToProps(dispatchSpy);
      onPassengerInputClick(true);
      const expectedAction = displayPassengersMenu(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.toOpen).toEqual(expectedAction.toOpen);
    });
  });
});
