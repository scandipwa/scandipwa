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

import { ProductItem, ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum ProductActionType {
    UPDATE_PRODUCT_DETAILS = 'UPDATE_PRODUCT_DETAILS',
    UPDATE_ACTIVE_PRODUCT_TAB = 'UPDATE_ACTIVE_PRODUCT_TAB',
}

export interface UpdateProductDetailsAction extends AnyAction {
    type: ProductActionType;
    product?: ProductItem;
    activeTab?: string;
}

export interface ProductStore {
    product: Partial<IndexedProduct>;
    activeTab: string;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductReducer: ProductStore;
    }
}

export interface ProductDispatcherData {
    products: ProductsQueryOutput;
}
