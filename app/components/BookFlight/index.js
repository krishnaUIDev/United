import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Wrapper, Tab, TabList, TabPanel } from 'react-aria-tabpanel';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import BookFlightFormContainer from 'containers/BookFlightFormContainer';
import BookHotelFormContainer from 'containers/BookHotelFormContainer';
import BookCarContainer from 'containers/BookCarContainer';
import config from 'config'; // eslint-disable-line

import messages from './messages';
import styles from './bookFlight.scss';

// Images
import flight from './assets/plane.svg';
import hotel from './assets/hotel.svg';
import car from './assets/car.svg';
import cruise from './assets/cruise.svg';
import vacation from './assets/vacation.svg';

const isMobile = (screen.width >= 768) !== true;

class BookFlight extends Component {
  setTab(newActiveTabId) {
    this.props.setTab(newActiveTabId);
    return newActiveTabId;
  }

  render() {
    const intl = this.props.intl;
    return (
      <div className={styles.bookFlightContent}>
        <Wrapper
          onChange={(!isMobile) ? this.setTab.bind(this) : null} // eslint-disable-line
          activeTabId={this.props.activeSubTab}
        >
          <div className={styles.tabListWrapper}>
            <TabList
              tag="ul"
              className={styles.bookFlightMenu}
            >
              <Tab
                id="bookFlightTab"
                tag="li"
                className={classNames(styles.flightButton, styles.active)}
                aria-label={intl.formatMessage(messages.bookFlightLabel)}
                active={this.props.activeSubTab === 'bookFlightTab'}
              >
                <div className={classNames(styles.icon, styles.iconFlight)} aria-hidden="true">
                  <img src={flight} alt="" role="presentation" width="35" />
                </div>
                {(isMobile) ?
                  <button
                    role="button"
                    onClick={() => this.setTab('bookFlightTab')}
                  >
                    <h3><FormattedMessage {...messages.flight} /></h3>
                  </button>
                  : <h3><FormattedMessage {...messages.flight} /></h3>
                }
              </Tab>
              <Tab
                id="bookHotelTab"
                tag="li"
                className={styles.hotelButton}
                aria-label={intl.formatMessage(messages.bookHotelLabel)}
                active={this.props.activeSubTab === 'bookHotelTab'}
              >
                <div className={classNames(styles.icon, styles.iconHotel)} aria-hidden="true">
                  <img src={hotel} alt="" role="presentation" width="30" />
                </div>
                {(isMobile) ?
                  <button
                    role="button"
                    onClick={() => this.setTab('bookHotelTab')}
                  >
                    <h3><FormattedMessage {...messages.hotel} /></h3>
                  </button>
                  : <h3><FormattedMessage {...messages.hotel} /></h3>
                }
              </Tab>
              <Tab
                id="bookCarTab"
                tag="li"
                className={styles.carButton}
                aria-label={intl.formatMessage(messages.bookCarLabel)}
                active={this.props.activeSubTab === 'bookCarTab'}
              >
                <div className={classNames(styles.icon, styles.iconCar)} aria-hidden="true">
                  <img src={car} alt="" role="presentation" width="35" />
                </div>
                {(isMobile) ?
                  <button
                    role="button"
                    onClick={() => this.setTab('bookCarTab')}
                  >
                    <h3><FormattedMessage {...messages.car} /></h3>
                  </button>
                  : <h3><FormattedMessage {...messages.car} /></h3>
                }
              </Tab>
              <a
                id="bookCruiseTab"
                target="_blank"
                href={config.TAB_CRUISE_URL}
                className={styles.cruiseButton}
                aria-label={intl.formatMessage(messages.bookCruiseLabel)}
              >
                <div className={classNames(styles.icon, styles.iconCruise)} aria-hidden="true">
                  <img src={cruise} alt="" role="presentation" />
                </div>
                <h3><FormattedMessage {...messages.cruise} /></h3>
              </a>
              <a
                id="bookVacationTab"
                target="_blank"
                href={`${config.UAL_BASE_URL}${config.TAB_VACATION_URL}`}
                className={styles.vacationButton}
                aria-label={intl.formatMessage(messages.bookVacationLabel)}
              >
                <div className={classNames(styles.icon, styles.hiddenXs, styles.hiddenSm, styles.hiddenMd)} aria-hidden="true">
                  <img src={vacation} alt="" role="presentation" />
                </div>
                <h3><FormattedMessage {...messages.vacation} /></h3>
              </a>
            </TabList>
          </div>
          <TabPanel
            tabId="bookFlightTab"
            active={this.props.activeSubTab === 'bookFlightTab'}
          >
            <BookFlightFormContainer
              expanded={this.props.expanded}
              onArrowKeyDown={this.props.onArrowKeyDown}
              onSelectFlightOriginLocation={this.props.onSelectFlightOriginLocation}
              onSelectFlightDestinationLocation={this.props.onSelectFlightDestinationLocation}
              mobileView={this.props.mobileView}
              onItemSelected={this.props.onItemSelected}
              onLoadAirports={this.props.onLoadAirports}
              airportData={this.props.airportData}
              activeTab={this.props.activeSubTab}
              onSetActiveField={this.props.onSetActiveField}
              activeField={this.props.activeField}
              onSetOriginLocationCode={this.props.onSetOriginLocationCode}
              onSetDestinationLocationCode={this.props.onSetDestinationLocationCode}
              onDisableTravelerButtons={this.props.onDisableTravelerButtons}
              onChangePassenger={this.props.onChangePassenger}
              onFocusModel={this.props.onFocusModel}
              showTravelerMenu={this.props.showTravelerMenu}
              passengersToBook={this.props.passengersToBook}
              toDisableBtns={this.props.toDisableBtns}
              getFlightRequestResponse={this.props.getFlightRequestResponse}
              hideAutocompleteLocation={this.props.hideAutocompleteLocation}
              updateMobileView={this.props.updateMobileView}
            />
          </TabPanel>
          <TabPanel
            tabId="bookHotelTab"
            active={this.props.activeSubTab === 'bookHotelTab'}
          >
            <BookHotelFormContainer
              expanded={this.props.expanded}
              onArrowKeyDown={this.props.onArrowKeyDown}
              onItemSelected={this.props.onItemSelected}
              mobileView={this.props.mobileView}
              updateMobileView={() => this.props.updateMobileView(this.props.hideAutocompleteLocation.get('bookHotel'), 'bookHotel')}
              activeTab={this.props.activeSubTab}
              onSetActiveField={this.props.onSetActiveField}
              activeField={this.props.activeField}
              hideAutocompleteLocation={this.props.hideAutocompleteLocation}
            />
          </TabPanel>
          <TabPanel
            tabId="bookCarTab"
            active={this.props.activeSubTab === 'bookCarTab'}
          >
            <BookCarContainer
              onArrowKeyDown={this.props.onArrowKeyDown}
              onItemSelected={this.props.onItemSelected}
              mobileView={this.props.mobileView}
              updateMobileView={this.props.updateMobileView}
              activeTab={this.props.activeSubTab}
              hideAutocompleteLocation={this.props.hideAutocompleteLocation}
            />
          </TabPanel>
        </Wrapper>
      </div>
    );
  }
}

BookFlight.propTypes = {
  activeSubTab: PropTypes.string,
  setTab: PropTypes.func,
  expanded: PropTypes.bool,
  hideAutocompleteLocation: PropTypes.object,
  onSelectFlightOriginLocation: PropTypes.func,
  onSelectFlightDestinationLocation: PropTypes.func,
  mobileView: PropTypes.object,
  updateMobileView: PropTypes.func,
  onLoadAirports: PropTypes.func,
  airportData: PropTypes.array,
  onSetActiveField: PropTypes.func,
  activeField: PropTypes.string,
  onArrowKeyDown: PropTypes.func,
  onItemSelected: PropTypes.func,
  onFocusModel: PropTypes.func,
  onSetOriginLocationCode: PropTypes.func,
  onSetDestinationLocationCode: PropTypes.func,
  onDisableTravelerButtons: PropTypes.func,
  onChangePassenger: PropTypes.func,
  toDisableBtns: PropTypes.object,
  passengersToBook: PropTypes.object,
  showTravelerMenu: PropTypes.bool,
  getFlightRequestResponse: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(BookFlight);
