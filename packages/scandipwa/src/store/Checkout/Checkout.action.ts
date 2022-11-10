/** * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import {
    CheckoutActionType,
    CheckoutStore,
    UpdateCheckoutStoreAction,
} from './Checkout.type';

/** @namespace Store/Checkout/Action/updateCheckoutStore */
export const updateCheckoutStore = (state: Partial<CheckoutStore>): UpdateCheckoutStoreAction => ({
    type: CheckoutActionType.UPDATE_CHECKOUT_STORE,
    state,
});
