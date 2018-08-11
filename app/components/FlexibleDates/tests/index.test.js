import React from 'react';
import { mount } from 'enzyme';
import 'react-dates/initialize';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';

import createReducer from '../../../reducers';

import FlexibleDates from '..';

describe('<FlexibleDates />', () => {
  const store = createStore(
    createReducer(),
  );
  const renderedComponent = mount(
    <IntlProvider locale="en">
      <FlexibleDates store={store} />
    </IntlProvider>
  );
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(14);
  });
  it('should render Select', () => {
    expect(renderedComponent.find('Select').length).toEqual(2);
  });
});
