import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ViewMoreButton from '../ActivityViewMore/viewMoreButton';
import styles from './airlineActivity.scss';
import UpgradeActivity from '../UpgradeActivity/index';
import messages from './messages';
import { activityDateRangeSelected, activityListLoaded } from '../../containers/MyAccount/AirlineActivityContainer/actions';
import { ToolTip } from '../ToolTip';
class AirlineActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
    };
    this.displayActivityDesc = this.displayActivityDesc.bind(this);
  }
  componentDidMount() {
    this.props.loadUpgradeActivity();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activityList) {
      this.setState({ activityList: nextProps.activityList, showButton: true });
    }
  }

  handleViewMore() {
    this.props.onViewMoreClick(this.props.activityListViewCount + 10);
  }
  displayActivityDesc(activity, index) {
    const activityList = this.state.activityList;
    activityList[index].showDescription = !activity.showDescription;
    this.setState({ activityList });
  }
  displayActivityPQValues(type, pqValue, pqType) {
    let activityPqValue = pqValue;
    let activityPqType = pqType;
    if (type === 'R' ) {
      if (activityPqValue == 0 && activityPqType == "PQM" || activityPqType  == "PQS" || activityPqType  == "PQD") {
        return '-';
      } else {
        return activityPqValue.toLocaleString();
      }
    } else if (type === 'F') {
      if(isNaN(activityPqValue)){
        return (activityPqValue).toLocaleString();
      }
      else if (parseFloat(activityPqValue) >= 0) {
        return parseFloat(activityPqValue).toLocaleString();
      } else {
        return `(${-1 * activityPqValue.toLocaleString()})`;
      }
    }
    else if (type === 'A') {
      if (activityPqValue == 0  && activityPqType == "PQM" || activityPqType  == "PQS"){
        return '-'
      } else
      if (activityPqValue && parseFloat(activityPqValue) >= 0) {
        return parseFloat(activityPqValue).toLocaleString();
      } else {
        return `(${(-1 * activityPqValue).toLocaleString()})`;
      }
    } else if (type === 'V') {
      if (activityPqValue == 0 && activityPqType == "PQS" || activityPqType  == "PQD"){
        return '-'
      }
      else if ( parseFloat(activityPqValue) >= 0) {
        return parseFloat(activityPqValue).toLocaleString();
      } else {
        return `(${(-1 * activityPqValue).toLocaleString()})`;
      }
    }
    else if (type === 'O') {
      if (activityPqValue == 0  && activityPqType == "PQS" || activityPqType  == "PQD") {
        return '-';
      } else {
        return `(${-1 * activityPqValue.toLocaleString()})`;
      }
    }
    return 0;
  }

  displayActivityDetails() {
    const { intl } = this.props;
    if (this.state.activityList && typeof this.state.activityList === 'object' && this.state.activityList[0]) {
      return this.state.activityList.map((activity, index) => {
        let desc;
       // (activity.ActivityType === 'F' ? desc = (activity.Description).split('|') : desc = []);
        let PQM = 'PQM';
        let PQS = 'PQS';
        let PQD = 'PQD';
        const date = activity.TransactionDate.split('-').length ? activity.TransactionDate.split('-') : activity.TransactionDate;
        const transactionDate = `${date[1]}/${date[2]}/${date[0]}`;
        const activityMiles = activity.TotalMiles >= 0
         ? activity.TotalMiles > 1 ? `${activity.TotalMiles.toLocaleString()}  miles` : `${activity.TotalMiles}  mile` :
         (activity.TotalMiles < -1 ? `(${(-1 * activity.TotalMiles).toLocaleString()}  miles` + ')' : `(${-1 * activity.TotalMiles}  mile`+ ')');
        const originCityCodeIndex = activity.OriginCityName ? activity.OriginCityName.indexOf(activity.OriginCode) : -1;
        const destinationCityCodeIndex = activity.DestinationCityName ? activity.DestinationCityName.indexOf(activity.DestinationCode) : -1;
        const activityDescShow = activity.ActivityType === 'F';
        const activityDescSh = activity.ActivityType === 'O';
        const activityDescForTypeA = activity.ActivityType === 'A';
        const activityDescForTypeV = activity.ActivityType === 'V';
        const activityAdjustmentOrDeposit = (activity.Description).split(' ');
        const adjustmentOrDeposit = (activity.ActivityType === 'V' && ((activityAdjustmentOrDeposit.indexOf('Deposit') > -1) || (activityAdjustmentOrDeposit.indexOf('Adjustment') > -1) || (activityAdjustmentOrDeposit.indexOf('Reinstate')> -1) || (activityAdjustmentOrDeposit.indexOf('Redeposit')> -1) || (activityAdjustmentOrDeposit.indexOf('Bonus') > -1) || (activityAdjustmentOrDeposit.indexOf('Expiration') > -1)
         || (activityAdjustmentOrDeposit.indexOf('FEQms') > -1) || (activityAdjustmentOrDeposit.indexOf('Qualification') > -1)
      ));
        return (<div>
          <li
            tabIndex="0"
            className={((activity.OriginCityName && activity.DestinationCityName) || (activity.ActivityType === 'R' && activity.TicketNames !== null) || (activityDescSh && activity.Location !== null) || (activityDescForTypeV && activity.Description === 'Transfer from Flex PQM to PQM' && activity.FlexPQMTransfers !== null)) ? styles.activityContainer : classNames(styles.activityContainer, styles['no-cursor'])}
            onClick={() => (activityDescShow || activityDescForTypeA || (activity.ActivityType === 'R') || activityDescSh || activityDescForTypeV) && this.displayActivityDesc(activity, index)} onKeyPress={(e) => (e.key === 'Enter' || e.key === 'Space') && (activityDescForTypeA || activityDescShow || activity.ActivityType === 'R' || activityDescSh || activityDescForTypeV) && this.displayActivityDesc(activity, index)}
          >
            <span className={classNames(styles.activityMiles, styles.boxes, styles.box)}>{transactionDate} </span>
            {activity.ActivityType === 'F' && activity.OriginCityName && activity.DestinationCityName ?
              <span className={classNames(styles.activityMiles, styles.color, styles.boxes, styles.box2)}>{activity.PartnerName} {activity.FlightNumber} {activity.OriginCode} - {activity.DestinationCode} </span> :
              (activity.PartnerType === 'C' || activity.PartnerType === 'H') ? <span className={classNames(styles.activityMiles, styles.color, styles.boxes, styles.box2)}>{activity.PartnerName}</span> : <span className={classNames(styles.activityMiles, styles.color, styles.boxes, styles.box2)}>{activity.Description} </span>
             }
            <span className={styles['activity-miles-pqm']}>
              <span className={styles.visuallyHidden}>pqm</span>
              {this.displayActivityPQValues(activity.ActivityType, activity.Description &&
              (activity.Description == 'Flex Premier Qualifying Mile Redeposit' && activity.FPQM ? activity.FPQM : 0) ||
              (activity.Description == 'Transfer from Flex PQM to PQM' && activity.FPQMTransferredTotal ? activity.FPQMTransferredTotal : 0) ||
              (activity.PQM), PQM)
            }
              {adjustmentOrDeposit && <span tabIndex="0" aria-label="">*</span>}

              {/* { activity.PQM >= 0 ? (activity.PQM ? (parseInt(activity.PQM).toLocaleString()) : activity.PQM) : `(${-1 * activity.PQM})`} */}
            </span>
            <span className={styles['activity-miles-pqs']}>
              <span className={styles.visuallyHidden}>pqs</span>
              {this.displayActivityPQValues(activity.ActivityType, activity.PQS, PQS)}
              {/* { activity.PQS >= 0 ? (activity.PQS ? (parseInt(activity.PQS).toLocaleString()) : activity.PQS) : `(${-1 * activity.PQS})`} */}
            </span>
            <span className={styles['activity-miles-pqd']}>
              <span className={styles.visuallyHidden}>pqd</span>
              {this.displayActivityPQValues(activity.ActivityType, activity.PQD, PQD)}

              {(activity.ActivityType === 'F') && (activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'X' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'Z' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'P')) &&
              <span tabIndex="0" aria-label="">
                <div className={styles.tooltipContainers}>
                  { activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'X' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'Z') &&
                  <ToolTip
                    tooltipmsg={<FormattedMessage {...messages.toolTipMszXZ} />}
                    tooltipContainerStyle={classNames(styles.tooltipContainerWithMargins, styles.questionMarkToolTips)}
                  />}
                  {activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'P') &&
                  <ToolTip
                    tooltipmsg={<FormattedMessage {...messages.toolTipMszP} />}
                    tooltipContainerStyle={classNames(styles.tooltipContainerWithMargins, styles.questionMarkToolTips)}
                  />}
                </div>
                </span>}
            </span>
            <span className={classNames(styles.activityMiles, styles['activity-miles'])}>
              <span className={styles.visuallyHidden}>Award Miles</span>
              {(activity.ActivityType === 'V') || ((activity.ActivityType === 'A') && activity.TotalMiles === 0 ? '-' : activityMiles)}
            </span>
            <span className={classNames(styles.activityMiles, styles['expand-button'], styles.boxes, styles.box2)}>
              {((activityDescShow && activity.OriginCityName && activity.DestinationCityName) || (activity.ActivityType === 'R' && activity.TicketNames !== null)) &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.activityDescriptionShow, styles['activity-button-expanded']) : classNames(styles.activityDescriptionShow, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }

              { activityDescForTypeA &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.activityDescriptionShow, styles.activityTypeA, styles['activity-button-expanded']) : classNames(styles.activityDescriptionShow, styles.activityTypeA, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }
              { activityDescSh && activity.Location &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.activityDescriptionShow, styles['activity-button-expanded']) : classNames(styles.activityDescriptionShow, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }
              {activityDescSh &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.columnsTab, styles['activity-button-expanded']) : classNames(styles.columnsTab, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }

              { activityDescForTypeV && activity.Description === 'Transfer from Flex PQM to PQM' && activity.FlexPQMTransfers !== null &&
                <button
                  tabIndex="-1" aria-label=""
                  className={activity.showDescription ? classNames(styles.activityDescriptionShow, styles['activity-button-expanded']) : classNames(styles.activityDescriptionShow, styles['activity-button'])}
                  onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
                >
                </button>
                }
              { activityDescForTypeV &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.columnsTab, styles['activity-button-expanded']) : classNames(styles.columnsTab, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }

              {(activityDescShow || (activity.ActivityType === 'R')) &&
              <button
                tabIndex="-1" aria-label=""
                className={activity.showDescription ? classNames(styles.columnsTab, styles['activity-button-expanded']) : classNames(styles.columnsTab, styles['activity-button'])}
                onClick={() => { activity.showDescription = !activity.showDescription; this.displayActivityDesc(activity, index); }}
              >
              </button>
              }
              {activity.showDescription && <span className={classNames(styles.activityMiles, styles.visuallyHidden)}>Button Expanded</span>}
              {!activity.showDescription && <span className={classNames(styles.activityMiles, styles.visuallyHidden)}>Button Collapsed</span>}
            </span>
          </li>

          {/*  <div className={activity.OriginCityName && activity.DestinationCityName && activityDescShow ? '' : styles.hideDiv}> */}
          <div className={activity.showDescription ? classNames(styles['activity-description'], styles.showDiv) : styles.hideDiv}>
            {!activityDescForTypeA &&
            <div className={(activity.OriginCityName && activity.DestinationCityName && activityDescShow) || activityDescForTypeA ? '' : styles.hideDiv}>
              <p>{activity.OriginCityName} {originCityCodeIndex !== -1 ? '' : `(${activity.OriginCode})`} - {activity.DestinationCityName} {destinationCityCodeIndex !== -1 ? '' : `(${activity.DestinationCode})`}</p>
              <p>United Express {activity.FlightNumber} | {activity.FareCode} Class </p>
              <p>Base Miles: {activity.BaseMiles.toLocaleString()}</p>
              <p>Bonus Miles earned: {activity.BonusMiles.toLocaleString()}</p>
              <p>Total Miles earned: {activity.TotalMiles.toLocaleString()}
                { activity.TotalMiles >= 75000 &&
                  <div className={styles.tooltipContainers}>
                    <ToolTip
                      tooltipmsg={`${intl.formatMessage(messages.CappingtooltipMSg)}`}
                      tooltipBtnAriaLabel={`${intl.formatMessage(messages.CappingtooltipBtnAria)}`}
                      toolTipStyle={styles.tooltip}
                      tooltipContainerStyle={classNames(styles.tooltipContainerWithMargin)}
                    />
                  </div>
                }
              </p>
                &nbsp;
            </div>
          }
            <div className={activity.showDescription && activity.ActivityType === 'R' && activity.TicketNames !== null ? classNames(styles['activity-description'], styles.showDiv) : styles.hideDiv}>
              <p className={styles.Traveler}>Traveler: {activity.TicketNames && activity.TicketNames.length ? activity.TicketNames[0] : '-'}</p>
            </div>
            {activityDescSh && activity.Location !== null &&
            <div className={activityDescSh ? styles.loc : styles.hideDiv}>
              <p>{activity.Location}</p>
            </div>
         }

            { activityDescForTypeV && activity.Description === 'Transfer from Flex PQM to PQM' &&
              <div className={classNames(styles.loc)}>
                {activity.FlexPQMTransfers && activity.FlexPQMTransfers.map((item, index) =>
                  <p>Year Earned - {item.YearEarned} : {
                    item.FPQMTransferred >= 0
                      ? item.FPQMTransferred && item.FPQMTransferred > 1 ? `${item.FPQMTransferred.toLocaleString()}  miles` : `${item.FPQMTransferred}  mile` :
                      (item.FPQMTransferred < -1 ? `(${(-1 * item.FPQMTransferred).toLocaleString()}  miles` + ')' : `(${-1 * item.FPQMTransferred}  mile`+ ')')
                  } </p>
               )}
              </div>
           }
           &nbsp;

            <div className={styles.columnsTab}>
              <p>Premier qualifying miles: {this.displayActivityPQValues(activity.ActivityType, activity.PQM) } {adjustmentOrDeposit && <span tabIndex="0">*</span>}</p>
              <p>Premier qualifying segments: {this.displayActivityPQValues(activity.ActivityType, activity.PQS) }</p>
              <p>Premier qualifying dollars: {this.displayActivityPQValues(activity.ActivityType, activity.PQD) }
                {(activity.ActivityType === 'F') && (activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'X' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'Z' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'P')) &&
                <span tabIndex="0" aria-label="">
                  <div className={styles.tooltipContainers}>
                    {activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'X' || activity.ActivityDetailsData[0].RevenueSourceIndicator === 'Z') &&
                    <ToolTip
                      tooltipmsg={<FormattedMessage {...messages.toolTipMszXZ} />}
                      tooltipContainerStyle={classNames(styles.tooltipContainerWithMargins, styles.questionMarkToolTips)}
                    />}
                    {activity.ActivityDetailsData.length > 0 && (activity.ActivityDetailsData[0].RevenueSourceIndicator === 'P') &&
                      <ToolTip
                        tooltipmsg={<FormattedMessage {...messages.toolTipMszP} />}
                        tooltipContainerStyle={classNames(styles.tooltipContainerWithMargins, styles.questionMarkToolTips)}
                      />}
                  </div>
                </span>}
              </p>
            </div>
          </div>
        </div>
        );
      });
    }
  }
  render() {
    const { intl } = this.props;
    let aod = this.state.activityList.filter(function(item,index){
      const adjustOrDeposit =((item.Description === 'Flex PQM Adjustment') || (item.Description === 'Flex Premier Qualifying Mile Deposit')) || (item.Description === 'Flex Premier Qualifying Mile Redeposit') 
      || (item.Description === 'Flex Premier Qualifying Mile Reinstate') || (item.Description === 'Flex Premier Qualifying Mile Expiration')
      if (adjustOrDeposit) {
        return item;
      }
    });
    return (
      <div><h3 className={classNames(styles['activities-columns, activity-header'], styles.wrapper, styles.textsize)}>Award mile activity details: {this.props.selectedDateRange}</h3>
        <div>

          <div className={classNames(styles['activities-columns'], styles.wrapper)} ><FormattedMessage id="mile" {...messages.MileageplusHeading} />
            <span className={classNames(styles.pqm, styles['pad-left'])} id="sanserif-font" ><FormattedMessage {...messages.PQMLabel} />
              <div className={styles.tooltipContainers}>
                <ToolTip
                  tooltipmsg={`${intl.formatMessage(messages.PQMtooltipMSg)}`}
                  tooltipBtnAriaLabel={`${intl.formatMessage(messages.PQMtooltipBtnAria)}`}
                  toolTipStyle={styles.tooltip}
                  tooltipContainerStyle={classNames(styles.tooltipContainerWithMargin)}
                  linkmsg="Learnmore"
                  linkurl="https://www.united.com/web/en-US/content/mileageplus/premier/qualify.aspx" target="_blank"
                />
              </div>
            </span>
            <span className={classNames(styles.pqs, styles['pad-left'])} id="sanserif-font"><FormattedMessage {...messages.PQSLabel} />
              <div className={styles.tooltipContainers}>
                <ToolTip
                  tooltipmsg={`${intl.formatMessage(messages.PQStooltipMSg)}`}
                  tooltipBtnAriaLabel={`${intl.formatMessage(messages.PQStooltipBtnAria)}`}
                  toolTipStyle={styles.tooltip}
                  tooltipContainerStyle={classNames(styles.tooltipContainerWithMargin)}
                  linkmsg="Learnmore"
                  linkurl="https://www.united.com/web/en-US/content/mileageplus/premier/qualify.aspx" target="_blank"
                />
              </div>
            </span>
            <span className={classNames(styles.pqd, styles['pad-left'])} id="sanserif-font"><FormattedMessage {...messages.PQDLabel} />
              <div className={styles.tooltipContainers}>
                <ToolTip
                  tooltipmsg={`${intl.formatMessage(messages.PQDtooltipMSg)}`}
                  tooltipBtnAriaLabel={`${intl.formatMessage(messages.PQDtooltipBtnAria)}`}
                  toolTipStyle={styles.tooltip}
                  tooltipContainerStyle={classNames(styles.tooltipContainerWithMargin)}
                  linkmsg="Learnmore"
                  linkurl="https://www.united.com/web/en-US/content/mileageplus/premier/qualify.aspx" target="_blank"
                />
              </div>
            </span>
            <span className={classNames(styles.activityMiles, styles['pad-left'], styles.awardMiles)} id="sanserif-font">Award miles</span>
            <span className={styles.visuallyHidden}>Award Miles</span>
          </div>
        </div>
        <div>{this.displayActivityDetails()}
          {aod.length > 0 &&
          <p><sup>*</sup>Flexible Premier qualifying miles (Flex PQM) are earned through spending with the United MileagePlus Presidential Plus Business Card and can be converted to PQM.</p>
          }
          {!this.props.showingFullActivityList &&
          <ViewMoreButton
            name={'View more activity'}
            handleClick={() => this.handleViewMore()}
          />}</div>
        <div>
          <h2 className={styles.promotinal}>Promotional space</h2>
          <UpgradeActivity
            dateRange={this.props.selectedDateRange}
            upgradeActivities={this.props.upgradeActivites}
          />
        </div>
        <div>
        </div>
      </div>
    );
  }
}

AirlineActivity.propTypes = {
  activityList: PropTypes.any,
  selectedDateRange: PropTypes.any,
  onViewMoreClick: PropTypes.func,
  loadUpgradeActivity: PropTypes.func,
  upgradeActivites: PropTypes.any,
  showingFullActivityList: PropTypes.bool,
  activityListViewCount: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(AirlineActivity);
