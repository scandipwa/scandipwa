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

import { Product, ProductBundle } from 'Type/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product';

export enum ProductActionType {
    UPDATE_PRODUCT_DETAILS = 'UPDATE_PRODUCT_DETAILS'
}

export interface UpdateProductDetailsAction extends AnyAction {
    type: ProductActionType.UPDATE_PRODUCT_DETAILS;
    product: Product | ProductBundle;
}

export type ProductStore = {
    product: IndexedProduct;
};
