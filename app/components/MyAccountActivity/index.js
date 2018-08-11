import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActivitiesViewContainer from 'containers/MyAccount/ActivitiesViewContainer';

export default class MyAccountActivity extends Component {
  componentDidMount() {
    this.props.loadActivityStatementsListService();
    this.props.loadActivityListService();
    this.props.loadUpgradeActivityService();
  }
  render() { 
    return (
      <div>
        <ActivitiesViewContainer />
      </div>
    );
  }
}

MyAccountActivity.propTypes = {
  loadActivityStatementsListService: PropTypes.func,
  loadActivityListService: PropTypes.func,
  loadUpgradeActivityService: PropTypes.func
};
