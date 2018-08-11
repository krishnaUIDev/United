import {
  FLEXIBLE_MONTH,
  FLEXIBLE_DAY,
} from './constants';

export function setFlexMonth(flexMonth) {
  return {
    type: FLEXIBLE_MONTH,
    flexMonth,
  };
}

export function setTripLength(tripLength) {
  return {
    type: FLEXIBLE_DAY,
    tripLength,
  };
}
