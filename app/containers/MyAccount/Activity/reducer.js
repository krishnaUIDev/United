import { fromJS } from 'immutable';

import {
  LOAD_ACTIVITIES_LIST,
  LOAD_ACTIVITIES_LIST_SUCCESS,
  LOAD_ACTIVITY_STATEMENTS_LIST,
  LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS,
  LOAD_UPGRADE_ACTIVITY,
  ACTIVITIES_LIST_FULLLIST,
  ACTIVITIES_LIST_VIEWCOUNT,
  ACTIVITIES_DATERANGE_FILTER,
  ACTIVITIES_DATERANGE_FILTER_TEXT,
  ACTIVITIES_STATEMENT_FILTER,
  ACTIVITIES_EXPAND_ALL,
} from './constants';

const initialState = fromJS({
  upgradeActivites: [],
  activityList: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
  },
  activityStatementsList: {
    error: false,
    loading: false,
    data: null,
    retryCount: 0,
  },
  showingFullList: false,
  activityListViewCount: 10,
  dateRange: '3',
  text: 'Last 3 months',
});

function activityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITIES_LIST:
      return state
      .setIn(['activityList', 'error'], false)
      .setIn(['activityList', 'data'], null)
      .setIn(['activityList', 'loading'], true)
      .setIn(['activityList', 'dateRange'], '3')
      .updateIn(['activityList', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_ACTIVITIES_LIST_SUCCESS:
      return state
      .setIn(['activityList', 'error'], false)
      .setIn(['activityList', 'data'], action.activityList)
      .setIn(['activityList', 'retryCount'], 0);
    case LOAD_ACTIVITY_STATEMENTS_LIST:
      return state
      .setIn(['activityStatementsList', 'error'], false)
      .setIn(['activityStatementsList', 'data'], null)
      .setIn(['activityStatementsList', 'loading'], true)
      .updateIn(['activityStatementsList', 'retryCount'], (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_ACTIVITY_STATEMENTS_LIST_SUCCESS:
      return state
      .setIn(['activityStatementsList', 'error'], false)
      .setIn(['activityStatementsList', 'data'], action.activityStatementsList)
      .setIn(['activityStatementsList', 'retryCount'], 0);

    case LOAD_UPGRADE_ACTIVITY:
      return state
      .set('upgradeActivites', action.upgradeActivites);

    case ACTIVITIES_LIST_FULLLIST:
      return state
      .set('showingFullList', action.fullList);
    case ACTIVITIES_LIST_VIEWCOUNT:
      return state
      .set('activityListViewCount', action.activityListViewCount);
    case ACTIVITIES_DATERANGE_FILTER:
      return state
      .set('dateRange', action.dateRange);
    case ACTIVITIES_DATERANGE_FILTER_TEXT:
      return state
      .set('text', action.text);
    case ACTIVITIES_EXPAND_ALL:
      return state
      .set('expandAll', action.expandAll);
    default:
      return state;
  }
}

export default activityReducer;
