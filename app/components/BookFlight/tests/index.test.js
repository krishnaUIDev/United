import React from 'react';
import { spy } from 'sinon';
import Immutable from 'immutable';
import 'react-dates/initialize';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';

import BookFlight from '../index';

describe('<BookFlight />', () => {
  const onSetTabSpy = spy();
  const mobileViewSpy = spy();
  const itemSelectedSpy = spy();
  const hideDropdownSpy = spy();
  const dropdownFocusSpy = spy();
  const preventDefaultSpy = spy();
  const focusModelSpy = spy();
  const onChangeModelSpy = spy();
  const mobileView = Immutable.Map({
    bookCarOrigin: 'relative',
    bookCarDropoff: 'relative',
    bookHotel: 'relative',
    bookFlightOrigin: 'relative',
    bookFlightDestination: 'relative',
  });
  const hideAutoLocation = Immutable.Map({
    bookCarOrigin: 'visible',
    bookCarDropoff: 'visible',
    bookHotel: 'hidden',
    bookFlightOrigin: 'hidden',
    bookFlightDestination: 'hidden',
  });
  const renderedComponent = shallowWithIntl(
    <BookFlight
      onUpdateMobileView={mobileViewSpy}
      hideAutocompleteLocationDropdown={hideDropdownSpy}
      onItemSelected={itemSelectedSpy}
      setTab={onSetTabSpy}
      bookHotelLocation="China"
      bookCarLocation="Chicago"
      hideAutocompleteLocation={hideAutoLocation}
      mobileView={mobileView}
      dropdownListFocus={dropdownFocusSpy}
      onFocusModel={focusModelSpy}
      onChangeModel={onChangeModelSpy}
    />
  ).dive();
  const wrapper = renderedComponent.instance();
  beforeEach(() => {
    onSetTabSpy.reset();
    mobileViewSpy.reset();
    itemSelectedSpy.reset();
    hideDropdownSpy.reset();
    dropdownFocusSpy.reset();
    preventDefaultSpy.reset();
    focusModelSpy.reset();
  });
  it('render BookFlight Component', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
  test('render component prop bookHotelLocation', () => {
    expect(wrapper.props.bookHotelLocation).toEqual('China');
  });
  test('render component prop bookCarLocation', () => {
    expect(wrapper.props.bookCarLocation).toEqual('Chicago');
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(7);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(5);
  });
  it('should render a', () => {
    expect(renderedComponent.find('a').length).toEqual(2);
  });
  it('should render h3', () => {
    expect(renderedComponent.find('h3').length).toEqual(5);
  });
  it('should handle setTab()', () => {
    expect(renderedComponent.instance().setTab('foo')).toEqual('foo');
    expect(onSetTabSpy.called).toEqual(true);
  });
  it('should render Book Hotel tab and its children', () => {
    const hotelTab = renderedComponent.find('#bookHotelTab').node;
    const propsA = renderedComponent.find('#bookHotelTab').node.props.children[1];
    expect(hotelTab.type.displayName).toEqual('AriaTabPanel-Tab');
    expect(hotelTab.ref).toEqual(null);
    expect(hotelTab.key).toEqual(null);
    expect(hotelTab.props.id).toEqual('bookHotelTab');
    expect(hotelTab.props.tag).toEqual('li');
    expect(hotelTab.props['aria-label']).toEqual('Search and book a hotel');
    expect(hotelTab.props.active).toEqual(false);
    expect(propsA.type).toEqual('button');
    expect(propsA.props.onClick).toBeDefined();
    expect(typeof (propsA.props.onClick)).toEqual('function');
  });
  it('should render Book Hotel tab\'s children', () => {
    const propsA = renderedComponent.find('#bookHotelTab').node.props.children[0];
    const propsB = renderedComponent.find('#bookHotelTab').node.props.children[1];
    expect(propsA.type).toEqual('div');
    expect(propsA.props['aria-hidden']).toEqual('true');
    const childA = propsA.props.children;
    expect(childA.type).toEqual('img');
    expect(childA.key).toEqual(null);
    expect(childA.ref).toEqual(null);
    expect(childA.props.src).toEqual('IMAGE_MOCK');
    expect(childA.props.alt).toEqual('');
    expect(childA.props.role).toEqual('presentation');
    expect(propsB.type).toEqual('button');
    const childB = propsB.props.children.props.children;
    expect(childB.type.displayName).toEqual('FormattedMessage');
    expect(childB.key).toEqual(null);
    expect(childB.ref).toEqual(null);
    expect(childB.props.id).toEqual('unitedapp.components.BookFlight.hotel');
    expect(childB.props.defaultMessage).toEqual('Hotel');
    expect(childB.props.values).toEqual({});
  });
});
