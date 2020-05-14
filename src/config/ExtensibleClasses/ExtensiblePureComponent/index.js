/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const { PureComponent } = require('react');
const proxyInstance = require('../ProxyInstance');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensiblePureComponent extends PureComponent {
    constructor(props) {
        super(props);
        const { __namespace__ } = Object.getPrototypeOf(this);
        const namespacePlugins = window.plugins?.[__namespace__]?.['instance']?.['get'];
        if (!namespacePlugins) {
            return;
        }

        return proxyInstance(this, namespacePlugins, __namespace__);
    }
};
