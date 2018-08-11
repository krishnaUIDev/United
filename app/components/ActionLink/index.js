import React from 'react';
import PropTypes from 'prop-types';

/**
 * This ActionLink component is useful to avoid creating new bindings on the render functions of the components
 * @param {Object} param Parameter that will be passed down to the onClick callback
 * @param {string} className Classnames that will be added to the rendered html link element
 * @param {string} role WAI-ARIA role to be used in the link element (to add semantic meaning for assistive technology)
 * @param {Object} style Styles object that will be added to the rendered html link element
 * @param {string} tabIndex Tab index for the element
 * @param {Function} onClick Callback that will be called when the html link is clicked
 */
export default function ActionLink({ role, param, className, style, onClick, children, tabIndex, asLink, ariaLabel, value }) {
  function handleClick() {
    if (onClick) { onClick(param); }
  }

  const Tag = asLink ? 'a' : 'button';

  return (
    <Tag
      role={role}
      className={className}
      style={style}
      onClick={handleClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      value={value}
    >{children}</Tag>
  );
}

ActionLink.propTypes = {
  param: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
  role: PropTypes.oneOf(['button', 'link', 'menuitem', 'option', 'switch']),
  tabIndex: PropTypes.string,
  asLink: PropTypes.bool,
  ariaLabel: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ActionLink.defaultProps = {
  role: 'button',
  asLink: false,
};
