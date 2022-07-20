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

import { UPDATE_IS_LOADING_CART, UPDATE_SHIPPING_PRICE, UPDATE_TOTALS } from './Cart.action';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action) => {
    const {
        cartData: {
            items = [],
            prices: {
                grand_total: { value: grandTotalValue = 0, currency } = {},
                subtotal_excluding_tax: { value: subtotalExclTax = 0 } = {},
                subtotal_including_tax: { value: subtotalInclTax = 0 } = {},
                applied_taxes = [],
                discounts = []
            } = {},
            ...rest
        } = {}
    } = action;

    // Backwards compatability fields:
    const fixedItems = items.map((item) => {
        const {
            customizable_options_virtual,
            customizable_options_simple,
            customizable_options_downloadable,
            customizable_options_bundle,
            customizable_options_config,
            quantity: qty,
            prices: {
                row_total: {
                    value: row_total,
                    currency_code
                },
                row_total_including_tax: {
                    value: row_total_incl_tax
                }
            },
            product: {
                sku
            },
            product,
            uid,
            ...restItem
        } = item;

        // Migrates different customizable options types into one
        const options = customizable_options_virtual
            || customizable_options_simple
            || customizable_options_downloadable
            || customizable_options_bundle
            || customizable_options_config;

        return {
            ...restItem,
            product: {
                ...product,
                cart_price: row_total,
                cart_price_incl_tax: row_total_incl_tax
            },
            uid,
            item_id: atob(uid),
            sku,
            qty,
            row_total,
            row_total_incl_tax,
            customizable_options: options,
            currency_code
        };
    });

    const totalDiscount = !discounts ? 0 : discounts.reduce(
        (total, { amount: { value = 0 } = {} }) => total + value, 0
    );
    const totalTax = !applied_taxes ? 0 : applied_taxes.reduce(
        (total, { amount: { value = 0 } = {} }) => total + value, 0
    );
    const grandTotalExcludingTax = grandTotalValue - totalTax;

    const cartTotals = {
        ...rest,
        quote_currency_code: currency,
        currency,
        grand_total: grandTotalValue,
        grand_total_excluding_tax: grandTotalExcludingTax,
        subtotal_excluding_tax: subtotalExclTax,
        subtotal_including_tax: subtotalInclTax,
        tax_amount: totalTax,
        discount_amount: totalDiscount,
        applied_taxes,
        discounts,
        prices: {
            currency,
            grand_total: grandTotalValue,
            grand_total_excluding_tax: grandTotalExcludingTax,
            subtotal_excluding_tax: subtotalExclTax,
            subtotal_including_tax: subtotalInclTax,
            tax_amount: totalTax,
            discount_amount: totalDiscount,
            applied_taxes,
            discounts
        },
        items: fixedItems
    };

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
