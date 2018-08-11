import React from 'react';
import { shallow } from 'enzyme';

import LoaderIndicatorRing from '../index';

describe('<LoaderIndicatorRing />', () => {
  const renderedComponent = shallow(
    <LoaderIndicatorRing />
  );
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(6);
  });
});
