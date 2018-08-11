import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import LoaderIndicatorRing from 'components/LoaderIndicatorRing';
import messages from './messages';
import styles from './myTrips.scss';

import MyTripsForm from '../MyTripsForm/index';
import MyTripsSegmentList from '../MyTripsSegmentList/index';

export class MyTrips extends Component {

  setAriaMessage() {
    setTimeout(() => { this.props.setAriaLiveMessage(this.props.intl.formatMessage(messages.ariaLiveMessage)); }, 100);
  }
  showMyTripsSegment() {
    const showMyTripsResult = this.props.myTripsData;
    return (this.props.isLoggedIn && showMyTripsResult) ?
      <MyTripsSegmentList
        myTripsData={this.props.myTripsData}
        resetMyTripsData={this.props.resetMyTripsData}
        tripInfoFormattedData={this.props.tripInfoFormattedData}
      />
     :
        <MyTripsForm />;
  }

  render() {
    return (
      <div className={styles.tripsContainer}>
        {(this.props.isLoading) ? this.setAriaMessage() : ''}
        {(this.props.isLoading) ?
          <div className={styles.loaderContainer}>
            <div className={styles.loadingRing}>
              <LoaderIndicatorRing
                className={styles.ldsRingBlue}
              />
            </div>
          </div>
          : <div className={styles.tripsData}>
            {this.showMyTripsSegment()}
          </div>
        }
      </div>
    );
  }
}

MyTrips.propTypes = {
  setAriaLiveMessage: PropTypes.func,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  myTripsData: PropTypes.array,
  resetMyTripsData: PropTypes.func,
  tripInfoFormattedData: PropTypes.array,
  intl: intlShape.isRequired,
};

export default injectIntl(MyTrips);
