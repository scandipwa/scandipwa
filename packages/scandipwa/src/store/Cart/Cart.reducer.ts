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

import { CartStore, CartTotals } from './Cart.type';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = (): CartStore => ({
    isLoading: false,
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {} as CartTotals,
    areDetailsLoaded: false,
});

/** @namespace Store/Cart/Reducer/CartReducer */
export const CartReducer: Reducer<CartStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default CartReducer;
