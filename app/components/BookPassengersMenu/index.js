import React from 'react';
import PropTypes from 'prop-types';
import { TAB_KEY } from 'containers/App/constants';
import BookPassengersSection from '../BookPassengersSection';

const INFANT_MAX = 8;

class BookPassengersMenu extends React.Component { // eslint-disable-line
  componentDidMount() {
    // disable buttons based on groupSum
    this.disableButtons();
    for (const index in this.props.ids) { // eslint-disable-line
      const currValue = this.props.ids[index];
      const arrayName = (this.props.passengerModelObject) ? this.props.passengerModelObject[currValue] : currValue;
      this.props.onChangeModel(`${this.props.parentModel}.${arrayName}`, this.props.passengersToBook.get(currValue));
    }
  }

  onQuantityClick(event, id, operation, modelName, limit) {
    if (event) {
      event.preventDefault();
    }
    if (document.activeElement.type !== 'number') {
      let value = parseInt(this.props.passengersToBook.get(id), 10);
      const increasedInfants = this.getInfantCounts().infantsLap + this.getInfantCounts().infantsUnderTwo + 1;
      const invalidInfantEntry = (this.props.containsInfants === 'true') ? (((id === this.props.infantTitleA) || (id === this.props.infantTitleB)) && increasedInfants > 8) : false;
      if (operation === 'plus') {
        value = isNaN(value) ? 0 : value;
        const groupSum = this.getGroupSum();
        value = ((invalidInfantEntry) || (groupSum === limit) || ((this.props.individualMaxLimit) && value === this.props.individualMaxLimit)) ? value : value += 1;
      } else if (id === this.props.minValueIsOne && value === 1) {
        value = 1;
      } else {
        value = isNaN(value) ? 0 : value;
        value = (value <= 1) ? 0 : value -= 1;
      }
      this.props.onChangePassenger(id, value);
      this.props.onChangeModel(modelName, value);
      setTimeout(() => {
        this.disableButtons(modelName, operation);
      }, 1);
      return value;
    }
    return event.target.value;
  }

  onTextInput(event, id, model) {
    const keyCode = event.keyCode;
    // 38 is up, 40 is down, 9 is tab
    if (keyCode !== TAB_KEY) {
      const num = Number.parseInt((event.target.value !== '') ? event.target.value : 0, 10);
      const groupSum = (this.getGroupSum(num, id));
      let invalidInfantEntry;
      if (id === this.props.infantTitleA) {
        invalidInfantEntry = (num + this.getInfantCounts().infantsLap) > INFANT_MAX;
      } else if (id === this.props.infantTitleB) {
        invalidInfantEntry = (num + this.getInfantCounts().infantsUnderTwo) > INFANT_MAX;
      }
      // select it so that it will be replaced next time key is pressed
      if ((id === this.props.minValueIsOne) && (num === 0)) {
        this.props.onChangePassenger(id, 1);
        this.props.onChangeModel(`${this.props.parentModel}${model}`, 1);
        setTimeout(() => {
          this.disableButtons();
        }, 1);
        this.props.onQuantityInputFocus(event);
        return 1;
      } else if (num < 0 || isNaN(num)) {
        let returnValue;
        if (model === this.props.modelDefaultToOne) {
          this.props.onChangeModel(`${this.props.parentModel}${model}`, 1);
          this.props.onQuantityInputFocus(event);
          this.props.onChangePassenger(id, 1);
          returnValue = 1;
        } else {
          this.props.onChangeModel(`${this.props.parentModel}${model}`, 0);
          this.props.onQuantityInputFocus(event);
          this.props.onChangePassenger(id, 0);
          returnValue = 0;
        }
        setTimeout(() => {
          this.disableButtons();
        }, 1);
        return returnValue;
      } else if ((invalidInfantEntry) || (groupSum) > this.props.maxLimit || ((this.props.individualMaxLimit) && num > (this.props.individualMaxLimit))) {
        // set it back to original value before entering input
        const originalVal = this.props.passengersToBook.get(id);
        this.props.onChangeModel(`${this.props.parentModel}${model}`, originalVal);
        this.props.onQuantityInputFocus(event);
        setTimeout(() => {
          this.disableButtons();
        }, 1);
        return originalVal;
      }
      this.props.onChangePassenger(id, num);
      this.props.onChangeModel(`${this.props.parentModel}${model}`, num);
      setTimeout(() => {
        this.disableButtons();
      }, 1);
      this.props.onQuantityInputFocus(event);
      return num;
    }
    return event;
  }

  getInfantCounts() {
    const infantsA = this.props.passengersToBook.get(this.props.infantTitleB);
    const infantsB = this.props.passengersToBook.get(this.props.infantTitleA);
    return { infantsLap: infantsA, infantsUnderTwo: infantsB };
  }

