import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import 'react-dates/initialize';

import { BookCalendar } from '../index';

describe('<BookCalendar />', () => {
  const renderedComponent = shallow(
    <IntlProvider locale="en">
      <BookCalendar />
    </IntlProvider>
  ).dive();
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
