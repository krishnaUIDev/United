import take from 'lodash/take';

import homeReducer, { initialState } from '../reducer';
import {
  loadCarouselSlides,
  carouselSlidesLoaded,
  carouselLoadingError,
  carouselNextSlide,
  carouselPreviousSlide,
  carouselGotoSlide,
  carouselAutoNextSlide,
  carouselAutoPreviousSlide,
} from '../actions';

import multiple from './samples/multiple.json';

describe('carouselReducer', () => {
  it('should handle loadCarouselSlides action correctly', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', true);
    expect(homeReducer(initialState, loadCarouselSlides(false))).toEqual(expectedResult);
  });

  it('should handle carouselSlidesLoaded action correctly', () => {
    const expectedResult = initialState
      .set('error', false)
      .set('loading', false)
      .set('transitionPeriod', multiple.data.heroCarousel.transitionPeriod)
      .set('slides', take(multiple.data.heroCarousel.slides, 4));
    expect(homeReducer(initialState, carouselSlidesLoaded(multiple.data.heroCarousel))).toEqual(expectedResult);
  });

  it('should handle carouselLoadingError action correctly', () => {
    const error = { error: 'error message' };
    const expectedResult = initialState
      .set('error', error)
      .set('loading', false);
    expect(homeReducer(initialState, carouselLoadingError(error))).toEqual(expectedResult);
  });

  it('should handle carouselNextSlide action correctly', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 0);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 1);
    expect(homeReducer(modifiedState, carouselNextSlide())).toEqual(expectedResult);
  });

  it('should change currentSlide in carouselNextSlide even if state is paused', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 1);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 2);

    expect(homeReducer(modifiedState, carouselNextSlide())).toEqual(expectedResult);
  });

  it('should handle carouselPreviousSlide action correctly', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 1);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 0);
    expect(homeReducer(modifiedState, carouselPreviousSlide())).toEqual(expectedResult);
  });

  it('should change currentSlide in carouselPreviousSlide even if state is paused', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 1);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 0);

    expect(homeReducer(modifiedState, carouselPreviousSlide())).toEqual(expectedResult);
  });

  it('should handle carouselAutoNextSlide action correctly', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 0);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 1);
    expect(homeReducer(modifiedState, carouselAutoNextSlide())).toEqual(expectedResult);
  });

  it('should not change currentSlide in carouselAutoNextSlide if state is paused', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 0);
    expect(homeReducer(modifiedState, carouselAutoNextSlide())).toEqual(modifiedState);
  });

  it('should handle carouselAutoPreviousSlide action correctly', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 1);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 0);
    expect(homeReducer(modifiedState, carouselAutoPreviousSlide())).toEqual(expectedResult);
  });

  it('should not change currentSlide in carouselAutoPreviousSlide if state is paused', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('isPaused', true)
      .set('currentSlide', 0);
    expect(homeReducer(modifiedState, carouselAutoPreviousSlide())).toEqual(modifiedState);
  });

  it('should handle carouselGotoSlide action correctly', () => {
    const modifiedState = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 0);

    const expectedResult = initialState
      .set('slides', take(multiple.data.heroCarousel.slides, 4))
      .set('currentSlide', 2);
    expect(homeReducer(modifiedState, carouselGotoSlide(2))).toEqual(expectedResult);
  });
});
