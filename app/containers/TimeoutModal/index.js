/*
 * TimeoutModal
 */

import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSessionTimeoutVisibility } from 'containers/App/selectors';
import { showHideTimeoutModal } from 'containers/App/actions';

import { TIMEOUT_TOKEN, TIMEOUT_INACTIVE, TIMEOUT_CLOSE } from './constants';


// styles
import styles from './timeoutmodal.scss';

// images
import exclamationIcon from './assets/exclamation_icon.svg';

import messages from './messages';

export class TimeoutModal extends Component { // eslint-disable-line
  render() {
    let bodyTxt;
    let headerTxt;
    let modalStyle;
    switch (this.props.timeoutType) {
      case TIMEOUT_TOKEN:
        bodyTxt = messages.tokenTimeoutBody.defaultMessage;
        headerTxt = messages.tokenTimeoutHeader.defaultMessage;
        modalStyle = styles.timeoutModalContainer;
        break;
      case TIMEOUT_INACTIVE:
        bodyTxt = messages.inactiveTimeoutBody.defaultMessage;
        headerTxt = messages.inactiveTimeoutHeader.defaultMessage;
        modalStyle = styles.inactiveModalContainer;
        break;
      default:
        break;
    }

    return (
      <Modal
        isOpen={this.props.timeoutType === TIMEOUT_TOKEN || this.props.timeoutType === TIMEOUT_INACTIVE}
        className={modalStyle}
        overlayClassName={{
          base: styles.overlayClass,
          afterOpen: styles.overlayClassAfterOpen,
          beforeClose: styles.overlayClassAfterClose,
        }}
      >
        <div className={styles.header}>
          <img
            src={exclamationIcon}
            alt=""
            role="presentation"
            aria-hidden="true"
            className={styles.exclamationIcon}
          />
          <span className={styles.headerTxtStyle} tabIndex="0">{headerTxt}</span>
        </div>
        <div
          className={styles.body}
          role="alertdialog"
          aria-label={bodyTxt}
          id="modalBodyTxt"
        >{bodyTxt}</div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => this.props.showHideTimeoutModal(TIMEOUT_CLOSE)}
            className={classNames(styles.btnDefault, styles.primaryButton)}
          >
            {messages.timeoutButton.defaultMessage}
          </button>
        </div>
      </Modal>
    );
  }
}

TimeoutModal.propTypes = {
  timeoutType: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  showHideTimeoutModal: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    showHideTimeoutModal: (action) => dispatch(showHideTimeoutModal(action)),
  };
}

const mapStateToProps = createStructuredSelector({
  timeoutType: makeSelectSessionTimeoutVisibility(),
});


export default connect(mapStateToProps, mapDispatchToProps)(TimeoutModal);
