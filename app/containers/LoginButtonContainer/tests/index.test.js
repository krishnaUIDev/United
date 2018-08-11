import { spy } from 'sinon';
import 'react-dates/initialize';

import { loadSignIn, onSignInRememberMeChecked, doSignOut } from 'containers/App/actions';
import { mapDispatchToProps } from '../index';

describe('LoginButtonContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should call loadSignIn action', () => {
      const dispatchSpy = spy();
      const { onSignInSubmit } = mapDispatchToProps(dispatchSpy);
      onSignInSubmit(true);
      const expectedAction = loadSignIn(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.mpUsername).toEqual(expectedAction.mpUsername);
      expect(spyLastCall.password).toEqual(expectedAction.password);
      expect(spyLastCall.persist).toEqual(expectedAction.persist);
    });
    it('should call onSignInRememberMeChecked action', () => {
      const dispatchSpy = spy();
      const { signInRememberMeChecked } = mapDispatchToProps(dispatchSpy);
      signInRememberMeChecked(true);
      const expectedAction = onSignInRememberMeChecked(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.isChecked).toEqual(expectedAction.isChecked);
    });
    it('should call doSignOut', () => {
      const dispatchSpy = spy();
      const { onSignOut } = mapDispatchToProps(dispatchSpy);
      onSignOut(true);
      const expectedAction = doSignOut(true);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.type).toEqual(expectedAction.type);
      expect(spyLastCall.token).toEqual(expectedAction.token);
    });
  });
});
