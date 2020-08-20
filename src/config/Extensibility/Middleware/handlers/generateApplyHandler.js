/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable func-names, @scandipwa/scandipwa-guidelines/export-level-one */
const generateMiddlewaredFunction = require('../middlewarers/generateMiddlewaredFunction');
const getPluginsForMember = require('../helpers/getPluginsForMember');

module.exports = (namespace) => function (origFunction, thisArg, originalArgs) {
    // Get plugins for the function
    const memberPluginsApply = getPluginsForMember(namespace, 'function');

    // If no plugins => return the original function
    if (!memberPluginsApply.length) {
        return origFunction.apply(thisArg, originalArgs);
    }

    // Return the result of a call of a generated function (=wrapped into plugins)
    return generateMiddlewaredFunction(
        origFunction,
        memberPluginsApply,
        thisArg
    )(...originalArgs);
};
