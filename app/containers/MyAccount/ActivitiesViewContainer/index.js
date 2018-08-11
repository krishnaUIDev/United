import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import ActivitiesView from 'components/ActivitiesView';


import {
  makeSelectActivityListData,
  makeSelectActivityStatementsListData,
  makeSelectActivityListDateRange,
  makeSelectActivityListDateRangeText,
  makeSelectActivityExpandAll,
} from '../Activity/selectors';

import {
  setActivityDateRange,
  setActivityDateRangeText,
  setActivityStatement,
  loadActivityList,
  exportActivityList,
  setActivityListViewCount,
  setActivityExpandAll,
} from '../Activity/actions';

const mapStateToProps = createStructuredSelector({
  activityList: makeSelectActivityListData(),
  activityStatementsList: makeSelectActivityStatementsListData(),
  selectedActivtyDateRange: makeSelectActivityListDateRange(),
  selectedActivtyDateRangeText: makeSelectActivityListDateRangeText(),
  expandAll: makeSelectActivityExpandAll(),
});

export function mapDispatchToProps(dispatch) {
  return {
    activityDateRangeSelected: (dateRange) => { dispatch(setActivityListViewCount(10)); dispatch(setActivityDateRange(dateRange)); dispatch(loadActivityList()); },
    activityDateRangeSelectedText: (text) => { dispatch(setActivityDateRangeText(text)); dispatch(loadActivityList()); },
    activityExpandAll: (expandAll) => { dispatch(setActivityExpandAll(expandAll)); dispatch(loadActivityList()); },
    exportActivities: () => dispatch(exportActivityList()),
    dispatch,
  };
}
const ActivitiesViewContainer = connect(mapStateToProps, mapDispatchToProps)(ActivitiesView);
ActivitiesViewContainer.defaultProps = {
  activityDateRanges: [{ value: '3', text: 'Last 3 months' },
    { value: '6', text: 'Last 6 months' },
    { value: '12', text: 'Last 12 months' },
    { value: '0', text: 'All Activity' }],
  selectedActivtyDateRange: { value: '3', text: 'Last 3 months' },
  activityHelpOptions: [{ text: 'Request missing miles', value: '/ual/en/us/mileageplus/mileagecredit/', default: true },
    { text: 'Contact MileagePlus Service Center', value: '/web/en-US/content/contact/mileageplus/default.aspx', default: true },
    { text: 'Earn more award miles', value: '/web/en-US/content/mileageplus/earn/default.aspx', default: true },
    { text: 'Use my award miles', value: '/web/en-US/content/mileageplus/awards/default.aspx', default: true },
    { text: 'Book award travel', value: '/ual/en/us/flight-search/book-a-flight/redeemmiles', default: true },
    { text: 'Buy, transfer or gift award miles', value: 'https://buymiles.mileageplus.com/united/united_landing_page', default: true },
    { text: 'Get credit card or prepaid card', value: '/web/en-US/content/products/chase/default.aspx', default: true },
    { text: 'Learn more about Upgrades', value: '/web/en-US/content/mileageplus/awards/upgrade/default.aspx', default: true },
    { text: 'Learn more about Premier® benefits', value: '/web/en-US/content/mileageplus/premier/default.aspx', default: true }],
  selectedActivtyHelpOption: { value: '', text: '' },
};

export default ActivitiesViewContainer;
