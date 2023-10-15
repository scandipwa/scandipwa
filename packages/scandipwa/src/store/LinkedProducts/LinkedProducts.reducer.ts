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

import { Reducer } from 'redux';

import BrowserDatabase from 'Util/BrowserDatabase';

import {
    LinkedProducts,
    LinkedProductsActionType,
    LinkedProductsStore,
    LinkedProductType,
    UpdateLinkedProductsAction,
} from './LinkedProducts.type';

export const LINKED_PRODUCTS = 'LINKED_PRODUCTS';

/** @namespace Store/LinkedProducts/Reducer/getInitialState */
export const getInitialState = (): LinkedProductsStore => ({
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        [LinkedProductType.UPSELL]: {},
        [LinkedProductType.RELATED]: {},
        [LinkedProductType.CROSS_SELL]: {},
    },
});

/** @namespace Store/LinkedProducts/Reducer/LinkedProductsReducer */
export const LinkedProductsReducer: Reducer<LinkedProductsStore, UpdateLinkedProductsAction> = (
    state = getInitialState(),
    action,
) => {
    const { type } = action;

    if (type !== LinkedProductsActionType.UPDATE_LINKED_PRODUCTS) {
        return state;
    }

    const {
        linkedProducts: {
            [LinkedProductType.UPSELL]: upsell,
            [LinkedProductType.RELATED]: related,
            [LinkedProductType.CROSS_SELL]: crosssell,
            updateCrossSell = false,
        } = {},
    } = action;

    const {
        linkedProducts: {
            [LinkedProductType.CROSS_SELL]: prevCrossSell,
        },
    } = state;

    if (updateCrossSell) {
        return {
            ...state,
            linkedProducts: {
                [LinkedProductType.UPSELL]: upsell,
                [LinkedProductType.RELATED]: related,
                [LinkedProductType.CROSS_SELL]: crosssell,
            },
        };
    }

    return {
        ...state,
        linkedProducts: {
            [LinkedProductType.UPSELL]: upsell,
            [LinkedProductType.RELATED]: related,
            [LinkedProductType.CROSS_SELL]: {
                ...prevCrossSell,
                ...related,
                items: Object.values({
                    ...(prevCrossSell?.items || []),
                    ...(crosssell?.items || []),
                }),
            } as LinkedProducts,
        },
    };
};

export default LinkedProductsReducer;
