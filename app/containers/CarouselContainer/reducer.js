import { fromJS } from 'immutable';
import clamp from 'lodash/clamp';
import take from 'lodash/take';


import {
  LOAD_CAROUSEL_SLIDES,
  LOAD_CAROUSEL_SLIDES_SUCCESS,
  LOAD_CAROUSEL_SLIDES_ERROR,
  CAROUSEL_NEXT_SLIDE,
  CAROUSEL_PREV_SLIDE,
  CAROUSEL_AUTO_NEXT_SLIDE,
  CAROUSEL_AUTO_PREV_SLIDE,
  CAROUSEL_GOTO_SLIDE,
  CAROUSEL_AUTO_START,
  CAROUSEL_AUTO_PAUSE,
  MAX_SLIDES,
} from './constants';

/* SAMPLE DATA */
// import multiple from './tests/samples/multiple.json';
// import single from './tests/samples/single.json';
/* /SAMPLE DATA */

// The initial state of the App
export const initialState = fromJS({
  transitionPeriod: 0,
  currentSlide: 0,
  loading: false,
  error: false,
  slides: [],
  isPaused: false,
  resumeNext: true,
});

function carouselReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CAROUSEL_SLIDES:
      return state
        .set('error', false)
        .set('loading', true);
    case LOAD_CAROUSEL_SLIDES_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('transitionPeriod', action.data.transitionPeriod)
        .set('slides', take(action.data.slides, MAX_SLIDES));
        // .set('slides', take(multiple.data.heroCarousel.slides, MAX_SLIDES));
        // .set('slides', take(single.data.heroCarousel.slides, MAX_SLIDES));
    case LOAD_CAROUSEL_SLIDES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CAROUSEL_PREV_SLIDE: {
      const current = state.get('currentSlide');
      const slideArrayLength = state.get('slides').length;
      const prev = (current - 1) < 0 ? (slideArrayLength - 1) : (current - 1);
      return state
        .set('currentSlide', prev);
    }
    case CAROUSEL_NEXT_SLIDE: {
      const slideArrayLength = state.get('slides').length;
      return state
        .update('currentSlide', (x) => (x + 1) % slideArrayLength);
    }
    case CAROUSEL_AUTO_PREV_SLIDE: {
      if (state.get('isPaused')) return state;
      const current = state.get('currentSlide');
      const slideArrayLength = state.get('slides').length;
      const prev = (current - 1) < 0 ? (slideArrayLength - 1) : (current - 1);
      return state
        .set('currentSlide', prev);
    }
    case CAROUSEL_AUTO_NEXT_SLIDE: {
      if (state.get('isPaused')) return state;
      const slideArrayLength = state.get('slides').length;
      return state
        .update('currentSlide', (x) => (x + 1) % slideArrayLength);
    }
    case CAROUSEL_GOTO_SLIDE: {
      const size = state.get('slides').length;
      const max = size === 0 ? 0 : size - 1;
      return state.set('currentSlide', clamp(action.index, 0, max));
    }
    case CAROUSEL_AUTO_START: {
      return state.set('isPaused', false);
    }
    case CAROUSEL_AUTO_PAUSE: {
      const resumeNext = state.get('isPaused');
      return state
        .set('resumeNext', resumeNext)
        .set('isPaused', true);
    }
    default:
      return state;
  }
}

export default carouselReducer;
