import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import MyAccountProfile from 'components/MyAccountProfile';

import {
  loadMileagePlusProfile,
  loadCountryList,
} from './actions';

import {
  makeSelectMileagePlusProfileData,
  makeSelectCountryListData,
  makeSelectNationality,
} from './selectors';

export function MileagePlusProfile(props) {
  return (<main className="profileContainer" role="main">
    <MyAccountProfile
      loadMileagePlusProfileService={props.loadMileagePlusProfileService}
      loadCountryListService={props.loadCountryListService}

    />
  </main>
  );
}

MileagePlusProfile.propTypes = {
  loadMileagePlusProfileService: PropTypes.func,
  loadCountryListService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profilePersonInfo: makeSelectMileagePlusProfileData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadMileagePlusProfileService: () => { dispatch(loadMileagePlusProfile()); },
    loadCountryListService: () => { dispatch(loadCountryList()); },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MileagePlusProfile);
