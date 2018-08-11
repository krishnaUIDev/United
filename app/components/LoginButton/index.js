/*
 * LoginButton
 *
 * Login Button for the GlobalHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import LoginForm from 'components/LoginForm';
import LoggedInSidebar from 'components/LoggedInSidebar';
import LoaderIndicatorRing from 'components/LoaderIndicatorRing';

import messages from './messages';
import styles from './loginButton.scss';

import userIcon from './assets/usericon.svg';
import closeIcon from './assets/close.svg';

const isMobile = (screen.width >= 768) !== true;

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    // Need timeout to give time for modal to open.
    setTimeout(() => {
      if (this.modalHeader) { this.modalHeader.focus(); }
    }, 1);
  }

  closeModal() {
    if (this.signInOutHeader) {
      this.signInOutHeader.focus();
    }
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { intl } = this.props;
    const isLoading = this.props.isLoading;

    const isLoggedIn = this.props.isLoggedIn;
    let signInOut = intl.formatMessage(messages.signIn);
    if (isLoggedIn) {
      signInOut = (
        <button
          tabIndex="0"
          className={classNames(styles.loginButton, styles.noPaddingLeft)}
          onClick={() => this.props.onSignOut(this.props.apiToken)}
          role="button"
        >
          <b>{intl.formatMessage(messages.signOut)} </b>
        </button>
      );
    } else if (isMobile) {
      signInOut = '';
    }
    const mpUserfirstName = (isLoggedIn) ? this.props.mpUserProfile.Travelers[0].FirstName : '';
    let signInOutHeader = '';
    if (!isMobile && isLoggedIn) {
      signInOutHeader = `${intl.formatMessage(messages.hi)} ${mpUserfirstName}`;
    } else if (!isMobile) {
      signInOutHeader = intl.formatMessage(messages.signIn);
    }

    return (
      <div>
        {(isLoading) ?
          <div tabIndex="0" className={styles.loadingHeader} id="loadingHeader">
            <img src={userIcon} alt="" aria-hidden="true" role="presentation" className={styles.loadingIcon} />
            {(!isMobile) ? intl.formatMessage(messages.loadingHeader) : ''}
            <div className={styles.loader} />
          </div> :
          <button
            title=""
            role="button"
            id="loginButton"
            className={classNames(styles.headerImg, styles.loginButton)}
            onClick={this.openModal}
            aria-label={(isLoggedIn) ? `${intl.formatMessage(messages.hi)} ${mpUserfirstName}` : intl.formatMessage(messages.signIn)}
            ref={(input) => { this.signInOutHeader = input; }}
          >
            <img src={userIcon} alt="" aria-hidden="true" role="presentation" />
            {signInOutHeader}
          </button>
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          closeTimeoutMS={200}
          className={{
            base: styles.panel,
            afterOpen: styles.panelAfterOpen,
            beforeClose: styles.panelBeforeClose,
          }}
          overlayClassName={{
            base: styles.overlayClass,
            afterOpen: styles.overlayClassAfterOpen,
            beforeClose: styles.overlayClassAfterClose,
          }}
          aria={{
            describedby: 'signInAria',
          }}
          contentLabel=""
        >
          <div className={styles.contentContainer}>
            <span
              id="signInAria"
              className={styles.srOnly}
              aria-live="assertive"
            >{(isLoggedIn) ? intl.formatMessage(messages.mpLoggedIn) : ''}</span>
            <h2
              id="signInHeading"
              className={classNames(styles.loginButton, styles.hiddenXs, styles.hiddenSm)}
              aria-label={(isLoggedIn) ? intl.formatMessage(messages.signOutAriaLabel) : intl.formatMessage(messages.signInAriaLabel)}
              role="complementary"
              ref={(input) => { this.modalHeader = input; }}
              tabIndex="0"
            >
              {signInOut}
              <img src={userIcon} alt="" role="presentation" />
            </h2>
            <div className={styles.loginContainer}>
              {(isLoggedIn) ?
                <LoggedInSidebar
                  mpUserProfile={this.props.mpUserProfile}
                />
                :
                  <LoginForm
                    userProfileError={this.props.userProfileError}
                    globalMPusername={this.props.globalMPusername}
                    globalMPusernameCrypto={this.props.globalMPusernameCrypto}
                    isRememberMeChecked={this.props.isRememberMeChecked}
                    onSignInSubmit={this.props.onSignInSubmit}
                    onFieldErrorSubmit={this.props.onFieldErrorSubmit}
                    onChangeModel={this.props.onChangeModel}
                    signInRememberMeChecked={this.props.signInRememberMeChecked}
                    onFocusModel={this.props.onFocusModel}
                    isLoading={(isLoading)}
                  />
              }
            </div>
            {(isLoading) ?
              <div className={styles.loadingContainer}>
                <LoaderIndicatorRing />
              </div>
            : ''}
            <button
              title={intl.formatMessage(messages.closePanel)}
              role="button"
              className={styles.closeButton}
              onClick={this.closeModal}
              id="closeBtn"
            >
              <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginButton.propTypes = {
  mpUserProfile: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  userProfileError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
  isLoading: PropTypes.bool,
  globalMPusername: PropTypes.string,
  globalMPusernameCrypto: PropTypes.string,
  isRememberMeChecked: PropTypes.bool,
  onSignInSubmit: PropTypes.func,
  onFieldErrorSubmit: PropTypes.func,
  onSignOut: PropTypes.func,
  apiToken: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onChangeModel: PropTypes.func,
  signInRememberMeChecked: PropTypes.func,
  onFocusModel: PropTypes.func,
};

export default injectIntl(LoginButton);
