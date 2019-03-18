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
import {
    ADD_PRODUCT_TO_CART,
    UPDATE_TOTALS,
    REMOVE_PRODUCT_FROM_CART
} from './Cart.action';

const initialState = {
    products: BrowserDatabase.getItem('cart') || {},
    totals: {}
};

const getProductId = ({ id, variants, configurableVariantIndex }) => (typeof configurableVariantIndex === 'number'
    ? variants[configurableVariantIndex].product.id
    : id);


const CartReducer = (state = initialState, action) => {
    let newState;
    let products;

    switch (action.type) {
    case ADD_PRODUCT_TO_CART:
        const { newProduct, quantity } = action;
        const id = getProductId(newProduct);

        products = (state.products[id])
            ? {
                ...state.products,
                [id]: {
                    ...state.products[id],
                    quantity: state.products[id].quantity + quantity
                }
            }
            : {
                ...state.products,
                [id]: {
                    ...newProduct,
                    quantity
                }
            };
        BrowserDatabase.setItem(products, 'cart');

        return {
            ...state,
            products
        };

    case REMOVE_PRODUCT_FROM_CART:
        const { product } = action;
        const deleteProperty = (key, { [key]: _, ...newObj }) => newObj; // it is requred since delete newState.propery will still mutate the original state and redux will not update props

        products = deleteProperty(getProductId(product), state.products);
        BrowserDatabase.setItem(products || {}, 'cart');

        return { ...state, products };

    case UPDATE_TOTALS:
        const { totals } = action;
        newState = {
            ...state,
            totals
        };

        return newState;

    default:
        return state;
    }
};

export default CartReducer;
