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
import { getIndexedProduct } from 'Util/Product';

import { UPDATE_PRODUCT_DETAILS } from './Product.action';

export const initialState = {
    product: {},
    formattedConfigurableOptions: {}
};

export const formatConfigurableOptions = (configurable_options) => configurable_options
    .reduce((prev, option) => {
        const {
            attribute_id,
            label,
            attribute_code
        } = option;

        return {
            ...prev,
            [attribute_code]: {
                attribute_id,
                label
            }
        };
    }, {});

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:
        const { product } = action;

        return {
            ...state,
            product: getIndexedProduct(product)
        };

    default:
        return state;
    }
};

export default ProductReducer;
