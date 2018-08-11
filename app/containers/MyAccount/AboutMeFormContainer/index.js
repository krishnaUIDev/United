import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'react-redux-form/lib/immutable';

import MyAccountAboutMeForm from 'components/MyAccountAboutMeForm';

import {
  loadCountryList,
  nationalitySelected,
  countryOfResidenceSelected,
} from './actions';

import {
  makeSelectCountryListData,
} from '../MileagePlusProfile/selectors';

import {
  makeSelectAboutMeData,
  makeSelectNationality,
  makeSelectCountryOfResidence,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  countryList: makeSelectCountryListData(),
  selectedNationality: makeSelectNationality(),
  selectedCountryOfResidence: makeSelectCountryOfResidence(),
  aboutMe: makeSelectAboutMeData(),

});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeModel: (model, value) => dispatch(actions.change(model, value)),
    nationalitySelected: (nationality) => { dispatch(nationalitySelected(nationality)); },
    countryOfResidenceSelected: (countryOfResidence) => { dispatch(countryOfResidenceSelected(countryOfResidence)); },
    dispatch,
  };
}

const AboutMeFormContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccountAboutMeForm);

export default AboutMeFormContainer;
