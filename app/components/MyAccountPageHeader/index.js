import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './myaccountBreadCrums.scss';
import chaseAdd from './assets/Chase-Add.jpg';

export default class MyAccountPageHeader extends Component {
  componentDidMount() {
  }

  render() {
    //console.log('routing',this.props.match)
    return (
      <div>
        <div className={styles.gridParent}>
          <div className={styles.gridChild}>
            <div>
              <div className={styles.breadCrums}>
                <a className={styles.chaseAdvContainerLinks} href="/"> Home
                </a>&nbsp;>&nbsp;<a href="/mileageplus" className={styles.chaseAdvContainerLinks} >
                My Account </a> &nbsp;>&nbsp;<span className={styles.activity}> Activity</span></div>
            </div>
          </div>
          <div className={styles.chaseAdvContainer}>
            <img className={styles.image} alt="Chase Add" src={chaseAdd} />
          </div>
        </div>
        <div className={styles.pageHeader}>Activity</div>
      </div>
    );
  }
}

MyAccountPageHeader.propTypes = {
  currentPage: PropTypes.string,
  breadCrums: PropTypes.array,
};
