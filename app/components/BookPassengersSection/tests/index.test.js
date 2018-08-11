import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import BookPassengersSection from '../index';

describe('<BookPassengersSection />', () => {
  const onClick = spy();
  const onInputClickSpy = spy();
  const onKeyUpSpy = spy();
  const renderedComponent = shallow(
    <BookPassengersSection
      id="Adults (18-64)"
      sectionTitle="Adults"
      sectionDetail="(18-64)"
      maxLimit={9}
      onTextInput={onKeyUpSpy}
      onQuantityClick={onClick}
      minusBtnDisabled={false}
      plusBtnDisabled={false}
      currentAmount={3}
      onQuantityInputFocus={onInputClickSpy}
    />
  );
  const wrapper = renderedComponent.instance();
  it('render BookPassengersSection Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  it('render component prop sectionTitle', () => {
    expect(wrapper.props.sectionTitle).toEqual('Adults');
  });
  it('render component prop sectionDetail', () => {
    expect(wrapper.props.sectionDetail).toEqual('(18-64)');
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(2);
  });
  it('should render p', () => {
    expect(renderedComponent.find('p').length).toEqual(1);
  });
  it('should render Control.input', () => {
    expect(renderedComponent.find('#Adults').length).toEqual(1);
  });
  it('should handle minus button click', () => {
    const btn = renderedComponent.find('.(18-64)qtyminus');
    btn.simulate('click');
    expect(onClick.called).toEqual(true);
  });
  it('should handle plus button click', () => {
    const plusBtn = renderedComponent.find('.(18-64)qtyplus');
    plusBtn.simulate('click');
    expect(onClick.called).toEqual(true);
  });
  it('should render input onFocus', () => {
    renderedComponent.find('#Adults').simulate('focus');
    expect(onInputClickSpy.called).toEqual(true);
  });
  it('should render input onKeyUp', () => {
    renderedComponent.find('#Adults').simulate('keyup');
    expect(onKeyUpSpy.called).toEqual(true);
  });
});
