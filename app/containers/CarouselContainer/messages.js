import { defineMessages } from 'react-intl';

export default defineMessages({
  pause: {
    id: 'unitedapp.containers.CarouselContainer.pause',
    description: 'This is the aria-label text for the Pause button of the Carousel',
    defaultMessage: 'Pause',
  },
  play: {
    id: 'unitedapp.containers.CarouselContainer.play',
    description: 'This is the aria-label text for the Play button of the Carousel',
    defaultMessage: 'Play',
  },
  aside: {
    id: 'unitedapp.containers.CarouselContainer.aside',
    description: 'This is the aria-label for the aside component',
    defaultMessage: 'You are navigating a sliding carousel, you are at slide {position} of {total} carousel.',
  },
  slide: {
    id: 'unitedapp.containers.CarouselContainer.slide',
    description: 'This is the aria-label for each dot of the carousel',
    defaultMessage: 'Slide {position} of {total}',
  },
  link: {
    id: 'unitedapp.containers.CarouselContainer.link',
    description: 'This is the aria-label for the link, in the carousel, that redirects to another [maybe external] pages',
    defaultMessage: '{linkText}, you will be redirect away from united.com homepage',
  },
  exit: {
    id: 'unitedapp.containers.CarouselContainer.exit',
    description: 'SR Only, button that when clicked will redirect the focus to the next tabbable element',
    defaultMessage: 'Exit carousel',
  },
  navigationControlLabel: {
    id: 'unitedapp.containers.CarouselContainer.navigationControlLabel',
    description: 'SR Only, Descriptive message indicating that the controls encased by this fieldset controls the navigation of the ad contents',
    defaultMessage: 'Carousel buttons',
  },
});
