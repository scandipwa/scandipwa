/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { History } from 'history';
import { match as Match } from 'react-router-dom';

import { ShippingMethod } from 'Query/Checkout.type';
import { CreateAccountOptions, Customer } from 'Query/MyAccount.type';
import { Country } from 'Query/Region.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { GQLEstimateShippingCostsAddress } from 'Type/Graphql.type';

import { CheckoutSteps } from './Checkout.config';

export interface CheckoutContainerMapStateProps {
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    customer: Partial<Customer>;
    guest_checkout: boolean;
    countries: Country[];
    isEmailAvailable: boolean;
    isMobile: boolean;
    isInStoreActivated: boolean;
    isGuestNotAllowDownloadable: boolean;
    savedEmail: string;
    isSignedIn: boolean;
}

export interface CheckoutContainerDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    resetCart: () => void;
    resetGuestCart: () => void;
    toggleBreadcrumbs: (state: boolean) => void;
    showErrorNotification: (message: string) => void;
    showInfoNotification: (message: string) => void;
    showSuccessNotification: (message: string) => void;
    setHeaderState: (stateName: NavigationState) => void;
    setNavigationState: (stateName: NavigationState) => void;
    createAccount: (options: CreateAccountOptions) => void;
    updateShippingFields: (fields: Record<string, unknown>) => void;
    updateEmail: (email: string) => void;
    checkEmailAvailability: (email: string) => void;
    updateShippingPrice: (data: never) => void;
}

export type CheckoutContainerProps =
    CheckoutContainerMapStateProps & CheckoutContainerDispatchProps & {
        history: History;
        match: Match;
    };

export interface CheckoutContainerState {
    isLoading: boolean;
    isDeliveryOptionsLoading: boolean;
    requestsSent: number;
    paymentMethods: never[];
    shippingMethods: ShippingMethod[];
    shippingAddress: Record<string, never>;
    billingAddress: Record<string, never>;
    selectedShippingMethod: string;
    checkoutStep: CheckoutSteps;
    orderID: string;
    paymentTotals: never;
    email: string;
    isGuestEmailSaved: boolean;
    isCreateUser: boolean;
    estimateAddress: GQLEstimateShippingCostsAddress;
    isPickInStoreMethodSelected: boolean;
}
