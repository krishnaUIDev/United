export const passwordPatternAllowEmpty = /^$|[ -~]{8,}$/;

/**
 * @param {string} val
 * @param {string} globalMPusername
 */
export const isSubmittableInput = (val) => {
  if (!val) return false;

  const loginPattern = /^(?=(?:.{8}|.{11})$)[a-zA-Z0-9]{8,11}$/;
  return (val.indexOf('**') >= 0) || (isString(val) && (loginPattern.test(val)));
};

/**
 * @param {string} val
 * @return {boolean} true is input is empty or submittable
 */
export const isValidMPnumber = (val, globalMPusername) =>
  isEmptyString(val) || isSubmittableInput(val, globalMPusername);

/**
 * @param {string} val
 */
export const isSubmittablePassword = (val) => {
  if (!val) return false;

  // TODO: change this check once the enter key rrf is fixed. Link: https://github.com/davidkpiano/react-redux-form/issues/1011
  const passwordPattern = /^[ -~]{8,}$/;
  return isString(val) && (passwordPattern.test(val));
};

/**
 * @param {string} val
 */
export const isValidPassword = (val) =>
  isEmptyString(val) || isSubmittablePassword(val);

// START Helpers
export function isString(val) {
  return (typeof (val) === 'string');
}
export function isEmptyString(val) {
  return isString(val) && !val;
}
// END Helpers
