/*
 * Inspiration Block
 *
 * Contains travel suggestions and filtering for user searches
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import classNames from 'classnames';

// import messages from './messages';

import styles from './inspirationBlock.scss';

import mock from './mock.jpg';

export class InspirationBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className={styles.inspirationBlock}>
        <img src={mock} alt="" />
      </section>
    );
  }
}

export default InspirationBlock;
