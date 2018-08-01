const UTILS = {};

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered
 * @param  {function} func    Function to execute
 * @param  {integer} wait    Wait time in ms
 * @param  {boolean} immediate Trigger the function on the leading edge, instead of the trailing
 * @return {function}   Debounced function
 * @see {@link http://underscorejs.org/#debounce}
 */
UTILS.debounce = function (func, wait, immediate) {
  var timeout;
  var args;
  var context;
  var timestamp;
  var result;
  var callNow;
  var last;
  var later = function () {
      last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
      } else {
          timeout = null;
          if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
          }
      }
  };
  return function (...funcArgs) {
      context = this;
      args = funcArgs;
      timestamp = Date.now();
      callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
          result = func.apply(context, args);
          context = args = null;
      }
      return result;
  };
}