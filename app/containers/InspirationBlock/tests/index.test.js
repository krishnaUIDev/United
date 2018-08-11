import React from 'react';
import { shallow } from 'enzyme';

import InspirationBlock from '../index';

describe('<InspirationBlock />', () => {
  it('should render 1 section', () => {
    const renderedComponent = shallow(
      <InspirationBlock />
    );
    expect(renderedComponent.find('section').length).toEqual(1);
  });
});
