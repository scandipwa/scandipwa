/* eslint-disable consistent-return */
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/**
 * This decorator function handles errors if any are thrown from the subject (cb).
 * The further execution is halted on error. The user is notified.
 *
 * @param {function} cb callback to attempt to execute
 * @param {string} name processable plugin's name
 * @returns {any} the result of the callback
 */
module.exports = (name, cb) => {
    // Throw this error to be handled by the main compilation error handler
    // It is thrown only when this package contains coding errors
    if (!name) {
        throw new Error(
            'The plugin\'s name has not been provided to the possible error handler!'
        );
    }

    // Catch all of these errors to be handled as user-caused errors
    try {
        return cb();
    } catch (err) {
        const { message = '' } = err;

        // reformat the message for prettier outpit
        const trimmedMessage = message.replace(/^( |\t)+/gm, '');
        const trimmedMessageLines = trimmedMessage.split('\n');

        logger.error(
            `${logger.style.code(name)} module's template plugin has thrown the following error:`,
            ...trimmedMessageLines
        );

        process.exit(1);
    }
};
