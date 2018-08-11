import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';

import CrossfadeImage from 'components/CrossfadeImage';
import ActionLink from 'components/ActionLink';

import styles from './carousel.scss';
import mock from './mock.jpg';
import blueBG from './assets/blue_BG.png';

import {
  makeSelectCarouselTransitionPeriod,
  makeSelectCarouselSlides,
  makeSelectCarouselCurrentSlide,
  makeSelectCarouselCurrentIndex,
  makeSelectCarouselLoading,
  makeSelectCarouselError,
  makeSelectCarouselIsPaused,
  makeSelectCarouselPreviousPausedState,
} from './selectors';

import {
  loadCarouselSlides,
  carouselGotoSlide,
  carouselPreviousSlide,
  carouselNextSlide,
  carouselPause,
  carouselStart,
} from './actions';

import messages from './messages';

// Images
import playImage from './assets/play.svg';
import pauseImage from './assets/pause.svg';
import dotImage from './assets/dot.svg';
import dotOutlineImage from './assets/dot-outline.svg';
import { makeSelectShowAdvisories, makeSelectAdvisoriesData } from '../HomePage/selectors';

const TOLERANCE = 100;
const CAPTURE_FOCUS_EVENTS = true;
const defaultTexts = {
  preTitle: 'Default',
  title: 'Default Title',
  linkUrl: 'https://united.com/',
  linkText: 'Default Link',
};

