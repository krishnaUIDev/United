/**
 * Place for all functions that help in identifying or performing device specific actions
 */

export const isIPhone = () =>
  !!navigator.platform && /iPhone/.test(navigator.platform);

export const isAndroid = () =>
  !!navigator.platform && /Android/.test(navigator.platform);

// START Calendar management
export const isMobile = (screen.width <= 480) === true;

// @NOTE this can be applied to android too
export const shortIPhone = () => window.innerWidth <= 667;

// largest width considered for phones
export const hasPhoneWidth = () => window.innerWidth <= 812;

/**
 * For iphone or android, default to vertical,
 * otherwise consider the width (as set by isMobile)
 * @TODO discuss "isMobile logic" with Sean (screen.width does not change for devices in horizontal mode)
 */
export const isInPortraitMode = () => {
  let orientation;

  if (isIPhone()) {
    orientation = (window.orientation === 90 || window.orientation === -90) ? 'horizontal' : 'vertical';
  } else if (isAndroid()) {
    orientation = (screen.orientation.angle === 90 || screen.orientation.angle === -90) ? 'horizontal' : 'vertical';
  } else {
    return isMobile;
  }

  return orientation !== 'horizontal';
};

export const hasNumberOfMonths = () =>
  isInPortraitMode() ? {} : { numberOfMonths: shortIPhone() ? 1 : 2 };

  // START Calendar management
