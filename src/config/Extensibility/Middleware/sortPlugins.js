/* eslint-disable */
const DEFAULT_POSITION = 100;

/**
 * Sort plugins by position so that ones with higher position get executed later
 * @param {Array} plugins
 * @param {string} errorText
 */
module.exports = plugins => plugins.sort(
    (a, b) => {
        const { position: positionA = DEFAULT_POSITION } = a;
        const { position: positionB = DEFAULT_POSITION } = b;

        return positionA - positionB;
    }
);
