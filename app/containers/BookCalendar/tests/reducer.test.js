import { fromJS } from 'immutable';

import calendarReducer from '../reducer';
import {
  onSetCalendarError,
} from '../actions';

describe('calendarReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      flightErrors: {
        hasStartError: false,
        hasEndError: false,
        errorMsg: '',
      },
      hotelErrors: {
        hasStartError: false,
        hasEndError: false,
        hasStayLengthError: false,
        errorMsg: '',
      },
      carErrors: {
        hasStartError: false,
        hasEndError: false,
        errorMsg: '',
      },
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(calendarReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle FLIGHT_CALENDAR_ERROR action', () => {
    const startError = onSetCalendarError('hasStartError', true);
    const newState = calendarReducer(undefined, startError);
    const expected = fromJS({
      flightErrors: {
        hasStartError: true,
        hasEndError: false,
        errorMsg: '',
      },
      hotelErrors: {
        hasStartError: false,
        hasEndError: false,
        hasStayLengthError: false,
        errorMsg: '',
      },
      carErrors: {
        hasStartError: false,
        hasEndError: false,
        errorMsg: '',
      },
    });
    expect(newState).toEqual(expected);
  });
});

