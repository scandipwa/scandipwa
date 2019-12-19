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

/* eslint-disable no-param-reassign */
import BrowserDatabase from 'Util/BrowserDatabase';
import { UPDATE_LINKED_PRODUCTS } from './LinkedProducts.action';
import { LINKED_PRODUCTS } from './LinkedProducts.dispatcher';

const initialState = {
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        upsell: {},
        related: {},
        crossSell: {}
    }
};

const LinkedProductsReducer = (state = initialState, action) => {
    const { type, linkedProducts = {} } = action;

    if (type === UPDATE_LINKED_PRODUCTS) {
        return {
            ...state,
            linkedProducts
        };
    }

    return state;
};

export default LinkedProductsReducer;
