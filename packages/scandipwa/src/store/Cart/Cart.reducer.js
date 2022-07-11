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

import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';

import { UPDATE_IS_LOADING_CART, UPDATE_SHIPPING_PRICE, UPDATE_TOTALS } from './Cart.action';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action) => {
    const { cartData: { items = [], shipping_addresses = {}, ...rest } = {} } = action;

    const cartTotals = {
        ...rest,
        items: [],
        shipping_addresses: {}
    };

    if (items.length) {
        const normalizedItemsProduct = items.map((item) => {
            const { variants, ...normalizedItem } = item;
            normalizedItem.product = getIndexedProduct(item.product, item.sku);

            return normalizedItem;
        });

        cartTotals.items = normalizedItemsProduct;
    }

    cartTotals.shipping_addresses = shipping_addresses[0] || {};

    BrowserDatabase.setItem(
        cartTotals,
        CART_TOTALS
    );

    return { cartTotals, isLoading: false };
};

/** @namespace Store/Cart/Reducer/updateShippingPrice */
export const updateShippingPrice = (action, state) => {
    const {
        data: {
            grand_total,
            shipping_amount,
            shipping_incl_tax,
            shipping_tax_amount,
            subtotal,
            subtotal_incl_tax,
            subtotal_with_discount,
            tax_amount
        } = {}
    } = action;

    const shipping = {
        prices: {
            ...state.cartTotals.prices,
            applied_taxes: [
                {
                    ...state.cartTotals.prices?.applied_taxes[0],
                    amount: {
                        value: tax_amount
                    }
                }
            ],
            grand_total: {
                value: grand_total
            },
            subtotal_excluding_tax: {
                value: subtotal
            },
            subtotal_including_tax: {
                value: subtotal_incl_tax
            },
            subtotal_with_discount_excluding_tax: {
                value: subtotal_with_discount
            }
        },
        shipping_addresses: {
            ...state.cartTotals.shipping_addresses,
            selected_shipping_method: {
                amount: {
                    value: shipping_amount
                },
                amount_incl_tax: shipping_incl_tax,
                tax_amount: shipping_tax_amount
            }
        }
    };

    return {
        cartTotals: {
            ...state.cartTotals,
            ...shipping
        }
    };
};

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = () => ({
    isLoading: false,
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {}
});

/** @namespace Store/Cart/Reducer/CartReducer */
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
    case UPDATE_IS_LOADING_CART:
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
