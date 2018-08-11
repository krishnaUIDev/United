/* Mileage Plus Profile Actions */

import {
  LOAD_ACTIVITIES_LIST,
  LOAD_ACTIVITIES_LIST_SUCCESS,
  LOAD_ACTIVITY_STATEMENTS_LIST,
  LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS,
  LOAD_UPGRADE_ACTIVITY_LIST,
  ACTIVITIES_LIST_FULLLIST,
  ACTIVITIES_DATERANGE_FILTER,
  ACTIVITIES_DATERANGE_FILTER_TEXT,
  ACTIVITIES_STATEMENT_FILTER,
  ACTIVITIES_LIST_VIEWCOUNT,
  ACTIVITIES_EXPAND_ALL,
  EXPORT_ACTIVITIES_LIST,
  EXPORT_ACTIVITIES_LIST_SUCCESS,
  EXPORT_ACTIVITIES_LIST_FAILURE,
} from './constants';

export function loadActivityList() {
  return { type: LOAD_ACTIVITIES_LIST };
}
export function activityListLoaded(activityList) {
  return { type: LOAD_ACTIVITIES_LIST_SUCCESS, activityList };
}

export function exportActivityList() {
  return { type: EXPORT_ACTIVITIES_LIST };
}
export function activityListExported(activityList) {
  return { type: EXPORT_ACTIVITIES_LIST_SUCCESS, activityList };
}
export function activityListExportFailed(activityList) {
  return { type: EXPORT_ACTIVITIES_LIST_FAILURE };
}
export function loadActivityStatementList() {
  return { type: LOAD_ACTIVITY_STATEMENTS_LIST };
}
export function loadUpgradeActivity() {
  return { type: LOAD_UPGRADE_ACTIVITY_LIST };
}
export function activityStatementListLoaded(activityStatementsList) {
  return { type: LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS, activityStatementsList };
}
export function showingFullActivityList(fullList) {
  return { type: ACTIVITIES_LIST_FULLLIST, fullList };
}

export function setActivityDateRange(dateRange) {
  return { type: ACTIVITIES_DATERANGE_FILTER, dateRange };
}
export function setActivityStatement(statement) {
  return { type: ACTIVITIES_STATEMENT_FILTER, statement };
}
export function setActivityDateRangeText(text) {
  return { type: ACTIVITIES_DATERANGE_FILTER_TEXT, text };
}
export function setActivityListViewCount(activityListViewCount) {
  return { type: ACTIVITIES_LIST_VIEWCOUNT, activityListViewCount };
}
export function setActivityExpandAll(expandAll) {
  return { type: ACTIVITIES_EXPAND_ALL, expandAll };
}

