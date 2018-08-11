import { fromJS } from 'immutable';

import bookCarReducer from '../reducer';
import {
  onBookCarPickupTimeSelected,
  onBookCarDropoffTimeSelected,
  onBookCarDriversAgeSelected,
  onDropOffLocationChecked,
  onHideAgeBoxChecked,
  onSetCarPickupDate,
  onSetCarDropoffDate,
  dropoffLocationChange,
  selectCarPickupLocation,
} from '../actions';

describe('bookCarReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      dropoffTime: '10|0',
      pickupTime: '10|0',
      driversAge: '',
      sameLocationChecked: true,
      hideAgeBox: true,
      pickupDate: null,
      dropoffDate: null,
      dropoffLocation: '',
      pickupLocation: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(bookCarReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should handle onBookCarPickupTimeSelected action correctly', () => {
    const expectedResult = state
      .set('pickupTime', '1');
    expect(bookCarReducer(state, onBookCarPickupTimeSelected('1'))).toEqual(expectedResult);
  });
  it('should handle onBookCarDropoffTimeSelected action correctly', () => {
    const expectedResult = state
      .set('dropoffTime', '1');
    expect(bookCarReducer(state, onBookCarDropoffTimeSelected('1'))).toEqual(expectedResult);
  });
  it('should handle onBookCarDriversAgeSelected action correctly', () => {
    const expectedResult = state
      .set('driversAge', '18');
    expect(bookCarReducer(state, onBookCarDriversAgeSelected('18'))).toEqual(expectedResult);
  });
  it('should handle onDropOffLocationChecked action correctly', () => {
    const expectedResult = state
      .set('sameLocationChecked', false);
    expect(bookCarReducer(state, onDropOffLocationChecked(false))).toEqual(expectedResult);
  });
  it('should handle onHideAgeBoxChecked action correctly', () => {
    const expectedResult = state
      .set('hideAgeBox', false);
    expect(bookCarReducer(state, onHideAgeBoxChecked(false))).toEqual(expectedResult);
  });
  it('should handle onSetCarPickupDate action correctly', () => {
    const expectedResult = state
      .set('pickupDate', 'Wednesday');
    expect(bookCarReducer(state, onSetCarPickupDate('Wednesday'))).toEqual(expectedResult);
  });
  it('should handle onSetCarDropoffDate action correctly', () => {
    const expectedResult = state
      .set('dropoffDate', 'Wednesday');
    expect(bookCarReducer(state, onSetCarDropoffDate('Wednesday'))).toEqual(expectedResult);
  });
  it('should handle dropoffLocationChange action correctly', () => {
    const expectedResult = state
      .set('dropoffLocation', 'Chicago');
    expect(bookCarReducer(state, dropoffLocationChange('Chicago'))).toEqual(expectedResult);
  });
  it('should handle selectCarPickupLocation action correctly', () => {
    const expectedResult = state
      .set('pickupLocation', 'Chicago');
    expect(bookCarReducer(state, selectCarPickupLocation('Chicago'))).toEqual(expectedResult);
  });
});
