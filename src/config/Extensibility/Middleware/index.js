/* eslint-disable no-param-reassign */
const generateGetHandler = require('./handlers/generateGetHandler');
const generateApplyHandler = require('./handlers/generateApplyHandler');
const generateConstructHandler = require('./handlers/generateConstructHandler');
const applyClassWrappers = require('./generateMiddlewaredClass');

/**
 * Middleware function is supposed to wrap source classes
 * in order to provide plugin functionality
 * @param {Class} Class
 * @param {string} namespace
 */
function middleware(Class, namespace) {
    Class.prototype.__namespace__ = namespace;
    const handler = {};

    // All classes inherit from extensible classes
    // ~ if `Class` inherits from class other than `Object` then `Class` is class, not regular function
    const isExtensibleClass = Object.getPrototypeOf(Object.getPrototypeOf(Class)).constructor.name !== 'Object';

    if (!isExtensibleClass) {
        // Apply handler for functions - intercepts function calls
        Object.defineProperty(
            handler,
            'apply',
            { value: generateApplyHandler(namespace) }
        );
    } else {
        // Get handler for members - intercepts `get` calls, meant for class static members
        Object.defineProperty(
            handler,
            'get',
            { value: generateGetHandler('class', namespace) }
        );
        // Construct handler for classes - intercepts `new` operator calls, changes properties
        Object.defineProperty(
            handler,
            'construct',
            { value: generateConstructHandler(namespace) }
        );
    }

    const proxy = new Proxy(Class, handler);

    if (!isExtensibleClass) {
        return proxy;
    }

    return applyClassWrappers(proxy);
}

module.exports = middleware;
