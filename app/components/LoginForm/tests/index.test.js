import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from 'containers/App/reducer';
import createReducer from '../../../reducers';


import LoginForm from '../index';

describe('<LoginForm />', () => {
  const store = createStore(
    createReducer({ reducer }),
  );
  const preventDefaultSpy = spy();
  const signInSpy = spy();
  const submitFieldErrorSpy = spy();
  const rememberMeSpy = spy();
  const changeModelSpy = spy();
  const renderedComponent = mount(
    <Provider store={store}>
      <IntlProvider locale="en">
        <LoginForm
          onSignInSubmit={signInSpy}
          onFieldErrorSubmit={submitFieldErrorSpy}
          signInRememberMeChecked={rememberMeSpy}
          onChangeModel={changeModelSpy}
        />
      </IntlProvider>
    </Provider>
  );
  beforeEach(() => {
    preventDefaultSpy.reset();
    signInSpy.reset();
    submitFieldErrorSpy.reset();
    rememberMeSpy.reset();
    changeModelSpy.reset();
  });
  it('should render buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(3);
  });
  it('should render divs', () => {
    expect(renderedComponent.find('div').length).toEqual(16);
  });
  it('should render fieldset', () => {
    expect(renderedComponent.find('fieldset').length).toEqual(1);
  });
  it('should render span', () => {
    expect(renderedComponent.find('span').length).toEqual(10);
  });
  it('should render FormattedMessage', () => {
    expect(renderedComponent.find('FormattedMessage').length).toEqual(13);
  });
  it('should handle onRememberMeChange()', () => {
    renderedComponent.find('#saveCredentials').simulate('change', { target: { checked: true } });
    expect(changeModelSpy.called).toEqual(true);
    expect(rememberMeSpy.called).toEqual(true);
  });
  it('should render error message for invalid credentials', () => {
    const error = {
      response: {
        status: 403,
      },
    };
    const renderedWithError = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <LoginForm
            onSignInSubmit={signInSpy}
            onFieldErrorSubmit={submitFieldErrorSpy}
            signInRememberMeChecked={rememberMeSpy}
            onChangeModel={changeModelSpy}
            userProfileError={error}
          />
        </IntlProvider>
      </Provider>
    );
    expect(renderedWithError.find('div').length).toEqual(17);
    expect(renderedWithError.find('span').length).toEqual(11);
    expect(renderedWithError.find('#errorMsg').text()).toEqual('The account information you entered is not valid. PINs are no longer accepted if you have updated your account security, and usernames and emails are currently not accepted. If you\'ve forgotten any of your information, please use the links below for help.');
  });
  it('should render error message for locked account', () => {
    const error = {
      response: {
        status: 423,
      },
    };
    const renderedWithError = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <LoginForm
            onSignInSubmit={signInSpy}
            onFieldErrorSubmit={submitFieldErrorSpy}
            signInRememberMeChecked={rememberMeSpy}
            onChangeModel={changeModelSpy}
            userProfileError={error}
          />
        </IntlProvider>
      </Provider>
    );
    expect(renderedWithError.find('div').length).toEqual(17);
    expect(renderedWithError.find('span').length).toEqual(11);
    expect(renderedWithError.find('#loginError').text()).toEqual('Your account is locked for security purposes. You may be able to unlock your account by selecting the "forgot password" link below and resetting your password.');
  });
  it('should handle click and blur of tooltip button', () => {
    renderedComponent.find('#tooltipBtn').simulate('click', { preventDefault: preventDefaultSpy, target: { id: 'tooltipBtn' } });
    renderedComponent.find('#tooltipBtn').simulate('blur');
  });
});
