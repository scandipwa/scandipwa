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

import CategoryPrefetch from './Category';
import ProductPrefetch from './Product';

const { actionName: { type = '' } = {} } = window;

export const criticalChunkLoad = {
    CategoryChunk: {
        test: type === UrlRewritePageType.CATEGORY,
        importChunk: () => {
            import(/* webpackChunkName: "category", webpackMode: "lazy" */ 'Route/CategoryPage');
            CategoryPrefetch.preloadProducts();
        },
    },
    CmsChunk: {
        // Request CMS chunk also on homepage visit
        test: type === UrlRewritePageType.CMS_PAGE || location.pathname === '/',
        importChunk: () => import(/* webpackChunkName: "cms", webpackMode: "lazy" */ 'Route/CmsPage'),
    },
    ProductChunk: {
        test: type === UrlRewritePageType.PRODUCT,
        importChunk: () => {
            import(/* webpackChunkName: "product", webpackMode: "lazy" */ 'Route/ProductPage');
            ProductPrefetch.preloadProduct();
        },
    },
};

export const importBooster = Object.values(criticalChunkLoad).find(({ test }) => test);

if (!importBooster) {
    window.isPriorityLoaded = true;
} else {
    window.isPriorityLoaded = false;
    importBooster.importChunk();
}
