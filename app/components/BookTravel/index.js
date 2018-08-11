import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Wrapper, Tab, TabList, TabPanel } from 'react-aria-tabpanel';
import { animateScroll } from 'react-scroll';

import Announcements from 'components/Announcements';
import BookFlightContainer from 'containers/BookFlightContainer';
import FlightStatusContainer from 'containers/FlightStatusContainer';
import CheckinFlightContainer from 'containers/CheckinFlightContainer';
import MyTripsContainer from 'containers/MyTripsContainer';

import { ENTER_KEY, TAB_KEY, DOWN_ARROW_KEY, UP_ARROW_KEY } from 'containers/App/constants';

import messages from './messages';

import styles from './bookTravel.scss';
import closeIcon from './assets/close.svg';


// Images
import plane from './assets/plane.svg';
import clock from './assets/clock.svg';
import check from './assets/check-circle.svg';
import bag from './assets/baggage.svg';

const isMobile = (screen.width >= 768) !== true;
const LIST_ITEM_LENGTH = 5;

class BookTravel extends Component {
  constructor(props) {
    super(props);
    if (isMobile) {
      this.props.setTab('none');
    }
  }

  onCloseButton() {
    this.props.onCollapseInputSelected();
  }

  onItemSelected(location, locationType, modelName, locationCode) {
    // Need to dispatch actions for selected locations because that is what the validators use.
    switch (locationType) {
      case 'pickupLocation':
        this.props.onChangeModel(modelName, location);
        this.props.onSelectCarPickupLocation(location);
        break;
      case 'dropoffLocation':
        this.props.onChangeModel(modelName, location);
        break;
      case 'bookHotel':
        this.props.onChangeModel(modelName, location);
        break;
      case 'bookFlightOrigin':
        // TODO: delete this from here and action/reducer/selector when rehydrate refactor is completed
        this.props.onSelectFlightOriginLocation(location);
        // Location code is what is passed to flight search
        this.props.setOriginLocationCode(locationCode);
        this.props.onChangeModel(modelName, location);
        break;
      case 'bookFlightDestination':
      // TODO: delete this from here and action/reducer/selector when rehydrate refactor is completed
        this.props.onSelectFlightDestinationLocation(location);
        // Location code is what is passed to flight search
        this.props.setDestinationLocationCode(locationCode);
        this.props.onChangeModel(modelName, location);
        break;
      case 'flightStatusOrigin':
        this.props.onSelectFlightStatusOriginLocation(location);
        this.props.setFlightStatusOriginLocationCode(locationCode);
        this.props.onChangeModel(modelName, location);
        break;
      case 'flightStatusDestination':
        this.props.onSelectFlightStatusDestinationLocation(location);
        this.props.setFlightStatusDestinationLocationCode(locationCode);
        this.props.onChangeModel(modelName, location);
        break;
      default:
        break;
    }
    this.props.hideAutocompleteLocationDropdown('hidden', locationType);
    // need delay for IE focus to work
    setTimeout(() => {
      this.props.onFocusModel(modelName);
    }, 1);
    return location;
  }

  // Need to handle up and down keys for accessibility
  onArrowKeyDown(evt, location, locationType, fullModelName, locationCode, listLength, modelName) {
    const event = evt || window.event;
    const name = event.target.name;
    const activeId = ((event.target.name.indexOf('.') > 0) && (parseInt(name[name.length - 1], 10) >= 0)) ? parseInt(name.substr((name.length - 1), name.indexOf('.')), 10) : -1;
    const upKeyId = activeId - 1;
    const downKeyId = activeId + 1;
    switch (event.keyCode) {
      case TAB_KEY: // Tab key for keyboard detection (SR)
        if (!this.props.isKeyboardUser) this.props.onSetKeyboardUser(true);
        break;
      case ENTER_KEY:
        this.onItemSelected(location, locationType, fullModelName, locationCode);
        break;
      case UP_ARROW_KEY:
        evt.preventDefault(); // prevent whole page from scrolling
        if (event.target.type === 'text') {
          this.props.onFocusModel(`${modelName}.closeAutoList`);
        } else if (activeId === 0) {
          this.props.onFocusModel(fullModelName);
        }
        if (activeId > 0) {
          this.props.onFocusModel(`${modelName}.${upKeyId}`);
        }
        break;
      case DOWN_ARROW_KEY:
        evt.preventDefault(); // prevent whole page from scrolling
        if (activeId === (listLength - 1)) {
          this.props.onFocusModel(`${modelName}.closeAutoList`);
        }
        if (downKeyId < listLength) {
          this.props.onFocusModel(`${modelName}.${downKeyId}`);
        }
        break;
      default:
        break;
    }
  }

