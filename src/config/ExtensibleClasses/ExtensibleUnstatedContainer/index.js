/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const { Container } = require('unstated');
const proxyInstance = require('../ProxyInstance');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensibleUnstatedContainer extends Container {
    constructor(props) {
        super(props);
        return proxyInstance(this);
    }
};
