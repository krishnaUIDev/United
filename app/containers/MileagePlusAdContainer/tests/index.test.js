import React from 'react';
import { shallow } from 'enzyme';

import MileagePlusAdContainer from '../index';

describe('<MileagePlusAdContainer />', () => {
  it('should render 1 div', () => {
    const renderedComponent = shallow(
      <MileagePlusAdContainer />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render 1 section', () => {
    const renderedComponent = shallow(
      <MileagePlusAdContainer />
    );
    expect(renderedComponent.find('section').length).toEqual(1);
  });
});
