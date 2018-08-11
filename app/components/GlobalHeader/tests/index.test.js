import React from 'react';
import { spy } from 'sinon';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import GlobalHeader from '../index';

describe('<GlobalHeader />', () => {
  const onInitSpy = spy();

  const renderedComponent = shallowWithIntl(
    <GlobalHeader
      onInit={onInitSpy}
    />
  ).dive();

  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(5);
  });

  it('should render ul', () => {
    expect(renderedComponent.find('ul').length).toEqual(1);
  });

  it('should render nav', () => {
    expect(renderedComponent.find('nav').length).toEqual(1);
  });

  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(2);
  });
});
