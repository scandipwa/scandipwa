const fs = require('fs');
const afterEmitLogger = require('@scandipwa/webpack-after-emit-logger');
const corruptedJson = require('../after-emit-logs/read-corrupted-json');

/**
 * Fails silently on MODULE_NOT_FOUND
 * Logs parsing errors to the afterEmitLogs
 * Default value {}
 * @param {string} pathToTry
 * @param {function} logMessage
 */
module.exports = (pathToTry) => {
    // Fallback to {} for non existent objects
    if (!fs.existsSync(pathToTry)) {
        return {};
    }

    // Use FS to prevent caching
    try {
        return JSON.parse(fs.readFileSync(pathToTry));
    } catch (error) {
        afterEmitLogger.logMessage(corruptedJson(pathToTry, error));
        return {};
    }
};
