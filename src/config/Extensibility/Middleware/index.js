/* eslint-disable */
const generateGetHandler = require('./generateGetHandler');
const generateApplyHandler = require('./generateApplyHandler');
const generateConstructHandler = require('./generateConstructHandler');
const generateMiddlewaredClass = require('./generateMiddlewaredClass');
const sortPlugins = require('./sortPlugins');

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
    // ~ if `Class` inherits from class other than Object
    // ~ if `Class` is class, not regular function
    if (Class.prototype.__proto__.constructor.name === 'Object') {
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

    // Provide an opportunity to wrap proxy with additional functions.
    const namespacePluginsClass = globalThis.plugins?.[namespace]?.['class'] || [];
    const MiddlewaredClass = generateMiddlewaredClass(
        new Proxy(Class, handler),
        sortPlugins(namespacePluginsClass)
    );

    return MiddlewaredClass;
}

module.exports = middleware;
