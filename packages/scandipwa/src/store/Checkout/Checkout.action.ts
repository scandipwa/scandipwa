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
    UpdateEmailAction,
    UpdateEmailAvailableAction,
    UpdateShippingFieldsAction
} from './Checkout.type';

/** @namespace Store/Checkout/Action/updateShippingFields */
export const updateShippingFields = (shippingFields: Record<string, unknown>): UpdateShippingFieldsAction => ({
    type: CheckoutActionType.UPDATE_SHIPPING_FIELDS,
    shippingFields
});

/** @namespace Store/Checkout/Action/updateEmail */
export const updateEmail = (email: string): UpdateEmailAction => ({
    type: CheckoutActionType.UPDATE_EMAIL,
    email
});

/** @namespace Store/Checkout/Action/updateEmailAvailable */
export const updateEmailAvailable = (isEmailAvailable: boolean): UpdateEmailAvailableAction => ({
    type: CheckoutActionType.UPDATE_EMAIL_AVAILABLE,
    isEmailAvailable
});
