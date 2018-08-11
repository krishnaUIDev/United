import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { ToolTip } from '../index';

describe('<ToolTip />', () => {
  jest.useFakeTimers();
  const stopPropagationSpy = spy();
  const preventDefaultSpy = spy();
  const renderedComponent = shallow(
    <ToolTip
      msg={'premium'}
      linkmsg="foo"
      linkurl="url"
      tooltipmsg="tooltipmsg"
      tooltipAria="tooltipAria"
    />
  );
  beforeEach(() => {
    preventDefaultSpy.reset();
    stopPropagationSpy.reset();
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(3);
  });
  it('should render spans', () => {
    expect(renderedComponent.find('span').length).toEqual(2);
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should simulate button click', () => {
    renderedComponent.find('button').simulate('click', { preventDefault: preventDefaultSpy });
    expect(renderedComponent.state().visible).toEqual(true);
  });
  it('should simulate button blur', () => {
    renderedComponent.find('button').simulate('blur');
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
  it('should handle keycode 27', () => {
    renderedComponent.instance().onTooltipKeyDown({ keyCode: 27, stopPropagation: stopPropagationSpy }, '', '');
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
  it('should handle keycode 9', () => {
    renderedComponent.instance().onTooltipKeyDown({ keyCode: 9 }, 'https://www.united.com', '');
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
  it('should handle onKeyDown with keyCode 9 ', () => {
    renderedComponent.find('button').simulate('keyDown', { target: { keyCode: 9 } });
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});
