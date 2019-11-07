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

/* eslint-disable no-param-reassign */

import {
    UPDATE_LINKED_PRODUCTS
} from './LinkedProducts.action';

const initialState = {
    linkedProducts: {
        upsell: {},
        related: {},
        crossSell: {}
    }
};

const LinkedProductsReducer = (state = initialState, action) => {
    if (action.type === UPDATE_LINKED_PRODUCTS) {
        const { linkedProducts } = action;
        Object.values(linkedProducts).forEach((item) => {
            if (item && item.items) {
                item.items.forEach(({ attributes }, i) => {
                    attributes.forEach(({ attribute_code, attribute_value }) => {
                        item.items[i][attribute_code] = attribute_value;
                    });
                });
            }
        });

        return {
            ...state,
            linkedProducts
        };
    }

    return state;
};

export default LinkedProductsReducer;
