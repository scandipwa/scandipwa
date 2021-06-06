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
import { getIndexedProduct } from 'Util/Product';

import { UPDATE_SHIPPING_PRICE, UPDATE_TOTALS } from './Cart.action';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action) => {
    const { cartData: cartTotals } = action;

    if (Object.hasOwnProperty.call(cartTotals, 'items')) {
        const normalizedItemsProduct = cartTotals.items.map((item) => {
            const { variants, ...normalizedItem } = item;
            normalizedItem.product = getIndexedProduct(item.product, item.sku);

            return normalizedItem;
        });

        cartTotals.items = normalizedItemsProduct;
    }

    BrowserDatabase.setItem(
        cartTotals,
        CART_TOTALS
    );

    return { cartTotals };
};

/** @namespace Store/Cart/Reducer/updateShippingPrice */
export const updateShippingPrice = (action, state) => {
    const {
        data: {
            items,
            ...rest
        } = {}
    } = action;

    return {
        cartTotals: {
            ...state.cartTotals,
            ...rest
        }
    };
};

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = () => ({
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {}
});

/** @namespace Store/Cart/Reducer */
export const CartReducer = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case UPDATE_TOTALS:
        return updateCartTotals(action, state);
    case UPDATE_SHIPPING_PRICE:
        return updateShippingPrice(action, state);
    default:
        return state;
    }
};

export default CartReducer;
