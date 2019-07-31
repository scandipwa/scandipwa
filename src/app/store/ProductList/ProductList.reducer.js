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
    APPEND_PAGE,
    UPDATE_PRODUCT_LIST_ITEMS,
    UPDATE_LOAD_STATUS
} from 'Store/ProductList';
import { getVariantsWithParams } from 'Util/Product';

const initialState = {
    pages: {},
    isLoading: true
};

const ProductListReducer = (state = initialState, action) => {
    const {
        type,
        items,
        currentPage,
        isLoading
    } = action;

    if (items) {
        items.forEach((item, i) => {
            const { variants, configurable_options, type_id } = item;

            if (type_id !== 'configurable') return;
            const requiredParams = configurable_options.map(({ attribute_code }) => attribute_code);

            if (variants) {
                items[i].variants = getVariantsWithParams(variants, requiredParams);
            }
        });
    }

    switch (type) {
    case APPEND_PAGE:
        return {
            ...state,
            pages: {
                ...state.pages,
                [currentPage]: items
            }
        };

    case UPDATE_PRODUCT_LIST_ITEMS:
        return {
            ...state,
            isLoading: false,
            pages: {
                [currentPage]: items
            }
        };

    case UPDATE_LOAD_STATUS:
        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default ProductListReducer;
