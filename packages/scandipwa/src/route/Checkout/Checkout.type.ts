/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { match as Match } from 'react-router-dom';

import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { MinimumOrderAmount } from 'Query/Cart.type';
import {
    PaymentMethod, SetGuestEmailOnCartOutput, ShippingMethod, TotalsObject,
} from 'Query/Checkout.type';
import { CreateAccountOptions, Customer } from 'Query/MyAccount.type';
import { Country } from 'Query/Region.type';
import { Store } from 'Query/StoreInPickUp.type';
import { BreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { CheckoutAddress, CheckoutStore } from 'Store/Checkout/Checkout.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NetworkError, ReactElement } from 'Type/Common.type';

import { CheckoutSteps } from './Checkout.config';

export interface CheckoutContainerMapStateProps {
    selectedStore: Store | null;
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    customer: Partial<Customer>;
    guest_checkout: boolean;
    countries: Country[];
    isEmailAvailable: boolean;
    isMobile: boolean;
    isInStoreActivated: boolean;
    isGuestNotAllowDownloadable: boolean;
    email: string;
    isSignedIn: boolean;
    isCartLoading: boolean;
    shippingFields: Record<string, unknown>;
    minimumOrderAmount: MinimumOrderAmount | undefined;
    shippingMethods: ShippingMethod[];
    shippingAddress: Partial<CheckoutAddress>;
    isCreateUser: boolean;
    isVisibleEmailRequired: boolean;
    password: string;
    isPickInStoreMethodSelected: boolean;
    isCheckoutLoading: boolean;
}

export interface CheckoutContainerDispatchProps {
    checkEmailAvailability: (email: string) => void;
    createAccount: (options: CreateAccountOptions) => Promise<boolean | 'confirmation_required'>;
    resetCart: () => void;
    resetGuestCart: () => void;
    setHeaderState: (stateName: NavigationState) => void;
    setNavigationState: (stateName: NavigationState) => void;
    showErrorNotification: (message: string) => void;
    showInfoNotification: (message: string) => void;
    showSuccessNotification: (message: string) => void;
    updateBreadcrumbsStore: (state: Partial<BreadcrumbsStore>) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    updateShippingPrice: (data: TotalsObject) => void;
    setPickUpStore: (store: Store | null) => void;
    updateCheckoutStore: (state: Partial<CheckoutStore>) => void;
    setShippingAddress: (isDefaultShipping: boolean) => Promise<void>;
    saveBillingAddress: (paymentInformation: PaymentInformation) => Promise<void>;
    getPaymentMethods: () => Promise<void>;
    saveGuestEmail: (email: string) => Promise<SetGuestEmailOnCartOutput | boolean | void>;
    handleCheckoutError: (error: NetworkError) => void;
    onChangeEmailRequired: () => void;
}

export interface CheckoutContainerFunctions {
    goBack: () => void;
    handleSelectDeliveryMethod: () => void;
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    saveAddressInformation: (addressInformation: AddressInformation) => Promise<void>;
    savePaymentInformation: (paymentInformation: PaymentInformation) => Promise<void>;
    setDetailsStep: (orderID: string) => void;
}

export interface CheckoutContainerBaseProps {
    match: Match<{ step?: string }>;
}

export type CheckoutContainerProps = CheckoutContainerMapStateProps
& CheckoutContainerDispatchProps
& CheckoutContainerBaseProps;

export interface CheckoutContainerState {
    billingAddress: CheckoutAddress | undefined;
    checkoutStep: CheckoutSteps;
    orderID: string;
    paymentTotals: TotalsObject | undefined;
    requestsSent: number;
}

export interface CheckoutComponentProps extends CheckoutContainerFunctions {
    billingAddress?: CheckoutAddress;
    cartTotalSubPrice: number | null;
    checkoutStep: CheckoutSteps;
    checkoutTotals: CartTotals;
    email: string;
    isEmailAvailable: boolean;
    isInStoreActivated: boolean;
    isCheckoutLoading: boolean;
    isCartLoading: boolean;
    isMobile: boolean;
    isPickInStoreMethodSelected: boolean;
    isSignedIn: boolean;
    orderID: string;
    setHeaderState: (stateName: NavigationState) => void;
    shippingMethods: ShippingMethod[];
    totals: CartTotals;
}

export type CheckoutContainerPropsKeys =
| 'billingAddress'
| 'cartTotalSubPrice'
| 'checkoutStep'
| 'checkoutTotals'
| 'email'
| 'isEmailAvailable'
| 'isInStoreActivated'
| 'isSignedIn'
| 'isCheckoutLoading'
| 'isCartLoading'
| 'isMobile'
| 'orderID'
| 'setHeaderState'
| 'shippingMethods'
| 'totals'
| 'isPickInStoreMethodSelected';

export interface AddressInformation {
    billing_address: CheckoutAddress | Partial<StoreWithCountryId>;
    shipping_address: CheckoutAddress | Partial<StoreWithCountryId>;
    shipping_carrier_code: string;
    shipping_method_code: string;
}

export interface EstimateAddress {
    city?: string;
    country_id?: string;
    customer_id?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    region?: string;
    region_code?: string;
    region_id?: number;
    same_as_billing?: number;
    street?: Array<string | null>;
    telephone?: string;
}

export interface PaymentInformation {
    billing_address: CheckoutAddress;
    paymentMethod: PaymentMethod;
    same_as_shipping: boolean;
}

export interface CheckoutMapStep {
    number?: number;
    title: string;
    url: string;
    render: () => ReactElement;
    areTotalsVisible: boolean;
    mobileTitle?: string;
}
