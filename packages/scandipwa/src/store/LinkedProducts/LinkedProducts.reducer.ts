/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import BrowserDatabase from 'Util/BrowserDatabase';

import { LINKED_PRODUCTS } from './LinkedProducts.dispatcher';
import { LinkedProductsActionType, LinkedProductsStore, LinkedProductType } from './LinkedProducts.type';

/** @namespace Store/LinkedProducts/Reducer/getInitialState */
export const getInitialState = (): LinkedProductsStore => ({
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        [LinkedProductType.UPSELL]: {},
        [LinkedProductType.RELATED]: {},
        [LinkedProductType.CROSS_SELL]: {},
    },
});

/** @namespace Store/LinkedProducts/Reducer/LinkedProductsReducer */
export const LinkedProductsReducer: Reducer<LinkedProductsStore> = (
    state = getInitialState(),
    action,
) => {
    const { type, state: newState } = action;

    if (type !== LinkedProductsActionType.UPDATE_LINKED_PRODUCTS_STORE) {
        return state;
    }

    return {
        ...state,
        newState,
    };
};

export default LinkedProductsReducer;
