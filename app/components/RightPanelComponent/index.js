import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import config from 'config'; // eslint-disable-line
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';

import styles from './rightPanelComponent.scss';
import messages from './messages';

// Images
import appIcon from './assets/iphone_app.png';
import closeIcon from './assets/close.svg';
import alertIcon from './assets/warning_icon.svg';
import loaderAnimation from './assets/animated_plane.gif';


// Use document body width rather than screen width so it sizes the browser itself (not device)
const isTabletScreen = (screen.width <= 768);


export class RightPanelComponent extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (isTabletScreen && this.flightNumberRef && this.props.toFocusFlightNumber) {
        this.flightNumberRef.focus();
      }
    }, 1);
  }
  componentDidUpdate() {
    if (this.flightNumberRef && this.props.toFocusFlightNumber) {
      this.flightNumberRef.focus();
    }
  }

  onFlightNumberBlur() {
    this.props.onToFocusFlightNumber(false);
  }

  render() {
    const intl = this.props.intl;

    const hasTopTxt = (this.props.firstLineTxt || this.props.secondLineTxt || this.props.thirdLineTxt);
    const hasBottomTxt = (this.props.bottomHeader || this.props.bottomTxtA || this.props.bottomTxtB || this.props.bottomTxtC || this.props.bottomTxtD);

    const firstLineStyle = this.props.status ? styles.lineText : classNames(styles.firstLineStatusTxt, styles.lineText);

    const threeLineHeight = (hasTopTxt) ? 'auto' : '0px';
    const threeLineMargin = (hasTopTxt) ? styles.threeLineMarginA : styles.threeLineMarginB;
    const threeLineStyle = (!this.props.status) ? styles.threeLineTextNoStatus : '';

    // Set style based on whether there is top text or not. If there is no top text, CSS grid will be one less than if there is top text.
    let bottomLinkAStyle;
    let bottomLinkBStyle;
    let bottomLinkCStyle;
    let bottomLinkDStyle;
    if (this.props.hasBottomTypeLink) {
      bottomLinkAStyle = (hasTopTxt) ? styles.bottomLinkStyleA1 : styles.bottomLinkStyleA2;
      bottomLinkBStyle = (hasTopTxt) ? styles.bottomLinkStyleB1 : styles.bottomLinkStyleB2;
      bottomLinkCStyle = (hasTopTxt) ? styles.bottomLinkStyleC1 : styles.bottomLinkStyleC2;
      bottomLinkDStyle = (hasTopTxt) ? styles.bottomTxtStyleD1 : styles.bottomTxtStyleD2;
    } else {
      bottomLinkAStyle = (hasTopTxt) ? styles.bottomTxtStyleA1 : styles.bottomTxtStyleA2;
      bottomLinkBStyle = (hasTopTxt) ? styles.bottomTxtStyleB1 : styles.bottomTxtStyleB2;
      bottomLinkCStyle = (hasTopTxt) ? styles.bottomTxtStyleC1 : styles.bottomTxtStyleC2;
      bottomLinkDStyle = (hasTopTxt) ? styles.bottomTxtStyleD1 : styles.bottomTxtStyleD2;
    }

    // Temporarily make elements that are not the flight number aria-hidden for modal, otherwise focus will get pulled elsewhere and accessibility SO will break
    const nonFlightNumberAriaHidden = (this.props.toFocusFlightNumber && isTabletScreen) ? 'true' : 'false';

    const thirdLineContent = (this.props.thirdLineTxt) ? (
      <div className={styles.thirdLineTxtContainer}>
        <a
          tabIndex="0"
          className={styles.thirdLineTxt}
          aria-label={this.props.thirdLineTxt}
          href={this.props.thirdLineURL}
        >{this.props.thirdLineTxt}</a>
      </div>
    ) : '';

    const rightPanelContent = (
      <div className={styles.rightPanelParentContainer}>
        <div
          className={styles.flightNumber}
          tabIndex="0"
          ref={(input) => { this.flightNumberRef = input; }}
          id="flightNumber"
          aria-label={`${intl.formatMessage(messages.flightNumber)} ${this.props.flightNumber}`}
          onBlur={() => this.onFlightNumberBlur()}
          aria-live="assertive"
        >
          {(!isTabletScreen) ?
            <span className={styles.srOnly}>{intl.formatMessage(messages.flightNumber)}</span>
          : ''}
          {this.props.flightNumber}
        </div>
        <div
          className={classNames(styles.flightStatus, threeLineMargin)}
          aria-label={`${intl.formatMessage(messages.flightStatus)} ${this.props.status}`}
          aria-hidden={nonFlightNumberAriaHidden}
        >{this.props.status}</div>
        {(hasTopTxt) ?
          <div
            className={(this.props.panelType === 'checkin') ? classNames(styles.threeLineTxtCheckinStyle, threeLineStyle) : classNames(styles.threeLineTxtStatusStyle, threeLineStyle)}
            style={{ height: threeLineHeight }}
            aria-hidden={nonFlightNumberAriaHidden}
          >
            {(this.props.panelType === 'checkin') ?
              <div className={styles.alertMsg}>
                <img className={styles.alertIcon} src={alertIcon} alt="" role="presentation" aria-hidden="true" />
                <div className={classNames(styles.firstLineCheckinTxt, styles.lineText)}>
                  {this.props.firstLineTxt}
                </div>
              </div>
             : <div className={firstLineStyle}>{this.props.firstLineTxt}</div>
           }
            <div className={classNames(styles.secondLineTxt, styles.lineText)} aria-label={`${this.props.secondLineAriaLabel} ${this.props.secondLineTxt}`}>
              {this.props.secondLineTxt}
            </div>
            {thirdLineContent}
          </div> : ''}
        <div className={(hasTopTxt) ? styles.secondSectionContainer : styles.secondSectionContainerNoTopTxt} aria-hidden={nonFlightNumberAriaHidden}>
          {this.props.secondSectionComponenet}
        </div>
        <div className={(hasTopTxt) ? styles.thirdSectionContainer : styles.thirdSectionContainerNoTopTxt} aria-hidden={nonFlightNumberAriaHidden}>
          {this.props.thirdComponentToRender}
        </div>
        {(this.props.bottomHeader) ?
          <div className={classNames(styles.bottomHeader, (hasTopTxt) ? styles.bottomHeaderGrid : styles.bottomHeaderNoTopTxtGrid)} aria-hidden={nonFlightNumberAriaHidden}>
            {this.props.bottomHeader}
          </div>
        : ''}
        {(this.props.isUnited && this.props.bottomTxtA) ?
          <div className={classNames(styles.bottomTxtAndLinkStyle, bottomLinkAStyle)} aria-hidden={nonFlightNumberAriaHidden}>
            {(this.props.hasBottomTypeLink) ?
              <a
                tabIndex="0"
                aria-label={this.props.bottomTxtA}
                className={classNames(styles.linksStyle, styles.bottomLinkAstyle)}
                href={this.props.linkURLS.upgradeURL}
              >{this.props.bottomTxtA}</a>
              : <span tabIndex="0" className={classNames(styles.bottomTxtstyle)} aria-label={this.props.bottomTxtA}>
                <img
                  className={styles.iconStyle}
                  src={this.props.bottomTxtIconA}
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                />
                {this.props.bottomTxtA}
              </span>
              }
          </div>
      : ''}
        {(this.props.isUnited && this.props.bottomTxtB) ?
          <div className={classNames(styles.bottomTxtBstyleContainer, styles.bottomTxtAndLinkStyle, bottomLinkBStyle)} aria-hidden={nonFlightNumberAriaHidden}>
            {(this.props.hasBottomTypeLink) ?
              <a
                tabIndex="0"
                aria-label={this.props.bottomTxtB}
                className={classNames(styles.linksStyle, styles.bottomLinkBstyle)}
                href={this.props.linkURLS.standbyURL}
              >{this.props.bottomTxtB}</a>
              : <span tabIndex="0" className={classNames(styles.bottomTxtstyle)} aria-label={this.props.bottomTxtB}>
                <img
                  className={styles.iconStyle}
                  src={this.props.bottomTxtIconB}
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                />
                {this.props.bottomTxtB}
              </span>
              }
          </div>
        : ''}
        {(this.props.isUnited && this.props.bottomTxtC) ?
          <div className={classNames(styles.bottomTxtAndLinkStyle, bottomLinkCStyle)} aria-hidden={nonFlightNumberAriaHidden}>
            {(this.props.hasBottomTypeLink) ?
              <a
                tabIndex="0"
                aria-label={this.props.bottomTxtC}
                className={classNames(styles.linksStyle, styles.bottomLinkCstyle)}
                href={this.props.linkURLS.seatmapURL}
              >{this.props.bottomTxtC}</a>
              : <span tabIndex="0" className={classNames(styles.bottomTxtstyle)} aria-label={this.props.bottomTxtC}>
                <img
                  className={styles.iconStyle}
                  src={this.props.bottomTxtIconC}
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                />
                {this.props.bottomTxtC}
              </span>
              }
          </div>
          : ''}
        {(this.props.isUnited && this.props.bottomTxtD) ?
          <div className={bottomLinkDStyle} aria-hidden={nonFlightNumberAriaHidden}>
            {(this.props.hasBottomTypeLink) ?
              <a
                tabIndex="0"
                aria-label={this.props.bottomTxtD}
                className={classNames(styles.linksStyle, styles.bottomLinkDstyle)}
                href={this.props.linkURLS.amenitiesURL}
              >{this.props.bottomTxtD}</a>
            : <span tabIndex="0" className={classNames(styles.bottomTxtstyle)} aria-label={this.props.bottomTxtD}>{this.props.bottomTxtD}</span>
          }
          </div>
        : ''}
        {!(this.props.isUnited) ?
          <div
            className={classNames(styles.linkcontainer, (this.props.hasBottomTypeLink || hasTopTxt) ? styles.linkcontainer : styles.linkcontainerNoTopTxt)}
            aria-hidden={nonFlightNumberAriaHidden}
          >{intl.formatMessage(messages.nonunited)}</div> : ''}
        {(!(this.props.isMobile) && (this.props.isUnited)) ?
          <div
            className={classNames(styles.bottomAppAdd, (this.props.hasBottomTypeLink || hasTopTxt) ? styles.bottomAppAddWithAboveTxt : styles.bottomAppAddNoAboveTxt)}
            aria-hidden={nonFlightNumberAriaHidden}
          >
            <img
              src={appIcon}
              className={styles.appImg}
              alt=""
              role="presentation"
              aria-hidden="true"
            />
            <div className={styles.appTxtContainerStyle}>
              <p>{this.props.appTxt}</p>
              <a
                tabIndex="0"
                className={styles.appLinkStyle}
                href={this.props.downloadAppLink}
                aria-label={intl.formatMessage(messages.downloadLinkAria)}
              >{this.props.appLink}</a>
            </div>
          </div>
        : ''}
        {(this.props.isTablet) ?
          <div className={styles.bottompadding} aria-hidden="true" />
        : ''}
        <div className={styles.CTAbuttonContainer} aria-hidden={nonFlightNumberAriaHidden}>
          <button
            className={classNames(styles.btnDefault, styles.secondaryButton, (hasBottomTxt) ? styles.CTAbutton : styles.CTAbuttonNoOtherTxt)}
            onClick={this.props.buttonAction}
            aria-label={this.props.buttonTxt}
            tabIndex="0"
          >{this.props.buttonTxt}</button>
        </div>
        {(this.props.isTablet) ?
          <button
            title="Close this panel"
            role="button"
            id="closePanelBtn"
            className={styles.closeButton}
            onClick={() => { this.props.onCloseModal(false); this.props.onToFocusFlightNumber(false); }}
            tabIndex="0"
            aria-hidden={nonFlightNumberAriaHidden}
          >
            <img src={closeIcon} alt="" role="presentation" aria-hidden="true" />
          </button>
        : ''}
      </div>
    );

    const loadingContent = (
      <div className={classNames(styles.rightPanelParentContainer, styles.rightPanelLoaderContainer)}>
        <div className={styles.loaderContainer}>
          <img
            src={loaderAnimation}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </div>
      </div>
    );

    const loaderComponent = (this.props.isTablet) ?
    (<Modal
      isOpen={this.props.isLoading}
      className={classNames(styles.panelModal, styles.loadingModal)}
    >{loadingContent}</Modal>)
    : (
      loadingContent
    );

    const componentToRender = (this.props.isLoading) ? loaderComponent : rightPanelContent;

    return (componentToRender);
  }
}

