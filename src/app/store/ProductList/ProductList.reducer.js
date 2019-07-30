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
        items.forEach(({ attributes, variants }, i) => {
            attributes.forEach(({ attribute_code, attribute_value }) => {
                items[i][attribute_code] = attribute_value;
            });

            if (variants) {
                variants.forEach(({ product: { attributes } }, j) => {
                    if (attributes) {
                        attributes.forEach(({ attribute_code, attribute_value }) => {
                            items[i].variants[j].product[attribute_code] = attribute_value;
                        });
                    }
                });
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
