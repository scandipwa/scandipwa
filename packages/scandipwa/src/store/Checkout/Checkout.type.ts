/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { AnyAction } from 'redux';

export enum CheckoutActionType {
    UPDATE_SHIPPING_FIELDS = 'UPDATE_SHIPPING_FIELDS',
    UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS',
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    UPDATE_EMAIL_AVAILABLE = 'UPDATE_EMAIL_AVAILABLE',
}

export interface UpdateShippingFieldsAction extends AnyAction {
    type: CheckoutActionType.UPDATE_SHIPPING_FIELDS;
    shippingFields: Record<string, unknown>;
}

export interface UpdateShippingAddressAction extends AnyAction {
    type: CheckoutActionType.UPDATE_SHIPPING_ADDRESS;
    shippingAddress: Record<string, unknown>;
}
export interface UpdateEmailAction extends AnyAction {
    type: CheckoutActionType.UPDATE_EMAIL;
    email: string;
}
export interface UpdateEmailAvailableAction extends AnyAction {
    type: CheckoutActionType.UPDATE_EMAIL_AVAILABLE;
    isEmailAvailable: boolean;
}

export type CheckoutAction = UpdateShippingFieldsAction
| UpdateShippingAddressAction
| UpdateEmailAction
| UpdateEmailAvailableAction;

export interface CheckoutStore {
    shippingFields: Record<string, unknown>;
    shippingAddress: Record<string, unknown>;
    email: string;
    isEmailAvailable: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CheckoutReducer: CheckoutStore;
    }
}

export interface CheckoutDispatcherData {
    isEmailAvailable: {
        is_email_available: boolean;
    };
}
