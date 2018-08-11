import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 14 divs', () => {
    const renderedComponent = shallow(
      <LoadingIndicator />
    );
    expect(renderedComponent.find('div').length).toEqual(14);
  });
});
