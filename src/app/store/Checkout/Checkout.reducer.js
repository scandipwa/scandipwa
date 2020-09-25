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
import {
    UPDATE_EMAIL,
    UPDATE_SHIPPING_FIELDS
} from './Checkout.action';

/** @namespace Store/Checkout/Reducer/getInitialState */
export const getInitialState = () => ({
    shippingFields: {},
    email: ''
});

/** @namespace Store/Checkout/Reducer/checkoutReducer */
export const CheckoutReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case UPDATE_SHIPPING_FIELDS:
        const { shippingFields } = action;

        return {
            ...state,
            shippingFields
        };

    case UPDATE_EMAIL:
        const { email } = action;
        return {
            ...state,
            email
        };

    default:
        return state;
    }
};

export default CheckoutReducer;
