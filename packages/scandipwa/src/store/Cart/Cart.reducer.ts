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

import { Reducer } from 'redux';

import { CartProductItem, QuoteData, TotalsItem } from 'Query/Cart.type';
import { Merge } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';
import { IndexedProduct } from 'Util/Product/Product.type';

import {
    CartAction,
    CartActionType,
    CartStore,
    UpdateShippingPriceAction,
    UpdateTotalsAction
} from './Cart.type';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action: UpdateTotalsAction): CartStore => {
    const { cartData: { items = [], ...rest } = {} } = action;

    const cartTotals: Merge<
    Partial<QuoteData>,
    {
        items: Merge<TotalsItem, {
            product: IndexedProduct<CartProductItem>;
        }>[];
    }
    > = {
        ...rest,
        items: []
    };

    if (items.length) {
        const normalizedItemsProduct = items.map((item) => {
            const normalizedItem = {
                ...item,
                product: getIndexedProduct(item.product, item?.sku)
            };

            return normalizedItem;
        });

        cartTotals.items = normalizedItemsProduct;
    }

    BrowserDatabase.setItem(
        cartTotals,
        CART_TOTALS
    );

    return { cartTotals, isLoading: false };
};

/** @namespace Store/Cart/Reducer/updateShippingPrice */
export const updateShippingPrice = (
    action: UpdateShippingPriceAction,
    state: CartStore
): CartStore => {
    const {
        data: {
            items,
            ...rest
        } = {}
    } = action;

    return {
        ...state,
        cartTotals: {
            ...state.cartTotals,
            ...rest
        }
    };
};

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = (): CartStore => ({
    isLoading: false,
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {}
});

/** @namespace Store/Cart/Reducer/CartReducer */
export const CartReducer: Reducer<CartStore, CartAction> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case CartActionType.UPDATE_TOTALS:
        return updateCartTotals(action);
    case CartActionType.UPDATE_SHIPPING_PRICE:
        return updateShippingPrice(action, state);
    case CartActionType.UPDATE_IS_LOADING_CART:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    default:
        return state;
    }
};

export default CartReducer;
