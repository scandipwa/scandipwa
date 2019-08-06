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

import { getVariantsWithParams, getBrand } from 'Util/Product';
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
        const {
            product,
            product: {
                variants: initialVariants,
                configurable_options,
                attributes,
                type_id
            }
        } = action;

        // TODO: fix brand
        const brand = getBrand(attributes);

        const parameters = !initialVariants
            ? attributes.reduce(
                (acc, { attribute_code, attribute_value }) => ({ ...acc, [attribute_code]: attribute_value }),
                {}
            ) : undefined;

            // attributes.reduce((acc, { attribute_code, attribute_value }) => (
            //     { ...acc, [attribute_code]: attribute_value }
            // ), {});

        const variants = type_id === 'configurable' && initialVariants
            ? getVariantsWithParams(initialVariants, configurable_options)
            : undefined;

        return {
            ...state,
            product: {
                ...product,
                brand,
                parameters,
                variants
            }
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
