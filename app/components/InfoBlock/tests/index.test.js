import React from 'react';
import { shallow } from 'enzyme';

import InfoBlock from '../index';

describe('<InfoBlock />', () => {
  it('should render a section', () => {
    const renderedComponent = shallow(
      <InfoBlock />
    );
    expect(renderedComponent.find('section').length).toEqual(1);
  });
});
