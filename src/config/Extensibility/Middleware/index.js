/* eslint-disable no-param-reassign */
const generateGetHandler = require('./handlers/generateGetHandler');
const generateApplyHandler = require('./handlers/generateApplyHandler');
const generateConstructHandler = require('./handlers/generateConstructHandler');
const applyClassWrappers = require('./generateMiddlewaredClass');

/**
 * Middleware function is supposed to wrap source classes
 * in order to provide plugin functionality
 * @param {Function} Middlewarable
 * @param {string} namespace
 */
function middleware(Middlewarable, namespace) {
    Middlewarable.prototype.__namespace__ = namespace;

    const handler = {
        // Get handler for members - intercepts `get` calls, meant for class static members
        get: generateGetHandler('class', namespace),

        // Apply handler for functions - intercepts function calls
        apply: generateApplyHandler(namespace),

        // Construct handler for classes - intercepts `new` operator calls, changes properties
        construct: generateConstructHandler(namespace)
    };

    const proxy = new Proxy(Middlewarable, handler);

    // TODO check if class
    return applyClassWrappers(proxy);
}

module.exports = middleware;
