import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';
import { injectIntl } from 'react-intl';

import LoginButton from 'components/LoginButton';

import {
  makeSelectGlobalUsername,
  makeSelectGlobalUsernameCrypto,
  makeSelectRememberMeChecked,
  makeSelectToken,
} from 'containers/App/selectors';
import {
  makeSelectUserProfileData,
  makeSelectUserLoggedIn,
  makeSelectUserProfileError,
  makeSelectUserProfileLoading,
} from 'containers/HomePage/selectors';
import { loadSignIn, onSignInRememberMeChecked, doSignOut } from 'containers/App/actions';

const mapStateToProps = createStructuredSelector({
  mpUserProfile: makeSelectUserProfileData(),
  isLoggedIn: makeSelectUserLoggedIn(),
  userProfileError: makeSelectUserProfileError(),
  isLoading: makeSelectUserProfileLoading(),
  globalMPusername: makeSelectGlobalUsername(),
  globalMPusernameCrypto: makeSelectGlobalUsernameCrypto(),
  isRememberMeChecked: makeSelectRememberMeChecked(),
  apiToken: makeSelectToken(),
});


export function mapDispatchToProps(dispatch) {
  return {
    onSignInSubmit: (mpUsername, password, persist, mpUsernameCrypto) => { dispatch(loadSignIn(mpUsername, password, persist, mpUsernameCrypto)); },
    onFieldErrorSubmit: (model, errorObject) => { dispatch(actions.setErrors(model, errorObject)); },
    onSignOut: (token) => {
      dispatch(doSignOut(token));
    },
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    signInRememberMeChecked: (isChecked) => dispatch(onSignInRememberMeChecked(isChecked)),
    onFocusModel: (model) => dispatch(actions.focus(model)),
    dispatch,
  };
}

const LoginButtonContainer = injectIntl(connect(mapStateToProps, mapDispatchToProps)(LoginButton));

export default LoginButtonContainer;
