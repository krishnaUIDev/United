/**
 * The BookFlightFormContainer state selectors
 */

// import { createSelector } from 'reselect';

const selectFlightModel = (state) => state.get('bookFlightModel');

export {
  selectFlightModel,
};