  setTab(newActiveTabId) {
    if (newActiveTabId === 'travelTab') {
      this.props.onInputSelected();
    } else if (this.props.expanded) {
      this.props.onCollapseInputSelected();
    }
    if (newActiveTabId === 'checkInTab') {
      this.props.onSelectFlightCheckinLoad();
    }
    if (newActiveTabId === 'tripsTab') {
      this.props.onSelectMyTripsLoad();
    }
    if (newActiveTabId !== 'checkInTab' || newActiveTabId !== 'tripsTab') {
      this.props.setAriaLiveMessage('');
    }
    this.props.setTab(newActiveTabId);
  }

  getFlightRequestResponse() {
    const populateArray = [];
    let index = 0;
    if (this.props.airportData) {
      this.props.airportData.forEach((item) => {
        if (index < LIST_ITEM_LENGTH) {
          const shortSplit = item.Airport.Name.split(',');
          const shortName = `${shortSplit[0]} ${item.Airport.IATACode}`;
          const ariaTxt = item.Airport.Name.replace(/<[^>]+>/g, '');
          populateArray.push({ firstLine: `${item.Airport.Name}`, displayName: `${shortName}`, id: `${index}`, ariaLocationTxt: `${ariaTxt}`, locationCode: `${item.Airport.IATACode}` });
        }
        index += 1;
      });
    }
    return populateArray;
  }

  collapseTab(newActiveTabId) {
    if (this.props.activeTab === newActiveTabId) {
      this.props.setTab('none');
      this.setTab('none');
    } else {
      this.props.setTab(newActiveTabId);
    }
    if (newActiveTabId === 'checkInTab') {
      this.props.onSelectFlightCheckinLoad();
    } else {
      this.props.setAriaLiveMessage('');
    }
    if (newActiveTabId === 'tripsTab') {
      this.props.onSelectMyTripsLoad();
    } else {
      this.props.setAriaLiveMessage('');
    }
    this.scrollTo(300);
  }

  scrollTo(pos) {
    animateScroll.scrollTo(pos, {
      duration: 500,
      delay: 100,
      smooth: true,
    });
  }

