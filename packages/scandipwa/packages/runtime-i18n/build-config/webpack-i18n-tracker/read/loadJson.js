const corruptedJson = require('../after-emit-logs/read-corrupted-json');

/**
 * Fails silently on MODULE_NOT_FOUND
 * Logs parsing errors to the afterEmitLogs
 * Default value {}
 * @param {string} pathToTry
 * @param {function} logMessage
 */
module.exports = (pathToTry, logMessage) => {
    try {
        return require(pathToTry);
    } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
            logMessage(corruptedJson(pathToTry, error));
        }

        return {};
    }
}