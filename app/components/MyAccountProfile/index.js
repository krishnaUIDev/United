import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import MyAccountPageHeader from '../MyAccountPageHeader';
import MyAccountMenu from '../MyAccountMenu';
import MyAccountProfileAccordion from '../MyAccountProfileAccordion';

import styles from './myaccountProfile.scss';

export default class MyAccountProfile extends Component {
  componentDidMount() {
    this.props.loadCountryListService();
    this.props.loadMileagePlusProfileService();
  }
  render() {
    return (
      <div>
        <div className={styles.profileMainDescription}>Book travel faster by saving your contact information, passport and known traveler numbers, as well as frequent flyer numbers, credit cards and more.</div>
        <MyAccountProfileAccordion
          loadMileagePlusProfileService={this.props.loadMileagePlusProfileService}
          loadCountryListService={this.props.loadCountryListService}
        />
      </div>
    );
  }
}

MyAccountProfile.propTypes = {
  loadMileagePlusProfileService: PropTypes.func,
  loadCountryListService: PropTypes.func,
};


