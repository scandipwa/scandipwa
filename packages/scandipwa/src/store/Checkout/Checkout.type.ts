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

import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { PaymentMethod, ShippingMethod } from 'Query/Checkout.type';
import { GQLCountryCodeEnum, GQLEstimateShippingCostsAddress } from 'Type/Graphql.type';

export enum CheckoutActionType {
    UPDATE_CHECKOUT_STORE = 'UPDATE_CHECKOUT_STORE',
}

export interface UpdateCheckoutStoreAction extends AnyAction {
    type: CheckoutActionType.UPDATE_CHECKOUT_STORE;
    state: Partial<CheckoutStore>;
}

export interface CheckoutStore {
    shippingFields: Record<string, unknown>;
    email: string;
    isEmailAvailable: boolean;
    isDeliveryOptionsLoading: boolean;
    shippingMethods: ShippingMethod[];
    paymentMethods: PaymentMethod[];
    shippingAddress: Partial<CheckoutAddress>;
    selectedStoreAddress?: StoreWithCountryId;
    selectedShippingMethod?: ShippingMethod;
    isGuestEmailSaved: boolean;
    isCreateUser: boolean;
    estimateAddress?: GQLEstimateShippingCostsAddress;
    isVisibleEmailRequired: boolean;
    password: string;
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

export interface CheckoutAddress {
    city: string;
    company?: string;
    country_id: GQLCountryCodeEnum;
    email?: string;
    extension_attributes?: {
        attribute_code: string;
        value: string;
    }[];
    firstname: string;
    lastname: string;
    method?: string;
    postcode: string;
    region?: string;
    region_code?: string;
    region_id?: number;
    street?: Array<string | null>;
    telephone: string;
    vat_id?: string;
    guest_email?: string;
    save_in_address_book?: boolean;
    purchaseOrderNumber?: string;
    id?: number;
    region_string?: string;
}
