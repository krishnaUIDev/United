/*
 * BookPassengers
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form/lib/immutable';

import styles from './bookPassengersSection.scss';

class BookPassengersSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const currentSelected = parseInt(this.props.index, 10) + 1;
    const ariaLabel = `${this.props.currentAmount} ${this.props.sectionTitle}, ${this.props.sectionDetail}, ${currentSelected} of ${this.props.numberOfTravelersTotal} passenger types`;

    const minValLimit = (this.props.sectionTitle === this.props.minValueIsOne) ? 1 : 0;
    const disableMinus = (this.props.disableIndividualSections) ? (this.props.currentAmount === minValLimit) : this.props.minusBtnDisabled;
    const disablePlus = (this.props.disableIndividualSections) ? (this.props.currentAmount === this.props.individualMaxLimit) : this.props.plusBtnDisabled;

    return (
      <div
        className={styles.section}
        id={this.props.id}
        aria-label="Passengers"
      >
        <span
          className={styles.sectionTitle}
          id={`${this.props.id} title`}
        >{this.props.sectionTitle}
          <span className={styles.sectionDetail}> {this.props.sectionDetail}</span>
        </span>
        <p className={styles.incrementerDiv}>
          <button
            id={`${this.props.id} minusBtn`}
            onClick={(event) => this.props.onQuantityClick(event, this.props.id, 'minus', this.props.modelName)}
            aria-label="minus"
            className={classNames(styles.qtyminus, `${this.props.id}qtyminus`)}
            disabled={disableMinus}
            tabIndex={this.props.decrementTabIndex}
            role="button"
            type="button"
          >-</button>
          <Control.input
            type="number"
            name="quantity"
            min={this.props.min}
            max={this.props.maxLimit}
            className={classNames(styles.qty, `${this.props.sectionDetail}txtInput`)}
            id={this.props.sectionTitle}
            onKeyUp={(event) => this.props.onTextInput(event, this.props.id, this.props.modelName)}
            onFocus={(event) => this.props.onQuantityInputFocus(event)}
            onClick={(event) => this.props.onQuantityInputFocus(event)}
            aria-label={ariaLabel}
            autoComplete="off"
            model={this.props.modelName}
            tabIndex="0"
            pattern="[0-9]*"
          />
          <button
            id={`${this.props.id} plusBtn`}
            onClick={(event) => this.props.onQuantityClick(event, this.props.id, 'plus', this.props.modelName, this.props.maxLimit)}
            aria-label="plus"
            disabled={disablePlus}
            className={classNames(styles.qtyplus, `${this.props.sectionDetail}qtyplus`)}
            role="button"
            type="button"
            tabIndex="0"
          >+</button>
        </p>
      </div>
    );
  }
}

BookPassengersSection.propTypes = {
  min: PropTypes.number,
  maxLimit: PropTypes.number,
  sectionTitle: PropTypes.string,
  sectionDetail: PropTypes.string,
  id: PropTypes.string,
  onTextInput: PropTypes.func,
  onQuantityClick: PropTypes.func,
  minusBtnDisabled: PropTypes.bool,
  plusBtnDisabled: PropTypes.bool,
  currentAmount: PropTypes.number,
  onQuantityInputFocus: PropTypes.func,
  decrementTabIndex: PropTypes.number,
  index: PropTypes.string,
  numberOfTravelersTotal: PropTypes.string,
  modelName: PropTypes.string,
  disableIndividualSections: PropTypes.string,
  individualMaxLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minValueIsOne: PropTypes.string,
};

export default BookPassengersSection;
