/* eslint-disable */

/**
 * Sort plugins by position so that ones with higher position get executed later
 * @param {Array} plugins
 * @param {string} errorText
 */
module.exports = plugins => plugins.sort((a, b) => b - a);
