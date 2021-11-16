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

import {
    DISPLAY_SHIPPING_PRICES_BOTH,
    DISPLAY_SHIPPING_PRICES_EXCL_TAX
} from 'Component/CheckoutDeliveryOption/CheckoutDeliveryOption.config';

export const DISPLAY_CART_TAX_IN_SUBTOTAL = {
    INCL_TAX: 'DISPLAY_CART_TAX_IN_SUBTOTAL_INCL_TAX',
    EXCL_TAX: 'DISPLAY_CART_TAX_IN_SUBTOTAL_EXL_TAX',
    BOTH: 'DISPLAY_CART_TAX_IN_SUBTOTAL_BOTH'
};

export const DISPLAY_CART_TAX_IN_SHIPPING = {
    INCL_TAX: 'DISPLAY_CART_TAX_IN_SHIPPING_INCL_TAX',
    EXCL_TAX: 'DISPLAY_CART_TAX_IN_SHIPPING_EXL_TAX',
    BOTH: 'DISPLAY_CART_TAX_IN_SHIPPING_BOTH'
};

export const DISPLAY_CART_TAX_IN_PRICE = {
    INCL_TAX: 'DISPLAY_CART_TAX_IN_PRICE_INCL_TAX',
    EXCL_TAX: 'DISPLAY_CART_TAX_IN_PRICE_EXL_TAX',
    BOTH: 'DISPLAY_CART_TAX_IN_PRICE_BOTH'
};

/** @namespace Util/Cart/getCartSubtotal */
export const getCartSubtotal = (state) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                subtotal = 0,
                subtotal_incl_tax = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_subtotal === DISPLAY_CART_TAX_IN_SUBTOTAL.EXCL_TAX) {
        return subtotal;
    }

    return subtotal_incl_tax;
};

/** @namespace Util/Cart/getCartSubtotalSubPrice */
export const getCartSubtotalSubPrice = (state) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                subtotal = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_subtotal === DISPLAY_CART_TAX_IN_SUBTOTAL.BOTH) {
        return subtotal;
    }

    return null;
};

/** @namespace Util/Cart/getCartItemPrice */
export const getCartItemPrice = (state) => (props) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price
            } = {}
        } = {}
    } = state;

    const {
        row_total = 0,
        row_total_incl_tax = 0
    } = props;

    if (display_tax_in_price === DISPLAY_CART_TAX_IN_PRICE.EXCL_TAX) {
        return row_total;
    }

    return row_total_incl_tax;
};

/** @namespace Util/Cart/getCartItemSubPrice */
export const getCartItemSubPrice = (state) => (props) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price
            } = {}
        } = {}
    } = state;

    const {
        row_total = 0
    } = props;

    if (display_tax_in_price === DISPLAY_CART_TAX_IN_PRICE.BOTH) {
        return row_total;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingPrice */
export const getCartShippingPrice = (state) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_amount = 0,
                shipping_incl_tax = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING.EXCL_TAX) {
        return shipping_amount;
    }

    return shipping_incl_tax;
};

/** @namespace Util/Cart/getCartShippingSubPrice */
export const getCartShippingSubPrice = (state) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_amount = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_shipping_amount === DISPLAY_CART_TAX_IN_SHIPPING.BOTH) {
        return shipping_amount;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingItemPrice */
export const getCartShippingItemPrice = (state) => (props) => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type
            } = {}
        } = {}
    } = state;

    const {
        price_incl_tax = 0,
        price_excl_tax = 0
    } = props;

    if (shipping_price_display_type === DISPLAY_SHIPPING_PRICES_EXCL_TAX) {
        return price_excl_tax;
    }

    return price_incl_tax;
};

/** @namespace Util/Cart/getCartShippingItemSubPrice */
export const getCartShippingItemSubPrice = (state) => (props) => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type
            } = {}
        } = {}
    } = state;

    const {
        price_excl_tax = 0
    } = props;

    if (shipping_price_display_type === DISPLAY_SHIPPING_PRICES_BOTH) {
        return price_excl_tax;
    }

    return null;
};

/** @namespace Util/Cart/getCartTotalSubPrice */
export const getCartTotalSubPrice = (state) => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                include_tax_in_order_total
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                grand_total = 0,
                tax_amount = 0
            } = {}
        } = {}
    } = state;

    if (include_tax_in_order_total) {
        return grand_total - tax_amount;
    }

    return null;
};

/** @namespace Util/Cart/getItemsCountLabel */
export const getItemsCountLabel = (items_qty) => (items_qty === 1 ? __('1 item') : __('%s items', items_qty || 0));

/** @namespace Util/Cart/getAllCartItemsSku */
export const getAllCartItemsSku = (cartItems) => cartItems.reduce((acc, item) => {
    acc.push({ sku: item.sku });

    return acc;
}, []);
