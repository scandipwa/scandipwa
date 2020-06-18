/* eslint-disable */
const generateGetHandler = require('../Middleware/generateGetHandler');

module.exports = function proxyInstance(context) {
    const { __namespace__ } = Object.getPrototypeOf(context);
    const shouldProxyAnyway = () => {
        return !![
            // Because they are instantiated on export
            __namespace__.includes('Query'),
            __namespace__.includes('Dispatcher'),
            __namespace__.includes('Util'),
        ].find(Boolean);
    }

    const namespacePlugins = globalThis.plugins?.[__namespace__]?.['member-function'];
    if (!namespacePlugins && !shouldProxyAnyway()) {
        return;
    }

    return new Proxy(context, {
        get: generateGetHandler('instance', __namespace__)
    });
};
