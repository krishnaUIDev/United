import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import ActionLink from '..';

describe('<ActionLink />', () => {
  it('should render children', () => {
    const wrapper = shallow((
      <ActionLink>
        <span>content</span>
      </ActionLink>
    ));
    expect(wrapper.contains(<span>content</span>)).toEqual(true);
  });
  it('should render as a button element if asLink is false', () => {
    const wrapper = shallow((
      <ActionLink
        asLink={false}
      >
        <span>content</span>
      </ActionLink>
    ));
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('should render as a link element if asLink is true', () => {
    const wrapper = shallow((
      <ActionLink
        asLink
      >
        <span>content</span>
      </ActionLink>
    ));
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('should render the passed prop classname in the output', () => {
    const wrapper = shallow((
      <ActionLink
        className="stuff"
      >
        <span>content</span>
      </ActionLink>
    ));
    expect(wrapper.find('.stuff').length).toEqual(1);
  });

  it('should render role button by default', () => {
    const wrapper = shallow((
      <ActionLink>
        <span>content</span>
      </ActionLink>
    ));
    expect(wrapper.prop('role')).toEqual('button');
  });

  it('should handle click event', () => {
    const handleClickSpy = spy();
    const mockParameters = [1, 2, 3];
    const wrapper = shallow((
      <ActionLink
        onClick={handleClickSpy}
        param={mockParameters}
      >
        <span>content</span>
      </ActionLink>
    ));
    wrapper.simulate('click');
    expect(handleClickSpy.called).toEqual(true);
    expect(handleClickSpy.calledWith(mockParameters)).toEqual(true);
  });
});
