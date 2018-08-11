import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import AutocompleteLocationDropdownItem from '../index';

describe('<AutocompleteLocationDropdownItem />', () => {
  const onItemClickSpy = spy();
  const onItemKeyDownSpy = spy();
  const blurSpy = spy();
  const hideDropdownSpy = spy();
  const renderedComponent = shallow(
    <AutocompleteLocationDropdownItem
      firstLineText="<b><span class='highlighted'>Lol</span></b>love, Italy"
      itemId="0"
      topLineId="topLineId"
      bottomLineId="bottomLineId"
      bottomLineText="bar"
      onItemClick={onItemClickSpy}
      onItemKeyDown={onItemKeyDownSpy}
      inputId="bookHotelInput"
      locationType="pickupLocationInput"
      listLength={1}
      buttonImage="CITY_GROUP"
      dropdownListFocus={blurSpy}
      useImageIcons="true"
      listItemId="hotelListItem"
      locationTxt="Lollove, Italy"
      ariaLocationTxt="Lollove, Italy"
      imgSrc="foo"
      imgStyle="bar"
      hideDropdown={hideDropdownSpy}
    />
  );
  beforeEach(() => {
    onItemClickSpy.reset();
    onItemKeyDownSpy.reset();
    blurSpy.reset();
    hideDropdownSpy.reset();
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(2);
  });
  it('should render Control.buttons', () => {
    expect(renderedComponent.find('#listBtn0').length).toEqual(1);
  });
  it('should render spans', () => {
    expect(renderedComponent.find('span').length).toEqual(3);
  });
  it('should render img', () => {
    expect(renderedComponent.find('img').length).toEqual(1);
  });
  it('should handle item button click', () => {
    renderedComponent.find('#listBtn0').simulate('click');
    expect(onItemClickSpy.called).toEqual(true);
  });
  it('should handle item button key down', () => {
    renderedComponent.find('#listBtn0').simulate('keydown');
    expect(onItemKeyDownSpy.called).toEqual(true);
  });
  it('should handle componentDidMount()', () => {
    renderedComponent.instance().componentDidMount();
    expect(renderedComponent.find('#topLineId').html()).toEqual('<span class="" id="topLineId"></span>');
  });
  it('should handle setFirstLineHtml()', () => {
    expect(renderedComponent.instance().setFirstLineHtml()).toEqual(true);
  });
  it('should render button props', () => {
    const props = renderedComponent.find('#listBtn0').node.props;
    expect(props.id).toEqual('listBtn0');
    expect(props.role).toEqual('button');
    expect(props.tabIndex).toEqual('0');
    expect(props['aria-label']).toEqual('Lollove, Italy. suggestion 1 out of 1 selected');
    expect(props.onClick).toBeDefined();
    expect(props.onKeyDown).toBeDefined();
  });
  it('should render button children', () => {
    const children = renderedComponent.find('#listBtn0').node.props.children;
    expect(children[0].type).toEqual('span');
    expect(children[0].ref).toEqual(null);
    expect(children[0].props['aria-hidden']).toEqual('true');
    expect(children[1].type).toEqual('span');
    expect(children[1].ref).toBeDefined();
    expect(children[1].props.id).toEqual('topLineId');
    expect(children[3].type).toEqual('span');
    expect(children[3].props.id).toEqual('bottomLineId');
    expect(children[3].props.children).toEqual('bar');
  });
  it('should handle item blur', () => {
    renderedComponent.find('#listBtn0').simulate('blur');
    setTimeout(() => {
      expect(hideDropdownSpy.called).toEqual(true);
    }, 1);
  });
  it('should handle onInputItemBlur()', () => {
    renderedComponent.instance().onInputItemBlur();
    setTimeout(() => {
      expect(hideDropdownSpy.called).toEqual(true);
    }, 1);
  });
});
