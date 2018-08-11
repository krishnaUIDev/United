import React from 'react';
// import './activity.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styles from './upgradeActivity.scss';
import messages from './messages';

function displayUpgradeActivities(upgradeActivities) {
  if (upgradeActivities) {
    return upgradeActivities.map(activity => {
      const activityMiles = activity.TotalMiles >= 0
      ? activity.TotalMiles > 1 ? `${activity.TotalMiles.toLocaleString()} GPUs ` : `${activity.TotalMiles}  GPU` :
      (activity.TotalMiles < -1 ? `(${(-1 * activity.TotalMiles).toLocaleString()}  RPUs` + ')' : `(${-1 * activity.TotalMiles}  RPU`+ ')');
      return (
        <ul className={styles.listitems}>
          <li tabIndex="0" className={classNames(styles.activityContainer)} key={activity}>
            <span className={classNames(styles.activityMiles, styles.transactionDate, styles.boxes, styles.box1)}>{activity.TransactionDate} </span>
            <span className={classNames(styles.activityMiles, styles.description, styles.descColor, styles.boxes, styles.box2)}>{activity.Description} </span>
            <span className={classNames(styles.activityMiles, styles.miles, styles.boxes, styles.box3)}>{activityMiles}
              {/*  <a href="#" className={styles.activityMiles} ></a> */}</span></li>
        </ul>
      );
    });
  }
}

const UpgradeActivity = (props) => (
  <section>
    <header className={styles.upgradeheader}><FormattedMessage {...messages.UpgradeHeader} /> <span className={styles.actdetails}>{props.dateRange}</span></header>

    <div className={styles.containermargin}>
      <p className={styles.upgradetext}><FormattedMessage {...messages.UpgradeText} /></p>
      {displayUpgradeActivities(props.upgradeActivities)}
    </div>
  </section>
);
export default UpgradeActivity;

UpgradeActivity.propTypes = {
  upgradeActivities: PropTypes.any,
};
