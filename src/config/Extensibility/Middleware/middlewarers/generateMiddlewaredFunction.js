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
const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');
/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (origMember = () => {}, sortedPlugins, origContext) => function (...args) {
    const newMember = sortedPlugins.reduce(
        (acc, plugin) => () => {
            const wrapper = getWrapperFromPlugin(plugin, origMember.name);

            // Provide different arguments due to API difference
            // Between property and function call interception
            return typeof origMember === 'object'
                ? wrapper(acc, origContext)
                : wrapper(
                    args,
                    acc.bind(origContext),
                    origContext
                );
        },
        origMember
    );

    return newMember(args);
};
