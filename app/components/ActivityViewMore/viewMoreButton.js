import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styles from './viewMoreButton.scss';
import messages from './messages';

export default class ViewMoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
    };
    // this.handleView = this.handleView.bind(this);
  }
  render() {
    // debugger;
    return (

      <button className={styles.viewButton} type="button" id="viewMoreButton" onClick={this.props.handleClick}>
        {/* {this.props.name} */}
        <FormattedMessage {...messages.viewMoreActivityButton} />
      </button>

    );
  }
 }

ViewMoreButton.propTypes = {
  handleClick: PropTypes.func,
  // callBack: PropTypes.func,
};
