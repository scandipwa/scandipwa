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

import BrowserDatabase from 'Util/BrowserDatabase';
import { UPDATE_LINKED_PRODUCTS } from './LinkedProducts.action';
import { LINKED_PRODUCTS } from './LinkedProducts.dispatcher';

const initialState = {
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        upsell: {},
        related: {},
        crossSell: {}
    }
};

const LinkedProductsReducer = (state = initialState, action) => {
    const { type, linkedProducts = {} } = action;

    if (type === UPDATE_LINKED_PRODUCTS) {
        return {
            linkedProducts: {
                upsell: {
                    ...state.linkedProducts.upsell,
                    ...linkedProducts.upsell,
                    items: Object.values({ ...state.linkedProducts.upsell.items, ...linkedProducts.upsell.items })
                },
                related: {
                    ...state.linkedProducts.related,
                    ...linkedProducts.related,
                    items: Object.values({ ...state.linkedProducts.related.items, ...linkedProducts.related.items })
                },
                crossSell: {
                    ...state.linkedProducts.related,
                    ...linkedProducts.related,
                    items: Object.values({ ...state.linkedProducts.crossSell.items, ...linkedProducts.crossSell.items })
                }
            }
        };
    }

    return state;
};

export default LinkedProductsReducer;
