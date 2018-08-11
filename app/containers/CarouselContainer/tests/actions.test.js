import {
  LOAD_CAROUSEL_SLIDES,
  LOAD_CAROUSEL_SLIDES_SUCCESS,
  LOAD_CAROUSEL_SLIDES_ERROR,
  CAROUSEL_NEXT_SLIDE,
  CAROUSEL_PREV_SLIDE,
  CAROUSEL_GOTO_SLIDE,
  CAROUSEL_AUTO_START,
  CAROUSEL_AUTO_PAUSE,
  CAROUSEL_AUTO_NEXT_SLIDE,
  CAROUSEL_AUTO_PREV_SLIDE,
} from '../constants';

import {
  loadCarouselSlides,
  carouselSlidesLoaded,
  carouselLoadingError,
  carouselNextSlide,
  carouselPreviousSlide,
  carouselGotoSlide,
  carouselStart,
  carouselPause,
  carouselAutoNextSlide,
  carouselAutoPreviousSlide,
} from '../actions';

describe('Carousel Actions', () => {
  describe('loadCarouselSlides', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_CAROUSEL_SLIDES,
      };
      expect(loadCarouselSlides(true)).toEqual(expectedResult);
    });
  });

  describe('carouselSlidesLoaded', () => {
    it('should return the correct type', () => {
      const data = 'stuff';
      const expectedResult = {
        type: LOAD_CAROUSEL_SLIDES_SUCCESS,
        data,
      };
      expect(carouselSlidesLoaded(data)).toEqual(expectedResult);
    });
  });

  describe('carouselLoadingError', () => {
    it('should return the correct type', () => {
      const error = { error: 'some error' };
      const expectedResult = {
        type: LOAD_CAROUSEL_SLIDES_ERROR,
        error,
      };
      expect(carouselLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('carouselNextSlide', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_NEXT_SLIDE,
      };
      expect(carouselNextSlide()).toEqual(expectedResult);
    });
  });

  describe('carouselPreviousSlide', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_PREV_SLIDE,
      };
      expect(carouselPreviousSlide()).toEqual(expectedResult);
    });
  });

  describe('carouselAutoNextSlide', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_AUTO_NEXT_SLIDE,
      };
      expect(carouselAutoNextSlide()).toEqual(expectedResult);
    });
  });

  describe('carouselAutoPreviousSlide', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_AUTO_PREV_SLIDE,
      };
      expect(carouselAutoPreviousSlide()).toEqual(expectedResult);
    });
  });

  describe('carouselGotoSlide', () => {
    it('should return the correct type', () => {
      const index = 101;
      const expectedResult = {
        type: CAROUSEL_GOTO_SLIDE,
        index,
      };
      expect(carouselGotoSlide(index)).toEqual(expectedResult);
    });
  });

  describe('carouselStart', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_AUTO_START,
      };
      expect(carouselStart()).toEqual(expectedResult);
    });
  });

  describe('carouselPause', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CAROUSEL_AUTO_PAUSE,
      };
      expect(carouselPause()).toEqual(expectedResult);
    });
  });
});
