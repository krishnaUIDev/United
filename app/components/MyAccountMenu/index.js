import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './myaccountMenu.scss';

// import subnavc from './subnav-c.png';

function MyAccountMenu() {
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuGridContainer} >
        <ul className={styles.navGrid}>
          <li className={styles.menuItem1}>
            <a tabIndex="0" >My Account<span className="dropdown-tip"></span></a>
          </li>
          <li className={styles.menuItem2}>
            <a tabIndex="0" >Balance & Status<span className="dropdown-tip"></span></a>
          </li>
          <li className={styles.menuItem3}>
            <a tabIndex="0" >Profile & Preferences<span className="dropdown-tip"></span></a>
          </li>
          <li className={styles.menuItem4}>
            <a tabIndex="0" >Offers & Promotions<span className="dropdown-tip"></span></a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default MyAccountMenu;
