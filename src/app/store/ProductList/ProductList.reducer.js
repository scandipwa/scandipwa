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
        items.forEach((product) => {
            const { variants, configurable_options } = product;
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
        });
    }
    console.log(items);

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
