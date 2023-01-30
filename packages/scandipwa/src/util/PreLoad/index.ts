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

import CategoryPreload from './CategoryPreload';
import ProductPreload from './ProductPreload';

const { actionName: { type = '' } = {} } = window;

export const criticalChunkLoad = {
    CategoryChunk: {
        test: type === UrlRewritePageType.CATEGORY,
        importChunk: () => CategoryPreload.preloadProducts(),
    },
    CmsChunk: {
        test: type === UrlRewritePageType.CMS_PAGE,
        importChunk: () => {},
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
