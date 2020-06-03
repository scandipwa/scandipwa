/* eslint-disable */

/**
 * Sort plugins by position:
 * @param {Array} plugins
 * @param {string} errorText
 */
module.exports = plugins => plugins.sort(
    (a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        return 0;
    }
);
