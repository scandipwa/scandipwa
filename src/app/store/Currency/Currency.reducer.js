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

import { SET_CURRENCY_DATA } from './Currency.action';

/**
 *
 * @type {{currency: {}}}
 */
export const initialState = {
    currency: {}
};

/**
 *
 * @param state
 * @param action
 * @returns {{currency: *}|{currency: {}}}
 * @constructor
 */
export const CurrencyReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
    case SET_CURRENCY_DATA:
        return {
            ...state,
            currency: payload.currency
        };
    default:
        return state;
    }
};


export default CurrencyReducer;
