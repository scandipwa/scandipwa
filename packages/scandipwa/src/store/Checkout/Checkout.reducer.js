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
    UPDATE_EMAIL_AVAILABLE,
    UPDATE_SHIPPING_FIELDS,
    UPDATE_SHIPPING_FIELDS_ID
} from './Checkout.action';

/** @namespace Store/Checkout/Reducer/getInitialState */
export const getInitialState = () => ({
    shippingFields: {},
    email: '',
    isEmailAvailable: true
});

/** @namespace Store/Checkout/Reducer/CheckoutReducer */
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

    case UPDATE_EMAIL_AVAILABLE:
        const { isEmailAvailable } = action;

        return {
            ...state,
            isEmailAvailable
        };

    case UPDATE_SHIPPING_FIELDS_ID:
        const { shippingFields: stateShippingFields } = state;
        const { id } = action;

        return {
            ...state,
            shippingFields: {
                ...stateShippingFields,
                id
            }
        };

    default:
        return state;
    }
};

export default CheckoutReducer;
