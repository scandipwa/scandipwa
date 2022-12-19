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

import { RecentlyViewedProductsActionType, RecentlyViewedProductsStore, UpdateRecentlyViewedProductsStoreAction } from './RecentlyViewedProducts.type';

/** @namespace Store/RecentlyViewedProducts/Action/updateRecentlyViewedProductsStore */
export const updateRecentlyViewedProductsStore = (
    state: Partial<RecentlyViewedProductsStore>,
): UpdateRecentlyViewedProductsStoreAction => ({
    type: RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS_STORE,
    state,
});
