/* Mileage Plus Profile Actions */

import {
    LOAD_ACTIVITIES_LIST,
    LOAD_ACTIVITIES_LIST_SUCCESS,
    LOAD_ACTIVITY_STATEMENTS_LIST,
    LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS,
    } from './constants';

export function loadActivityList() {
  return { type: LOAD_ACTIVITIES_LIST };
}
export function activityListLoaded(activityList) {
  return { type: LOAD_ACTIVITIES_LIST_SUCCESS, activityList };
}
export function loadActivityStatementList() {
  return { type: LOAD_ACTIVITY_STATEMENTS_LIST };
}
export function activityStatementListLoaded(activityStatementsList) {
  return { type: LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS, activityStatementsList };
}
export function activityDateRangeSelected(activityStatementsList) {
  // console.log('jgkgjklghglk');

    // return { type: LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS, activityStatementsList };
}
