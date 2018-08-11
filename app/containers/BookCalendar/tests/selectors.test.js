import { fromJS } from 'immutable';

import {
  selectCalendar,
} from '../selectors';

describe('selectCalendar', () => {
  it('should select the calendar state', () => {
    const calendarState = fromJS({
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
    const mockedState = fromJS({
      calendar: calendarState,
    });
    expect(selectCalendar(mockedState)).toEqual(calendarState);
  });
});
