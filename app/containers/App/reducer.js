/*
 * App wide Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import {
  TIMEOUT_SET_MODAL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  hydrated: false,
  sessionTimeoutModalVisibility: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case REHYDRATE:
      // console.log('REHYDRATE appReducer', action.payload);
      return state.set('hydrated', true);
    case TIMEOUT_SET_MODAL:
      // console.log('TIMEOUT_SET_MODAL appReducer', action);
      return state.set('sessionTimeoutModalVisibility', action.action);
    default:
      return state;
  }
}

export default appReducer;
