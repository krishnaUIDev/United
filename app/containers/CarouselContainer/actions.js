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
} from './constants';

export function loadCarouselSlides() {
  return {
    type: LOAD_CAROUSEL_SLIDES,
  };
}

export function carouselSlidesLoaded(data) {
  return {
    type: LOAD_CAROUSEL_SLIDES_SUCCESS,
    data,
  };
}

export function carouselLoadingError(error) {
  return {
    type: LOAD_CAROUSEL_SLIDES_ERROR,
    error,
  };
}

export function carouselNextSlide() {
  return {
    type: CAROUSEL_NEXT_SLIDE,
  };
}

export function carouselPreviousSlide() {
  return {
    type: CAROUSEL_PREV_SLIDE,
  };
}

export function carouselAutoNextSlide() {
  return {
    type: CAROUSEL_AUTO_NEXT_SLIDE,
  };
}

export function carouselAutoPreviousSlide() {
  return {
    type: CAROUSEL_AUTO_PREV_SLIDE,
  };
}

export function carouselGotoSlide(index = 0) {
  return {
    type: CAROUSEL_GOTO_SLIDE,
    index,
  };
}

export function carouselStart() {
  return {
    type: CAROUSEL_AUTO_START,
  };
}

export function carouselPause() {
  return {
    type: CAROUSEL_AUTO_PAUSE,
  };
}
