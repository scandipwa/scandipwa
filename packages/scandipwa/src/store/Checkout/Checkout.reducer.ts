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

import {
    CheckoutStore,
} from './Checkout.type';

/** @namespace Store/Checkout/Reducer/getInitialState */
export const getInitialState = (): CheckoutStore => ({
    shippingFields: {},
    email: '',
    isEmailAvailable: true,
    isDeliveryOptionsLoading: false,
    shippingMethods: [],
    paymentMethods: [],
    shippingAddress: {},
    selectedStoreAddress: undefined,
    selectedShippingMethod: undefined,
    isGuestEmailSaved: false,
    isCreateUser: false,
    estimateAddress: undefined,
    isVisibleEmailRequired: false,
    password: '',
    isPickInStoreMethodSelected: false,
    isCheckoutLoading: false,
});

/** @namespace Store/Checkout/Reducer/CheckoutReducer */
export const CheckoutReducer: Reducer<
CheckoutStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default CheckoutReducer;
