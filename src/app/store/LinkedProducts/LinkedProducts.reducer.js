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

export const UPSELL = 'upsell';
export const RELATED = 'related';
export const CROSS_SELL = 'crosssell';

const initialState = {
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        upsell: {},
        related: {},
        crosssell: {}
    }
};

const LinkedProductsReducer = (state = initialState, action) => {
    const { type } = action;

    if (type !== UPDATE_LINKED_PRODUCTS) {
        return state;
    }

    const {
        linkedProducts: {
            [UPSELL]: upsell,
            [RELATED]: related,
            [CROSS_SELL]: crosssell,
            updateCrosssel = false
        }
    } = action;

    const {
        linkedProducts: {
            [CROSS_SELL]: prevCrossSell
        }
    } = state;

    if (updateCrosssel) {
        return {
            ...state,
            linkedProducts: {
                [UPSELL]: upsell,
                [RELATED]: related,
                [CROSS_SELL]: crosssell
            }
        };
    }

    return {
        ...state,
        linkedProducts: {
            [UPSELL]: upsell,
            [RELATED]: related,
            [CROSS_SELL]: {
                ...prevCrossSell,
                ...related,
                items: Object.values({
                    ...prevCrossSell.items,
                    ...crosssell.items
                })
            }
        }
    };
};

export default LinkedProductsReducer;
