import axios from 'axios';
import dayjs from 'dayjs';
import { app, url } from './config';

let now;

const request = axios.create({
  baseURL: url.api.baseURL,
  headers: {
    // 'X-Env': app.env,
  },
});

// Add a request interceptor
request.interceptors.request.use(function (axiosConfig) {
  now = dayjs();
  if (app.consoleLogRequests) {
    console.group(`REQUEST_SENDING: ${axiosConfig.url}`);
  }
  // console.log('');
  // console.groupEnd();
  return axiosConfig;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
  if (app.consoleLogRequests) {
    console.group(`REQUEST_COMPLETE: @${dayjs().diff(now, 'second', true).toPrecision()}s ${response.config.url}`);
    // console.log('');
    console.groupEnd();
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  let e = {};
  if (error.message === 'Network Error' && app.env === 'development') {
    e = {
      message: error.message,
      errors: [`${error.config.method.toUpperCase()}: ${error.config.url}`]
    };
  } else {
    e = error;
  }
  return Promise.reject(e);
});

const CancelToken = axios.CancelToken;

request.cancelToken = [];

request.handleCancellation = function() {
  return {
    cancelToken: new CancelToken(c => {
      request.cancelToken.push(c)
    })
  }
};

/**
 * Cancel any request by invoking CancelToken.
 *
 * @param {Boolean} isPending Condition to cancel the request
 * @return void
 */
export function abortRequest(isPending) {
  if (request.cancelToken.length && isPending) {
    const reqs = request.cancelToken;
    reqs.forEach((cancel, index) => {
      console.group(`REQUEST_CANCELLED ${index}`);
      console.groupEnd();
      cancel(`REQUEST_CANCELLED`);
      // request.cancelToken.splice(index, 1);
    });

    request.cancelToken = [];
  }
}

/**
 * Check if the request was cancelled and return true if it was,
 * typically this function goes inner a catch error in a Promise.
 *
 * @param {Object} err The response err object
 *
 * @return boolean
 */
export const requestWasCancelled = (err) => {
  // If the request was cancelled from componentWillUnmount we raise an
  // action to update the isPending to false
  return !!(err && err.message && err.message === 'REQUEST_CANCELLED')
};

/**
 * This function check if the request was not cancelled,
 * if it was a cancellation request we don't perform
 * the callback call to avoid setState in this situation
 *
 * @param {Object} err The response error object.
 * @param {Function} callback The function to call setState.
 * */
export const handleRequestError = (err, callback) => {

  if (! requestWasCancelled(err)) {
    if (typeof callback === 'function') {
      callback();
    }
  }
};

export default request;
