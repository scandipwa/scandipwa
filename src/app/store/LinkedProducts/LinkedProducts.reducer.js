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
export const CROSS_SELL = 'crossSell';

const initialState = {
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        upsell: {},
        related: {},
        crossSell: {}
    }
};

const LinkedProductsReducer = (state = initialState, action) => {
    const {
        type,
        linkedProducts: {
            [UPSELL]: upsell,
            [RELATED]: related,
            [CROSS_SELL]: crossSell
        }
    } = action;

    if (type !== UPDATE_LINKED_PRODUCTS) {
        return state;
    }

    const {
        linkedProducts: {
            [UPSELL]: prevUpSell,
            [RELATED]: prevRelated,
            [CROSS_SELL]: prevCrossSell
        }
    } = state;

    return {
        linkedProducts: {
            [UPSELL]: {
                ...prevUpSell,
                ...upsell,
                items: Object.values({
                    ...prevUpSell.items,
                    ...upsell.items
                })
            },
            [RELATED]: {
                ...prevRelated,
                ...related,
                items: Object.values({
                    ...prevRelated.items,
                    ...related.items
                })
            },
            [CROSS_SELL]: {
                ...prevCrossSell,
                ...related,
                items: Object.values({
                    ...prevCrossSell.items,
                    ...crossSell.items
                })
            }
        }
    };
};

export default LinkedProductsReducer;
