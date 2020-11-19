/** * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
export const UPDATE_SHIPPING_FIELDS = 'UPDATE_SHIPPING_FIELDS';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_EMAIL_AVAILABLE = 'UPDATE_EMAIL_AVAILABLE';

/** @namespace Store/Checkout/Action/updateShippingFields */
export const updateShippingFields = (shippingFields) => ({
    type: UPDATE_SHIPPING_FIELDS,
    shippingFields
});

/** @namespace Store/Checkout/Action/updateEmail */
export const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    email
});

/** @namespace Store/Checkout/Action/updateEmailAvailable */
export const updateEmailAvailable = (isEmailAvailable) => ({
    type: UPDATE_EMAIL_AVAILABLE,
    isEmailAvailable
});
