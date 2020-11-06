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
 * Update RecentlyViewed products list.
 * @param  {Array<String>} recentlyViewedProducts List of products returned from fetch
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/updateRecentlyViewedProducts
 */
export const updateRecentlyViewedProducts = (recentlyViewedProducts) => ({
    type: UPDATE_RECENTLY_VIEWED_PRODUCTS,
    recentlyViewedProducts
});
