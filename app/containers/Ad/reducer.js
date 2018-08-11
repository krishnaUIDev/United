import { fromJS } from 'immutable';
import {
  LOAD_ADS,
  LOAD_ADS_ERROR,
  LOAD_ADS_SUCCESS,
} from './constants';

export const initialState = fromJS({
  data: [],
  loading: false,
  loaded: false,
  error: false,
  retryCount: 0,
});

export default function adReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADS:
      return state
        .set('error', false)
        .set('loading', true)
        .update('retryCount', (retryCount) => action.retry ? retryCount + 1 : 0);
    case LOAD_ADS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('loaded', true)
        .set('data', action.data)
        .set('retryCount', 0);
    case LOAD_ADS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('retryCount', 0);
    default:
      return state;
  }
}

