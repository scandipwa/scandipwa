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

/**
 *
 * @type {string}
 */
export const SET_CURRENCY_DATA = 'SET_CURRENCY_DATA';
/**
 *
 * @param data
 * @returns {{payload: *, type: *}}
 */
export const setCurrencyData = data => ({
    type: SET_CURRENCY_DATA,
    payload: data
});
