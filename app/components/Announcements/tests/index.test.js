import React from 'react';
import { shallow } from 'enzyme';

import Announcements from '..';

describe('<Announcements />', () => {
  const renderedComponent = shallow(
    <Announcements
      message="Sample message"
    />);

  it('renderedComponent should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
