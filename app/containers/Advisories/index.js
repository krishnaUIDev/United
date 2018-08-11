
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeSelectAdvisoriesData, makeSelectShowAdvisories } from 'containers/HomePage/selectors';
import { loadAdvisories, showAdvisories } from 'containers/HomePage/actions';
import { SEVERE_TYPE } from 'containers/Advisories/constants';
import { createStructuredSelector } from 'reselect';
import closeIcon from './assets/close.svg';
import styles from './advisories.scss';

export class Advisories extends Component {

  componentWillMount() {
    this.props.onLoadAdvisories();
  }

  render() {
    const advisory = (this.props.advisories && this.props.advisories.length > 0) ? this.props.advisories[0] : '';
    const type = advisory.alertType;

    return (
      <div>
        {(advisory && this.props.show) ?
          <div className={(type === SEVERE_TYPE) ? styles.severe : styles.warning}>
            <a
              className={(type === SEVERE_TYPE) ? styles.severeLink : styles.warningLink}
              href={advisory.linkUrl}
              tabIndex="0"
            >
              {advisory.linkText}
            </a>
            { (type !== SEVERE_TYPE) ?
              <button
                className={styles.close}
                title="Close Advisory"
                tabIndex="0"
                onClick={() => { this.props.onShowAdvisories(false); }}
              >
                <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
              </button> : ''
          }
          </div> : ''
      }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  advisories: makeSelectAdvisoriesData(),
  show: makeSelectShowAdvisories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAdvisories: () => { dispatch(loadAdvisories()); },
    onShowAdvisories: (val) => { dispatch(showAdvisories(val)); },
  };
}

Advisories.propTypes = {
  advisories: PropTypes.array,
  onLoadAdvisories: PropTypes.func,
  show: PropTypes.bool,
  onShowAdvisories: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Advisories);
