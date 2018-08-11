import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Tab, TabList, TabPanel } from 'react-aria-tabpanel';
import { injectIntl, intlShape } from 'react-intl';
import config from 'config'; // eslint-disable-line

import LoadingIndicator from 'components/LoadingIndicator';
import externalLink from 'components/GlobalHeader/assets/external-link.svg';

import styles from './globalFooter.scss';
import messages from './messages';

import externalLinkGray from './assets/external-link-gray.svg';

// Temporary until SDL sends social image urls
import mobileTools from './assets/social-mobile-tools.svg';
import hub from './assets/social-hub.svg';
import instagram from './assets/social-instagram.svg';
import fb from './assets/social-fb.svg';
import twitter from './assets/social-twitter.svg';
import youtube from './assets/social-youtube.svg';
import linkedin from './assets/social-linkedin.svg';

const socialImage = [mobileTools, hub, fb, twitter, youtube, instagram, linkedin];
const isMobile = (screen.width > 768) !== true;

export class GlobalFooter extends Component {
  getSubMenu(menuId) {
    const subMenus = menuId.map((subMenu, key) =>
      <div key={key}>
        <div>
          {(subMenu.menuTitle !== '') ? <h3>{subMenu.menuTitle}</h3> : ''}
          <ul>
            {this.getLinks(subMenu.subMenu, externalLink)}
          </ul>
        </div>
      </div>
    );
    return subMenus;
  }

  getAccordionMenu(menuId) {
    const accordionMenu = menuId.map((subMenu, key) =>
      <div key={key}>
        <TabList tag="ul" className={styles.accordionTab}>
          {(subMenu.menuTitle !== '') &&
            <Tab
              id={`footerPanel${key}`}
              tag="li"
              key={`footerTab${key}`}
            >
              <h3>{subMenu.menuTitle}</h3>
            </Tab>
          }
          <TabPanel
            tabId={`footerPanel${key}`}
            tag="section"
            key={`footerPanel${key}`}
          >
            <ul>
              {this.getLinks(subMenu.subMenu, externalLink)}
            </ul>
          </TabPanel>
        </TabList>
      </div>
    );
    return accordionMenu;
  }

  getLinks(subMenuId, linkIcon) {
    const links = subMenuId.map((link, key) =>
      <li key={key}>
        <a
          href={link.menuLink || link.linkUrl}
          target={(link.isExternalLink) ? '_blank' : '_self'}
          className={(link.isExternalLink) && styles.externalLink}
        >
          <span
            dangerouslySetInnerHTML={{ __html: link.menuTitle || link.linkText }} // eslint-disable-line
          ></span>
          {(link.isExternalLink) ?
            <img src={linkIcon} alt="" role="presentation" aria-hidden="true" />
          : ''
          }
        </a>
      </li>
    );
    return links;
  }

  getSocialLinks(linkObj) {
    const links = linkObj.map((link, key) =>
      <li key={`socialLink${key}`}>
        <a
          href={link.linkUrl}
          title={link.linkText}
          target={(link.isExternalLink) ? '_blank' : '_self'}
        >
          {/* Temporary until SDL sends us the social icons */}
          <img src={socialImage[key]} alt="" role="presentation" aria-hidden="true" />
        </a>
      </li>
    );
    return links;
  }

  render() {
    const footerData = this.props.footerData;
    const siteLinkData = this.props.siteLinkData;
    const socialData = this.props.socialData;
    const footerIsLoaded = (!this.props.loading && !this.props.error && footerData && footerData.length) && true;
    const siteLinksIsLoaded = (!this.props.loading && !this.props.error && siteLinkData && siteLinkData.length) && true;
    const socialLinksIsLoaded = (!this.props.loading && !this.props.error && socialData && socialData.length) && true;

    const footerTabs = (footerIsLoaded) && footerData.map((footerTab, key) =>
      <Tab
        id={`footerPanel${key}`}
        tag="li"
        key={`footerTab${key}`}
      >
        <h2>{footerTab.menuTitle}</h2>
      </Tab>
    );

    const footerPanels = (footerIsLoaded) ? footerData.map((footerPanel, key) =>
      <TabPanel tabId={`footerPanel${key}`} tag="section" key={`footerPanel${key}`}>
        {(key === 0 && isMobile) ? // Detect if on mobile and the first panel is displayed
          <Wrapper>
            {this.getAccordionMenu(footerPanel.subMenu)}
          </Wrapper>
        :
          this.getSubMenu(footerPanel.subMenu)
        }
      </TabPanel>
    ) : 'error';

    const siteLinks = (siteLinksIsLoaded) ? siteLinkData.map((siteLink) =>
      this.getLinks(siteLink.links, externalLinkGray),
    ) : 'error';

    const socialLinks = (socialLinksIsLoaded) ? this.getSocialLinks(socialData) : 'error';
    const intl = this.props.intl;

    return (
      <div className={styles.globalFooter}>
        <section className={styles.footerTop}>
          <div className={styles.container}>
            {(footerIsLoaded) ? (
              <Wrapper>
                <div className={styles.tabListWrapper}>
                  <TabList className={styles.footerNav} tag="ul">
                    {footerTabs}
                    <a
                      href={this.props.footerData[3].menuLink}
                      title={this.props.footerData[3].menuTitle}
                      className={styles.impMessage}
                    >
                      {this.props.footerData[3].menuTitle}
                    </a>
                  </TabList>
                </div>
                {footerPanels}
              </Wrapper>
            ) : (
              <div>
                {(!this.props.error) ? <LoadingIndicator /> : '' }
              </div>
            )}
          </div>
        </section>
        <section className={styles.footerBottom}>
          <div className={styles.container}>
            <div className={styles.siteLinks}>
              <ul>
                {(siteLinksIsLoaded) ? siteLinks : (
                  <div>
                    {(!this.props.error) ? <LoadingIndicator /> : '' }
                  </div>
                )}
              </ul>
            </div>
            <div className={styles.socialLinks}>
              <h3>{ intl.formatMessage(messages.stayConnected) } <img src={externalLinkGray} alt="" /></h3>
              <ul>
                {(socialLinksIsLoaded) ? socialLinks : (
                  <div>
                    {(!this.props.error) ? <LoadingIndicator /> : '' }
                  </div>
                )}
              </ul>
            </div>
            <div className={styles.footerText}>
              <img src={externalLinkGray} alt="" />
              <span>{ intl.formatMessage(messages.externalSite) }</span>
              {!isMobile ?
                <span>{ intl.formatMessage(messages.copyrightMessage) }</span>
              : '' }
            </div>
            <div className={styles.starAlliance}>
              <a href={`${config.UAL_BASE_URL}${config.STAR_ALLIANCE_URL}`}>
                <img src="https://media.united.com/images/Media%20Database/SDL/staralliance.png" alt={intl.formatMessage(messages.starAlliance)} />
              </a>
            </div>
            {isMobile ?
              <p>{ intl.formatMessage(messages.copyrightMessage) }</p>
            : '' }
          </div>
        </section>
      </div>
    );
  }
}

GlobalFooter.propTypes = {
  error: PropTypes.any,
  footerData: PropTypes.any,
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  siteLinkData: PropTypes.any,
  socialData: PropTypes.any,
};

export default injectIntl(GlobalFooter);
