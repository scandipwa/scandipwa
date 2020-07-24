/* eslint-disable */
const generateGetHandler = require('../Middleware/generateGetHandler');

const shouldProxyAnyway = (namespace) => {
    // Because they are instantiated on export
    return namespace.includes('Query')
        || namespace.includes('Dispatcher')
        || namespace.includes('Util');
}

module.exports = function proxyInstance(context) {
    const { __namespace__: namespace } = Object.getPrototypeOf(context);

    const namespacePlugins = globalThis.plugins?.[namespace]?.['member-function'];
    if (!namespacePlugins && !shouldProxyAnyway(namespace)) {
        return context;
    }

    return new Proxy(context, {
        get: generateGetHandler('instance', namespace)
    });
};
