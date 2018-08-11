import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';

import reducer from 'containers/GlobalFooterContainer/reducer';
import createReducer from '../../../reducers';
import GlobalFooter from '../index';

describe('<GlobalFooter />', () => {
  const onInitSpy = spy();
  const store = createStore(
    createReducer({ headerFooter: reducer }),
  );

  const renderedComponent = mount(
    <IntlProvider locale="en" >
      <GlobalFooter
        store={store}
        onInit={onInitSpy}
      />
    </IntlProvider>
  );

  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(52);
  });

  it('should render ul', () => {
    expect(renderedComponent.find('ul').length).toEqual(2);
  });

  it('should render paragraphs', () => {
    expect(renderedComponent.find('p').length).toEqual(1);
  });
});
