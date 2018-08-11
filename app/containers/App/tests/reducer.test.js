import { fromJS } from 'immutable';
import appReducer from '../reducer';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      hydrated: false,
      sessionTimeoutModalVisibility: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });
});