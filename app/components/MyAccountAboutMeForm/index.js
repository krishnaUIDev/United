import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field, Form } from 'react-redux-form/lib/immutable';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import messages from './messages';
import styles from './aboutMe.scss';

export default class MyAccountAboutMeForm extends Component {
  componenWillMount() {

  }

  onAboutMeSaveClick() {
  }
  getGender(genderCode) {
    if (genderCode === 'M') {
      return 'Male';
    } else if (genderCode === 'F') {
      return 'Female';
    }
    return '';
  }
  getDateOfBirth(dob) {
    return moment(dob).format('ll');
  }
  updateNationality(newValue) {
    this.props.onChangeModel('aboutMeModel.nationality', newValue.CountryCode);
    this.props.nationalitySelected(newValue.CountryCode);
  }
  updateCountryOfResidence(newValue) {
    this.props.onChangeModel('aboutMeModel.countryOfResidence', newValue.CountryCode);
    this.props.countryOfResidenceSelected(newValue.CountryCode);
  }

  render() {
    //console.log("data",this.props.selectedNationality);
    return (
      <div className={styles.aboutMeContainer}>
        <div className={styles.requiredFields}> <FormattedMessage {...messages.requiredfields} /></div>
        <div className={styles.subSectionHeading}><FormattedMessage {...messages.aboutme} /></div>
        <div className={styles.subSectionDescription}><FormattedMessage {...messages.aboutmedescription} /></div>
        <Form
          model="aboutMeModel"
          className={styles.bookHotelForm}
          onSubmit={(model) => this.onAboutMeSaveClick(model)}
        >
          <div className={styles.countryForm}>
            <div className={styles.aboutMeName}>
              <div className={styles.aboutFieldLabel}>Name</div>
              <div>{this.props.aboutMe.name}</div>
            </div>
            <div className={styles.aboutMeDateOfBirth}>
              <div className={styles.aboutFieldLabel}>Date of birth</div>
              <div>{this.getDateOfBirth(this.props.aboutMe.dateOfBirth)}</div>
            </div>
            <div className={styles.aboutMeGender}>
              <div className={styles.aboutFieldLabel}>Gender</div>
              <div>{this.getGender(this.props.aboutMe.gender)}</div>
            </div>
            <div className={styles.editPersonalLink}>
              <a className={styles.aboutMeLink} aria-describedby="announceWindow" href="/web/en-US/apps/mileageplus/account/traveler/nameChange.aspx" target="_blank">Edit personal ID information</a>
            </div>
            <div className={styles.nationalityFieldContainer}>
              <Field
                model=".nationality"
                className={styles.nationalityField}
              >
                <label
                  htmlFor="nationality"
                  className={styles.dropdownFieldLabel}
                >
                  Nationality
                </label>
                <Select
                  id="nationalityDropdown"
                  name="nationality"
                  options={this.props.countryList}
                  onChange={(newValue) => this.updateNationality(newValue)}
                  value={this.props.selectedNationality}
                  clearable={false}
                  openOnFocus
                  inputProps={{
                    'aria-controls': 'roomsLabel',
                  }}
                  labelKey="Name"
                  valueKey="CountryCode"
                />
              </Field>
            </div>
            <div className={styles.countryFieldContainer}>
              <Field
                model=".countryOfResidence"
                className={styles.nationalityField}
              >
                <label
                  htmlFor="countryOfResidence"
                  className={styles.dropdownFieldLabel}
                >
                  Country of residence
                </label>
                <Select
                  id="countryOfResidenceDropdown"
                  name="countryofresidence"
                  options={this.props.countryList}
                  onChange={(newValue) => this.updateCountryOfResidence(newValue)}
                  value={this.props.selectedCountryOfResidence}
                  clearable={false}
                  openOnFocus
                  inputProps={{
                    'aria-controls': 'roomsLabel',
                  }}
                  labelKey="Name"
                  valueKey="CountryCode"
                />
              </Field>
            </div>
            <div className={styles.aboutMeSaveButtonContainer}>
              <button
                type="submit"
                className={classNames(styles.primaryButton, styles.aboutMeSaveButton)}
                aria-label=""
              >
                <span>Save changes to about me</span>
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

MyAccountAboutMeForm.propTypes = {
  onChangeModel: PropTypes.func,
  countryList: PropTypes.array,
  selectedNationality: PropTypes.string,
  selectedCountryOfResidence: PropTypes.string,
  nationalitySelected: PropTypes.func,
  countryOfResidenceSelected: PropTypes.func,
  aboutMe: PropTypes.object,
};
