import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectError,
  makeSelectLocationState,
  makeSelectToken,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

// describe('makeSelectCurrentUser', () => {
//   const currentUserSelector = makeSelectCurrentUser();
//   it('should select the current user', () => {
//     const mileageplus = 'mxstbr';
//     const mockedState = fromJS({
//       global: {
//         currentUser: mileageplus,
//       },
//     });
//     expect(currentUserSelector(mockedState)).toEqual(mileageplus);
//   });
// });

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectToken', () => {
  const tokenSelector = makeSelectToken();
  it('should select the token', () => {
    const apiToken = fromJS({ hash: '1234', expires: 999999 });
    const mockedState = fromJS({
      global: {
        apiToken,
      },
    });
    expect(tokenSelector(mockedState)).toEqual(apiToken);
  });
});

describe('makeSelectLocationState', () => {
  const locationStateSelector = makeSelectLocationState();
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.toJS());
  });
});
