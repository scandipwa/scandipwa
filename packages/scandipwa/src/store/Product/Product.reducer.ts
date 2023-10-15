/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
*/

import { Reducer } from 'redux';

import { MediaType } from 'Component/ProductGallery/ProductGallery.config';
import { ProductItem } from 'Query/ProductList.type';
import { getIndexedProduct, preloadProductImage } from 'Util/Product';

import {
    ProductActionType,
    ProductStore,
    UpdateProductDetailsAction,
} from './Product.type';

/** @namespace Store/Product/Reducer/getInitialState */
export const getInitialState = (): ProductStore => ({
    product: {},
});

/** @namespace Store/Product/Reducer/ProductReducer */
export const ProductReducer: Reducer<ProductStore, UpdateProductDetailsAction> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case ProductActionType.UPDATE_PRODUCT_DETAILS: {
        const { product = {} } = action;

        if (window.isPrefetchValueUsed) {
            const { media_gallery_entries: mediaGallery = [] } = product as ProductItem;

            const image = mediaGallery.find((value) => value.types.includes(MediaType.IMAGE));

            if (image) {
                const { base: { url } } = image;

                preloadProductImage(url);
            }
        }

        return {
            ...state,
            product: getIndexedProduct(product),
        };
    }

    default:
        return state;
    }
};

export default ProductReducer;
