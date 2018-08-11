import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import config from 'config'; // eslint-disable-line

import { ESC_KEY } from 'containers/App/constants';
import styles from './toolTip.scss';

const isTablet = (screen.width <= 768);

function FormattedMessageFixed(props) {
  return <FormattedMessage {...props} />;
}

export class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onHideTooltip(toClose) {
    setTimeout(() => {
      // Don't close tooltip if link in tooltip has the focus
      if ((document.activeElement.id !== 'linkMsg' || (isTablet && document.activeElement.id !== 'tooltipBtn') || toClose) && this.state.visible) {
        this.setState({ visible: false });
      }
    }, 10);
  }

  onShowTooltip(event) {
    let toIgnoreId = false;
    // Don't open tooltip if triggered by field it should ignore.
    if (this.props.eventIDtoIgnore) {
      this.props.eventIDtoIgnore.forEach((item) => {
        toIgnoreId = toIgnoreId || (document.activeElement.id === item);
      });
    }
    if (!(this.props.eventIDtoIgnore) || !(toIgnoreId)) {
      event.preventDefault();
      const newState = !this.state.visible;
      this.setState({ visible: newState });
    }
    setTimeout(() => {
      if (this.anchor && !isTablet && this.state.visible) {
        this.anchor.focus();
      }
    }, 100);
  }

  onTooltipKeyDown(event) {
    if (event.keyCode === ESC_KEY && this.state.visible) {
      event.stopPropagation();
      // Need to pass 'true' param so that tooltip will close if ESC key is used when linkMsg has focus
      this.onHideTooltip(true);
    }
  }

  onMessageBlur(toBlur) {
    if (toBlur) { this.onHideTooltip(); }
  }

  toolTipMessage(message, secondMessage, linkMessage, linkURL) {
    const secondMessageContent = (isTablet) ?
      (<p aria-label={(linkMessage) ? '' : secondMessage} tabIndex="0" id="messageB" onBlur={() => this.onMessageBlur(!linkMessage)}>
        {secondMessage}
      </p>) : (<p> {secondMessage}</p>);
    const tooltipMsg = (
      <span className={this.state.visible ? styles.show : styles.hide}>
        <span
          className={classNames(styles.tooltiptext, styles.tooltipArrow, styles.margin)}
          role={(!linkMessage) ? 'alert' : ''}
        >
          {(isTablet) ?
            <p
              tabIndex="0"
              id="messageA"
              ref={(input) => { this.messageA = input; }}
              onBlur={() => this.onMessageBlur(!secondMessage && !linkMessage)}
              aria-label={(linkMessage) ? '' : message}
            >{message}</p> : <p>{message}</p>}
          {(secondMessage) ?
            secondMessageContent
           : ''}
          {(linkMessage && linkURL) ?
            <a
              ref={(input) => { this.anchor = input; }}
              onBlur={() => { this.onHideTooltip(); }}
              onKeyDown={(event) => this.onTooltipKeyDown(event)}
              className={styles.tooltipLink}
              href={`${linkURL}`}
              id="linkMsg"
              aria-label={`${message} ${secondMessage} ${linkMessage}`}
            >{linkMessage}</a>
            : ''}
        </span>
      </span>
    );
    return tooltipMsg;
  }

  dataWithTooltip(containerSpanStyle, containerSpanMsg, toolTipMsg, secondMsg, linkMsg, linkURL) {
    const tooltipToReturn = (
      <div>
        <span
          className={containerSpanStyle}
        >{containerSpanMsg}</span>
        <button
          className={classNames(styles.tooltip, this.props.toolTipStyle, (this.props.noTopStyle) ? styles.noTooltipTop : styles.tooltipTop)}
          ref={(input) => { this.tooltipBtn = input; }}
          onBlur={() => setTimeout(() => this.onHideTooltip(), 1)}
          onClick={(event) => { this.onShowTooltip(event); }}
          onKeyDown={(event) => this.onTooltipKeyDown(event)}
          aria-label={this.props.tooltipBtnAriaLabel}
          tabIndex="0"
          id="tooltipBtn"
          role="button"
        />
        {(this.state.visible) ? this.toolTipMessage(toolTipMsg, secondMsg, linkMsg, linkURL) : ''}
      </div>
    );
    return tooltipToReturn;
  }

  render() {
    const { msg, tooltipmsg, value, secondmsg, linkmsg, linkurl } = this.props;
    return (
      <div>
        <div className={classNames(this.props.tooltipContainerStyle)} >
          {
            this.dataWithTooltip(this.props.labelStyle, msg, tooltipmsg, secondmsg, linkmsg, linkurl)
          }
          <span
            className={styles.infoContent}
          >
            { (value !== undefined) ?
              <FormattedMessageFixed
                id="message"
                defaultMessage={value}
              />
              : ''}
          </span>
        </div>
      </div>
    );
  }
}

ToolTip.propTypes = {
  eventIDtoIgnore: PropTypes.array,
  labelStyle: PropTypes.string,
  toolTipStyle: PropTypes.string,
  linkmsg: PropTypes.string,
  linkurl: PropTypes.string,
  msg: PropTypes.string,
  secondmsg: PropTypes.string,
  tooltipBtnAriaLabel: PropTypes.string,
  tooltipContainerStyle: PropTypes.string,
  noTopStyle: PropTypes.string,
  tooltipmsg: PropTypes.any,
  value: PropTypes.string,
};

export default ToolTip;
