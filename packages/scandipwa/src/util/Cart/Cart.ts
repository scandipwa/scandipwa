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
    CartItem,
    CartItemPriceProps,
    CartState,
    DisplayCartTaxInPrice,
    DisplayCartTaxInShipping,
    DisplayCartTaxInSubTotal,
    DisplayShippingPrices
} from './Cart.type';

// ! TODO remove this when migrate components to TS
export const DISPLAY_CART_TAX_IN_SUBTOTAL = {
    INCL_TAX: DisplayCartTaxInSubTotal.INCL_TAX,
    EXCL_TAX: DisplayCartTaxInSubTotal.EXCL_TAX,
    BOTH: DisplayCartTaxInSubTotal.BOTH
};

// ! TODO remove this when migrate components to TS
export const DISPLAY_CART_TAX_IN_SHIPPING = {
    INCL_TAX: DisplayCartTaxInShipping.INCL_TAX,
    EXCL_TAX: DisplayCartTaxInShipping.EXCL_TAX,
    BOTH: DisplayCartTaxInShipping.BOTH
};

// ! TODO remove this when migrate components to TS
export const DISPLAY_CART_TAX_IN_PRICE = {
    INCL_TAX: DisplayCartTaxInPrice.INCL_TAX,
    EXCL_TAX: DisplayCartTaxInPrice.EXCL_TAX,
    BOTH: DisplayCartTaxInPrice.BOTH
};

/** @namespace Util/Cart/getCartSubtotal */
export const getCartSubtotal = (state: CartState): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal = ''
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                subtotal = 0,
                subtotal_incl_tax = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_subtotal === DisplayCartTaxInSubTotal.EXCL_TAX) {
        return subtotal;
    }

    return subtotal_incl_tax;
};

/** @namespace Util/Cart/getCartSubtotalSubPrice */
export const getCartSubtotalSubPrice = (state: CartState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_subtotal = ''
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                subtotal = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_subtotal === DisplayCartTaxInSubTotal.BOTH) {
        return subtotal;
    }

    return null;
};

/** @namespace Util/Cart/getCartItemPrice */
export const getCartItemPrice = (state: CartState) => (props: CartItemPriceProps): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price = ''
            } = {}
        } = {}
    } = state;

    const {
        row_total = 0,
        row_total_incl_tax = 0
    } = props;

    if (display_tax_in_price === DisplayCartTaxInPrice.EXCL_TAX) {
        return row_total;
    }

    return row_total_incl_tax;
};

/** @namespace Util/Cart/getCartItemSubPrice */
export const getCartItemSubPrice = (state: CartState) => (props: CartItemPriceProps): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_price = ''
            } = {}
        } = {}
    } = state;

    const {
        row_total = 0
    } = props;

    if (display_tax_in_price === DisplayCartTaxInPrice.BOTH) {
        return row_total;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingPrice */
export const getCartShippingPrice = (state: CartState): number => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount = ''
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_amount = 0,
                shipping_incl_tax = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_shipping_amount === DisplayCartTaxInShipping.EXCL_TAX) {
        return shipping_amount;
    }

    return shipping_incl_tax;
};

/** @namespace Util/Cart/getCartShippingSubPrice */
export const getCartShippingSubPrice = (state: CartState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                display_tax_in_shipping_amount = ''
            } = {}
        } = {},
        CartReducer: {
            cartTotals: {
                shipping_amount = 0
            } = {}
        } = {}
    } = state;

    if (display_tax_in_shipping_amount === DisplayCartTaxInShipping.BOTH) {
        return shipping_amount;
    }

    return null;
};

/** @namespace Util/Cart/getCartShippingItemPrice */
export const getCartShippingItemPrice = (state: CartState) => (props: CartItemPriceProps): number => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type = ''
            } = {}
        } = {}
    } = state;

    const {
        price_incl_tax = 0,
        price_excl_tax = 0
    } = props;

    if (shipping_price_display_type === DisplayShippingPrices.EXCL_TAX) {
        return price_excl_tax;
    }

    return price_incl_tax;
};

/** @namespace Util/Cart/getCartShippingItemSubPrice */
export const getCartShippingItemSubPrice = (state: CartState) => (props: CartItemPriceProps): number | null => {
    const {
        ConfigReducer: {
            priceTaxDisplay: {
                shipping_price_display_type = ''
            } = {}
        } = {}
    } = state;

    const {
        price_excl_tax = 0
    } = props;

    if (shipping_price_display_type === DisplayShippingPrices.BOTH) {
        return price_excl_tax;
    }

    return null;
};

/** @namespace Util/Cart/getCartTotalSubPrice */
export const getCartTotalSubPrice = (state: CartState): number | null => {
    const {
        ConfigReducer: {
            cartDisplayConfig: {
                include_tax_in_order_total = ''
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
export const getItemsCountLabel = (items_qty: number): string => (
    items_qty === 1
        ? __('1 item')
        : __('%s items', items_qty || 0)
);

/** @namespace Util/Cart/getAllCartItemsSku */
export const getAllCartItemsSku = (
    cartItems: CartItem[]
): Array<{ sku: string }> => cartItems.reduce(
    (acc, item) => {
        acc.push({ sku: item.sku || '' });

        return acc;
    },
    [] as Array<{ sku: string }>
);

/** @namespace Util/Cart/trimCrossSellDuplicateItems */
export const trimCrossSellDuplicateItems = (items: CartItem[]): CartItem[] => items.filter(
    ({
        sku: itemSku,
        product: { variants: itemVariants, id: itemId }
    }, index, array) => {
        if (!index || !itemVariants?.length) {
            return true;
        }

        const foundItem = array.find(({ product: { id: elementId } }) => elementId === itemId);

        if (!foundItem) {
            return false;
        }

        const {
            sku: duplicateSku,
            product: { id: duplicateId }
        } = foundItem;

        return (duplicateId === itemId && duplicateSku === itemSku);
    }
);
