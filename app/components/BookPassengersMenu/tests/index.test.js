import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Immutable from 'immutable';

import BookPassengersMenu from '../index';

describe('<BookPassengersMenu />', () => {
  const bookPassSpy = spy();
  const changeSpy = spy();
  const inputSpy = spy();
  const passToBook = Immutable.Map({
    'Adults (18-64)': 2,
    'Seniors (65+)': 0,
    'Infants (under 2)': 3,
    'Infants on lap': 1,
    'Children (15-17)': 0,
    'Children (12-14)': 0,
    'Children (5-11)': 0,
    'Children (2-4)': 0,
  });
  const renderedComponent = shallow(
    <BookPassengersMenu
      ids={['Adults (18-64)', 'Seniors (65+)', 'Infants (under 2)', 'Infants on lap']}
      sectionTitle={['Adults', 'Seniors', 'Infants', 'Infants on lap']}
      sectionDetail={['(18-64)', '(65+)', '(under 2)', '']}
      fullArray={['Seniors (65+)', 'Infants (under 2)', 'Infants on lap']}
      onQuantityClick={bookPassSpy}
      toDisableBtns={Immutable.Map({ plusBtn: false, minusBtn: false })}
      passengersToBook={passToBook}
      onDisableTravelerButtons={bookPassSpy}
      onChangePassenger={bookPassSpy}
      arrayIndexs={['0', '1', '2', '3']}
      onChangeModel={changeSpy}
      onQuantityInputFocus={inputSpy}
      infantTitleA="Infants (under 2)"
      infantTitleB="Infants on lap"
    />
  );
  const wrapper = renderedComponent.instance();
  it('render BookPassengersMenu Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  it('render component prop infantTitleA', () => {
    expect(wrapper.props.infantTitleA).toEqual('Infants (under 2)');
  });
  it('render component prop infantTitleB', () => {
    expect(wrapper.props.infantTitleB).toEqual('Infants on lap');
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render BookPassengersSection', () => {
    expect(renderedComponent.find('BookPassengersSection').length).toEqual(4);
  });
  it('should handle disableButtons()', () => {
    expect(renderedComponent.instance().disableButtons()).toEqual(false);
    expect(bookPassSpy.called).toEqual(true);
  });
  it('should handle getGroupSum()', () => {
    expect(renderedComponent.instance().getGroupSum()).toEqual(4);
  });
  it('should handle getGroupSum() with parameters', () => {
    expect(renderedComponent.instance().getGroupSum(3, 'Adults (18-64)')).toEqual(7);
  });
  it('should handle onQuantityClick()', () => {
    expect(renderedComponent.instance().onQuantityClick(null, 'Adults (18-64)', 'plus', 3)).toEqual(3);
    expect(bookPassSpy.called).toEqual(true);
    expect(changeSpy.called).toEqual(true);
  });
  it('should handle onTextInput()', () => {
    expect(renderedComponent.instance().onTextInput({ keyCode: 51, target: { value: '7' } }, 'Adults (18-64)')).toEqual(7);
    expect(bookPassSpy.called).toEqual(true);
    expect(changeSpy.called).toEqual(true);
    expect(inputSpy.called).toEqual(true);
  });
  it('should render BookPassengersSection props', () => {
    const section = renderedComponent.find('BookPassengersSection').node.props;
    expect(section.id).toEqual('Adults (18-64)');
    expect(section.index).toEqual('0');
    expect(section.sectionTitle).toEqual('Adults');
    expect(section.sectionDetail).toEqual('(18-64)');
    expect(section.onTextInput).toBeDefined();
    expect(typeof (section.onTextInput)).toEqual('function');
    expect(section.onQuantityClick).toBeDefined();
    expect(typeof (section.onQuantityClick)).toEqual('function');
    expect(section.onQuantityInputFocus).toBeDefined();
    expect(typeof (section.onQuantityInputFocus)).toEqual('function');
    expect(section.minusBtnDisabled).toEqual(false);
    expect(section.plusBtnDisabled).toEqual(false);
  });
  it('should handle getInfantCounts()', () => {
    expect(renderedComponent.instance().getInfantCounts()).toEqual({ infantsLap: 1, infantsUnderTwo: 3 });
  });
  describe('should handle getPassengersData()', () => {
    const data = renderedComponent.instance().getPassengersData(false, false, passToBook);
    it('should render Adults (18-64)', () => {
      const adults = data[0];
      expect(adults.type).toBeDefined();
      expect(typeof (adults.type)).toEqual('function');
      expect(adults.ref).toEqual(null);
      expect(adults.key).toEqual('0');
      const props = adults.props;
      expect(props.id).toEqual('Adults (18-64)');
      expect(props.index).toEqual('0');
      expect(props.sectionTitle).toEqual('Adults');
      expect(props.sectionDetail).toEqual('(18-64)');
      expect(props.minusBtnDisabled).toEqual(false);
      expect(props.plusBtnDisabled).toEqual(false);
      expect(props.currentAmount).toEqual(2);
    });
    it('should render Seniors (65+)', () => {
      const seniors = data[1];
      expect(seniors.type).toBeDefined();
      expect(typeof (seniors.type)).toEqual('function');
      expect(seniors.ref).toEqual(null);
      expect(seniors.key).toEqual('1');
      const props = seniors.props;
      expect(props.id).toEqual('Seniors (65+)');
      expect(props.index).toEqual('1');
      expect(props.sectionTitle).toEqual('Seniors');
      expect(props.sectionDetail).toEqual('(65+)');
      expect(props.minusBtnDisabled).toEqual(false);
      expect(props.plusBtnDisabled).toEqual(false);
      expect(props.currentAmount).toEqual(0);
    });
    it('should render Infants (under 2)', () => {
      const infants = data[2];
      expect(infants.type).toBeDefined();
      expect(typeof (infants.type)).toEqual('function');
      expect(infants.ref).toEqual(null);
      expect(infants.key).toEqual('2');
      const props = infants.props;
      expect(props.id).toEqual('Infants (under 2)');
      expect(props.index).toEqual('2');
      expect(props.sectionTitle).toEqual('Infants');
      expect(props.sectionDetail).toEqual('(under 2)');
      expect(props.minusBtnDisabled).toEqual(false);
      expect(props.plusBtnDisabled).toEqual(false);
      expect(props.currentAmount).toEqual(3);
    });
    it('should render Infants on lap', () => {
      const infants = data[3];
      expect(infants.type).toBeDefined();
      expect(typeof (infants.type)).toEqual('function');
      expect(infants.ref).toEqual(null);
      expect(infants.key).toEqual('3');
      const props = infants.props;
      expect(props.id).toEqual('Infants on lap');
      expect(props.index).toEqual('3');
      expect(props.sectionTitle).toEqual('Infants on lap');
      expect(props.sectionDetail).toEqual('');
      expect(props.minusBtnDisabled).toEqual(false);
      expect(props.plusBtnDisabled).toEqual(false);
      expect(props.currentAmount).toEqual(1);
    });
  });
});
