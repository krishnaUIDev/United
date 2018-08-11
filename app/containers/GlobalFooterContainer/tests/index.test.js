import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';

import createReducer from '../../../reducers';
import reducer from '../reducer';

import GlobalFooterContainer from '../index';

describe('<GlobalFooterContainer />', () => {
  const store = createStore(
    createReducer({ headerFooter: reducer }),
  );

  const renderedComponent = mount(
    <IntlProvider locale="en" >
      <GlobalFooterContainer store={store} />
    </IntlProvider>
  );

  it('should render the GlobalFooter', () => {
    expect(renderedComponent.find('GlobalFooter').length).toEqual(1);
  });
});
