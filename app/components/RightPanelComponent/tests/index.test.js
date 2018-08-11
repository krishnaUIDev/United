import React from 'react';
import { spy } from 'sinon';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import RightPanelComponent from '../index';

describe('<RightPanelComponent />', () => {
  const onToFocusFlightNumberSpy = spy();
  const onCloseModalSpy = spy();
  const renderedComponent = shallowWithIntl(
    <RightPanelComponent
      isTablet={false}
      hasBottomTypeLink
      bottomHeader="foo"
      isUnited="true"
      linkURLS={{ upgradeURL: '' }}
      onToFocusFlightNumber={onToFocusFlightNumberSpy}
      bottomTxtA="txtA"
      bottomTxtB="txtB"
      bottomTxtC="txtC"
      bottomTxtD="txtD"
    />
  ).dive();
  const renderedComponentNonUA = shallowWithIntl(
    <RightPanelComponent
      isTablet={false}
      hasBottomTypeLink
      isUnited="true"
      linkURLS={{ upgradeURL: '' }}
      onToFocusFlightNumber={onToFocusFlightNumberSpy}
      bottomTxtA="txtA"
      bottomTxtB="txtB"
      bottomTxtC="txtC"
      bottomTxtD="txtD"
    />
  ).dive();
  const renderedComponentMobile = shallowWithIntl(
    <RightPanelComponent
      isTablet
      hasBottomTypeLink
      bottomHeader="foo"
      isUnited="true"
      linkURLS={{ upgradeURL: '' }}
      onToFocusFlightNumber={onToFocusFlightNumberSpy}
      onCloseModal={onCloseModalSpy}
      bottomTxtA="txtA"
      bottomTxtB="txtB"
      bottomTxtC="txtC"
      bottomTxtD="txtD"
    />
  ).dive();
  const renderedComponentWithoutLinks = shallowWithIntl(
    <RightPanelComponent
      onToFocusFlightNumber={onToFocusFlightNumberSpy}
    />
  ).dive();
  const renderedComponentTopText = shallowWithIntl(
    <RightPanelComponent
      hasBottomTypeLink
      firstLineTxt="foo"
      secondLineTxt="bar"
      thirdLineTxt="foobar"
      linkURLS={{ upgradeURL: '' }}
      onToFocusFlightNumber={onToFocusFlightNumberSpy}
    />
  ).dive();

  beforeEach(() => {
    onToFocusFlightNumberSpy.reset();
    onCloseModalSpy.reset();
  });
  it('should render divs for desktop', () => {
    expect(renderedComponent.find('div').length).toEqual(13);
  });
  it('should render links for desktop', () => {
    expect(renderedComponent.find('a').length).toEqual(5);
  });
  it('should render img for desktop', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should render buttons for desktop', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render divs for mobile', () => {
    expect(renderedComponentMobile.find('div').length).toEqual(14);
  });
  it('should render img for mobile', () => {
    expect(renderedComponentMobile.find('img').length).toEqual(2);
  });
  it('should render buttons for mobile', () => {
    expect(renderedComponent.find('button').length).toEqual(1);
  });
  it('should render links for mobile', () => {
    expect(renderedComponent.find('a').length).toEqual(5);
  });
  it('should render correct links if no bottom links', () => {
    expect(renderedComponentWithoutLinks.find('a').length).toEqual(0);
  });
  it('should render spans if no bottom links', () => {
    expect(renderedComponentWithoutLinks.find('span').length).toEqual(0);
  });
  it('should render divs for desktop for a non-UA flight', () => {
    expect(renderedComponentNonUA.find('div').length).toEqual(12);
  });
  it('should render links for desktop for a non-UA flight', () => {
    expect(renderedComponentNonUA.find('a').length).toEqual(5);
  });
  it('should render img for desktop for a non-UA flight', () => {
    expect(renderedComponentNonUA.find('img').length).toEqual(1);
  });
  it('should render divs for desktop with top text', () => {
    expect(renderedComponentTopText.find('div').length).toEqual(11);
  });
  it('should handle blur of flight number header', () => {
    renderedComponent.find('#flightNumber').simulate('blur');
    expect(onToFocusFlightNumberSpy.called).toEqual(true);
  });
  it('should render close panel button click on mobile/tablet', () => {
    renderedComponentMobile.find('#closePanelBtn').simulate('click');
    expect(onCloseModalSpy.called).toEqual(true);
    expect(onToFocusFlightNumberSpy.called).toEqual(true);
  });
});
