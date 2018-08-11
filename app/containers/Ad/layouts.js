import React from 'react';
import styles from './ad.scss';
import externalLink from './assets/external-link.svg';
// import classNames from 'classnames';

/**
 * Layout manager for each type of Ad that will be presented. I've identified at least 3 variations
 *  in the layout of the ads on the page, so with this functions we will have an easier time to change
 *  the layouts on the fly by matching locations and types on Ad/index.js
 *
 * Additionally, by having these layouts as `pure functions`* they will be easier to unit test.
 */
export default {
  centralBlock(text, image, url, external, aria) {
    return (
      <a href={url} className={styles.adContent} aria-label={aria}>
        <div className={styles.boxLayout} style={{ backgroundImage: `url(${image})` }}>
          <span>{text}</span>
        </div>
        {external && <img src={externalLink} alt="" className={styles.externalLink} />}
      </a>
    );
  },
  // TODO: Add your new layouts here...
};

// *: A pure function, in functional programming, is a function that given the same input will always
//    output the same result, in other words, it doesnt use external state or randomness in its internal
//    computations. Since the result of a pure function's output is predictable testing will be easier to do.
