import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import BookPassengers from '../index';

describe('<BookPassengers />', () => {
  const onClick = spy();
  const onSetFieldSpy = spy();
  const changeSpy = spy();
  const renderedComponent = shallow(
    <BookPassengers
      arrayA={['Seniors (65+)', 'Infants (under 2)', 'Infants on lap']}
      arrayB={['Children (15-17)', 'Children (12-14)', 'Children (5-11)', 'Children (2-4)']}
      fullArray={['Seniors (65+)', 'Infants (under 2)', 'Infants on lap', 'Children (15-17)', 'Children (12-14)', 'Children (5-11)', 'Children (2-4)']}
      onClick={onClick}
      onPassengerInputClick={onClick}
      onChangePassenger={onClick}
      onDisableTravelerButtons={onClick}
      onSetActiveField={onSetFieldSpy}
      onChangeModel={changeSpy}
      acceptableFocus={['Adults', 'Seniors', 'Infants', 'Children', 'clearPassengers', 'passengersCloseBtn', 'passengersCloseBtn', 'dropdownContainer', 'applyPassengersBtn', 'bookPassengersLegend']}
    />
  );
  it('render BookPassengers Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(4);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(3);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should handle clear button click', () => {
    const btn = renderedComponent.find('#clearPassengers');
    btn.simulate('click');
    expect(onClick.called).toEqual(true);
    expect(changeSpy.called).toEqual(true);
  });
  it('should handle close button click', () => {
    const btn = renderedComponent.find('#passengersCloseBtn');
    btn.simulate('click');
    expect(onClick.called).toEqual(true);
  });
  it('should handle apply button click', () => {
    const btn = renderedComponent.find('#applyPassengersBtn');
    btn.simulate('click');
    expect(onClick.called).toEqual(true);
  });
  it('should handle blur', () => {
    const btn = renderedComponent.find('#dropdownContainer');
    btn.simulate('blur');
    expect(onClick.called).toEqual(true);
  });
  it('should handle onApplyButtonClick()', () => {
    expect(renderedComponent.instance().onApplyButtonClick()).toEqual(true);
  });
  it('should handle isPassengerBtnActive() with no parameter', () => {
    expect(renderedComponent.instance().isPassengerBtnActive()).toEqual(false);
  });
  it('should handle isPassengerBtnActive() with a parameter', () => {
    expect(renderedComponent.instance().isPassengerBtnActive('Seniors')).toEqual(true);
  });
  it('should handle onClosePanel()', () => {
    expect(renderedComponent.instance().onClosePanel()).toEqual(true);
  });
  it('should handle onClearPassengerInput()', () => {
    expect(renderedComponent.instance().onClearPassengerInput()).toEqual(true);
    expect(changeSpy.called).toEqual(true);
  });
  it('should handle onQuantityInputFocus()', () => {
    expect(renderedComponent.instance().onQuantityInputFocus({ target: { foo: 'bar' } })).toEqual(true);
  });
  it('should handle onPassengerInputBlur()', () => {
    expect(renderedComponent.instance().onPassengerInputBlur()).toEqual(false);
  });
});
