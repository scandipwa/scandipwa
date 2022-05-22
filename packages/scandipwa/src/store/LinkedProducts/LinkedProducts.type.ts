/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum LinkedProductType {
    UPSELL = 'upsell',
    RELATED = 'related',
    CROSS_SELL = 'crosssell',
    ASSOCIATED = 'associated'
}

export type LinkedProducts = {
    items: IndexedProduct[];
    total_count: number;
};

export type LinkedProductsMap = Partial<Record<LinkedProductType, Partial<LinkedProducts>>>;

export enum LinkedProductsActionType {
    UPDATE_LINKED_PRODUCTS = 'UPDATE_LINKED_PRODUCTS'
}

export interface UpdateLinkedProductsAction extends AnyAction {
    type: LinkedProductsActionType.UPDATE_LINKED_PRODUCTS;
    linkedProducts?: LinkedProductsMap & {
        updateCrossSell?: boolean;
    };
}

export type LinkedProductsStore = {
    linkedProducts: LinkedProductsMap;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        LinkedProductsReducer: LinkedProductsStore;
    }
}

export type LinkedProductsDispatcherData = {
    products: ProductsQueryOutput;
};
