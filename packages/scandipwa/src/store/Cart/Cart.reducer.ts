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

import { Action, Reducer } from 'redux';

import { CartData } from 'Type/Cart';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';

import { UPDATE_SHIPPING_PRICE, UPDATE_TOTALS } from './Cart.action';

export const CART_TOTALS = 'cart_totals';

export interface CartStore {
    cartTotals: Partial<CartData>
}

declare module 'Util/Store/type' {
    export interface RootState {
        CartReducer: CartStore
    }
}

export type CartAction = {
    cartData?: CartData
}

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = (): CartStore => ({
    cartTotals: BrowserDatabase.getItem<CartData>(CART_TOTALS) || {}
});

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action: CartAction): CartStore => {
    const { cartData: { items = [], ...rest } = {} } = action;

    const cartTotals: CartStore['cartTotals'] = {
        ...rest,
        items: []
    };

    if (items.length) {
        const normalizedItemsProduct = items.map((item) => {
            /* eslint-disable no-unused-vars */
            const { variants, ...normalizedItem } = item;
            /* eslint-enable no-unused-vars */
            normalizedItem.product = getIndexedProduct(item.product, item.sku);

            return normalizedItem;
        });

        cartTotals.items = normalizedItemsProduct as CartData['items'];
    }

    BrowserDatabase.setItem(
        cartTotals,
        CART_TOTALS
    );

    return { cartTotals };
};

/** @namespace Store/Cart/Reducer/updateShippingPrice */
export const updateShippingPrice = (action: CartAction, state: CartStore): CartStore => {
    /* eslint-disable no-unused-vars */
    const {
        cartData: {
            items,
            ...rest
        } = {}
    } = action;
    /* eslint-enable no-unused-vars */

    return {
        cartTotals: {
            ...state.cartTotals,
            ...rest
        }
    };
};

/** @namespace Store/Cart/Reducer/CartReducer */
export const CartReducer: Reducer<
    CartStore,
    Action<typeof UPDATE_SHIPPING_PRICE | typeof UPDATE_TOTALS> & CartAction
> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case UPDATE_TOTALS:
        return updateCartTotals(action);
    case UPDATE_SHIPPING_PRICE:
        return updateShippingPrice(action, state);
    default:
        return state;
    }
};
