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
import { generateParameters } from 'Util/Product';
import {
    UPDATE_TOTALS,
    UPDATE_ALL_PRODUCTS_IN_CART
} from './Cart.action';

export const PRODUCTS_IN_CART = 'cart_products';
export const CART_TOTALS = 'cart_totals';

const updateCartTotals = (action) => {
    const { cartData: cartTotals } = action;

    BrowserDatabase.setItem(
        cartTotals,
        CART_TOTALS
    );

    return { cartTotals };
};

const updateAllProductsInCart = (action) => {
    const { products } = action;
    const parameteredProducts = Object.keys(products).reduce((accum, key) => {
        const currentItem = products[key];
        const {
            variants, configurable_options, configurableVariantIndex, type_id
        } = currentItem;
        if (type_id !== 'simple') {
            const { product: selectedVariant } = variants[configurableVariantIndex];
            const required_params = configurable_options.map(({ attribute_code }) => attribute_code);
            const parameters = generateParameters(selectedVariant.attributes, required_params);
            variants[configurableVariantIndex].product = { ...selectedVariant, parameters };
        }

        return {
            ...accum,
            [key]: currentItem
        };
    }, {});

    BrowserDatabase.setItem(
        parameteredProducts,
        PRODUCTS_IN_CART
    );

    return { productsInCart: products };
};

const initialState = {
    productsInCart: BrowserDatabase.getItem(PRODUCTS_IN_CART) || {},
    cartTotals: BrowserDatabase.getItem(CART_TOTALS) || {}
};

const CartReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_ALL_PRODUCTS_IN_CART:
        return {
            ...state,
            ...updateAllProductsInCart(action)
        };

    case UPDATE_TOTALS:
        return {
            ...state,
            ...updateCartTotals(action, state)
        };

    default:
        return state;
    }
};

export default CartReducer;
