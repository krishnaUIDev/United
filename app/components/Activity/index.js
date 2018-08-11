/*
    This is skeleton for My Account Activity App
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import styles from './activity.scss';

export default class ActivityApp extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

ActivityApp.propTypes = {
  children: PropTypes.node,
};
