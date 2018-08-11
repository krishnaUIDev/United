import { fromJS } from 'immutable';
import {
  makeSelectHeaderData,
} from '../selectors';

describe('makeSelectHeaderData', () => {
  const selector = makeSelectHeaderData();
  it('should select the data', () => {
    const slides = fromJS([]);
    const mockedState = fromJS({
      headerFooter: {
        loading: false,
        error: false,
        retryCount: 0,
        headerData: [],
        footerData: null,
        siteLinkData: null,
        socialData: null,
      },
    });
    expect(selector(mockedState)).toEqual(slides);
  });
});
