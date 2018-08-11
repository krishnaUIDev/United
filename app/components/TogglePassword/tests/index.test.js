import React from 'react';
import { spy } from 'sinon';
import { Control } from 'react-redux-form/lib/immutable';
import { shallowWithIntl } from '../../../../internals/testing/intl-enzyme-test-helper';
import TogglePassword from '../index';

describe('<TogglePassword />', () => {
  const focusModelSpy = spy();
  const updatePasswordTypeSpy = spy();
  const onChangeSpy = spy();
  jest.useFakeTimers();
  const handlePasswordFieldOnBlur = jest.fn((value) => value);
  const renderedComponent = shallowWithIntl(
    <TogglePassword
      onChangeModel={onChangeSpy}
      onFocusModel={focusModelSpy}
      updatePasswordInputType={updatePasswordTypeSpy}
      inputId="toggleId"
      maxLength="8"
      placeholder="enterpassword"
      isAriaRequired="true"
    />
  ).dive();
  beforeEach(() => {
    focusModelSpy.reset();
    updatePasswordTypeSpy.reset();
    onChangeSpy.reset();
  });
  it('should render 1 div', () => {
    expect(renderedComponent.find(Control).length).toEqual(1);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should handle onShowError()', () => {
    const onShowError = renderedComponent.instance().onShowError({ touched: true });
    expect(onShowError).toEqual(true);
  });
  it('should handle onShowError() false', () => {
    const onShowError = renderedComponent.instance().onShowError({ touched: false });
    expect(onShowError).toEqual(false);
  });
  it('should handle handlePasswordFieldOnBlur()', () => {
    renderedComponent.instance().handlePasswordFieldOnBlur();
    setTimeout(() => {
      expect(handlePasswordFieldOnBlur).toHaveBeenCalledTimes(1);
    }, 1);
  });
  it('should not handle handlePasswordFieldOnBlur()', () => {
    renderedComponent.instance().handlePasswordFieldOnBlur();
    expect(onChangeSpy.called).toEqual(false);
  });
  it('should test props', () => {
    const control = renderedComponent.find(Control);
    expect(control.props().maxLength).toEqual('8');
    expect(control.props().placeholder).toEqual('enterpassword');
    expect(control.props().validateOn).toEqual('blur');
  });
});
