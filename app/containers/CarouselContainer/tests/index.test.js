import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';
import homeReducer from '../../HomePage/reducer';

import createReducer from '../../../reducers';
import reducer from '../reducer';

import CarouselContainer from '../index';

describe('<CarouselContainer />', () => {
  const store = createStore(
    createReducer({ carousel: reducer, home: homeReducer }),
  );

  const renderedComponent = mount(
    <IntlProvider locale="en" >
      <CarouselContainer store={store} />
    </IntlProvider>
  );

  it('should render the carousel', () => {
    expect(renderedComponent.find('CarouselContainer').length).toEqual(1);
  });
});
