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
import {
  DateRangePicker,
  isInclusivelyAfterDay,
} from 'react-dates';
import {
  makeKeyboardUser,
} from 'containers/HomePage/selectors';
import {
  DATE_PICKER_PHRASES,
  DATE_DEFAULT_PROPS,
  DATE_FORMAT_ARRAY,
} from 'containers/BookCalendar/constants';

import styles from './bookCalendarRoundtrip.scss';

import {
  isMobile,
  isIPhone,
  isAndroid,
  isInPortraitMode,
  hasNumberOfMonths,
  hasPhoneWidth,
} from '../../utils/deviceSpecific';


moment.locale('en');

const chooseAvailableStartDate = ({ date }) => `${date}`;
const chooseAvailableEndDate = ({ date }) => `${date}`;

const CustomDateRangePickerPhrases = {
  chooseAvailableStartDate,
  chooseAvailableEndDate,
};
Object.assign(CustomDateRangePickerPhrases, DATE_PICKER_PHRASES);

const defaultProps = {
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  showClearDates: false,
  reopenPickerOnClearDates: false,
  startDateId: 'startDate',
  startDatePlaceholderText: 'Start',
  endDateId: 'endDate',
  endDatePlaceholderText: 'End',
  minimumNights: 0,
  isDayBlocked: () => false,
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('ll'),
  phrases: CustomDateRangePickerPhrases,
};
Object.assign(defaultProps, DATE_DEFAULT_PROPS); // Import shared props between calendars

const PrevIcon = () => (
  <span className={styles.prevIcon}></span>
);

const NextIcon = () => (
  <span className={styles.nextIcon}></span>
);

