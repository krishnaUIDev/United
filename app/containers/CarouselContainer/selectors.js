import { createSelector } from 'reselect';

export const selectCarousel = (state) => state.get('carousel');
const selectCarouselCurrentIndex = (state) => state.getIn(['carousel', 'currentSlide']);
const selectCarouselSlides = (state) => state.getIn(['carousel', 'slides']);

export const makeSelectCarouselTransitionPeriod = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('transitionPeriod')
);

export const makeSelectCarouselSlides = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('slides')
);

export const makeSelectCarouselCurrentIndex = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('currentSlide')
);

export const makeSelectCarouselCurrentSlide = () => createSelector(
  selectCarouselSlides,
  selectCarouselCurrentIndex,
  (slides, slide) => slides[slide]
);

export const makeSelectCarouselLoading = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('loading')
);

export const makeSelectCarouselError = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('error')
);

export const makeSelectCarouselIsPaused = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('isPaused')
);

export const makeSelectCarouselPreviousPausedState = () => createSelector(
  selectCarousel,
  (carouselState) => carouselState.get('resumeNext')
);
