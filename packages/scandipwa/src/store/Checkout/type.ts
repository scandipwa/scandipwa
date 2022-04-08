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
    UPDATE_EMAIL,
    UPDATE_EMAIL_AVAILABLE,
    UPDATE_SHIPPING_FIELDS
} from './Checkout.action';

export type CheckoutStore = {
    shippingFields: Record<string, unknown>;
    email: string;
    isEmailAvailable: boolean;
};

export type CheckoutAction = Action<
    typeof UPDATE_EMAIL
| typeof UPDATE_EMAIL_AVAILABLE
| typeof UPDATE_SHIPPING_FIELDS
>;

declare module 'Util/Store/type' {
    export interface RootState {
        CheckoutReducer: CheckoutStore;
    }
}
