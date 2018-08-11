/*
 * InfoBlock
 *
 * This contains several components related information about United Airlines
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import classNames from 'classnames';

// import messages from './messages';
import styles from './info-block.scss';

import mock from './mock.jpg';

function InfoBlock() {
  return (
    <section className={styles.infoBlock}>
      <img src={mock} alt="" />
    </section>
  );
}

export default InfoBlock;
