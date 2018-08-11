import React from 'react';
import PropTypes from 'prop-types';

import styles from './bookPassengers.scss';
import BookPassengersMenu from '../BookPassengersMenu';
import closeIcon from './assets/close.svg';
import messages from './messages';

class BookPassengers extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { decrementTabIndex: -1 };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.ariaLegend) { this.ariaLegend.focus(); }
    }, 1);
  }

  onPassengerInputBlur() {
    this.props.onSetActiveField('');
    let blur = false;
    setTimeout(() => {
      if (!(document.activeElement) || !(this.isPassengerBtnActive(document.activeElement.id))) {
        this.props.onPassengerInputClick(false);
        blur = true;
      }
    }, 1);
    return blur;
  }

  onQuantityInputFocus(event) {
    this.props.onSetActiveField('');
    const idToSelect = event.target;
    if (idToSelect) {
      // Need timeout for IE
      setTimeout(() => {
        let useSelect = false;
        // Need to use setSelectionRange() for iOS and select() for Chrome (setSelectionRange does not work on Chrome for type="number")
        try {
          idToSelect.setSelectionRange(0, 1);
        } catch (error) {
          useSelect = true;
        }
        if (useSelect) { idToSelect.select(); }
      }, 1);
    }
    this.setState({ decrementTabIndex: 0 });
    return true;
  }

  onClearPassengerInput(event) {
    this.props.onSetActiveField('');
    if (event) {
      event.preventDefault();
    }
    this.props.onChangePassenger(this.props.reducerDefaultToOne, 1);
    for (const index in this.props.clearReducerArray) { // eslint-disable-line
      const currValue = this.props.clearReducerArray[index];
      this.props.onChangePassenger(currValue, 0);
    }
    this.props.onChangeModel(`${this.props.parentModel}${this.props.modelDefaultToOne}`, 1);
    for (const model in this.props.clearModelArray) { // eslint-disable-line
      this.props.onChangeModel(`${this.props.parentModel}.${this.props.clearModelArray[model]}`, 0);
    }
    this.props.onDisableTravelerButtons('plusBtn', false);
    this.props.onDisableTravelerButtons('minusBtn', false);
    return true;
  }

  onApplyButtonClick() {
    this.props.onPassengerInputClick(false);
    setTimeout(() => {
      this.props.onSetActiveField(this.props.mainActiveField);
    }, 1);
    return true;
  }

  onClosePanel() {
    this.props.onPassengerInputClick(false);
    setTimeout(() => {
      this.props.onSetActiveField(this.props.mainActiveField);
    }, 1);
    return true;
  }

  isPassengerBtnActive(activeId) {
    let isActive = false;
    for (const index in this.props.acceptableFocus) { // eslint-disable-line
      const currValue = this.props.acceptableFocus[index];
      if ((activeId) && activeId.indexOf(currValue) >= 0) {
        isActive = true;
      }
    }
    return isActive;
  }

  render() {
    const isDesktop = screen.width > 786;
    const clearBtnTxt = (isDesktop) ? 'Clear All' : 'Clear';
    const sectionTitleA = (isDesktop) ? this.props.isDesktopTitleArrayA : this.props.isMobileTitleArrayA;
    const sectionDetailA = (isDesktop) ? this.props.isDesktopDetailArrayA : this.props.isMobileDetailArrayA;
    let sectionTitleB;
    let sectionDetailB;
    if (this.props.areMultipleSections) {
      sectionTitleB = (isDesktop) ? this.props.isDesktopTitleArrayB : this.props.isMobileTitleArrayB;
      sectionDetailB = (isDesktop) ? this.props.isDesktopDetailArrayB : this.props.isMobileDetailArrayB;
    }
    let legendTab = 0;
    const active = document.activeElement;
    // tabIndex needs to be set to -1 for IE
    if ((active && active.id === 'dropdownContainer') || (!active)) {
      legendTab = -1;
    }
    const ariaLabel = (this.props.areMultipleSections === true) ? messages.bookPassengersLegendAriaLabelMultipleSections.defaultMessage : messages.bookPassengersLegendAriaLabelNoMaximum.defaultMessage;
    return (
      <div
        className={this.props.containerStyle}
        id="dropdownContainer"
        tabIndex="0"
        onBlur={() => this.onPassengerInputBlur()}
      >
        <div>
          <span
            tabIndex={legendTab}
            className={this.props.ariaSectionStyle}
            ref={(input) => { this.ariaLegend = input; }}
            id={this.props.legendId}
            aria-label={ariaLabel}
          >{ariaLabel}</span>
          <div id="passengersSectionA" className={this.props.sectionAstyle}>
            <BookPassengersMenu
              id="passengersA"
              arrayIndexs={this.props.arrayIndexsA}
              ids={this.props.arrayA}
              fullArray={this.props.fullArray}
              sectionTitle={sectionTitleA}
              sectionDetail={sectionDetailA}
              maxLimit={this.props.sectionMaxLimit}
              modelName=".passengers"
              onQuantityInputFocus={(event) => this.onQuantityInputFocus(event)}
              decrementTabIndex={this.state.decrementTabIndex}
              parentModel={this.props.parentModel}
              passengerModelObject={(this.props.passengerModelObject) ? this.props.passengerModelObject : undefined}
              containsInfants={this.props.containsInfants}
              infantTitleA={this.props.infantTitleA}
              infantTitleB={this.props.infantTitleB}
              modelDefaultToOne={this.props.modelDefaultToOne}
              numberOfTravelersTotal={this.props.numberOfTravelersTotal}
              onDisableTravelerButtons={this.props.onDisableTravelerButtons}
              onChangePassenger={this.props.onChangePassenger}
              onChangeModel={(model, value) => this.props.onChangeModel(model, value)}
              onFocusModel={this.props.onFocusModel}
              showTravelerMenu={this.props.showTravelerMenu}
              passengersToBook={this.props.passengersToBook}
              toDisableBtns={this.props.toDisableBtns}
              minValueIsOne={this.props.minValueIsOne}
              individualMaxLimit={(this.props.individualMaxLimit) ? this.props.individualMaxLimit : ''}
              disableIndividualSections={this.props.disableIndividualSections}
            />
          </div>
          {(screen.width > 944 && this.props.showDivider === 'true') ?
            <div className={styles.divider}></div>
          : ''}
          {(this.props.areMultipleSections === 'true') ?
            <div className={styles.passengersB}>
              <BookPassengersMenu
                id="passengersB"
                arrayIndexs={this.props.arrayIndexsB}
                ids={this.props.arrayB}
                fullArray={this.props.fullArray}
                sectionTitle={sectionTitleB}
                sectionDetail={sectionDetailB}
                maxLimit={this.props.sectionMaxLimit}
                individualMaxLimit={(this.props.individualMaxLimit) ? this.props.individualMaxLimit : ''}
                modelName=".passengers"
                onQuantityInputFocus={(event) => this.onQuantityInputFocus(event)}
                decrementTabIndex={this.state.decrementTabIndex}
                parentModel={this.props.parentModel}
                passengerModelObject={(this.props.passengerModelObject) ? this.props.passengerModelObject : {}}
                containsInfants={this.props.containsInfants}
                modelDefaultToOne={this.props.modelDefaultToOne}
                numberOfTravelersTotal={this.props.numberOfTravelersTotal}
                onDisableTravelerButtons={this.props.onDisableTravelerButtons}
                onChangePassenger={this.props.onChangePassenger}
                onChangeModel={(model, value) => this.props.onChangeModel(model, value)}
                onFocusModel={this.props.onFocusModel}
                showTravelerMenu={this.props.showTravelerMenu}
                passengersToBook={this.props.passengersToBook}
                toDisableBtns={this.props.toDisableBtns}
                minValueIsOne={this.props.minValueIsOne}
                infantTitleA={this.props.infantTitleA}
                infantTitleB={this.props.infantTitleB}
                disableIndividualSections={this.props.disableIndividualSections}
              />
            </div>
          : ''}
          <button
            role="button"
            id="clearPassengers"
            tabIndex="0"
            aria-label="Clear all selections"
            className={styles.passengerDropdownClearBtn}
            onClick={(event) => this.onClearPassengerInput(event)}
          >{clearBtnTxt}</button>
          <div className={styles.applyBtnContainer}>
            {(screen.width < 786) ?
              <button
                role="button"
                onClick={() => this.onApplyButtonClick()}
                className={styles.applyBtn}
                aria-label="Apply"
                id="applyPassengersBtn"
              >Apply</button>
            : ''}
          </div>
        </div>
        <button
          title={messages.closePanelAriaLabel.defaultMessage}
          aria-label={messages.closePanelAriaLabel.defaultMessage}
          id="passengersCloseBtn"
          role="button"
          tabIndex="0"
          className={styles.passengerDropdownCloseBtn}
          onClick={() => this.onClosePanel()}
        >
          <img
            src={closeIcon}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }
}

