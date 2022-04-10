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

import { Reducer } from 'redux';

import { LinkedProducts, LinkedProductsMap, LinkedProductType } from 'Type/ProductList.type';
import BrowserDatabase from 'Util/BrowserDatabase';

import { LINKED_PRODUCTS } from './LinkedProducts.dispatcher';
import { LinkedProductsActionType, LinkedProductsStore, UpdateLinkedProductsAction } from './LinkedProducts.type';

/** @namespace Store/LinkedProducts/Reducer/getInitialState */
export const getInitialState = (): LinkedProductsStore => ({
    linkedProducts: BrowserDatabase.getItem(LINKED_PRODUCTS) || {
        [LinkedProductType.UPSELL]: {} as LinkedProducts,
        [LinkedProductType.RELATED]: {} as LinkedProducts,
        [LinkedProductType.CROSS_SELL]: {} as LinkedProducts
    } as LinkedProductsMap
});

/** @namespace Store/LinkedProducts/Reducer/LinkedProductsReducer */
export const LinkedProductsReducer: Reducer<LinkedProductsStore, UpdateLinkedProductsAction> = (
    state = getInitialState(),
    action
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
            updateCrossSell = false
        }
    } = action;

    const {
        linkedProducts: {
            [LinkedProductType.CROSS_SELL]: prevCrossSell
        }
    } = state;

    if (updateCrossSell) {
        return {
            ...state,
            linkedProducts: {
                [LinkedProductType.UPSELL]: upsell,
                [LinkedProductType.RELATED]: related,
                [LinkedProductType.CROSS_SELL]: crosssell
            }
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
                    ...(crosssell?.items || [])
                })
            } as LinkedProducts
        }
    };
};

export default LinkedProductsReducer;
