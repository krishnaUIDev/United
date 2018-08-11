import {
  BOOK_CAR_PICKUP_TIME_SELECTED,
  BOOK_CAR_DROPOFF_TIME_SELECTED,
  BOOK_CAR_DRIVERS_AGE_SELECTED,
  BOOK_CAR_SAME_LOCATION_CHECKED,
  BOOK_CAR_HIDE_AGE_BOX_CHECKED,
  BOOK_CAR_CALENDAR_PICKUP_DATE,
  BOOK_CAR_CALENDAR_DROPOFF_DATE,
  DROPOFF_LOCATION_CHANGE,
  PICKUP_LOCATION,
} from '../constants';

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

describe('BookCarContainer Actions', () => {
  describe('onBookCarPickupTimeSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_PICKUP_TIME_SELECTED,
        pickupTime: '2pm',
      };
      expect(onBookCarPickupTimeSelected('2pm')).toEqual(expectedResult);
    });
  });
  describe('onBookCarDropoffTimeSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_DROPOFF_TIME_SELECTED,
        dropoffTime: '3pm',
      };
      expect(onBookCarDropoffTimeSelected('3pm')).toEqual(expectedResult);
    });
  });
  describe('onBookCarDriversAgeSelected', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_DRIVERS_AGE_SELECTED,
        driversAge: '18',
      };
      expect(onBookCarDriversAgeSelected('18')).toEqual(expectedResult);
    });
  });
  describe('onDropOffLocationChecked', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_SAME_LOCATION_CHECKED,
        isChecked: true,
      };
      expect(onDropOffLocationChecked(true)).toEqual(expectedResult);
    });
  });
  describe('onHideAgeBoxChecked', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_HIDE_AGE_BOX_CHECKED,
        isChecked: true,
      };
      expect(onHideAgeBoxChecked(true)).toEqual(expectedResult);
    });
  });
  describe('onSetCarPickupDate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_CALENDAR_PICKUP_DATE,
        startDate: '1/2/30',
      };
      expect(onSetCarPickupDate('1/2/30')).toEqual(expectedResult);
    });
  });
  describe('onSetCarDropoffDate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOK_CAR_CALENDAR_DROPOFF_DATE,
        endDate: '1/2/30',
      };
      expect(onSetCarDropoffDate('1/2/30')).toEqual(expectedResult);
    });
  });
  describe('dropoffLocationChange', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DROPOFF_LOCATION_CHANGE,
        location: 'Chicago',
      };
      expect(dropoffLocationChange('Chicago')).toEqual(expectedResult);
    });
  });
  describe('selectCarPickupLocation', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: PICKUP_LOCATION,
        location: 'Chicago',
      };
      expect(selectCarPickupLocation('Chicago')).toEqual(expectedResult);
    });
  });
});
