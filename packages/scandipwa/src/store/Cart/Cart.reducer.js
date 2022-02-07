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

import { UPDATE_SHIPPING_PRICE, UPDATE_TOTALS } from './Cart.action';

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

    // Migrates different customizable options types into one
    const fixedItems = items.map((item) => {
        const {
            customizable_options_virtual,
            customizable_options_simple,
            customizable_options_downloadable,
            customizable_options_bundle,
            customizable_options_config,
            ...restItem
        } = item;

        const options = customizable_options_virtual
            || customizable_options_simple
            || customizable_options_downloadable
            || customizable_options_bundle
            || customizable_options_config;

        return {
            ...restItem,
            customizable_options: options
        };
    });

    // Extra price calculations
    const totalDiscount = !discounts ? 0 : discounts.reduce(
        (total, { amount: { value = 0 } = {} }) => total + value, 0
    );
    const totalTax = !applied_taxes ? 0 : applied_taxes.reduce(
        (total, { amount: { value = 0 } = {} }) => total + value, 0
    );
    const grandTotalExcludingTax = grandTotalValue - totalTax;

    const cartTotals = {
        ...rest,
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
    default:
        return state;
    }
};

export default CartReducer;
