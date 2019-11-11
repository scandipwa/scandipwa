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

export const UPDATE_RECENTLY_VIEWED_PRODUCTS = 'UPDATE_RECENTLY_VIEWED_PRODUCTS';

/**
 * Update RecentlyViewed products list (rewrite if already exists).
 * @param  {Array<String>} RecentlyViewedProducts List of products returned from fetch
 * @return {void}
 */
export const updateRecentlyViewedProducts = recentlyViewedProducts => ({
    type: UPDATE_RECENTLY_VIEWED_PRODUCTS,
    recentlyViewedProducts
});
