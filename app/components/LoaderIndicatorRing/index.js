import React from 'react';
import styles from './loaderIndicatorRing.scss';

const LoaderIndicatorRing = (className) =>
  (<div>
    <div className={Object.keys(className).length ? className.className : styles.ldsRing} style={{ width: '100%', height: '100%' }}><div></div><div></div><div></div><div></div></div>
  </div>
  );

export default LoaderIndicatorRing;
