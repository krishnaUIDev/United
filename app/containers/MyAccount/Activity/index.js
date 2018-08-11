import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import MyAccountActivity from 'components/MyAccountActivity';

import {
  loadActivityList,
  loadActivityStatementList,
  loadUpgradeActivity,
} from './actions';

import {
  makeSelectActivityListData,
  makeSelectActivityStatementsListData,
  makeUpgradeActivity,
} from './selectors';

export function Activity(props) {
  return (<main className="profileContainer" role="main">
    <MyAccountActivity
      loadActivityStatementsListService={props.loadActivityStatementsListService}
      loadActivityListService={props.loadActivityListService}
      loadUpgradeActivityService={props.loadUpgradeActivityService}
    />
  </main>
  );
}

Activity.propTypes = {
  loadActivityStatementsListService: PropTypes.func,
  loadActivityListService: PropTypes.func,
  loadUpgradeActivityService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activityList: makeSelectActivityListData(),
  activityStatementsList: makeSelectActivityStatementsListData(),
  upgradeActivites: makeUpgradeActivity(),

});

export function mapDispatchToProps(dispatch) {
  return {
    loadActivityStatementsListService: () => { dispatch(loadActivityStatementList()); },
    loadActivityListService: () => { dispatch(loadActivityList()); },
    loadUpgradeActivityService: () => { dispatch(loadUpgradeActivity()); },
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccountActivity);
