import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import omit from 'lodash/omit';
import { actions } from 'react-redux-form/lib/immutable';

import {
  TAB_KEY,
  ESC_KEY,
  DOWN_ARROW_KEY,
} from 'containers/App/constants';
import { SingleDatePicker, isInclusivelyAfterDay } from 'react-dates';
import {
  makeKeyboardUser,
} from 'containers/HomePage/selectors';
import {
  DATE_PICKER_PHRASES,
  DATE_DEFAULT_PROPS,
  DATE_FORMAT_ARRAY,
} from 'containers/BookCalendar/constants';

import styles from 'components/BookCalendarOneway/bookCalendarOneway.scss';

import {
  isMobile,
  isIPhone,
  isAndroid,
  isInPortraitMode,
  hasNumberOfMonths,
  hasPhoneWidth,
} from '../../utils/deviceSpecific';

moment.locale('en');

const chooseAvailableDate = ({ date }) => `${date}`;

const CustomSingleDatePickerPhrases = {
  chooseAvailableDate,
};
Object.assign(CustomSingleDatePickerPhrases, DATE_PICKER_PHRASES);

const defaultProps = {
  initialDate: null,
  id: 'startDate',
  placeholder: 'Start',
  displayFormat: () => moment.localeData().longDateFormat('ll'),
  phrases: CustomSingleDatePickerPhrases,
};
Object.assign(defaultProps, DATE_DEFAULT_PROPS); // Import shared props between calendars

const PrevIcon = () => (
  <span className={styles.prevIcon}></span>
);

const NextIcon = () => (
  <span className={styles.nextIcon}></span>
);

export class BookCalendarOneway extends Component {
  constructor(props) {
    super(props);

    // let focused = null;
    // if (props.autoFocus) {
    //   focused = 'date';
    // }

    // Calendar uses internal state but sets the input values to PropType
    this.state = {
      focused: props.autoFocus,
      date: (props.startDate) ? moment(props.startDate) : props.initialDate,
      infoPanelAria: '',
      isKeyboardUser: props.isKeyboardUser,
      isVertical: isInPortraitMode(),
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onCloseCalendar = this.onCloseCalendar.bind(this);
  }

  componentDidMount() {
    const dateInput = document.getElementById(this.props.startDateId);
    if (dateInput) {
      dateInput.onfocus = () => {
        // Show info/keyboard instructions to user if they have been navigating the form via keyboard.
        if (this.props.isKeyboardUser) {
          const infoPanel = this.singleInfoPanel;
          if (infoPanel && !infoPanel.classList.contains('keyboardUser')) {
            infoPanel.setAttribute('class', 'keyboardUser');
            setTimeout(() => {
              if (this.singleInfoPanelSpan) this.singleInfoPanelSpan.setAttribute('role', 'alert');
            }, 7000); // give it 6 seconds to read the aria-label
          }
        }

        if (isIPhone()) {
          // ensureDefinedDate
          let { date } = this.state;
          date = date || moment();
          this.setState({ date });

          setTimeout(() => {
            const dateElement = document.querySelector('.SingleDatePicker_picker .CalendarDay__selected button');
            if (dateElement) dateElement.focus();
          }, 200); // give it 0.2 seconds to open calendar UI
        }
      };

      dateInput.onkeydown = (event) => {
        const { keyCode } = event;

        if (keyCode === DOWN_ARROW_KEY) {
          setTimeout(() => {
            this.setErrors(false, 'endDate');
          }, 0);
        }

        // Closes the calendar on ESC key press or shift-tab to previous field
        if ((keyCode === TAB_KEY && event.shiftKey) || keyCode === ESC_KEY) {
          this.onCloseCalendar();
        }
      };

      dateInput.onblur = (event) => {
        let date = event.target.value;
        if (date) {
          date = moment(date, DATE_FORMAT_ARRAY);
          const validInput = this.dateChecker(date);
          if (validInput) {
            this.onDateChange(date);
            this.setErrors(false);
            // Update prop
          } else {
            this.setErrors(true);
          }
        } else {
          this.setErrors(true);
        }
      };
    }

    if (isAndroid()) {
      window.addEventListener('devicemotion', this.updateOrientation, { passive: true });
    } else if (isIPhone()) {
      window.addEventListener('orientationchange', this.updateOrientation, { passive: true });
    }
  }

  componentWillUnmount() {
    if (isAndroid()) {
      window.removeEventListener('devicemotion', this.updateOrientation, { passive: true });
    } else if (isIPhone()) {
      window.removeEventListener('orientationchange', this.updateOrientation, { passive: true });
    }
  }

  onDateChange(date) {
    this.setErrors(false);
    const dateD = !date ? date : moment(date).format('YYYY-MM-DD');
    this.props.setDepart(dateD);
    this.props.onChangeModel(this.props.departModel, dateD);
    this.setState({ date });

    if (date && !moment(this.state.date).isSame(moment(date))) {
      this.props.setFocus.passengerInput.focus();
    }
  }

  onCloseCalendar() {
    const { focused } = this.state;
    if (!focused) return;

    this.setState({
      isInputFocused: false,
      isDayPickerFocused: false,
      focused: false,
    });
  }

  setErrors(hasError) {
    if (hasError) {
      const errorMsg = `${this.props.errorMessage} date.`;
      this.props.setCalendarError('hasStartError', true);
      this.props.setCalendarError('errorMsg', errorMsg);
    } else {
      this.props.setCalendarError('hasStartError', false);
    }
  }

  updateOrientation = () => {
    const isVertical = isInPortraitMode();
    this.setState({ isVertical });
  }

  dateChecker(date) {
    // Validator for checking dates for various calendar types
    const currentDate = moment(); // get the current date
    const maxDate = moment().add(338, 'days'); // Max available date from current date
    const yearCheck = moment(date).isSameOrAfter(currentDate, 'day'); // Check to see if entered date is current or after current date
    const maxCheck = moment(date).isSameOrBefore(maxDate); // Check to see if date entered is less than the Max available date
    const isValid = moment(date).isValid(); // Everything else

    if (!yearCheck || !maxCheck || !isValid) {
      return false;
    }
    return true;
  }

  render() {
    const { date, isVertical } = this.state;
    const focus = this.state.focused;
    // Remove invalid input props from object to prevent JS warnings
    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'intl',
      'dispatch',
      'startDate',
      'store',
      'onClick',
      'storeSubscription',
      'isKeyboardUser',
      'onChangeModel',
      'startDateId',
      'departModel',
      'infoPanelText',
      'startDatePlaceholderText',
      'children',
      'errorMessage',
      'setDepart',
      'startDateErrorLabel',
      'hasCalendarErrors',
      'setFocus',
      'setCalendarError',
    ]);

