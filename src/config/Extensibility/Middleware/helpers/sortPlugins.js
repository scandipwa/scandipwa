const DEFAULT_POSITION = 100;

/**
 * Sort plugins by position so that ones with higher position get executed later
 * @param {Array} plugins
 * @param {string} errorText
 */
module.exports = (plugins) => plugins.sort(
    ({ position: a = DEFAULT_POSITION }, { position: b = DEFAULT_POSITION }) => a - b
);
