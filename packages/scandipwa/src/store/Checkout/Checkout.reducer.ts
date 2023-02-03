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

import { Reducer } from 'redux';

import BrowserDatabase from 'Util/BrowserDatabase';

import {
    CheckoutAction,
    CheckoutActionType,
    CheckoutStore,
} from './Checkout.type';

export const SHIPPING_FIELDS = 'shipping_fields';
export const SHIPPING_ADDRESS = 'shippingAddress';

/** @namespace Store/Checkout/Reducer/getInitialState */
export const getInitialState = (): CheckoutStore => ({
    shippingFields: BrowserDatabase.getItem(SHIPPING_FIELDS) || {},
    shippingAddress: BrowserDatabase.getItem(SHIPPING_ADDRESS) || {},
    email: '',
    isEmailAvailable: true,
});

/** @namespace Store/Checkout/Reducer/CheckoutReducer */
export const CheckoutReducer: Reducer<
CheckoutStore,
CheckoutAction
> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case CheckoutActionType.UPDATE_SHIPPING_FIELDS:
        const { shippingFields } = action;

        BrowserDatabase.setItem(
            shippingFields,
            SHIPPING_FIELDS,
        );

        return {
            ...state,
            shippingFields,
        };

    case CheckoutActionType.UPDATE_SHIPPING_ADDRESS:
        const { shippingAddress } = action;

        BrowserDatabase.setItem(
            shippingAddress,
            SHIPPING_ADDRESS,
        );

        return {
            ...state,
            shippingAddress,
        };

    case CheckoutActionType.UPDATE_EMAIL:
        const { email } = action;

        return {
            ...state,
            email,
        };

    case CheckoutActionType.UPDATE_EMAIL_AVAILABLE:
        const { isEmailAvailable } = action;

        return {
            ...state,
            isEmailAvailable,
        };

    default:
        return state;
    }
};

export default CheckoutReducer;
