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
import { Action } from 'redux';

import {
    ADD_PRODUCT_TO_CART,
    APPLY_COUPON_TO_CART,
    REMOVE_COUPON_FROM_CART,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_IS_LOADING_CART,
    UPDATE_SHIPPING_PRICE,
    UPDATE_TOTALS
} from './Cart.action';

export type CartStore = {
    isLoading: boolean;
    cartTotals: Record<string, unknown>;
};

export type CartAction = Action<
    typeof ADD_PRODUCT_TO_CART
| typeof REMOVE_PRODUCT_FROM_CART
| typeof UPDATE_TOTALS
| typeof APPLY_COUPON_TO_CART
| typeof REMOVE_COUPON_FROM_CART
| typeof UPDATE_SHIPPING_PRICE
| typeof UPDATE_IS_LOADING_CART
>;

declare module 'Util/Store/type' {
    export interface RootState {
        CartReducer: CartStore;
    }
}