  render() {
    const divClassname =
      (this.props.expanded) ? classNames(styles.bookTravel, styles.expanded) : classNames(styles.bookTravel);

    return (
      <div
        className={divClassname}
      >
        <div className={styles.travelNavContainer}>
          {(this.props.expanded && !isMobile) ?
            <button
              title="Close this panel"
              role="button"
              className={styles.closeButton}
              onClick={() => this.onCloseButton()}
              tabIndex="0"
            >
              <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
            </button>
          : ''}
          <Announcements message={this.props.ariaLiveMessage} />
          <Wrapper
            onChange={(!isMobile) ? this.setTab.bind(this) : null} // eslint-disable-line
            activeTabId={this.props.activeTab}
          >
            <TabList
              tag="ul"
              className={styles.travelNav}
            >
              <Tab
                id="travelTab"
                name="travelTab"
                tag="li"
                className={styles.flightContent}
                aria-label={this.props.expanded ? messages.bookSrExpanded.defaultMessage : messages.bookSr.defaultMessage}
                active={this.props.activeTab === 'travelTab'}
                onClick={() => (!this.props.expanded) ? this.props.onInputSelected() : null}
              >
                <div className={styles.icon} aria-hidden="true">
                  <img src={plane} alt="" role="presentation" width="30" />
                </div>
                {(isMobile) ?
                  <h2>
                    <FormattedMessage {...messages.bookMobile} />
                    <button
                      className={styles.mobileTabArrow}
                      onClick={() => this.collapseTab('travelTab')}
                      role="button"
                    >
                      <i role="presentation" aria-hidden="true"></i>
                    </button>
                  </h2>
                  : <h2><FormattedMessage {...messages.book} /></h2>
                }
              </Tab>
              <TabPanel
                tabId="travelTab"
                tag="section"
                active={this.props.activeTab === 'travelTab'}
                onFocus={() => (!this.props.expanded && !isMobile) ? this.props.onInputSelected() : null}
              >
                <BookFlightContainer
                  getFlightRequestResponse={() => this.getFlightRequestResponse()}
                  onArrowKeyDown={(evt, location, locationType, fullModelName, locationCode, listLength, modelName) => this.onArrowKeyDown(evt, location, locationType, fullModelName, locationCode, listLength, modelName)}
                  onItemSelected={(location, locationType, fullModelName, locationCode) => this.onItemSelected(location, locationType, fullModelName, locationCode)}
                />
              </TabPanel>
              <Tab
                id="statusTab"
                name="statusTab"
                className={styles.statusContent}
                tag="li"
                aria-label={messages.statusSr.defaultMessage}
                active={this.props.activeTab === 'statusTab'}
                onClick={() => this.setTab('statusTab')}
              >
                <div className={styles.icon} aria-hidden="true">
                  <img src={clock} alt="" role="presentation" />
                </div>
                {(isMobile) ?
                  <h2>
                    <FormattedMessage {...messages.statusMobile} />
                    <button
                      className={styles.mobileTabArrow}
                      onClick={() => this.collapseTab('statusTab')}
                      role="button"
                    >
                      <i role="presentation" aria-hidden="true"></i>
                    </button>
                  </h2>
                  : <h2><FormattedMessage {...messages.status} /></h2>
                }
              </Tab>
              <TabPanel
                tabId="statusTab"
                tag="section"
                active={this.props.activeTab === 'statusTab'}
              >
                <FlightStatusContainer
                  activeTab={this.props.activeTab}
                  getFlightRequestResponse={() => this.getFlightRequestResponse()}
                  onArrowKeyDown={(evt, location, locationType, fullModelName, locationCode, listLength, modelName) => this.onArrowKeyDown(evt, location, locationType, fullModelName, locationCode, listLength, modelName)}
                  onItemSelected={(location, locationType, fullModelName, locationCode) => this.onItemSelected(location, locationType, fullModelName, locationCode)}
                />
              </TabPanel>
              <Tab
                id="checkInTab"
                tag="li"
                aria-label={messages.checkinSr.defaultMessage}
                className={styles.checkinContent}
                active={this.props.activeTab === 'checkInTab'}
                onClick={() => this.setTab('checkInTab')}
              >
                <div className={styles.icon} aria-hidden="true">
                  <img src={check} alt="" role="presentation" />
                </div>
                <h2>
                  <FormattedMessage {...messages.checkin} />
                  {(isMobile) ?
                    <button
                      className={styles.mobileTabArrow}
                      onClick={() => this.collapseTab('checkInTab')}
                      role="button"
                    >
                      <i role="presentation" aria-hidden="true"></i>
                    </button>
                  : ''}
                </h2>

              </Tab>
              <TabPanel
                tabId="checkInTab"
                tag="section"
                active={this.props.activeTab === 'checkInTab'}
              >
                <CheckinFlightContainer />
              </TabPanel>
              <Tab
                id="tripsTab"
                tag="li"
                className={styles.mytripsContent}
                aria-label={messages.mytripsSr.defaultMessage}
                active={this.props.activeTab === 'tripsTab'}
                onClick={() => this.setTab('tripsTab')}
              >
                <div className={styles.icon} aria-hidden="true">
                  <img src={bag} alt="" role="presentation" />
                </div>
                <h2>
                  <FormattedMessage {...messages.mytrips} />
                  {(isMobile) ?
                    <button
                      className={styles.mobileTabArrow}
                      onClick={() => this.collapseTab('tripsTab')}
                      role="button"
                    >
                      <i role="presentation" aria-hidden="true"></i>
                    </button>
                  : ''}
                </h2>
              </Tab>
              <TabPanel
                tabId="tripsTab"
                tag="section"
                active={this.props.activeTab === 'tripsTab'}
              >
                <MyTripsContainer />
              </TabPanel>
            </TabList>
          </Wrapper>
        </div>
      </div>
    );
  }
}

BookTravel.propTypes = {
  ariaLiveMessage: PropTypes.string,
  activeTab: PropTypes.string,
  airportData: PropTypes.array,
  expanded: PropTypes.bool,
  hideAutocompleteLocationDropdown: PropTypes.func,
  isKeyboardUser: PropTypes.bool,
  onChangeModel: PropTypes.func,
  onCollapseInputSelected: PropTypes.func,
  onFocusModel: PropTypes.func,
  onInputSelected: PropTypes.func,
  setDestinationLocationCode: PropTypes.func,
  onSelectCarPickupLocation: PropTypes.func,
  onSelectFlightCheckinLoad: PropTypes.func,
  onSelectFlightDestinationLocation: PropTypes.func,
  onSelectFlightOriginLocation: PropTypes.func,
  onSetKeyboardUser: PropTypes.func,
  setOriginLocationCode: PropTypes.func,
  setTab: PropTypes.func,
  onSelectFlightStatusDestinationLocation: PropTypes.func,
  onSelectFlightStatusOriginLocation: PropTypes.func,
  setFlightStatusOriginLocationCode: PropTypes.func,
  setFlightStatusDestinationLocationCode: PropTypes.func,
  setAriaLiveMessage: PropTypes.func,
  onSelectMyTripsLoad: PropTypes.func,
};

export default BookTravel;
