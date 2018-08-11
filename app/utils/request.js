import axios from 'axios';
import { CANCEL } from 'redux-saga';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  const parsedResponse = response.data;
  parsedResponse.status = response.status;
  return parsedResponse;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  delete error.config;
  delete error.request;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  const cancelTokenSource = axios.CancelToken.source();
  // console.log('cancelTokenSource.token', cancelTokenSource.token);
  const promise = axios(url, Object.assign(options, { cancelToken: cancelTokenSource.token }))
    .then(checkStatus)
    .catch((error) => {
      // console.log('axios catch', error);
      /* istanbul ignore next */
      const errorObj = new Error((error && error.response && error.response.statusText) || error.message);
      errorObj.response = error && error.response;
      errorObj.code = error && error.code; // ECONNABORTED
      delete errorObj.config;
      delete errorObj.request;
      // console.log('axios catch %o', errorObj, errorObj.code);
      throw errorObj;
    })
    .then(parseJSON);

  /* istanbul ignore next */
  promise[CANCEL] = () => {
    // cancel XHR request, called by redux-saga when a saga gets cancelled
    cancelTokenSource.cancel('Operation canceled.');
  };

  return promise;
}
