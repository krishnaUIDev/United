import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';
import Select from 'react-select';
import { injectIntl, intlShape } from 'react-intl';

import config from 'config'; // eslint-disable-line

import {
  makeSelectGlobalRoundtripChecked,
  makeSelectGlobalFlexMonth,
  makeSelectGlobalTripLength,
} from 'containers/App/selectors';
import { FLEXIBLE_DATE_DAY_OPTIONS } from './constants';
import { setFlexMonth, setTripLength } from './actions';
import styles from './flexibleDates.scss';

import messages from './messages';

moment.locale('en');

export class FlexibleDates extends Component {
  componentWillMount() {
    this.setValuesFromGlobal(false);
  }

  componentDidMount() {
    this.setValuesFromGlobal(true);
    this.onSetComponentValues(false);
  }

  componentDidUpdate() {
    this.onSetComponentValues(true);
  }

  onSetComponentValues(didUpdate) {
    if (didUpdate) {
      this.props.onChangeModel('bookFlightModel.flexMonth', this.props.flexMonth);
      this.props.onChangeModel('bookFlightModel.tripLength', this.props.tripLength);
    }
  }

  setValuesFromGlobal(didMount) {
    if (didMount) {
      this.updateFlexMonthValue({ value: this.props.flexMonth });
      this.updateFlexDayValue({ value: this.props.tripLength });
    }
  }

  setFlexMonth() {
    this.updateFlexMonthValue();
  }

  setTripLength() {
    this.updateFlexMonthValue();
  }

  updateFlexMonthValue(newValue) {
    this.props.onSelectFlexMonth(newValue.value);
  }

  updateFlexDayValue(newValue) {
    this.props.onSelectTripLength(newValue.value);
  }

  render() {
    const flexibleDatesMonthOptions = [ // create a list of 12 months starting with the current month
      {
        value: moment().date(1).format('YYYY-MM-DD'),
        label: moment().format('MMM Y'),
      },
      {
        value: moment().date(1).add(1, 'month').format('YYYY-MM-DD'),
        label: moment().add(1, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(2, 'month').format('YYYY-MM-DD'),
        label: moment().add(2, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(3, 'month').format('YYYY-MM-DD'),
        label: moment().add(3, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(4, 'month').format('YYYY-MM-DD'),
        label: moment().add(4, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(5, 'month').format('YYYY-MM-DD'),
        label: moment().add(5, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(6, 'month').format('YYYY-MM-DD'),
        label: moment().add(6, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(7, 'month').format('YYYY-MM-DD'),
        label: moment().add(7, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(8, 'month').format('YYYY-MM-DD'),
        label: moment().add(8, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(9, 'month').format('YYYY-MM-DD'),
        label: moment().add(9, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(10, 'month').format('YYYY-MM-DD'),
        label: moment().add(10, 'month').format('MMM Y'),
      },
      {
        value: moment().date(1).add(11, 'month').format('YYYY-MM-DD'),
        label: moment().add(11, 'month').format('MMM Y'),
      },
    ];

    const intl = this.props.intl;

    return (
      <div className={styles.flexibleDates}>
        <Select
          id="flexMonth"
          name="flexMonth"
          options={flexibleDatesMonthOptions}
          onChange={(newValue) => this.updateFlexMonthValue(newValue)}
          value={this.props.flexMonth}
          clearable={false}
          openOnFocus
          className={styles.flexibleMonth}
          inputProps={{
            'aria-controls': 'flexMonthLabel',
          }}
          aria-label={intl.formatMessage(messages.searchByMonth)}
        />
        <div
          className={styles.srOnly}
          id="flexMonthLabel"
          aria-label={`${intl.formatMessage(messages.searchByMonth)} ${moment(this.props.flexMonth).format('MMMM YYYY')} ${intl.formatMessage(messages.selected)}`}
          aria-live="polite"
        ></div>
        { (this.props.flightType) ? // Only shows if Round Trip is selected
          <div className={styles.tripLength}>
            <Select
              id="tripLength"
              name="tripLength"
              options={FLEXIBLE_DATE_DAY_OPTIONS}
              onChange={(newValue) => this.updateFlexDayValue(newValue)}
              value={this.props.tripLength}
              clearable={false}
              openOnFocus
              aria-label={intl.formatMessage(messages.numberOfDays)}
              inputProps={{
                'aria-controls': 'tripLengthLabel',
              }}
            />
            <div
              className={styles.srOnly}
              id="tripLengthLabel"
              aria-label={`${intl.formatMessage(messages.numberOfDays)} ${this.props.tripLength} ${intl.formatMessage(messages.days)} ${intl.formatMessage(messages.selected)}`}
              aria-live="polite"
            ></div>
          </div>
        : ''}
      </div>
    );
  }
}

FlexibleDates.propTypes = {
  flightType: PropTypes.bool,
  onChangeModel: PropTypes.func,
  flexMonth: PropTypes.string,
  tripLength: PropTypes.string,
  onSelectFlexMonth: PropTypes.func,
  onSelectTripLength: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  flightType: makeSelectGlobalRoundtripChecked(),
  flexMonth: makeSelectGlobalFlexMonth(),
  tripLength: makeSelectGlobalTripLength(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectFlexMonth: (flexMonth) => dispatch(setFlexMonth(flexMonth)),
    onSelectTripLength: (tripLength) => dispatch(setTripLength(tripLength)),
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FlexibleDates));
