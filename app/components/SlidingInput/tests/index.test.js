import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import SlidingInput from '../index';

describe('<SlidingInput />', () => {
  const slidingInputSpy = spy();
  const renderedComponent = shallow(
    <SlidingInput
      inputId="bookFlightModel.passengers"
      onClick={slidingInputSpy}
      modelName="foo"
      minLength="0"
      maxLength="3"
      isRequired="true"
      isAriaRequired="true"
      placeholder="placeholder"
    />
  );
  it('should render 1 div', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render props', () => {
    const input = renderedComponent.find('#slidingInputFieldGroup').props();
    expect(input.id).toEqual('slidingInputFieldGroup');
    const child = input.children.props;
    expect(child.id).toEqual('bookFlightModel.passengers');
    expect(child.model).toEqual('foo');
    expect(child.minLength).toEqual('0');
    expect(child.maxLength).toEqual('3');
    expect(child.required).toEqual('true');
    expect(child.placeholder).toEqual('placeholder');
    expect(child['aria-required']).toEqual('true');
    expect(child.validateOn).toEqual('blur');
  });
});
