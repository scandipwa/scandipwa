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

import {
    CartActionType,
    CartStore,
    UpdateCartStoreAction,
} from './Cart.type';

/** @namespace Store/Cart/Action/updateCartStore */
export const updateCartStore = (state: Partial<CartStore>): UpdateCartStoreAction => ({
    type: CartActionType.UPDATE_CART_STORE,
    state,
});
