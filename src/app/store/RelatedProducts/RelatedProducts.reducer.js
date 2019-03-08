/* eslint-disable no-param-reassign */

import {
    UPDATE_RELATED_PRODUCTS
} from './RelatedProducts.action';

const initialState = {
    relatedProducts: {}
};

const RelatedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_RELATED_PRODUCTS:
        const { relatedProducts: { products } } = action;

        return {
            ...state,
            relatedProducts: products
        };

    default:
        return state;
    }
};

export default RelatedProductsReducer;
