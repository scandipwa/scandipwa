/* eslint-disable */
const generateGetHandler = require('../Middleware/generateGetHandler');

module.exports = function proxyInstance(context) {
    const { __namespace__ } = Object.getPrototypeOf(context);

    return new Proxy(context, {
        get: generateGetHandler('instance', __namespace__)
    });
};
