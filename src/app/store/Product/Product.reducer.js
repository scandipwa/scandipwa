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
    UPDATE_PRODUCT_DETAILS,
    UPDATE_GROUPED_PRODUCT_QUANTITY,
    CLEAR_GROUPED_PRODUCT_QUANTITY
} from './Product.action';

const initialState = {
    product: {},
    groupedProductQuantity: {}
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:

        const { product, product: { variants, configurable_options } } = action;

        // adds size, color, material(null), brand(null) to all variants
        // if (variants) {
        //     variants.forEach(({ product: { attributes } }, i) => {
        //         if (attributes) {
        //             attributes.forEach(({ attribute_code, attribute_value }) => {
        //                 // get rid of this
        //                 product.variants[i].product.parametres[attribute_code] = attribute_value;
        //                 // console.log(attribute_code, attribute_value)
        //             });
        //         }
        //     });
        // }

        const necessaryOptions = configurable_options.map(({ attribute_code }) => attribute_code);

        if (variants) {
            variants.forEach(({ product: { attributes } }) => {
                const params = attributes.reduce((accum, { attribute_code, attribute_value }) => {
                    if (!necessaryOptions.includes(attribute_code)) return accum;

                    return {
                        ...accum,
                        [attribute_code]: attribute_value
                    };
                }, {});
                Object.assign(product, { parametres: params });
            });
        }

        console.log('prod_red_update', { ...state, product });
        return {
            ...state,
            product
        };

    case UPDATE_GROUPED_PRODUCT_QUANTITY:
        const newQuantity = {};
        const { product: { id }, quantity } = action;

        newQuantity[id] = quantity;

        return {
            ...state,
            groupedProductQuantity: {
                ...state.groupedProductQuantity,
                ...newQuantity
            }
        };

    case CLEAR_GROUPED_PRODUCT_QUANTITY:
        return {
            ...state,
            groupedProductQuantity: {}
        };

    default:
        return state;
    }
};

export default ProductReducer;
