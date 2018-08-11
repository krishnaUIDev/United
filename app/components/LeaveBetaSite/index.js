import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import config from 'config'; // eslint-disable-line

import styles from './leaveBetaSite.scss';
import messages from './messages';

export class LeaveBetaSite extends Component {
  onRedirectToUALBase() {
    this.delCookie('IsBetaActive');
    window.location = `${config.UAL_BASE_URL}?MobileOff=1`;
  }

  delCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999;domain=.united.com`;
  }

  render() {
    return (
      <div>
        <button
          className={styles.returnToUAL}
          onClick={() => this.onRedirectToUALBase()}
        >
          <FormattedMessage {...messages.leaveBetaSite} />
        </button>
      </div>
    );
  }
}

LeaveBetaSite.propTypes = {
};

export default LeaveBetaSite;
