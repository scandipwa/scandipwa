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

import BrowserDatabase from 'Util/BrowserDatabase';

/**
 *
 * @type {string}
 */
const CUR_CURRENCY = 'current_currency';

/**
 *
 * @type {number}
 */
const ONE_HOUR = 3600;

/**
 *
 * @param {Any} currency
 * @returns {void}
 */
export const setCurrency = (currency) => {
    BrowserDatabase.setItem(currency, CUR_CURRENCY, ONE_HOUR);
};

/**
 *
 * @returns {String} currency
 */
export const getCurrency = () => {
    const currency = BrowserDatabase.getItem(CUR_CURRENCY);
    if (typeof currency === 'string') {
        return currency;
    }

    return '';
};
