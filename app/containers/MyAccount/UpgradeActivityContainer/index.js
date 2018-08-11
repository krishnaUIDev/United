import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import UpgradeActivity from 'components/UpgradeActivity';

import {
  
} from '../Activity/selectors';

const mapStateToProps = createStructuredSelector({
//   activityList: makeSelectActivityListData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const UpgradeActivityContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeActivity);


export default UpgradeActivityContainer;
