import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Control, Errors } from 'react-redux-form/lib/immutable';
import _ from 'lodash';

import { UP_ARROW_KEY, DOWN_ARROW_KEY } from 'containers/App/constants';
import AutocompleteLocationDropdownItem from '../AutocompleteLocationDropdownItem';

import styles from './autocompleteLocationDropdown.scss';
import slidingInputStyle from '../SlidingInput/slidingInput.scss';

// Images
import closeIcon from './assets/close.svg';

const isMobile = (screen.width <= 768);

export class AutocompleteLocationDropdown extends Component {
  componentDidUpdate() {
    this.props.updateMobileView(this.props.hideAutocompleteLocation.get(this.props.locationType), this.props.locationType);
  }

  onHideDropdownList(activeEl) {
    const active = (activeEl.id) ? activeEl.id : '';
    const isActive = this.onCheckAcceptedActiveElements(active);
    if (!isActive && (this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible')) {
      this.props.hideAutocompleteLocationDropdown('hidden', this.props.locationType);
    }
  }

  onCheckAcceptedActiveElements(active) {
    const acceptedIds = [this.props.inputId, 'listItem', 'listBtn', 'locationListCloseBtn', `${this.props.modelName}bottomBtn`];
    let isActive = false;
    _.forEach(acceptedIds, (currValue) => {
      if ((active === 'true') || ((active) && active.indexOf(currValue) >= 0)) {
        isActive = true;
      }
    });
    return isActive;
  }

  onPickupLocationChange(event) {
    const inputValue = event.target.value;
    let receivedResponse = false;
    if (this.props.locationCode) {
      // reset location
      this.props.resetLocationCode('');
      this.props.resetDisplayText('');
    }
    // TODO: remove this conditional and all props passed down from BookTravel when rehydrate refactor is implemented. It is needed for now because if the location selected is not updated for book flight origin and book flight destination, then the onSetComponentValues will update the input incorrectly. Once rehydrate refactor is implemented, then we can remove the entire onSetComponentValues() function in BookFlightForm/index.js and we will no longer need this conditional.
    if (this.props.onLocationSelected) {
      this.props.onLocationSelected(inputValue);
    }
    if (inputValue) {
      if (inputValue.length > 2) {
        if (isMobile) window.scrollTo(0, 0);
        this.props.hideAutocompleteLocationDropdown('visible', this.props.locationType);
        receivedResponse = true;
        this.props.getRequestData(inputValue);
      } else {
        this.props.hideAutocompleteLocationDropdown('hidden', this.props.locationType);
      }
    }
    setTimeout(() => {
      this.getAriaLabel(inputValue);
    }, 1);
    return receivedResponse;
  }

  onInputFieldFocus(event) {
    const field = event.target;
    setTimeout(() => {
      this.getAriaLabel(event.target.value);
      if (field) {
        const length = field.value.length;
        field.setSelectionRange(0, length, 'backward');
        field.scrollLeft = 0; // scroll to left so beginning of text shows
      }
    }, 1);
  }

  onCloseBtn(event) {
    if (event) {
      const dataArray = this.props.dataToPopulate[0];
      this.props.onItemSelected(dataArray.displayName, this.props.locationType, this.props.fullModelName, dataArray.locationCode);
    }
    setTimeout(() => {
      this.props.hideAutocompleteLocationDropdown('hidden', this.props.locationType);
      this.props.onFocusModel(this.props.fullModelName);
    }, 1);
  }

  onAutoInputFieldBlur(event) {
    setTimeout(() => {
      const isActive = this.onCheckAcceptedActiveElements(document.activeElement.id);
      if ((!isActive) && (event.target.value.length > 2) && (this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible') && (this.props.selectFirstItemOnBlur) && (this.props.dataToPopulate.length > 0)) {
        const dataArray = this.props.dataToPopulate[0];
        this.props.onItemSelected(dataArray.displayName, this.props.locationType, this.props.fullModelName, dataArray.locationCode);
      } else if ((this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible') && (this.props.dataToPopulate.length === 0)) {
        setTimeout(() => {
          this.props.onItemSelected(event.target.value, this.props.locationType, this.props.fullModelName, '');
        }, 1);
      } else {
        this.onHideDropdownList(document.activeElement);
      }
      this.props.onSetAutolocationAriaLabel('');
    }, 1);
  }

  onButtonBlur() {
    setTimeout(() => {
      this.onHideDropdownList(document.activeElement);
    }, 1);
  }

  onButtonKeyDown(event, focusModel) {
    if (event.keyCode === DOWN_ARROW_KEY) {
      event.preventDefault(); // prevent whole page from scrolling
      this.props.onFocusModel(focusModel);
    } else if (event.keyCode === UP_ARROW_KEY) { // up arrow key
      event.preventDefault(); // prevent whole page from scrolling
      const lastItemId = this.props.dataToPopulate.length - 1;
      this.props.onFocusModel(`${this.props.parentModel}.${lastItemId}`);
    }
  }

  getDropdownItem(dataArray) {
    const indexArray = [];
    let count = 0;
    if (dataArray) {
      dataArray.forEach(() => {
        indexArray.push(count);
        count += 1;
      });
    }
    const dropdownItem = (dataArray) ? indexArray.map((index) =>
      <AutocompleteLocationDropdownItem
        key={index}
        firstLineText={dataArray[index].firstLine}
        topLineId={`topLine${dataArray[index].id}`}
        itemId={dataArray[index].id}
        locationType={this.props.locationType}
        bottomLineId={(dataArray[index] && dataArray[index].id) ? `bottomLine${dataArray[index].id}` : ''}
        bottomLineText={(dataArray[index] && dataArray[index].secondLine) ? dataArray[index].secondLine : ''}
        onItemClick={this.props.onItemSelected}
        onItemKeyDown={this.props.onArrowKeyDown}
        listLength={dataArray.length}
        displayText={(dataArray[index].displayName) ? dataArray[index].displayName : ''}
        useImageIcons={(this.props.useImageIcons) ? this.props.useImageIcons : ''}
        locationTxt={(dataArray[index].locationTxt) ? dataArray[index].locationTxt : dataArray[index].firstLine}
        ariaLocationTxt={dataArray[index].ariaLocationTxt}
        imgSrc={(dataArray[index].imgSrc) ? dataArray[index].imgSrc : null}
        imgStyle={(dataArray[index].imgStyle) ? dataArray[index].imgStyle : null}
        hideDropdown={(active) => this.onHideDropdownList(active)}
        fullModelName={this.props.fullModelName}
        parentModel={this.props.parentModel}
        locationCode={(dataArray[index].locationCode) ? dataArray[index].locationCode : ''}
      />
    ) : '';
    return dropdownItem;
  }

  getAriaLabel(inputValue) {
    if (inputValue) {
      if ((this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible') && (inputValue.length === 3)) {
        this.props.onSetAutolocationAriaLabel(this.props.threeCharAutocomplete);
      } else if ((this.props.hideAutocompleteLocation.get(this.props.locationType) === 'hidden') && (inputValue.length > 2)) {
        this.props.onSetAutolocationAriaLabel(`${inputValue} selected`);
      } else {
        this.props.onSetAutolocationAriaLabel(false);
      }
    } else {
      this.props.onSetAutolocationAriaLabel(this.props.inputFieldAriaLabel);
    }
  }

  render() {
    const hideLocation = this.props.hideAutocompleteLocation.get(this.props.locationType);
    const height = (hideLocation === 'hidden') ? 0 : 'auto';
    const mobilePaddingTop = (this.props.mobileView.get(this.props.locationType) === 'fixed') ? '64px' : '0';
    const containerDisplay = (hideLocation === 'hidden') ? 'none' : 'inline';
    const inputFieldPaddingBtm = (hideLocation === 'hidden') ? '25px' : '0';
    let fullContainerBottom;
    if (isMobile) {
      fullContainerBottom = (this.props.mobileContainerPaddingBtm) ? this.props.mobileContainerPaddingBtm : '10px';
    } else {
      fullContainerBottom = (hideLocation === 'hidden') ? this.props.containerPaddingBottom : '25px';
    }
    const isValidInput = (val) => {
      let isValid = false;
      isValid = (this.props.isValidatorRequired === 'false') ? true : (val && val.length);
      return isValid;
    };
    // Prevent aria-label from reading whole list when it is hidden
    let dropdownItem;
    if (this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible') {
      dropdownItem = this.getDropdownItem(this.props.dataToPopulate);
    } else {
      dropdownItem = '';
    }
    const ariaAlert = ((document.activeElement && [this.props.inputId].indexOf(document.activeElement.id) >= 0) && (this.ariaInputRef) && (this.props.autolocationAriaLabel)) ? this.props.autolocationAriaLabel : undefined;

    const autoLocationContainer = (
      <div style={{ paddingBottom: fullContainerBottom }}>
        <div
          className={classNames(
            slidingInputStyle.inputFieldGroup,
            styles.inputFieldContainer,
            `${(this.props.showLabel === 'false') ? slidingInputStyle.noLabel : ''}`,
          )}
          style={{ paddingLeft: `${this.props.mobilePaddingLeft}`, marginTop: `${mobilePaddingTop}`, paddingBottom: `${inputFieldPaddingBtm}` }}
        >
          <Control.text
            type={this.props.inputType}
            model={this.props.modelName}
            id={this.props.inputId}
            className={classNames(styles.inputText, slidingInputStyle.inputField, `${this.props.touched || this.props.showLabel ? slidingInputStyle.blur : ''}`)}
            placeholder={this.props.inputFieldPlaceholder}
            data-required={this.props.isRequired}
            aria-required={this.props.isAriaRequired}
            tabIndex="0"
            onBlur={(event) => this.onAutoInputFieldBlur(event)}
            onFocus={(event) => this.onInputFieldFocus(event)}
            onChange={(event) => this.onPickupLocationChange(event)}
            onKeyDown={(event) => this.props.onArrowKeyDown(event, null, this.props.locationType, this.props.fullModelName, this.props.locationCode, this.props.dataToPopulate.length, this.props.parentModel)}
            autoComplete="off"
            spellCheck="false"
            validators={{
              isValidInput,
            }}
          />
          <label
            htmlFor={this.props.inputId}
            className={(this.props.showLabel === 'true' || this.props.fixedLabel === 'true') ? slidingInputStyle.slidingInputLabel : slidingInputStyle.srOnly}
          >
            {this.props.inputFieldPlaceholder}
          </label>
          <div
            ref={(input) => { this.ariaInputRef = input; }}
            aria-live="polite"
            className={styles.ariaAlertStyle}
          >{ariaAlert}</div>
          <Errors
            model={this.props.modelName}
            show={(field) => field.touched && !field.focus && this.props.hideAutocompleteLocation.get(this.props.locationType) === 'hidden'}
            messages={{
              isValidInput: `${this.props.inputErrorMsg}`,
            }}
            wrapper={(props) =>
              <div
                className={slidingInputStyle.inputFieldErrorMsg}
                role="alert"
              >
                {props.children}
                <span className={styles.srOnly}>Please return to this field to correct the error.</span>
              </div>
            }
          />
        </div>
        <div
          className={styles.locationContainer}
          style={{ visibility: `${hideLocation}`, height: `${height}`, display: `${containerDisplay}` }}
          id="locationContainer"
        >
          <div className={styles.locationListDiv}>
            {dropdownItem}
          </div>
          {this.props.hideAutocompleteLocation.get(this.props.locationType) === 'visible' ?
            <Control.button
              model=".closeAutoList"
              title={this.props.closePanelAriaLabel}
              aria-label={this.props.closePanelAriaLabel}
              id="locationListCloseBtn"
              role="button"
              tabIndex="0"
              onBlur={() => this.onButtonBlur()}
              onKeyDown={(event) => this.onButtonKeyDown(event, this.props.fullModelName)}
              onClick={(event) => this.onCloseBtn(event)}
              className={styles.locationListCloseBtn}
            >
              <img
                src={closeIcon}
                alt=""
                role="presentation"
                aria-hidden="true"
              />
            </Control.button>
            : ''
          }
        </div>
      </div>
    );

    return (
      <div>
        {autoLocationContainer}
      </div>
    );
  }
}

AutocompleteLocationDropdown.propTypes = {
  autolocationAriaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  containerPaddingBottom: PropTypes.string,
  closePanelAriaLabel: PropTypes.string,
  dataToPopulate: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fixedLabel: PropTypes.string,
  fullModelName: PropTypes.string,
  getRequestData: PropTypes.func,
  hideAutocompleteLocation: PropTypes.object,
  hideAutocompleteLocationDropdown: PropTypes.func,
  inputErrorMsg: PropTypes.string,
  inputFieldAriaLabel: PropTypes.string,
  inputFieldPlaceholder: PropTypes.string,
  inputId: PropTypes.string,
  inputType: PropTypes.string,
  isAriaRequired: PropTypes.string,
  isRequired: PropTypes.string,
  isValidatorRequired: PropTypes.string,
  locationCode: PropTypes.string,
  locationType: PropTypes.string,
  mobileContainerPaddingBtm: PropTypes.string,
  mobilePaddingLeft: PropTypes.string,
  mobileView: PropTypes.object,
  modelName: PropTypes.string,
  onArrowKeyDown: PropTypes.func,
  onFocusModel: PropTypes.func,
  onItemSelected: PropTypes.func,
  onLocationSelected: PropTypes.func,
  onSetAutolocationAriaLabel: PropTypes.func,
  parentModel: PropTypes.string,
  resetDisplayText: PropTypes.func,
  resetLocationCode: PropTypes.func,
  selectFirstItemOnBlur: PropTypes.string,
  showLabel: PropTypes.string,
  threeCharAutocomplete: PropTypes.string,
  touched: PropTypes.bool,
  useImageIcons: PropTypes.string,
  updateMobileView: PropTypes.func,
};

export default AutocompleteLocationDropdown;
