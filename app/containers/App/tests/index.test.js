import React from 'react';
import { shallow } from 'enzyme';
import 'react-dates/initialize';

import { App } from '../index';

describe('<App />', () => {
  const renderedComponent = shallow(
    <App />
  );
  it('should render contain a header', () => {
    expect(renderedComponent.find('header').length).toEqual(1);
  });
  it('should render contain a footer', () => {
    expect(renderedComponent.find('footer').length).toEqual(1);
  });

  it('should render TimeoutModal', () => {
    expect(renderedComponent.find('Connect(TimeoutModal)').length).toEqual(1);
  });
});
