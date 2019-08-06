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
                variants: initialVariants = [],
                configurable_options: initialConfigurableOptions = [],
                attributes: initialAttributes = []
            }
        } = action;

        const reduceAttributes = attributes => attributes.reduce((acc, attribute) => {
            const { attribute_code, attribute_options = [] } = attribute;

            acc[attribute_code] = {
                ...attribute,
                attribute_options: attribute_options.reduce((acc, option) => (
                    { ...acc, [option.value]: option }
                ), {})
            };

            return acc;
        }, {});

        const attributes = reduceAttributes(initialAttributes);

        const reduceConfigurableOptions = configurable_options => (
            configurable_options.reduce((acc, option) => {
                const { values, attribute_code } = option;

                return {
                    ...acc,
                    [attribute_code]: {
                        ...attributes[attribute_code],
                        attribute_values: values.map(({ value_index }) => `${value_index}`)
                    }
                };
            }, {})
        );

        const reduceVariants = variants => variants.map(({ product }) => {
            const { attributes } = product;
            return {
                ...product,
                attributes: reduceAttributes(attributes)
            };
        });

        return {
            ...state,
            product: {
                ...product,
                configurable_options: reduceConfigurableOptions(initialConfigurableOptions),
                variants: reduceVariants(initialVariants),
                attributes
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
