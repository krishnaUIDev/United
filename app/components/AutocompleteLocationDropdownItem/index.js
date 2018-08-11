/*
 * AutocompleteLocationDropdownItem
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form/lib/immutable';

import styles from './autocompleteLocationDropdownItem.scss';

class AutocompleteLocationDropdownItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.setFirstLineHtml();
  }

  onInputItemBlur() {
    setTimeout(() => {
      this.props.hideDropdown(document.activeElement);
    }, 1);
  }

  setFirstLineHtml() {
    if (this.firstLineRef) {
      this.firstLineRef.innerHTML = this.props.firstLineText;
    }
    return true;
  }

  render() {
    const locationText = this.props.locationTxt;
    const onItemClickText = (this.props.displayText) ? this.props.displayText : locationText;
    const ariaLocationText = this.props.ariaLocationTxt;
    let locationImgSrc;
    if (this.props.imgSrc) { locationImgSrc = this.props.imgSrc; }
    let buttonImgStyle;
    if (this.props.imgStyle) { buttonImgStyle = this.props.imgStyle; }

    const ariaLabel = `${ariaLocationText}. suggestion ${parseInt(this.props.itemId, 10) + 1} out of ${this.props.listLength} selected`;

    return (
      <div className={styles.locationList}>
        <div id={`listItem${this.props.itemId}`}>
          <Control.button
            model={`.${this.props.itemId}`}
            className={styles.listItem}
            role="button"
            tabIndex="0"
            id={`listBtn${this.props.itemId}`}
            aria-label={ariaLabel}
            onBlur={() => this.onInputItemBlur()}
            onClick={() => this.props.onItemClick(`${onItemClickText}`, this.props.locationType, this.props.fullModelName, this.props.locationCode)}
            onKeyDown={(event) => this.props.onItemKeyDown(event, `${onItemClickText}`, this.props.locationType, this.props.fullModelName, this.props.locationCode, this.props.listLength, this.props.parentModel)}
          >
            {(this.props.useImageIcons === 'true') ? <span className={styles.btnImg} aria-hidden="true">
              <img className={buttonImgStyle} src={locationImgSrc} alt="" role="presentation" />
            </span> : ''}
            <span
              className={(this.props.useImageIcons === 'true') ? classNames(styles.topLine, styles.hotelTopLine) : styles.topLine}
              id={this.props.topLineId}
              ref={(input) => { this.firstLineRef = input; }}
            /><br></br>
            {(this.props.bottomLineText) ? <span className={styles.bottomLine} id={this.props.bottomLineId}>{this.props.bottomLineText}</span> : ''}
          </Control.button>
        </div>
      </div>
    );
  }
}

AutocompleteLocationDropdownItem.propTypes = {
  firstLineText: PropTypes.string,
  itemId: PropTypes.string,
  topLineId: PropTypes.string,
  bottomLineId: PropTypes.string,
  bottomLineText: PropTypes.string,
  onItemClick: PropTypes.func,
  onItemKeyDown: PropTypes.func,
  locationType: PropTypes.string,
  listLength: PropTypes.number,
  displayText: PropTypes.string,
  useImageIcons: PropTypes.string,
  locationTxt: PropTypes.string,
  ariaLocationTxt: PropTypes.string,
  imgSrc: PropTypes.string,
  imgStyle: PropTypes.string,
  hideDropdown: PropTypes.func,
  parentModel: PropTypes.string,
  fullModelName: PropTypes.string,
  locationCode: PropTypes.string,
};

export default AutocompleteLocationDropdownItem;