export function getPosition(event) {
  if ('touches' in event) {
    const { pageX, pageY } = event.touches[0];
    return { x: pageX, y: pageY };
  }

  const { screenX, screenY } = event;
  return { x: screenX, y: screenY };
}

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onBrowserResize = debounce(this.update.bind(this), 500);
    this.onKeypress = throttle(this.onKeypress.bind(this), 300, { trailing: false });
    this.setBackgroundReference = this.setBackgroundReference.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.setTouchElementReference = this.setTouchElementReference.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  componentWillMount() {
    this.props.onInit();
    window.addEventListener('resize', this.onBrowserResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onBrowserResize);
    if (this.touchReference) {
      this.touchReference.removeEventListener('keydown', this.onKeypress);
      this.touchReference.removeEventListener('touchmove', this.handleTouchMove);
      this.touchReference.removeEventListener('touchstart', this.handleTouchStart);
      this.touchReference.removeEventListener('touchend', this.handleTouchEnd);
      this.touchReference.removeEventListener('focus', this.handleFocus, CAPTURE_FOCUS_EVENTS);
      this.touchReference.removeEventListener('blur', this.handleBlur, CAPTURE_FOCUS_EVENTS);
    }
  }

  onKeypress(event) {
    if (event.key === 'ArrowLeft') {
      if (this.props.onPreviousSlide) { this.props.onPreviousSlide(); }
    } else if (event.key === 'ArrowRight') {
      if (this.props.onNextSlide) { this.props.onNextSlide(); }
    }
  }

  setBackgroundReference(ref) {
    this.bgRef = ref;
    this.update();
  }

  setTouchElementReference(ref) {
    if (!ref) return;
    this.touchReference = ref;
    // Arrow Keys Navigation
    this.touchReference.removeEventListener('keydown', this.onKeypress);
    this.touchReference.addEventListener('keydown', this.onKeypress);

    // Swiping support
    this.touchReference.removeEventListener('touchmove', this.handleTouchMove);
    this.touchReference.addEventListener('touchmove', this.handleTouchMove);
    this.touchReference.removeEventListener('touchstart', this.handleTouchStart);
    this.touchReference.addEventListener('touchstart', this.handleTouchStart);
    this.touchReference.removeEventListener('touchend', this.handleTouchEnd);
    this.touchReference.addEventListener('touchend', this.handleTouchEnd);

    // Notify reducer about focus/blur events
    this.touchReference.removeEventListener('focus', this.handleFocus, CAPTURE_FOCUS_EVENTS);
    this.touchReference.addEventListener('focus', this.handleFocus, CAPTURE_FOCUS_EVENTS);
    this.touchReference.removeEventListener('blur', this.handleBlur, CAPTURE_FOCUS_EVENTS);
    this.touchReference.addEventListener('blur', this.handleBlur, CAPTURE_FOCUS_EVENTS);
  }

  togglePause() {
    if (this.props.isPaused) {
      this.props.onCarouselStart();
    } else {
      this.props.onCarouselPause();
    }
  }

  handleFocus(evt) {
    // Only handle focus/blur for text elements
    if (
      evt.target.id === 'complementary-link' ||
      evt.target.id === 'complementary-title' ||
      evt.target.id === 'complementary-pretitle'
    ) {
      this.props.onCarouselPause();
    }
  }

  handleBlur(evt) {
    // Only handle focus/blur for text elements
    if (
      (evt.target.id === 'complementary-link' ||
      evt.target.id === 'complementary-title' ||
      evt.target.id === 'complementary-pretitle') &&
      this.props.isPaused && !this.props.resumeNext
    ) {
      this.props.onCarouselStart();
    }
  }

  update() {
    // Force a re-render in order to measure the background's height again,
    //  otherwise it will go un-noticed since no props are changing after the browser resize
    this.forceUpdate();
  }

  handleTouchStart(event) {
    const { x, y } = getPosition(event);
    this.moveStart = { x, y };
  }

  handleTouchMove(event) {
    const { x, y } = getPosition(event);
    const deltaX = x - this.moveStart.x;
    const deltaY = y - this.moveStart.y;
    this.moving = true;

    this.movePosition = { deltaX, deltaY };
  }

  handleTouchEnd() {
    if (this.moving) {
      if (this.movePosition.deltaX < -TOLERANCE) {
        if (this.props.onNextSlide) { this.props.onNextSlide(); }
      } else if (this.movePosition.deltaX > TOLERANCE) {
        if (this.props.onPreviousSlide) { this.props.onPreviousSlide(); }
      }
    }

    this.moveStart = null;
    this.moving = false;
    this.movePosition = null;
  }

  handleExit() {
    const focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]');
    const actualFocusableIndex = Array.prototype.findIndex.call(focusable, (x) => x === document.activeElement);
    if (actualFocusableIndex != null && actualFocusableIndex >= 0) {
      const nextFocusableIndex = (actualFocusableIndex + 1) % focusable.length;
      focusable[nextFocusableIndex].focus();
    }
  }

  selectBestMatchingImage(images, width, height) {
    const propOrder = ['height', 'width'];

    const sortedImages = sortBy(images, propOrder);

    const bestMatch = sortedImages.find((image) => image.width >= width && image.height >= height);

    // If there is no suitable image then we use the last image in the sortedImages array, if any
    return bestMatch || last(sortedImages);
  }

  renderBackgrounds() {
    const { current, error, showDefault } = this.props;

    if (!this.bgRef || showDefault) return <CrossfadeImage src={blueBG} />;

    if (error || !current || current.images == null || current.images.length === 0) {
      return <CrossfadeImage src={mock} />;
    }

    const images = current.images;
    const image = this.selectBestMatchingImage(images, this.bgRef.clientWidth, this.bgRef.clientHeight);

    return <CrossfadeImage src={image.url} />;
  }

  renderNavigation() {
    const { error, index, current, slides, onGotoSlide, intl } = this.props;
    if (error || index == null || !current || !slides || slides.length <= 1) return null;

    const navigation = slides.map((slide, slideIndex) => {
      const actualSlide = slideIndex + 1;
      const text = intl.formatMessage(messages.slide, { position: actualSlide, total: slides.length });
      return (
        <ActionLink
          key={slideIndex}
          tabIndex="0"
          className={classNames(styles.dot, { [styles.active]: slideIndex === index })}
          onClick={onGotoSlide}
          param={slideIndex}
          ariaLabel={text}
          value={slideIndex + 1}
        >
          <img alt="" role="presentation" src={slideIndex === index ? dotOutlineImage : dotImage} />
        </ActionLink>
      );
    });

    return (
      <fieldset
        className={styles.navigation}
        aria-label={intl.formatMessage(messages.navigationControlLabel)}
        aria-controls="complementary-info"
        aria-live="off"
      >
        {this.renderPlaybackControl()}
        {navigation}
      </fieldset>
    );
  }

  /**
   * Based on ```this.props.isPaused```, renderPlaybackControl will render
   * the play or pause button & text.
   */
  renderPlaybackControl() {
    const { intl, isPaused } = this.props;
    const text = intl.formatMessage(isPaused ? messages.play : messages.pause);
    return (
      <button
        aria-label={text}
        className={classNames(styles.playbackControl)}
        onClick={this.togglePause}
        tabIndex="0"
        type="button"
        value={text}
      >
        <img alt="" role="presentation" src={isPaused ? playImage : pauseImage} />
      </button>
    );
  }

  renderExitButton() {
    const { index, current, slides, intl } = this.props;
    if (index == null || !current || !slides || slides.length <= 1) return null;
    const text = intl.formatMessage(messages.exit);
    return (
      <button
        className={styles.exit}
        onClick={this.handleExit}
        tabIndex="0"
        value={text}
      >
        {text}
      </button>
    );
  }

  render() {
    const { current, error, loading, intl, index, slides, showDefault, advisoriesVisible, advisoriesData } = this.props;
    const isAdvisoriesVisible = advisoriesVisible && advisoriesData && advisoriesData.length > 0;
    if (loading) return null;
    const preTitle = !error && current ? current.preTitle && current.preTitle.substring(0, 30) : defaultTexts.preTitle;
    const title = !error && current ? current.title && current.title.substring(0, 70) : defaultTexts.title;
    const linkUrl = !error && current ? current.linkUrl : defaultTexts.linkUrl;
    const linkText = !error && current ? current.linkText : defaultTexts.linkText;
    const linkAria = linkUrl && linkText ? intl.formatMessage(messages.link, { linkText }) : '';
    const asideAria = slides && slides.length > 0 ? intl.formatMessage(messages.aside, { position: index + 1, total: slides.length }) : '';
    const titleAria = intl.formatMessage(messages.link, { linkText: title });
    return (
      <div
        className={styles.bookerAd}
        ref={this.setTouchElementReference}
      >
        <div className={classNames(styles.bookerBGContainer, { [styles.AdvisoriesHeightAdjust]: isAdvisoriesVisible })} ref={this.setBackgroundReference} aria-hidden="true">
          {this.renderBackgrounds()}
        </div>
        {(!showDefault) ?
          <div className={classNames(styles.bookerAdContent)}>
            <aside
              role="complementary"
              aria-live="off"
              id="complementary-info"
              aria-label={asideAria}
            >
              { preTitle ? <h3 className="eyebrow" tabIndex="0" id="complementary-pretitle">{preTitle}</h3> : null }
              <h2 tabIndex="0" id="complementary-title"><a className={styles.passthroughLink} role="link" aria-label={titleAria} href={linkUrl}>{title}</a></h2>
              { linkUrl && linkText ? <a id="complementary-link" role="link" aria-label={linkAria} href={linkUrl} className={styles.learnMore}>{linkText}</a> : null }
            </aside>
            {this.renderNavigation()}
            {this.renderExitButton()}
          </div>
        : ''}
      </div>
    );
  }
}

