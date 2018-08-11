import React from 'react';
import PropTypes from 'prop-types';
import Styles from './announcements.scss';
/**
 * Annoucements.js
 *
 * This renders the ARIA live element which appears in Results.js.
 */
function Announcements(props) {
  return (
    <div className={Styles.visuallyhidden} role="status" aria-live="polite" aria-atomic="true">
      {props.message}
    </div>
  );
}

Announcements.propTypes = {
  message: PropTypes.string,
};

export default Announcements;