  getGroupSum(number, id) {
    let groupSum = 0;
    if (number && id) {
      for (const index in this.props.fullArray) { // eslint-disable-line
        const currValue = this.props.fullArray[index];
        if (currValue !== id) {
          groupSum += parseInt(this.props.passengersToBook.get(currValue), 10);
        }
      }
      groupSum += number;
    } else {
      for (const index in this.props.fullArray) { // eslint-disable-line
        const currValue = this.props.fullArray[index];
        groupSum += parseInt(this.props.passengersToBook.get(currValue), 10);
      }
    }
    return groupSum;
  }

  getPassengersData(minusBtnEnabled, plusBtnEnabled, passengersToBook) {
    const remaining = (this.props.maxLimit - this.getGroupSum());
    const bookPassengersData = this.props.arrayIndexs.map((index) =>
      <BookPassengersSection
        id={this.props.ids[index]}
        key={index}
        index={index}
        sectionTitle={this.props.sectionTitle[index]}
        sectionDetail={this.props.sectionDetail[index]}
        maxLimit={this.props.maxLimit}
        maxRemaining={remaining}
        onTextInput={(event, id, model) => this.onTextInput(event, id, model)}
        onQuantityClick={(event, id, operation, limit) => this.onQuantityClick(event, id, operation, limit)}
        minusBtnDisabled={minusBtnEnabled}
        plusBtnDisabled={plusBtnEnabled}
        currentAmount={passengersToBook.get(this.props.ids[index])}
        onQuantityInputFocus={(event) => this.props.onQuantityInputFocus(event)}
        decrementTabIndex={this.props.decrementTabIndex}
        numberOfTravelersTotal={this.props.numberOfTravelersTotal}
        parentModel={this.props.parentModel}
        modelName={this.props.parentModel === 'bookHotelModel' ? `${this.props.parentModel}.['${this.props.ids[index]}']` : `booking.passengersToBook['${this.props.ids[index]}']`}
        disableIndividualSections={this.props.disableIndividualSections}
        individualMaxLimit={this.props.individualMaxLimit}
        minValueIsOne={this.props.minValueIsOne}
      />
    );
    return bookPassengersData;
  }

  disableButtons(model, operation) {
    let disablePlusBtn;
    let disableMinusBtn;
    let disabled = false;
    if (this.getGroupSum() === 0) {
      disablePlusBtn = false;
      disableMinusBtn = true;
      disabled = true;
    } else if (this.getGroupSum() === this.props.maxLimit) {
      disablePlusBtn = true;
      disableMinusBtn = false;
      disabled = true;
    } else {
      disablePlusBtn = false;
      disableMinusBtn = false;
    }
    this.props.onDisableTravelerButtons('plusBtn', disablePlusBtn);
    this.props.onDisableTravelerButtons('minusBtn', disableMinusBtn);
    if (((operation === 'minus') && (disableMinusBtn)) || ((operation === 'plus') && (disablePlusBtn))) {
      setTimeout(() => {
        this.props.onFocusModel(`${this.props.parentModel}${model}`);
      }, 1);
    }
    return disabled;
  }

  render() {
    const showMenu = (this.props.showTravelerMenu) ? 'block' : 'none';
    const passengersToBook = this.props.passengersToBook;
    const minusBtnEnabled = (this.props.toDisableBtns) ? this.props.toDisableBtns.get('minusBtn') : '';
    const plusBtnEnabled = (this.props.toDisableBtns) ? this.props.toDisableBtns.get('plusBtn') : '';

    const bookPassengersData = this.getPassengersData(minusBtnEnabled, plusBtnEnabled, passengersToBook);

    return (
      <div
        aria-label="Passengers"
        id="incrementerContainer"
        style={{ display: showMenu }}
      >
        {bookPassengersData}
      </div>
    );
  }
}

BookPassengersMenu.propTypes = {
  sectionTitle: PropTypes.array,
  sectionDetail: PropTypes.array,
  ids: PropTypes.array,
  fullArray: PropTypes.array,
  maxLimit: PropTypes.number,
  onChangePassenger: PropTypes.func,
  showTravelerMenu: PropTypes.bool,
  passengersToBook: PropTypes.object,
  onDisableTravelerButtons: PropTypes.func,
  toDisableBtns: PropTypes.object,
  onQuantityInputFocus: PropTypes.func,
  decrementTabIndex: PropTypes.number,
  arrayIndexs: PropTypes.array,
  onChangeModel: PropTypes.func,
  onFocusModel: PropTypes.func,
  parentModel: PropTypes.string,
  passengerModelObject: PropTypes.object,
  containsInfants: PropTypes.string,
  infantTitleA: PropTypes.string,
  infantTitleB: PropTypes.string,
  modelDefaultToOne: PropTypes.string,
  numberOfTravelersTotal: PropTypes.string,
  individualMaxLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minValueIsOne: PropTypes.string,
  disableIndividualSections: PropTypes.string,
};

export default BookPassengersMenu;
