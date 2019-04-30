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
import { getProductPrice } from 'Util/Price';
import {
    ADD_PRODUCT_TO_CART,
    UPDATE_TOTALS,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_ALL_PRODUCTS_IN_CART
} from './Cart.action';

export const PRODUCTS_IN_CART = 'cart_products';

const calculateTotals = (products) => {
    // TODO: Override to get product prices from server (in case price have changed)
    let subTotalPrice = 0;
    let taxPrice = 0;
    let count = 0;
    let grandTotalPrice = 0;

    if (products) {
        Object.keys(products).forEach((key) => {
            const prices = getProductPrice(products[key]);
            const { quantity } = products[key];

            count += quantity;
            subTotalPrice += (prices.subTotalPrice * quantity);
            taxPrice += (prices.taxPrice * quantity);
        });
    }
    grandTotalPrice = (subTotalPrice + taxPrice).toFixed(2);
    subTotalPrice = subTotalPrice.toFixed(2);
    taxPrice = taxPrice.toFixed(2);

    return {
        subTotalPrice,
        count,
        grandTotalPrice,
        taxPrice
    };
};

const getProductId = ({ id, variants, configurableVariantIndex }) => (
    typeof configurableVariantIndex === 'number'
        ? variants[configurableVariantIndex].product.id
        : id
);

const addProductToCart = (action, state) => {
    const { newProduct } = action;
    const { productsInCart } = state;
    const id = getProductId(newProduct);

    const newProductsInCart = {
        ...productsInCart,
        [id]: newProduct
    };

    BrowserDatabase.setItem(newProductsInCart, PRODUCTS_IN_CART);

    return { productsInCart: newProductsInCart, cartTotals: calculateTotals(newProductsInCart) };
};

const removeProductFromCart = (action, state) => {
    const { product } = action;
    const { productsInCart } = state;
    const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;
    const newProductsInCart = deleteProperty(getProductId(product), productsInCart) || {};

    BrowserDatabase.setItem(
        newProductsInCart,
        PRODUCTS_IN_CART
    );

    return { productsInCart: newProductsInCart, cartTotals: calculateTotals(newProductsInCart) };
};

const updateCartTotals = (action) => {
    const { totals } = action;
    return { cartTotals: totals };
};

const updateAllProductsInCart = (action) => {
    const { products } = action;

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_CART
    );

    return { productsInCart: products, cartTotals: calculateTotals(products) };
};

const initialState = {
    productsInCart: BrowserDatabase.getItem(PRODUCTS_IN_CART) || {},
    cartTotals: calculateTotals(BrowserDatabase.getItem(PRODUCTS_IN_CART)) || {}
};

const CartReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case ADD_PRODUCT_TO_CART:
        return {
            ...state,
            ...addProductToCart(action, state)
        };

    case REMOVE_PRODUCT_FROM_CART:
        return {
            ...state,
            ...removeProductFromCart(action, state)
        };

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