export class BookCalendarRoundtrip extends Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = this.props.startDateId;
    } else if (props.autoFocusEndDate) {
      focusedInput = this.props.endDateId;
    }

    this.state = {
      focusedInput,
      startDate: (props.startDate) ? moment(props.startDate) : props.initialStartDate,
      endDate: (props.endDate) ? moment(props.endDate) : props.initialEndDate,
      isKeyboardUser: props.isKeyboardUser,
      keepOpenOnDateSelect: false,
      isVertical: isInPortraitMode(),
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onCloseCalendar = this.onCloseCalendar.bind(this);
  }

  componentDidMount() {
    const startDateInput = document.getElementById(this.props.startDateId);
    const endDateInput = document.getElementById(this.props.endDateId);
    if (startDateInput) {
      startDateInput.style.textAlign = 'unset';
    }
    if (endDateInput) {
      endDateInput.style.textAlign = 'right';
    }

    if (startDateInput || endDateInput) {
      // Define all the ways users can enter dates for moment to parse through.
      startDateInput.onfocus = () => {
        // Show info/keyboard instructions to user if they have been navigating the form via keyboard.
        if (this.props.isKeyboardUser) {
          const infoPanel = this.infoPanel;
          if (infoPanel && !infoPanel.classList.contains('keyboardUser')) {
            infoPanel.setAttribute('class', 'keyboardUser');
            setTimeout(() => {
              if (this.infoPanelSpan) this.infoPanelSpan.setAttribute('role', 'alert');
            }, 7000); // give it 6 seconds to read the aria-label
          }
        }

        if (isIPhone()) {
          setTimeout(() => {
            const startDateEl = document.querySelector('.DateRangePicker_picker .CalendarDay__selected_start button');
            if (startDateEl) startDateEl.focus();
          }, 200); // give it 0.2 seconds to open calendar UI
        }
      };

      endDateInput.onfocus = () => {
        if (isIPhone()) {
          setTimeout(() => {
            const endDateEl = document.querySelector('.DateRangePicker_picker .CalendarDay__selected_end button');
            if (endDateEl) endDateEl.focus();

            // @NOTE when both start and end date fields are empty, startDate get assigned first regardless of the focused field
            const startDateEl = document.querySelector('.DateRangePicker_picker .CalendarDay__selected_start button');
            if (startDateEl) startDateEl.focus();
          }, 200); // give it 0.2 seconds to open calendar UI
        }
      };

      startDateInput.onkeydown = (event) => {
        const { keyCode } = event;

        if (keyCode === DOWN_ARROW_KEY) {
          setTimeout(() => {
            this.setErrors(false, 'startDate');
          }, 0);
        }

        // Closes the calendar on ESC key press or shift-tab to previous field
        if ((keyCode === TAB_KEY && event.shiftKey) || keyCode === ESC_KEY) {
          this.onCloseCalendar();
        }
      };

      startDateInput.onblur = (event) => {
        let startDate = event.target.value;
        if (startDate) {
          startDate = moment(startDate, DATE_FORMAT_ARRAY);
          const endDate = (this.state.endDate) ? moment(this.state.endDate) : null;
          const validInput = this.dateChecker(startDate, endDate);
          const stayLengthCheck = (this.props.maximumStayLength && startDate && endDate) ? this.stayLengthCheck(startDate, endDate, this.props.maximumStayLength) : true;
          if (validInput && stayLengthCheck) {
            // Clear of all errors, set dates
            this.onDatesChange({ startDate });
            this.setErrors(false, 'startDate');
            this.setErrors(false, 'stayLength');
          } else if (!stayLengthCheck && validInput) {
            // Valid input, but stay length exceeds range
            this.setErrors(false, 'both');
            this.setErrors(true, 'stayLength', 'stayLength');
          } else if (stayLengthCheck && !validInput) {
            // Invalid input
            this.setErrors(false, 'stayLength');
            this.setErrors(true, 'startDate', 'common');
          } else {
            // Invalid input and stay length, but flag only the invalid input
            this.setErrors(true, 'startDate', 'common');
          }
        } else {
          // No value entered (blank)
          this.setErrors(true, 'startDate', 'common');
        }
      };

      endDateInput.onkeydown = (event) => {
        const { keyCode } = event;

        if (keyCode === DOWN_ARROW_KEY) {
          setTimeout(() => {
            this.setErrors(false, 'endDate');
          }, 0);
        }

        if (keyCode === ESC_KEY) {
          this.onCloseCalendar();
        }
      };

      endDateInput.onblur = (event) => {
        let endDate = event.target.value;
        if (endDate) {
          endDate = moment(endDate, DATE_FORMAT_ARRAY);
          const startDate = (this.state.startDate) ? moment(this.state.startDate) : null;
          const validInput = this.dateChecker(startDate, endDate);
          const stayLengthCheck = (this.props.maximumStayLength && startDate && endDate) ? this.stayLengthCheck(startDate, endDate, this.props.maximumStayLength) : true;
          if (validInput && stayLengthCheck) {
            // Clear of all errors, set dates
            this.onDatesChange({ endDate });
            this.setErrors(false, 'endDate');
            this.setErrors(false, 'stayLength');
          } else if (!stayLengthCheck && validInput) {
            // Valid input, but stay length exceeds range
            this.setErrors(false, 'both');
            this.setErrors(true, 'stayLength', 'stayLength');
          } else if (stayLengthCheck && !validInput) {
            // Invalid input
            this.setErrors(false, 'stayLength');
            this.setErrors(true, 'endDate', 'common');
          } else {
            // Invalid input and stay length, but flag only the invalid input
            this.setErrors(true, 'endDate', 'common');
          }
        } else {
          this.setErrors(true, 'endDate', 'common');
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

  onDatesChange({ startDate, endDate }) {
    const stayLengthCheck = (this.props.maximumStayLength && startDate && endDate) ? this.stayLengthCheck(startDate, endDate, this.props.maximumStayLength) : true;
    if (!stayLengthCheck) {
      this.setErrors(true, 'stayLength', 'stayLength');
    } else {
      this.setErrors(false, 'stayLength');
    }
    const endDateCompare = endDate && moment(endDate).format('YYYY-MM-DD');
    const endDateState = this.state.endDate && moment(this.state.endDate).format('YYYY-MM-DD');
    if (endDateCompare && endDateCompare !== endDateState) {
      if (this.props.returnModel.includes('bookFlightModel')) {
        this.props.setFocus.passengerInput.focus();
      } else if (this.props.returnModel.includes('bookHotelModel')) {
        this.props.setFocus.focus();
      } else if (this.props.returnModel.includes('bookCarModel')) {
        this.props.setFocus.focus();
      }
    }
    if (startDate && this.state.startDate !== startDate) {
      this.setErrors(false, 'startDate');
      const startDateD = moment(startDate).format('YYYY-MM-DD');
      this.props.setDepart(startDateD);
      this.setState({ startDate });
      this.props.onChangeModel(this.props.departModel, startDateD);
    } else if (endDate && this.state.endDate !== endDate) {
      this.setErrors(false, 'endDate');
      const endDateD = moment(endDate).format('YYYY-MM-DD');
      this.props.setReturn(endDateD);
      this.setState({ endDate });
      this.props.onChangeModel(this.props.returnModel, endDateD);
    } else {
      this.setErrors(false, 'startDate');
      this.setErrors(false, 'endDate');
      this.props.setDepart(startDate);
      this.props.setReturn(endDate);
      this.props.onChangeModel(this.props.departModel, startDate);
      this.props.onChangeModel(this.props.returnModel, endDate);
      this.setState({ startDate, endDate });
    }
  }

  onFocusChange(focusedInput) {
    const { startDate, endDate } = this.ensureDefinedDates(focusedInput);
    this.setState({ focusedInput, startDate, endDate });
    this.props.setFocusedInput(focusedInput);
  }

  onCloseCalendar() {
    this.setState({
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });

    this.onFocusChange(null);
  }

  setErrors(hasError, inputName, type) {
    let errorMsg = this.props.hasCalendarErrors.get('errorMsg') || '';

    if (hasError) {
      let directionLabel = '';
      // Update internal calendar state and set error message for display
      switch (type) {
        case 'stayLength':
          // Date range exceeds stay length. Set error flag on both inputs.
          this.props.setCalendarError('hasStayLengthError', true);
          this.props.setCalendarError('errorMsg', this.props.stayLengthErrorMsg);
          break;
        case 'common':
          // Build a custom error message depending on start/end dates
          if (inputName === 'startDate') {
            this.props.setCalendarError('hasStartError', true);
          } else {
            this.props.setCalendarError('hasEndError', true);
          }
          directionLabel = (inputName === 'startDate') ? this.props.startDateErrorLabel : this.props.endDateErrorLabel;
          errorMsg = `${this.props.errorMessage} ${directionLabel} date.`;
          this.props.setCalendarError('errorMsg', errorMsg);
          break;
        default:
          if (inputName === 'startDate') {
            this.props.setCalendarError('hasStartError', true);
          } else {
            this.props.setCalendarError('hasEndError', true);
          }
          this.props.setCalendarError('errorMsg', this.props.errorMessage);
          break;
      }
    } else {
      switch (inputName) {
        case 'startDate':
          this.props.setCalendarError('hasStartError', false);
          break;
        case 'endDate':
          this.props.setCalendarError('hasEndError', false);
          break;
        case 'stayLength':
          this.props.setCalendarError('hasStayLengthError', false);
          break;
        case 'both':
          this.props.setCalendarError('hasStartError', false);
          this.props.setCalendarError('hasEndError', false);
          break;
        case 'all':
          this.props.setCalendarError('hasStartError', false);
          this.props.setCalendarError('hasEndError', false);
          this.props.setCalendarError('hasStayLengthError', false);
          this.props.setCalendarError('errorMsg', '');
          break;
        default:
          break;
      }
    }
  }

  updateOrientation = () => {
    const isVertical = isInPortraitMode();
    this.setState({ isVertical });
  }

  ensureDefinedDates = (focusedInput) => {
    // @NOTE make sure start/endDate is never undefined/null, this will ensure VO works as expected
    let { startDate, endDate } = this.state;
    if (!isIPhone()) return { startDate, endDate };

    const isStartDateFocused = focusedInput === this.props.startDateId ||
      focusedInput === 'startDate';

    const isEndDateFocused = focusedInput === this.props.endDateId ||
      focusedInput === 'endDate';

    if (isStartDateFocused) {
      startDate = !startDate ? (this.props.startDate || moment()) : startDate;
    } else if (isEndDateFocused) {
      endDate = !endDate ? (this.props.endDate || moment()) : endDate;
    }

    return { startDate, endDate };
  }

  stayLengthCheck(startDate, endDate, length) {
    let stayLengthCheck = true;
    if (startDate && endDate && length) {
      stayLengthCheck = moment(endDate).diff(moment(startDate), 'days') <= length;
    }
    return stayLengthCheck;
  }

  dateChecker(startDate, endDate) {
    // Validator for checking dates for various calendar types
    const startDateCheck = startDate || this.state.startDate;
    const endDateCheck = endDate || this.state.endDate;
    const currentDate = moment(); // get the current date
    const maxDate = moment().add(338, 'days'); // Max available date from current date
    const startYearCheck = moment(startDateCheck).isSameOrAfter(currentDate, 'day'); // Check to see if entered date is current or after current date
    const startMaxCheck = moment(startDateCheck).isSameOrBefore(maxDate);
    const startIsValid = moment(startDateCheck).isValid(); // Everything else
    const endYearCheck = moment(endDateCheck).isSameOrAfter(currentDate, 'day'); // Check to see if entered date is current or after current date
    const endMaxCheck = moment(endDateCheck).isSameOrBefore(maxDate);
    const endIsValid = moment(endDateCheck).isValid(); // Everything else

    // Check to see if end date is after start date
    const isEndBeforeStart = (startDateCheck && endDateCheck) ? moment(endDateCheck).isSameOrAfter(startDateCheck, 'day') : true;
    if (startDateCheck && endDateCheck) {
      if (!startYearCheck || !endYearCheck || !startMaxCheck || !endMaxCheck || !startIsValid || !endIsValid || !isEndBeforeStart) {
        return false;
      }
    } else if (startDateCheck && !endDateCheck) {
      if (!startYearCheck || !startMaxCheck || !startIsValid) {
        return false;
      }
    } else if (!startDateCheck && endDateCheck) {
      if (!endYearCheck || !endMaxCheck || !endIsValid) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  isOpened() {
    const { focusedInput } = this.state;
    return focusedInput === this.props.startDateId || focusedInput === this.props.endDateId;
  }

  render() {
    const { focusedInput, keepOpenOnDateSelect, isVertical } = this.state;
    const startDate = ((this.state.startDate === null) && (this.props.startDate !== null)) ? moment(this.props.startDate) : this.state.startDate;
    const endDate = ((this.state.endDate === null) && (this.props.endDate !== null)) ? moment(this.props.endDate) : this.state.endDate;
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'setDepart',
      'setReturn',
      'intl',
      'dispatch',
      'store',
      'onClick',
      'storeSubscription',
      'isKeyboardUser',
      'onChangeModel',
      'departModel',
      'returnModel',
      'infoPanelText',
      'children',
      'errorMessage',
      'maximumStayLength',
      'stayLengthErrorMsg',
      'startDateErrorLabel',
      'endDateErrorLabel',
      'hasCalendarErrors',
      'setCalendarError',
      'setFocus',
      'setFocusedInput',
    ]);

    return (
      <div>
        <DateRangePicker
          {...props}
          onDatesChange={this.onDatesChange}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          displayFormat={this.props.displayFormat}
          startDatePlaceholderText={this.props.startDatePlaceholderText}
          endDatePlaceholderText={this.props.endDatePlaceholderText}
          screenReaderInputMessage={this.props.screenReaderInputMessage}
          navPrev={<PrevIcon />}
          navNext={<NextIcon />}
          isOutsideRange={day => // eslint-disable-line
            !isInclusivelyAfterDay(day, moment()) ||
            isInclusivelyAfterDay(day, moment().add(338, 'days'))
          }
          {...hasNumberOfMonths()}
          orientation={(isVertical) ? 'vertical' : 'horizontal'}
          withFullScreenPortal={isMobile || isIPhone() || (isAndroid() && hasPhoneWidth())}
          renderCalendarInfo={() => (
            <div
              id="infoPanel"
              ref={(input) => { this.infoPanel = input; }}
            >
              <span
                id="innerInfoSpan"
                ref={(input) => { this.infoPanelSpan = input; }}
              >{ this.props.infoPanelText }</span>
            </div>
          )}
          hideKeyboardShortcutsPanel
        />
        {this.props.hasCalendarErrors && ((this.props.hasCalendarErrors.get('hasStartError') || this.props.hasCalendarErrors.get('hasEndError') || this.props.hasCalendarErrors.get('hasStayLengthError'))) ?
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

BookCalendarRoundtrip.propTypes = {
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  departModel: PropTypes.string,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  endDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  endDateErrorLabel: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  errorMessage: PropTypes.string,
  hasCalendarErrors: PropTypes.object,
  infoPanelText: PropTypes.string,
  initialStartDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  initialEndDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  isKeyboardUser: PropTypes.bool,
  maximumStayLength: PropTypes.number,
  onChangeModel: PropTypes.func,
  returnModel: PropTypes.string,
  screenReaderInputMessage: PropTypes.string,
  setCalendarError: PropTypes.func,
  setDepart: PropTypes.func,
  setFocus: PropTypes.object,
  setReturn: PropTypes.func,
  startDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  startDateErrorLabel: PropTypes.string,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  stayLengthErrorMsg: PropTypes.string,
  setFocusedInput: PropTypes.func,
};

BookCalendarRoundtrip.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  isKeyboardUser: makeKeyboardUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCalendarRoundtrip);
