import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Field, Fieldset, Control, Form, Errors } from 'react-redux-form/lib/immutable';
import AirlineActivityContainer from 'containers/MyAccount/AirlineActivityContainer';
import messages from './messages';
// import UpgradeActivityContainer from 'containers/MyAccount/UpgradeActivityContainer';

import styles from './activitiesView.scss';

export default class ActivitiesView extends Component {
  updateDateChange(newValue) {
    this.props.activityDateRangeSelected(newValue.value);
    this.props.activityDateRangeSelectedText(newValue.text);
  }
  updateHelpOptionChange(e, newValue) {
    if (e.value) {
      e.default = false;
      window.open(e.value, '_blank');
    }
  }
  updateStatementChange(newValue) {
    const statement = newValue.text.split('');
    window.open(`/web/en-US/apps/mileageplus/statement/statement.aspx?SD=${statement[2]}`);
  }
  parseActivityStatementsList() {
    let statementDates = [];
    if (this.props.activityStatementsList) {
      (statementDates = (this.props.activityStatementsList).map((item) => {
        const k = item.DateRange.replace(/-/g, '/');
        const n = k.split(' ');
        const statement = { text: `${n[0]} - ${n[2]}`, value: item };
        return statement;
      }));
    }
    return statementDates;
  }
  onExpandAllClick() {
    const expandAll = this.props.expandAll !== undefined ? !this.props.expandAll : true;
    this.props.activityExpandAll(expandAll);
  }

  render() {
    return (
      <div>
        <div>
          <div className={styles.selContainer}>
            <Field
              className={classNames(styles.helpOption, styles.daterange)}
              model=".daterange"
            >
              <label
                htmlFor="DateRange"
                className={styles.DateRange}
              >
                <FormattedMessage {...messages.dateRangeLabel} />
              </label>
              <Select
                options={this.props.activityDateRanges}
                name="Date Range"
                aria-label="Date Range"
                onChange={(newValue) => this.updateDateChange(newValue)}
                labelKey="text"
                searchable={false}
                clearable={false}
                openOnFocus
                tabSelectsValue={false}
                inputProps={{ 'aria-controls': 'roomsLabel' }}
                value={this.props.selectedActivtyDateRange}
                valueKey="value"
              />
            </Field>
          </div>
          <div className={styles.selContainer}>
            { this.props.activityStatementsList &&
            <Field
              className={classNames(styles.helpOption, styles.statementDropdown)}
              model=".statements"
            >
              <label
                htmlFor="statements"
                className={styles.statements}
              >
                <FormattedMessage {...messages.statementsLabel} />
              </label>
              <Select
                placeholder={<FormattedMessage {...messages.statementsPlaceholder} />}
                options={this.parseActivityStatementsList()}
                name="activity statements"
                searchable={false}
                id={'StatementDates'}
                onChange={(newValue) => this.updateStatementChange(newValue)}
                labelKey="text"
                label={'Statements period'}
                aria-label="Statements period"
                screenReaderText={'The new window opening after clicking on the below activity period link '}
                clearable={false}
                openOnFocus
                tabSelectsValue={false}
                inputProps={{ 'aria-controls': 'roomsLabel' }}
                aria-live="polite"
                // value={this.props.selectedActivtyStatement}
                valueKey="text"
              />
            </Field>
          }
          </div>
          <div className={styles.selContainer}>
            <Field
              tabIndex="0"
              className={classNames(styles.helpOption, styles.quicklinksDropdown)}
              model=".quickLinks"
            >
              <label
                htmlFor="quickLinks"
                className={styles.quicklinks}
              >
                <FormattedMessage {...messages.quicklinksLabel} />
              </label>
              <Select
                id="quicklinksDropdown"
                name="quicklinks"
                placeholder={<FormattedMessage className={styles.formattedMsg} {...messages.quicklinksPlaceholder} />}
                defaultValue={this.props.selectedActivtyHelpOption}
                options={this.props.activityHelpOptions}
                clearable={false}
                openOnFocus
                searchable={false}
                label={"I'd like to"}
                aria-label="I'd like to"
                setToDefault={'What do you want to do?'}
                labelKey="text"
                tabSelectsValue={false}
                inputProps={{ 'aria-controls': 'roomsLabel' }}
                aria-live="polite"
                onChange={(newValue) => this.updateHelpOptionChange(newValue)}
                valueKey="value"
              />
              <span className={styles.visuallyHidden}>Below are the Links and Clicking on each option will open a Link in a new Window</span>
            </Field>
          </div>
          <div className={styles.wrapper}>
            <ul className={classNames(styles['myaccount-list'], styles.wrapper)}>
              <li className={styles.box3}><a href="" className={styles.linkfont}>View balance summary</a></li>
              <li className={styles.box4}><a onClick={() => this.props.exportActivities()} className={styles.linkfont}>Download activity</a></li>
              <li className={styles.box5}>
                <a tabIndex="0" className={classNames(styles['expand-rows'], styles.linkfont)} onClick={() => { this.onExpandAllClick(); }}>
                  { this.props.expandAll ? 'Collapse All Rows' : 'Expand all rows'}
                  { this.props.expandAll ?
                    <span className={styles.visuallyHidden}>currently All rows expanded</span> :
                    <span className={styles.visuallyHidden}>currently All rows Collapsed</span>}
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.activitiesView}>
            <AirlineActivityContainer selectedDateRange={this.props.selectedActivtyDateRangeText} />
          </div>
        </div>
      </div>
    );
  }
}

ActivitiesView.propTypes = {
  activityStatementsList: PropTypes.any,
  activityDateRanges: PropTypes.any,
  selectedActivtyDateRange: PropTypes.any,
  selectedActivtyDateRangeText: PropTypes.any,
  activityDateRangeSelected: PropTypes.func,
  activityDateRangeSelectedText: PropTypes.func,
  exportActivities: PropTypes.func,
  activityHelpOptions: PropTypes.any,
  selectedActivtyHelpOption: PropTypes.any,
  activityExpandAll: PropTypes.any,
  expandAll: PropTypes.any,
};
