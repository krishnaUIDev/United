/*
 * LoginForm
 *
 * Login Form in the right sidebar -- LoginButton
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedNumber } from 'react-intl';
import { NON_EXPIRATION_CHASE_CARD_TYPES } from 'containers/App/constants';
import config from 'config'; // eslint-disable-line
import moment from 'moment';
import classNames from 'classnames';

import styles from './loggedInSidebar.scss';
import messages from './messages';
import ToolTip from '../ToolTip';

class LoggedInSidebar extends Component {

  render() {
    const { intl } = this.props;
    const user = this.props.mpUserProfile;
    const travelersObj = user.Travelers[0];
    const milagePlusObj = travelersObj.MileagePlus;
    const milageExpirationDate = milagePlusObj.MileageExpirationDate.substring(0, 10);
    const pqm = milagePlusObj.EliteMileageBalance;
    const pqs = milagePlusObj.EliteSegmentBalance;
    const pqd = milagePlusObj.CurrentYearMoneySpent;
    const travelBankBalance = milagePlusObj.TravelBankBalance;
    const fullName = `${travelersObj.FirstName} ${travelersObj.LastName}`;
    const milageplusNumb = travelersObj.MileagePlusId;
    const memberStatus = (milagePlusObj.CurrentEliteLevel === 0) ? 'Member' : milagePlusObj.CurrentEliteLevelDescription;
    const rmb = milagePlusObj.AccountBalance;
    // If there is a threshold defined in the user profile data object use that, otherwise threshold is $12,000.00
    let pqdExceeded;
    const pqdThreshold = milagePlusObj.currentYearMoneySpentThreshold;
    if ((pqdThreshold) && pqd > pqdThreshold) {
      pqdExceeded = pqdThreshold;
    } else if (pqd > 12000) {
      pqdExceeded = 12000;
    }
    const premierUpgrades1 = milagePlusObj.PremierUpgrades[0];
    const premierUpgrades2 = milagePlusObj.PremierUpgrades[1];
    let rpuCredit;
    let rpuExpiration;
    let gpuCredit;
    let gpuExpiration;
    const convertDateFormat = (val) => (moment(val).format('MM/DD/YYYY'));
    if ((premierUpgrades1 && premierUpgrades2) && premierUpgrades1.UpgradeType === 'RPU') {
      rpuCredit = premierUpgrades1.Credit;
      rpuExpiration = convertDateFormat(premierUpgrades1.ExpirationDate);
      gpuCredit = premierUpgrades2.Credit;
      gpuExpiration = convertDateFormat(premierUpgrades2.ExpirationDate);
    } else if ((premierUpgrades1 && premierUpgrades2) && premierUpgrades2.UpgradeType === 'RPU') {
      rpuCredit = premierUpgrades2.Credit;
      rpuExpiration = convertDateFormat(premierUpgrades2.ExpirationDate);
      gpuCredit = premierUpgrades1.Credit;
      gpuExpiration = convertDateFormat(premierUpgrades1.ExpirationDate);
    }
    const paymentInfos = milagePlusObj.PaymentInfos;
    const displayNonExpirationMessage = (paymentInfos && paymentInfos.filter((hasPartnerCard) => NON_EXPIRATION_CHASE_CARD_TYPES.includes(hasPartnerCard.PartnerCardType)).length > 0);
    const displayExpirationDate = () => {
      let display;
      if (rmb > 0) {
        if (displayNonExpirationMessage) {
          display = (
            <ToolTip
              msg={`${intl.formatMessage(messages.expiration)} : ${milageExpirationDate}`}
              tooltipmsg={intl.formatMessage(messages.nonExpirationToolTip)}
              tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.expiration)} : ${milageExpirationDate}`}
              noTopStyle="true"
              tooltipContainerStyle={styles.tooltipContainerWithMargin}
              labelStyle={styles.tooltipLabelStyle}
            />
          );
        } else {
          display = (
            <ToolTip
              msg={`${intl.formatMessage(messages.expiration)} : ${milageExpirationDate}`}
              tooltipmsg={intl.formatMessage(messages.expirationToolTip)}
              tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.expiration)} : ${milageExpirationDate}`}
              noTopStyle="true"
              tooltipContainerStyle={styles.tooltipContainerWithMargin}
              labelStyle={styles.tooltipLabelStyle}
            />
          );
        }
      } else {
        display = '';
      }
      return display;
    };

    return (
      <div className={styles.gridParent}>
        <p
          className={styles.fullName}
          aria-label={`${intl.formatMessage(messages.hi)} ${fullName}`}
        >{`${intl.formatMessage(messages.hi)} ${fullName}`}</p>
        <div className={styles.mpEnrollContainer}>
          <a
            className={styles.mileagePlusEnroll}
            aria-label={intl.formatMessage(messages.manageAccountAriaLabel)}
            href={`${config.UAL_BASE_URL}${config.MY_ACCOUNT}`}
          >{intl.formatMessage(messages.viewAccount)}</a>
        </div>
        <p
          className={styles.mpNumber}
          aria-label={`${intl.formatMessage(messages.mileageplus)} ${milageplusNumb}`}
        ><strong>{`${intl.formatMessage(messages.mileageplus)}: ${milageplusNumb}`}</strong></p>
        <div className={styles.dividerLine} />
        <p
          className={classNames(styles.labelStyle, styles.statusLabel)}
          aria-label={intl.formatMessage(messages.status)}
        >{intl.formatMessage(messages.status)}</p>
        <p
          className={classNames(styles.infoContent, styles.statusContent)}
          aria-label={memberStatus}
        >{memberStatus}</p>
        <p
          className={classNames(styles.labelStyle, styles.redeemableLabel)}
          aria-label={intl.formatMessage(messages.milageBalance)}
        >{intl.formatMessage(messages.milageBalance)}</p>
        <div className={styles.rmbContent}>
          <span
            className={styles.infoContent}
            aria-label={`${rmb} ${intl.formatMessage(messages.miles)}`}
          >
            <FormattedNumber
              value={rmb}
            />
          </span>
        </div>
        <div className={styles.expirationDate}>
          {displayExpirationDate()}
        </div>
        <div className={styles.pqmEarned}>
          <ToolTip
            value={`${pqm}`}
            msg={intl.formatMessage(messages.pqmEarned)}
            tooltipmsg={intl.formatMessage(messages.pqmTooltip)}
            tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.pqm)}`}
            tooltipContainerStyle={styles.tooltipContainerWithMargin}
            labelStyle={styles.tooltipLabelStyle}
          />
        </div>
        <div className={styles.pqsEarned}>
          <ToolTip
            value={`${pqs}`}
            msg={intl.formatMessage(messages.pqsEarned)}
            tooltipmsg={intl.formatMessage(messages.pqsTooltip)}
            tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.pqs)}`}
            tooltipContainerStyle={styles.tooltipContainerWithMargin}
            labelStyle={styles.tooltipLabelStyle}
          />
        </div>
        <div className={styles.pqdEarned}>
          <ToolTip
            msg={intl.formatMessage(messages.pqdEarned)}
            tooltipmsg={intl.formatMessage(messages.pqdTooltipA)}
            secondmsg={intl.formatMessage(messages.pqdTooltipB)}
            linkmsg={intl.formatMessage(messages.pqdTooltipLink)}
            linkurl={`${config.UAL_BASE_URL}${config.VIEW_ACCOUNT}`}
            tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.pqdTTaria)}`}
            tooltipContainerStyle={styles.tooltipContainerWithMargin}
            labelStyle={styles.tooltipLabelStyle}
          />
        </div>
        <div className={styles.pqdExceeded}>
          <span
            className={styles.infoContent}
            aria-label={(pqdExceeded) ? `${intl.formatMessage(messages.pdqExceededPhrase)} ${pqdExceeded}` : `${pqd} ${intl.formatMessage(messages.pqdTooltipMsg)}`}
          >
            {(pqdExceeded) ?
              <span aria-label={intl.formatMessage(messages.pdqExceededPhrase)}>
                {intl.formatMessage(messages.pdqExceededPhrase)}
                <FormattedNumber
                  value={pqdExceeded}
                  style="currency" // eslint-disable-line
                  currency="USD"
                />
              </span>
          : <FormattedNumber
            value={pqd}
            style="currency" // eslint-disable-line
            currency="USD"
          />}
          </span>
        </div>
        <div className={styles.travelBankBalance}>
          {(travelBankBalance) ?
            <div>
              <p
                className={styles.labelStyle}
                aria-label={intl.formatMessage(messages.unitedTravelBank)}
              >{intl.formatMessage(messages.unitedTravelBank)}</p>
              <p
                className={styles.infoContent}
                aria-label={travelBankBalance}
              >
                <FormattedNumber
                  value={travelBankBalance}
                  style="currency" // eslint-disable-line
                  currency="USD"
                />
              </p>
            </div>
          : ''}
        </div>
        <div className={styles.gpuRpuCredit}>
          {(rpuCredit && gpuCredit) ?
            <div>
              <p
                className={styles.labelStyle}
                aria-label={intl.formatMessage(messages.premierUpgrades)}
              >{intl.formatMessage(messages.premierUpgrades)}</p>
              <div className={styles.rpuContainer}>
                <ToolTip
                  msg={`${intl.formatMessage(messages.rpulabel)}: ${rpuCredit}`}
                  tooltipmsg={`${intl.formatMessage(messages.rpuUpgradesTooltip)} ${rpuCredit}`}
                  secondmsg={`${rpuCredit} ${intl.formatMessage(messages.rpuExpiring)} ${rpuExpiration}`}
                  tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.rpulabel)}`}
                  tooltipContainerStyle={styles.tooltipContainer}
                  labelStyle={styles.infoContent}
                />
              </div>
              <div className={styles.gpuContainer} >
                <ToolTip
                  msg={`${intl.formatMessage(messages.gpulabel)}: ${gpuCredit}`}
                  tooltipmsg={`${intl.formatMessage(messages.gpuUpgradesTooltip)} ${gpuCredit}`}
                  secondmsg={`${gpuCredit} ${intl.formatMessage(messages.gpuExpiring)} ${gpuExpiration}`}
                  tooltipBtnAriaLabel={`${intl.formatMessage(messages.tooltipBtnAria)} ${intl.formatMessage(messages.gpulabel)}`}
                  tooltipContainerStyle={styles.tooltipContainer}
                  labelStyle={styles.infoContent}
                />
              </div>
            </div>
          : ''}
        </div>
        <div tabIndex="0" aria-label="Ad placeholder" className={styles.adPlaceholderDiv}>Ad placeholder</div>
      </div>
    );
  }
}

LoggedInSidebar.propTypes = {
  intl: intlShape.isRequired,
  mpUserProfile: PropTypes.object,
};

export default injectIntl(LoggedInSidebar);
