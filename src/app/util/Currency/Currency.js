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
export const CUR_CURRENCY = 'current_currency';

/**
 *
 * @type {number}
 */
export const ONE_HOUR = 3600;

/**
 *
 * @param {Any} currency
 * @returns {void}
 * @namespace Util/Currency/setCurrency
 */
export const setCurrency = (currency) => {
    BrowserDatabase.setItem(currency, CUR_CURRENCY, ONE_HOUR);
};

/**
 *
 * @returns {String} currency
 * @namespace Util/Currency/getCurrency
 */
export const getCurrency = () => {
    const currency = BrowserDatabase.getItem(CUR_CURRENCY);

    return (typeof currency === 'string') ? currency : '';
};
