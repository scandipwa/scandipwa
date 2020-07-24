/* eslint-disable arrow-body-style, consistent-return */
const { Component } = require('react');
const proxyInstance = require('../ProxyInstance');
const construct = require('../Construct');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensibleComponent extends Component {
    constructor(props) {
        super(props);
        return construct(proxyInstance(this));
    }

    __construct() {}
};
