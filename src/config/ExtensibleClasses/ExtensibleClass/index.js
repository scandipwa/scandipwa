/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const proxyInstance = require('../ProxyInstance');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensibleClass {
    constructor() {
        const { __namespace__ } = Object.getPrototypeOf(this);
        const namespacePlugins = window.plugins?.[__namespace__]?.['instance']?.['get'];
        if (!namespacePlugins) {
            return;
        }

        return proxyInstance(this, namespacePlugins, __namespace__);
    }
};
