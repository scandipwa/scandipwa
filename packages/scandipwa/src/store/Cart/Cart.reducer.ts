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

import { AppliedTax, CartItemProduct, SelectedShippingMethod } from 'Query/Cart.type';
import { ProductItem } from 'Query/ProductList.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';

import {
    CartAction,
    CartActionType,
    CartStore,
    CartTotals,
    IndexedCartItem,
    UpdateShippingPriceAction,
    UpdateTotalsAction
} from './Cart.type';

export const CART_TOTALS = 'cart_totals';

/** @namespace Store/Cart/Reducer/updateCartTotals */
export const updateCartTotals = (action: UpdateTotalsAction): CartStore => {
    const { cartData: { items = [], shipping_addresses = [], ...rest } = {} } = action;

    const cartTotals: CartTotals = {
        ...rest,
        items: [],
        shipping_addresses: {}
    };

    if (items.length) {
        const normalizedItemsProduct = items.map((item) => {
            const {
                bundle_customizable_options,
                configurable_customizable_options,
                downloadable_customizable_options,
                virtual_customizable_options,
                simple_customizable_options,
                ...normalizedItem
            } = item;

            normalizedItem.product = getIndexedProduct(
                item.product as unknown as Partial<ProductItem>,
                item.sku
            ) as unknown as CartItemProduct;

            normalizedItem.customizable_options = bundle_customizable_options
                || configurable_customizable_options
                || downloadable_customizable_options
                || virtual_customizable_options
                || simple_customizable_options
                || [];

            return normalizedItem;
        });

        cartTotals.items = normalizedItemsProduct as unknown as IndexedCartItem[];
    }

    cartTotals.shipping_addresses = shipping_addresses[0] || [];

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
            discount_amount = 0,
            grand_total = 0,
            shipping_amount = 0,
            shipping_incl_tax = 0,
            shipping_tax_amount = 0,
            subtotal = 0,
            subtotal_incl_tax = 0,
            subtotal_with_discount = 0,
            tax_amount = 0
        } = {}
    } = action;

    const {
        cartTotals: {
            prices: {
                quote_currency_code = GQLCurrencyEnum.USD
            } = {}
        } = {}
    } = state;

    const shipping = {
        prices: {
            ...state.cartTotals.prices,
            applied_taxes: [
                {
                    ...state.cartTotals.prices?.applied_taxes?.[0],
                    amount: {
                        value: tax_amount,
                        currency: quote_currency_code
                    }
                } as AppliedTax
            ],
            discount: {
                ...state.cartTotals.prices?.discount,
                label: state.cartTotals.prices?.discount?.label || '',
                amount: {
                    value: discount_amount,
                    currency: quote_currency_code as GQLCurrencyEnum
                }
            },
            grand_total: {
                value: grand_total,
                currency: quote_currency_code as GQLCurrencyEnum
            },
            subtotal_excluding_tax: {
                value: subtotal,
                currency: quote_currency_code as GQLCurrencyEnum
            },
            subtotal_including_tax: {
                value: subtotal_incl_tax,
                currency: quote_currency_code as GQLCurrencyEnum
            },
            subtotal_with_discount_excluding_tax: {
                value: subtotal_with_discount,
                currency: quote_currency_code as GQLCurrencyEnum
            }
        },
        shipping_addresses: {
            ...state.cartTotals.shipping_addresses,
            selected_shipping_method: {
                amount: {
                    value: shipping_amount,
                    currency: quote_currency_code as GQLCurrencyEnum
                },
                amount_incl_tax: shipping_incl_tax,
                tax_amount: shipping_tax_amount
            } as SelectedShippingMethod
        }
    };

    return {
        ...state,
        cartTotals: {
            ...state.cartTotals,
            ...shipping
        }
    };
};

/** @namespace Store/Cart/Reducer/getInitialState */
export const getInitialState = (): CartStore => ({
    isLoading: false,
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {} as CartTotals
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
