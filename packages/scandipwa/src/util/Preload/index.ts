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

import { UrlRewritePageType } from 'Route/UrlRewrites/UrlRewrites.config';
import ConfigDispatcher from 'Store/Config/Config.dispatcher';
import ProductReducer from 'Store/Product/Product.reducer';
import ProductListReducer from 'Store/ProductList/ProductList.reducer';
import getStore, { injectReducers } from 'Util/Store';

import CategoryPreload from './CategoryPreload';
import ProductPreload from './ProductPreload';

ConfigDispatcher.handleData(getStore().dispatch, undefined);

injectReducers(getStore(), {
    ProductReducer,
    ProductListReducer,
});

const { actionName: { type = '' } = {} } = window;

export const criticalChunkLoad = {
    CategoryChunk: {
        test: type === UrlRewritePageType.CATEGORY,
        importChunk: () => CategoryPreload.preloadProducts(),
    },
    CmsChunk: {
        test: type === UrlRewritePageType.CMS_PAGE,
        importChunk: () => {
            const {
                actionName: {
                    cmsPage: {
                        content = '',
                    } = {},
                } = {},
            } = window;

            if (!content.trim().length) {
                window.isPriorityLoaded = true;
            }
        },
    },
    ProductChunk: {
        test: type === UrlRewritePageType.PRODUCT,
        importChunk: () => ProductPreload.preloadProduct(),
    },
};

export const importBooster = Object.values(criticalChunkLoad).find(({ test }) => test);

if (!importBooster) {
    window.isPriorityLoaded = true;
} else {
    window.isPriorityLoaded = false;
    window.isPrefetchValueUsed = true;
    importBooster.importChunk();
}
