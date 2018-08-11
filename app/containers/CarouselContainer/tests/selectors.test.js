import { fromJS, Map } from 'immutable';
import { initialState } from '../reducer';
import {
  makeSelectCarouselCurrentSlide,
  makeSelectCarouselLoading,
  makeSelectCarouselError,
  makeSelectCarouselCurrentIndex,
  makeSelectCarouselSlides,
  makeSelectCarouselIsPaused,
} from '../selectors';

describe('makeSelectCarouselLoading', () => {
  const selector = makeSelectCarouselLoading();
  it('should select the data', () => {
    const loading = false;
    const mockedState = fromJS({
      carousel: {
        currentSlide: 0,
        loading: false,
        error: false,
        slides: [],
      },
    });
    expect(selector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectCarouselCurrentIndex', () => {
  const selector = makeSelectCarouselCurrentIndex();
  it('should select the data', () => {
    const index = 10;
    const mockedState = fromJS({
      carousel: {
        currentSlide: 10,
        loading: false,
        error: false,
        slides: [],
      },
    });
    expect(selector(mockedState)).toEqual(index);
  });
});

describe('makeSelectCarouselSlides', () => {
  const selector = makeSelectCarouselSlides();
  it('should select the data', () => {
    const slides = fromJS([]);
    const mockedState = fromJS({
      carousel: {
        currentSlide: 10,
        loading: false,
        error: false,
        slides: [],
      },
    });
    expect(selector(mockedState)).toEqual(slides);
  });
});

describe('makeSelectCarouselError', () => {
  const selector = makeSelectCarouselError();
  it('should select the data', () => {
    const error = fromJS({ some: 'error' });
    const mockedState = fromJS({
      carousel: {
        currentSlide: 10,
        loading: false,
        error: { some: 'error' },
        slides: [],
      },
    });
    expect(selector(mockedState)).toEqual(error);
  });
});

describe('makeSelectCarouselCurrentSlide', () => {
  const selector = makeSelectCarouselCurrentSlide();
  it('should select the data', () => {
    const slide = { slide: 'another value' };
    const mockedState = fromJS({
      carousel: {
        currentSlide: 1,
        loading: false,
        error: false,
        slides: null,
      },
    }).setIn(['carousel', 'slides'],
      [
        {
          slide: 'value',
        },
        {
          slide: 'another value',
        },
      ]
    );

    expect(selector(mockedState, mockedState)).toEqual(slide);
  });
});

describe('makeSelectCarouselIsPaused', () => {
  const selector = makeSelectCarouselIsPaused();
  it('should select the data', () => {
    const mockedState = Map({ carousel: initialState.set('isPaused', true) });
    expect(selector(mockedState)).toEqual(true);
  });
});
