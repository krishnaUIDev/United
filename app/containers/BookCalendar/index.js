import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import { createStructuredSelector } from 'reselect';
import momentPropTypes from 'react-moment-proptypes';

import BookCalendarRoundtrip from 'components/BookCalendarRoundtrip';
import BookCalendarOneway from 'components/BookCalendarOneway';
import {
  makeSelectGlobalRoundtripChecked,
  makeSelectGlobalFlightStartDate,
  makeSelectGlobalFlightEndDate,
} from 'containers/App/selectors';
import {
  makeSelectHasFlightCalendarErrors,
} from './selectors';

export function BookCalendar(props) {
  return (
    <div>
      { (props.flightType) ?
        <BookCalendarRoundtrip
          setFocus={props.setFocus}
          startDate={props.startDate}
          endDate={props.endDate}
          startDateId={props.startDateId}
          endDateId={props.endDateId}
          departModel={props.departModel}
          returnModel={props.returnModel}
          startDatePlaceholderText={props.startDatePlaceholderText}
          endDatePlaceholderText={props.endDatePlaceholderText}
          screenReaderInputMessage={props.screenReaderInputMessage}
          infoPanelText={props.infoPanelText}
          displayFormat={props.displayFormat}
          setDepart={props.setDepart}
          setReturn={props.setReturn}
          setFocusedInput={props.setFocusedInput}
          errorMessage={props.errorMessage}
          startDateErrorLabel={props.startDateErrorLabel}
          endDateErrorLabel={props.endDateErrorLabel}
          setCalendarError={props.setCalendarError}
          hasCalendarErrors={props.hasCalendarErrors}
        />
        :
          <BookCalendarOneway
            setFocus={props.setFocus}
            startDate={props.startDate}
            startDateId={props.startDateId}
            departModel={props.departModel}
            startDatePlaceholderText={props.startDatePlaceholderText}
            screenReaderInputMessage={props.screenReaderInputMessage}
            infoPanelText={props.infoPanelText}
            displayFormat={props.displayFormat}
            setDepart={props.setDepart}
            errorMessage={props.errorMessage}
            startDateErrorLabel={props.startDateErrorLabel}
            setCalendarError={props.setCalendarError}
            hasCalendarErrors={props.hasCalendarErrors}
          />
      }
    </div>
  );
}

BookCalendar.propTypes = {
  setFocus: PropTypes.object,
  departModel: PropTypes.string,
  displayFormat: PropTypes.string,
  endDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  endDateErrorLabel: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  errorMessage: PropTypes.string,
  flightType: PropTypes.bool,
  infoPanelText: PropTypes.string,
  hasCalendarErrors: PropTypes.object,
  returnModel: PropTypes.string,
  screenReaderInputMessage: PropTypes.string,
  setCalendarError: PropTypes.func,
  setDepart: PropTypes.func,
  setReturn: PropTypes.func,
  startDate: PropTypes.oneOfType([momentPropTypes.momentObj, PropTypes.string]),
  startDateErrorLabel: PropTypes.string,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  setFocusedInput: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  flightType: makeSelectGlobalRoundtripChecked(),
  startDate: makeSelectGlobalFlightStartDate(),
  endDate: makeSelectGlobalFlightEndDate(),
  hasCalendarErrors: makeSelectHasFlightCalendarErrors(),
});

export default connect(mapStateToProps)(BookCalendar);
