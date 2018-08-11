import { createSelector } from 'reselect';


const selectActivity = (state) => state.get('activity');

const makeSelectActivityListData = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.getIn(['activityList', 'data'])
);

const makeSelectActivityListDateRange = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.get('dateRange')
);

const makeSelectActivityListDateRangeText = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.get('text')
);

const makeSelectActivityExpandAll = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.get('expandAll')
);

const makeSelectActivityListViewCount = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.get('activityListViewCount')
);

const makeSelectActivityListFullView = () => createSelector(
  selectActivity,
  (activityListState) => activityListState.get('showingFullList')
);

const makeSelectActivityStatementsListData = () => createSelector(
  selectActivity,
  (activityStatementsListState) => activityStatementsListState.getIn(['activityStatementsList', 'data'])
);

const makeUpgradeActivity = () => createSelector(
  selectActivity,
  (UpgradeActivityState) => UpgradeActivityState.get('upgradeActivites')
);

export {
  makeSelectActivityListData,
  makeSelectActivityStatementsListData,
  makeUpgradeActivity,
  makeSelectActivityListDateRange,
  makeSelectActivityListDateRangeText,
  makeSelectActivityListViewCount,
  makeSelectActivityListFullView,
  makeSelectActivityExpandAll,
};