BookPassengers.propTypes = {
  onPassengerInputClick: PropTypes.func,
  onChangePassenger: PropTypes.func,
  arrayA: PropTypes.array,
  arrayB: PropTypes.array,
  fullArray: PropTypes.array,
  onDisableTravelerButtons: PropTypes.func,
  onSetActiveField: PropTypes.func,
  onChangeModel: PropTypes.func,
  reducerDefaultToOne: PropTypes.string,
  clearReducerArray: PropTypes.array,
  modelDefaultToOne: PropTypes.string,
  parentModel: PropTypes.string,
  clearModelArray: PropTypes.array,
  mainActiveField: PropTypes.string,
  isDesktopTitleArrayA: PropTypes.array,
  isMobileTitleArrayA: PropTypes.array,
  isDesktopTitleArrayB: PropTypes.array,
  isDesktopDetailArrayA: PropTypes.array,
  isMobileDetailArrayA: PropTypes.array,
  isMobileTitleArrayB: PropTypes.array,
  isDesktopDetailArrayB: PropTypes.array,
  isMobileDetailArrayB: PropTypes.array,
  containerStyle: PropTypes.string,
  legendId: PropTypes.string,
  arrayIndexsA: PropTypes.array,
  sectionMaxLimit: PropTypes.number,
  areMultipleSections: PropTypes.string,
  showDivider: PropTypes.string,
  arrayIndexsB: PropTypes.array,
  passengerModelObject: PropTypes.object,
  containsInfants: PropTypes.string,
  infantTitleA: PropTypes.string,
  infantTitleB: PropTypes.string,
  numberOfTravelersTotal: PropTypes.string,
  acceptableFocus: PropTypes.array,
  individualMaxLimit: PropTypes.number,
  ariaSectionStyle: PropTypes.string,
  sectionAstyle: PropTypes.string,
  onFocusModel: PropTypes.func,
  passengersToBook: PropTypes.object,
  showTravelerMenu: PropTypes.bool,
  toDisableBtns: PropTypes.object,
  minValueIsOne: PropTypes.string,
  disableIndividualSections: PropTypes.string,
};

export default BookPassengers;
