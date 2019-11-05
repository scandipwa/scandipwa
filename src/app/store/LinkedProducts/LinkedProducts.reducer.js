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

import { getIndexedProducts } from 'Util/Product';
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
                item.items = getIndexedProducts(item.items);
            }
        });

        return {
            linkedProducts: {
                upsell: { ...state.linkedProducts.upsell, ...linkedProducts.upsell },
                related: { ...state.linkedProducts.related, ...linkedProducts.related },
                crossSell: { ...state.linkedProducts.crossSell, ...linkedProducts.crossSell }
            }
        };
    }

    return state;
};

export default LinkedProductsReducer;
