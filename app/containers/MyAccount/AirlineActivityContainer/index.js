import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';
import { injectIntl } from 'react-intl';
import AirlineActivity from 'components/AirlineActivity';

import {
  loadMoreActivities,
} from './actions';

import {
  loadActivityList,
  loadUpgradeActivity,
  setActivityListViewCount,
} from '../Activity/actions';

import {
  makeSelectActivityListData,
  makeSelectActivityListFullView,
  makeSelectActivityListViewCount,
  makeUpgradeActivity,
} from '../Activity/selectors';

const mapStateToProps = createStructuredSelector({
  activityList: makeSelectActivityListData(),
  showingFullActivityList: makeSelectActivityListFullView(),
  activityListViewCount: makeSelectActivityListViewCount(),
  upgradeActivites: makeUpgradeActivity(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onViewMoreClick: (count) => { dispatch(setActivityListViewCount(count)); dispatch(loadActivityList()); },
    loadUpgradeActivity: () => { dispatch(loadUpgradeActivity()); },
    dispatch,
  };
}

const AirlineActivityContainer = injectIntl(connect(mapStateToProps, mapDispatchToProps)(AirlineActivity));

export default AirlineActivityContainer;
