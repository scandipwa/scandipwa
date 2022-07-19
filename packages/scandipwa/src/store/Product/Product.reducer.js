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
import { getIndexedProduct } from 'Util/Product';

import { UPDATE_PRODUCT_DETAILS } from './Product.action';

/** @namespace Store/Product/Reducer/getInitialState */
export const getInitialState = () => ({
    product: {},
    formattedConfigurableOptions: {},
    showLengthError: false
});

/** @namespace Store/Product/Reducer/formatConfigurableOptions */
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

/** @namespace Store/Product/Reducer/ProductReducer */
export const ProductReducer = (
    state = getInitialState(),
    action
) => {
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
