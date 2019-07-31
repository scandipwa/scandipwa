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

const checkEveryOption = (properties, options) => Object.keys(options)
    .every((param) => {
        if (typeof options[param] === 'string') {
            return options[param] === properties[param];
        }

        return options[param].includes(properties[param]);
    });

// eslint-disable-next-line import/prefer-default-export
export const getVariantIndex = (variants, options) => Object.keys(variants)
    .find(key => checkEveryOption(variants[key].product, options));