CarouselContainer.propTypes = {
  slides: PropTypes.any,
  current: PropTypes.any,
  index: PropTypes.number,
  onInit: PropTypes.func,
  onNextSlide: PropTypes.func,
  onPreviousSlide: PropTypes.func,
  onGotoSlide: PropTypes.func,
  onCarouselStart: PropTypes.func,
  onCarouselPause: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  isPaused: PropTypes.bool,
  intl: intlShape.isRequired,
  resumeNext: PropTypes.bool,
  showDefault: PropTypes.bool,
  advisoriesVisible: PropTypes.bool,
  advisoriesData: PropTypes.array,
};


const mapStateToProps = createStructuredSelector({
  transitionPeriod: makeSelectCarouselTransitionPeriod(),
  slides: makeSelectCarouselSlides(),
  current: makeSelectCarouselCurrentSlide(),
  index: makeSelectCarouselCurrentIndex(),
  loading: makeSelectCarouselLoading(),
  error: makeSelectCarouselError(),
  isPaused: makeSelectCarouselIsPaused(),
  resumeNext: makeSelectCarouselPreviousPausedState(),
  advisoriesVisible: makeSelectShowAdvisories(),
  advisoriesData: makeSelectAdvisoriesData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInit: () => { dispatch(loadCarouselSlides()); },
    onGotoSlide: (slide) => { dispatch(carouselGotoSlide(slide)); },
    onPreviousSlide: () => { dispatch(carouselPreviousSlide()); },
    onNextSlide: () => { dispatch(carouselNextSlide()); },
    onCarouselStart: () => { dispatch(carouselStart()); },
    onCarouselPause: () => { dispatch(carouselPause()); },
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CarouselContainer));