RightPanelComponent.propTypes = {
  appTxt: PropTypes.string,
  appLink: PropTypes.string,
  bottomHeader: PropTypes.string,
  bottomTxtIconA: PropTypes.string,
  bottomTxtIconB: PropTypes.string,
  bottomTxtIconC: PropTypes.string,
  buttonAction: PropTypes.func,
  buttonTxt: PropTypes.string,
  downloadAppLink: PropTypes.string,
  firstLineTxt: PropTypes.string,
  flightNumber: PropTypes.string,
  hasBottomTypeLink: PropTypes.bool,
  intl: intlShape.isRequired,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  bottomTxtA: PropTypes.string,
  bottomTxtB: PropTypes.string,
  bottomTxtC: PropTypes.string,
  bottomTxtD: PropTypes.string,
  onCloseModal: PropTypes.func,
  panelType: PropTypes.string,
  secondLineTxt: PropTypes.string,
  secondLineAriaLabel: PropTypes.string,
  secondSectionComponenet: PropTypes.object,
  status: PropTypes.string,
  thirdComponentToRender: PropTypes.object,
  thirdLineTxt: PropTypes.string,
  isUnited: PropTypes.string,
  thirdLineURL: PropTypes.string,
  toFocusFlightNumber: PropTypes.bool,
  onToFocusFlightNumber: PropTypes.func,
  linkURLS: PropTypes.object,
};

export default injectIntl(RightPanelComponent);