    return (
      <div>
        <SingleDatePicker
          {...props}
          id={this.props.startDateId}
          date={date}
          focused={focus}
          onDateChange={this.onDateChange}
          onFocusChange={({ focused }) => this.setState({ focused })}
          displayFormat={this.props.displayFormat}
          placeholder={this.props.startDatePlaceholderText}
          screenReaderInputMessage={this.props.screenReaderInputMessage}
          navPrev={<PrevIcon />}
          navNext={<NextIcon />}
          isOutsideRange={day => // eslint-disable-line
            !isInclusivelyAfterDay(day, moment()) ||
            isInclusivelyAfterDay(day, moment().add(338, 'days'))
          }
          orientation={(isVertical) ? 'vertical' : 'horizontal'}
          {...hasNumberOfMonths()}
          withFullScreenPortal={isMobile || isIPhone() || (isAndroid() && hasPhoneWidth())}
          renderCalendarInfo={() => (
            <div
              id="infoPanel"
              ref={(input) => { this.singleInfoPanel = input; }}
            >
              <span
                id="innerInfoSpan"
                ref={(input) => { this.singleInfoPanelSpan = input; }}
              >{ this.props.infoPanelText }</span>
            </div>
          )}
          hideKeyboardShortcutsPanel
        />
        {this.props.hasCalendarErrors && this.props.hasCalendarErrors.get('hasStartError') ?
          <span
            className={(!isMobile) ? styles.inputFieldErrorMsg : styles.customErrorMsg}
            role="alert"
          >
            {this.props.hasCalendarErrors.get('errorMsg')}
          </span>
        : '' }
      </div>
    );
  }
}

BookCalendarOneway.propTypes = {
  autoFocus: PropTypes.bool,
  departModel: PropTypes.string,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  errorMessage: PropTypes.string,
  hasCalendarErrors: PropTypes.object,
  infoPanelText: PropTypes.string,
  initialDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  isKeyboardUser: PropTypes.bool,
  onChangeModel: PropTypes.func,
  screenReaderInputMessage: PropTypes.string,
  setCalendarError: PropTypes.func,
  setDepart: PropTypes.func,
  setFocus: PropTypes.object,
  startDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
};

BookCalendarOneway.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  isKeyboardUser: makeKeyboardUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCalendarOneway);
