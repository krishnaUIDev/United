import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { Advisories } from '../index';

describe('<Advisories />', () => {
  const loadSpy = spy();
  const renderedComponent = shallow(
    <Advisories onLoadAdvisories={loadSpy} />
);
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
