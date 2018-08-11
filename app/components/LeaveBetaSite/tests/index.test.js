import React from 'react';
import { shallow } from 'enzyme';

import LeaveBetaSite from '../index';

describe('<LeaveBetaSite />', () => {
  const renderedComponent = shallow(
    <LeaveBetaSite />
  );

  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should render button', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
});
