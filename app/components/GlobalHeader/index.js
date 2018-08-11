import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import classNames from 'classnames';
import { Wrapper, Tab, TabList, TabPanel } from 'react-aria-tabpanel';
import config from 'config'; // eslint-disable-line
import { RIGHT_ARROW_KEY, LEFT_ARROW_KEY, ESC_KEY, TAB_KEY } from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator';
import LoginButtonContainer from 'containers/LoginButtonContainer';
import LocaleToggle from 'containers/LocaleToggle';
import LeaveBetaSite from 'components/LeaveBetaSite';

import styles from './globalHeader.scss';
import messages from './messages';

import externalLink from './assets/external-link.svg';
import searchIcon from './assets/search.svg';
import menuIcon from './assets/menu.svg';
import globeIcon from './assets/globe.svg';
import contactIcon from './assets/contact.svg';
import closeIcon from './assets/close.svg';

const isMaxWidth = (window.innerWidth >= 1186) !== true;

export class GlobalHeader extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLastLink = this.handleLastLink.bind(this);
    this.loginButtonTab = this.loginButtonTab.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      hover: false,
      activeTab: null,
      menuModalIsOpen: false,
    };
  }

  componentWillMount() {
    this.props.onInit();
  }

  getSubMenu(menuId) {
    // This function will count the # of submenus, spit out links, and will send a "true" attr to the getLinks function if it's the last link of the last submenu.
    const subMenuLength = menuId.length;
    const subMenus = menuId.map((subMenu, key) =>
      <div key={key}>
        {(subMenu.menuTitle && subMenu.menuTitle !== '') ? <h3>{subMenu.menuTitle}</h3> : ''}
        <ul>
          {this.getLinks(subMenu.subMenu, externalLink, (subMenuLength === key + 1))}
        </ul>
      </div>
    );
    return subMenus;
  }

  getLinks(subMenuId, linkIcon, isLastSubMenu) {
    // This will generate a link, mark it as external if flagged, and if it is the last link fire the onKeyDown event to close megaNav
    const linkCount = subMenuId.length;
    // Temporary fix until services
    const useExternalLink = ['Hotel reservations', 'Cruise reservations', 'Vacation packages'];
    const links = subMenuId.map((link, key) =>
      <li key={key}>
        <a
          href={link.menuLink}
          target={(link.isExternalLink) ? '_blank' : '_self'}
          className={(link.isExternalLink) && styles.externalLink}
          onKeyDown={(isLastSubMenu && linkCount === (key + 1)) && this.handleLastLink}
        >
          <span
            dangerouslySetInnerHTML={{ __html: link.menuTitle }} // eslint-disable-line
          ></span>
          {(link.isExternalLink || (useExternalLink.indexOf(link.menuTitle) >= 0)) &&
            <img className={styles.externalLink} src={linkIcon} alt="" role="presentation" aria-hidden="true" />
          }
        </a>
      </li>
    );
    return links;
  }

  setTab(newActiveTabId) {
    this.setState({
      activeTab: newActiveTabId,
      hover: true,
    });
  }

  setMobileTab(newActiveTabId) {
    // Allows user to collapse/expand accordion tabs on mobile.
    if (this.state.activeTab !== newActiveTabId) {
      this.setState({
        activeTab: newActiveTabId,
      });
    } else {
      this.setState({
        activeTab: null,
      });
    }
  }

  openModal() {
    this.setState({ menuModalIsOpen: true });
  }

  closeModal() {
    this.setState({ menuModalIsOpen: false });
  }

  hideTab = () => {
    this.setState({
      hover: false,
      activeTab: null,
    });
  }

  buildMegaNav(headerData, activeTab) {
    // If largest breakpoint then display a megaNav menu underneath the top nagivation
    const megaNav = (!isMaxWidth) ? (
      <Wrapper
        activeTabId={this.state.activeTab}
        className={styles.bottomMenuContainer}
      >
        <div className={styles.navWrapper}>
          <TabList className={styles.globalBottomNav} tag="div">
            {headerData.map((headerTab, key) =>
              <Tab
                id={`headerNav${key}`}
                tag="a"
                key={`headerNav${key}`}
                active={`headerNav${key}` === activeTab}
                onKeyDown={this.handleKeyDown}
                href={headerTab.menuLink}
              >
                <span
                  onMouseEnter={() => this.setTab(`headerNav${key}`)}
                  dangerouslySetInnerHTML={{ __html: headerTab.menuTitle }} // eslint-disable-line
                ></span>
              </Tab>
            )}
          </TabList>
        </div>
        <div className={styles.headerPanels}>
          {headerData.map((panel, key) =>
            <TabPanel
              tabId={`headerNav${key}`}
              active={`headerNav${key}` === activeTab}
              tag="div"
              key={`headerPanel${key}`}
              className={styles.showPanel}
              onMouseLeave={() => this.hideTab()}
            >
              {this.getSubMenu(panel.subMenu)}
            </TabPanel>
          )}
        </div>
      </Wrapper>
    ) : (
      // If below largest breakpoint, then display a modal window with an accordion navigation
      <Modal
        isOpen={this.state.menuModalIsOpen}
        onRequestClose={this.closeModal}
        closeTimeoutMS={200}
        className={{
          base: styles.bottomMenuContainer,
          afterOpen: styles.panelAfterOpen,
          beforeClose: styles.panelBeforeClose,
        }}
        overlayClassName={{
          base: styles.overlayClass,
          afterOpen: styles.overlayClassAfterOpen,
          beforeClose: styles.overlayClassAfterClose,
        }}
        role="dialog"
        aria={{
          modal: 'true',
          describedby: 'signInAria',
        }}
        contentLabel=""
      >
        <button
          role="button"
          className={styles.closeButton}
          onClick={this.closeModal}
          id="closeBtn"
        >
          <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
        </button>
        <Wrapper
          activeTabId={this.state.activeTab}
        >
          <TabList className={classNames(styles.globalBottomNav, styles.mobileNav)} tag="ul">
            { headerData.map((headerTab, key) =>
              <div key={`headerNav${key}`}>
                <Tab
                  id={`headerNav${key}`}
                  tag="li"
                  role="button"
                  active={`headerNav${key}` === activeTab}
                >
                  <button
                    role="button"
                    dangerouslySetInnerHTML={{ __html: headerTab.menuTitle }} // eslint-disable-line
                    onClick={() => this.setMobileTab(`headerNav${key}`)}
                  ></button>
                </Tab>
                <div className={styles.headerPanels}>
                  <TabPanel
                    tabId={`headerNav${key}`}
                    active={`headerNav${key}` === activeTab}
                    tag="div"
                    className={styles.showPanel}
                  >
                    {this.getSubMenu(headerTab.subMenu)}
                  </TabPanel>
                </div>
              </div>
            ) }
          </TabList>
        </Wrapper>
        <ul className={styles.extraLinks}>
          <li>
            <LeaveBetaSite />
          </li>
          <li>
            <a href={`${config.UAL_BASE_URL}${config.CONTACT}`} title="">
              <FormattedMessage {...messages.contact} />
            </a>
          </li>
        </ul>
      </Modal>
    );
    return megaNav;
  }

  handleKeyDown(e) {
    // This is for accessibility and tabbing order throughout the nav.
    const activeTab = this.state.activeTab;
    const menuId = Number(activeTab.substr(activeTab.length - 1));
    if (e.keyCode === ESC_KEY) {
      this.hideTab();
    }
    switch (menuId) {
      case 0:
        // if the user is shift-tabbing and it's the first nav option, hide the megaNav
        if (e.keyCode === TAB_KEY && e.shiftKey) { this.hideTab(); }
        // Detect right/left arrow keys for using Tab structure and manually set active tab
        if (e.keyCode === LEFT_ARROW_KEY) { this.setTab('headerNav3'); }
        if (e.keyCode === RIGHT_ARROW_KEY) { this.setTab('headerNav1'); }
        break;
      case 1:
        if (e.keyCode === LEFT_ARROW_KEY) { this.setTab('headerNav0'); }
        if (e.keyCode === RIGHT_ARROW_KEY) { this.setTab('headerNav2'); }
        break;
      case 2:
        if (e.keyCode === LEFT_ARROW_KEY) { this.setTab('headerNav1'); }
        if (e.keyCode === RIGHT_ARROW_KEY) { this.setTab('headerNav3'); }
        break;
      case 3:
        if (e.keyCode === LEFT_ARROW_KEY) { this.setTab('headerNav2'); }
        if (e.keyCode === RIGHT_ARROW_KEY) { this.setTab('headerNav0'); }
        break;
      default:
        break;
    }
  }

  handleLastLink(e) {
    // A11y: On desktop tabbing if this is the last item in the last column then menu will close
    if (e.keyCode === TAB_KEY && !e.shiftKey) {
      this.hideTab();
    }
  }

  loginButtonTab(e) {
    // A11y: On desktop tabbing if this is the login button container and the TAB key is pressed it will focus and display the first megaNav option
    if (e.keyCode === TAB_KEY && !e.shiftKey && !isMaxWidth) {
      this.setTab('headerNav0');
    }
  }

  render() {
    const { activeTab } = this.state;
    const headerData = this.props.headerData;
    const headerIsLoaded = (!this.props.loading && !this.props.error && headerData && headerData.length) && true;

    const intl = this.props.intl;

    return (
      <div className={classNames(styles.globalHeaderContainer, (this.state.hover) && styles.isExpanded)}>
        <div className={classNames(styles.globalHeader, styles.gridParent)}>
          <div className={classNames(styles.gridChild, styles.globalHeaderMenu, styles.logo)}>
            <a href="/ual/" role="presentation">
              <img
                className={styles.imgResponsive}
                alt={intl.formatMessage(messages.logoAria)}
                src="https://media.united.com/images/Media%20Database/SDL/Header%20and%20Footer/unitedLogo-white.png"
                role="presentation"
                aria-hidden="true"
              />
            </a>
          </div>
          <div className={classNames(styles.gridChild, styles.globalHeaderMenu)}>
            <nav role="navigation">
              <ul className={styles.globalTopNav}>
                <li>
                  <LeaveBetaSite />
                </li>
                <li>
                  <img
                    src={globeIcon}
                    alt=""
                    role="presentation"
                    aria-hidden="true"
                    className={styles.inlineIcon}
                  />
                  <LocaleToggle />
                </li>
                <li>
                  <a href={`${config.UAL_BASE_URL}${config.CONTACT}`} title="">
                    <img
                      src={contactIcon}
                      alt=""
                      role="presentation"
                      aria-hidden="true"
                      className={styles.inlineIcon}
                    />
                    <FormattedMessage {...messages.contact} />
                  </a>
                </li>
                <li>
                  <a href={`${config.UAL_BASE_URL}${config.SEARCH}`}>
                    <img src={searchIcon} alt="" role="presentation" aria-hidden="true" className={styles.inlineIcon} />
                    <span>Search</span>
                  </a>
                </li>
                <li // eslint-disable-line
                  className={styles.loginButtonContainer}
                  onKeyDown={(!isMaxWidth) && this.loginButtonTab}
                ><LoginButtonContainer /></li>
                <li className={styles.menuButtonContainer}>
                  <button
                    role="button"
                    className={styles.menuButton}
                    onClick={this.openModal}
                  >
                    <img
                      className={styles.imgResponsive}
                      alt=""
                      src={menuIcon}
                      role="presentation"
                      aria-hidden="true"
                    />
                    <span>Menu</span>
                  </button>
                </li>
              </ul>
              {(headerIsLoaded) ? this.buildMegaNav(headerData, activeTab) : (
                <div className={styles.bottomMenuContainer}>
                  <button
                    role="button"
                    className={styles.closeButton}
                    onClick={() => this.hideMobileMenu()}
                    id="closeBtn"
                  >
                    <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
                  </button>
                  {(!this.props.error) ? <LoadingIndicator /> : '' }
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

GlobalHeader.propTypes = {
  error: PropTypes.any,
  headerData: PropTypes.any,
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  onInit: PropTypes.func,
};

export default injectIntl(GlobalHeader);
