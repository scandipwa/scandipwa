/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { ComparableAttribute, ComparableItem, ComparableProduct } from 'Query/ProductCompare.type';

export enum ProductCompareActionType {
    UPDATE_PRODUCT_COMPARE_STORE = 'UPDATE_PRODUCT_COMPARE_STORE',
}

export interface UpdateProductCompareStoreAction extends AnyAction {
    type: ProductCompareActionType.UPDATE_PRODUCT_COMPARE_STORE;
    state: Partial<ProductCompareStore>;
}

export type ProductCompareAction = UpdateProductCompareStoreAction;

export interface ProductCompareStore {
    isLoading: boolean;
    count: number;
    attributes: ComparableAttribute[];
    products: ComparableProduct[];
    productIds: number[];
    items: ComparableItem[];
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductCompareReducer: ProductCompareStore;
    }
}
