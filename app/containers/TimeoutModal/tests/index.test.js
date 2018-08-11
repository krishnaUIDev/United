import React from 'react';
import { shallow } from 'enzyme';

import { TIMEOUT_INACTIVE } from '../constants';

import { TimeoutModal } from '../index';
import messages from '../messages';

describe('<TimeoutModal />', () => {
  let renderedComponent = shallow(
    <TimeoutModal />
  );

  it('should render modal', () => {
    expect(renderedComponent.find('Modal').length).toEqual(1);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(3);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should render button', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render TIMEOUT_INACTIVE modal', () => {
    renderedComponent = shallow(
      <TimeoutModal
        timeoutType={TIMEOUT_INACTIVE}
      />
    );
    const expected = messages.inactiveTimeoutBody.defaultMessage;
    expect(renderedComponent.find('#modalBodyTxt').node.props.children).toEqual(expected);
  });
  it('should not open model if timeoutType does not equal TIMEOUT_TOKEN or TIMEOUT_INACTIVE', () => {
    renderedComponent = shallow(
      <TimeoutModal
        timeoutType={7}
      />
    );
    it('should render divs', () => {
      expect(renderedComponent.find('div').length).toEqual(0);
    });
  });
});
