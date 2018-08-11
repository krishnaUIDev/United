import { fromJS } from 'immutable';

import statusReducer from '../reducer';
import {
  onDateSelected,
  onFlightStatusOriginLocationSelected,
  onFlightStatusDestinationLocationSelected,
  updateFlightStatusDate,
  selectedFlight,
} from '../actions';

describe('statusReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      dateSelected: '2', // current date
      flightStatusOrigin: '',
      flightStatusDestination: '',
      flightStatusDate: '',
      flightSelected: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(statusReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle onDateSelected action correctly', () => {
    const expectedResult = state
      .set('dateSelected', '1');
    expect(statusReducer(state, onDateSelected('1'))).toEqual(expectedResult);
  });
  it('should handle onFlightStatusOriginLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightStatusOrigin', 'Chicago ORD');
    expect(statusReducer(state, onFlightStatusOriginLocationSelected('Chicago ORD'))).toEqual(expectedResult);
  });
  it('should handle onFlightStatusDestinationLocationSelected action correctly', () => {
    const expectedResult = state
      .set('flightStatusDestination', 'Denver DEN');
    expect(statusReducer(state, onFlightStatusDestinationLocationSelected('Denver DEN'))).toEqual(expectedResult);
  });
  it('should handle updateFlightStatusDate action correctly', () => {
    const expectedResult = state
      .set('flightStatusDate', 'Thursday');
    expect(statusReducer(state, updateFlightStatusDate('Thursday'))).toEqual(expectedResult);
  });
  it('should handle selectedFlight action correctly', () => {
    const expectedResult = state
      .set('flightSelected', 2);
    expect(statusReducer(state, selectedFlight(2))).toEqual(expectedResult);
  });
});
