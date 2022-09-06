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

import {
    GQLCartDisplayConfig,
    GQLConfigurableProduct,
    GQLPriceTaxDisplay,
    GQLQuoteData
} from 'Type/Graphql.type';

// ! TODO move reducer types when we start work with redux!

export interface ConfigReducerState {
    cartDisplayConfig: GQLCartDisplayConfig;
    priceTaxDisplay: GQLPriceTaxDisplay;
}

export interface CartReducerState {
    cartTotals: GQLQuoteData;
}

export interface CartState {
    ConfigReducer: ConfigReducerState;
    CartReducer: CartReducerState;
}

export interface CartItem {
    sku: string;
    product: GQLConfigurableProduct;
}

export interface CartItemPriceProps {
    row_total: number;
    row_total_incl_tax: number;
    price_incl_tax: number;
    price_excl_tax: number;
}

export enum DisplayCartTaxInSubTotal {
    INCL_TAX = 'DISPLAY_CART_TAX_IN_SUBTOTAL_INCL_TAX',
    EXCL_TAX = 'DISPLAY_CART_TAX_IN_SUBTOTAL_EXL_TAX',
    BOTH = 'DISPLAY_CART_TAX_IN_SUBTOTAL_BOTH'
}

export enum DisplayCartTaxInShipping {
    INCL_TAX = 'DISPLAY_CART_TAX_IN_SHIPPING_INCL_TAX',
    EXCL_TAX = 'DISPLAY_CART_TAX_IN_SHIPPING_EXL_TAX',
    BOTH = 'DISPLAY_CART_TAX_IN_SHIPPING_BOTH'
}

export enum DisplayCartTaxInPrice {
    INCL_TAX = 'DISPLAY_CART_TAX_IN_PRICE_INCL_TAX',
    EXCL_TAX = 'DISPLAY_CART_TAX_IN_PRICE_EXL_TAX',
    BOTH = 'DISPLAY_CART_TAX_IN_PRICE_BOTH'
}

export enum DisplayShippingPrices {
    INCL_TAX = 'DISPLAY_SHIPPING_PRICES_INCL_TAX',
    EXCL_TAX = 'DISPLAY_SHIPPING_PRICES_EXCL_TAX',
    BOTH = 'DISPLAY_SHIPPING_PRICES_BOTH'
}

export interface CartToken {
    token: string;
    isCustomerToken: boolean;
}

export type CartTokensByWebsite = Record<string, CartToken | undefined>;
