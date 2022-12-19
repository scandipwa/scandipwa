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

import { UpdateWishlistStoreAction, WishlistActionType, WishlistStore } from './Wishlist.type';

/** @namespace Store/Wishlist/Action/updateWishlistStore */
export const updateWishlistStore = (state: Partial<WishlistStore>): UpdateWishlistStoreAction => ({
    type: WishlistActionType.UPDATE_WISHLIST_STORE,
    state,
});
