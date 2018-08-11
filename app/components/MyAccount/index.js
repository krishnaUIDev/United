/*
    This is skeleton for My Account App
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import MyAccountPageHeader from '../MyAccountPageHeader';
import MyAccountMenu from '../MyAccountMenu';

import styles from './myAccount.scss';

export default class MyAccountApp extends Component {
  render() {
    return (
      <div className={styles.mainContainer}>
        <section className={styles.headerBodySection}>
          <MyAccountPageHeader />
        </section>
        <section className={styles.menuSection}>
          {/* <MyAccountMenu /> */}
        </section>
        <section className={styles.headerBodySection}>
          <div>{this.props.children}</div>
        </section>
      </div>
    );
  }
}

MyAccountApp.propTypes = {
  children: PropTypes.node,
};
