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
import { RouteComponentProps } from 'react-router-dom';

import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { PaymentMethod, ShippingMethod, TotalsObject } from 'Query/Checkout.type';
import { CreateAccountOptions, Customer } from 'Query/MyAccount.type';
import { Country } from 'Query/Region.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCountryCodeEnum, GQLEstimateShippingCostsAddress } from 'Type/Graphql.type';

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
    createAccount: (options: CreateAccountOptions) => Promise<boolean | 'confirmation_required'>;
    updateShippingFields: (fields: Record<string, unknown>) => void;
    updateEmail: (email: string) => void;
    checkEmailAvailability: (email: string) => void;
    updateShippingPrice: (data: TotalsObject) => void;
}

export type CheckoutContainerProps = RouteComponentProps<{ step: string }>
& CheckoutContainerMapStateProps
& CheckoutContainerDispatchProps;
export interface CheckoutContainerState {
    isLoading: boolean;
    isDeliveryOptionsLoading: boolean;
    requestsSent: number;
    paymentMethods: PaymentMethod[];
    shippingMethods: ShippingMethod[];
    shippingAddress: Partial<CheckoutAddress> | undefined;
    billingAddress: CheckoutAddress | undefined;
    selectedShippingMethod: string;
    checkoutStep: CheckoutSteps;
    orderID: string;
    paymentTotals: TotalsObject | undefined;
    email: string;
    isGuestEmailSaved: boolean;
    isCreateUser: boolean;
    estimateAddress?: GQLEstimateShippingCostsAddress;
    isPickInStoreMethodSelected: boolean;
    selectedStoreAddress: StoreWithCountryId | undefined;
    password: string;
}

export interface CheckoutComponentProps {
    setLoading: (isLoading: boolean) => void;
    setDetailsStep: (orderID: string) => void;
    shippingMethods: ShippingMethod[];
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    setHeaderState: (stateName: NavigationState) => void;
    paymentMethods: PaymentMethod[];
    saveAddressInformation: (addressInformation: AddressInformation) => Promise<void>;
    savePaymentInformation: (paymentInformation: PaymentInformation) => Promise<void>;
    isLoading: boolean;
    isDeliveryOptionsLoading: boolean;
    shippingAddress: Partial<CheckoutAddress> | undefined;
    billingAddress: CheckoutAddress | undefined;
    estimateAddress: GQLEstimateShippingCostsAddress | undefined;
    checkoutTotals: CartTotals;
    orderID: string;
    email: string;
    isEmailAvailable: boolean;
    selectedShippingMethod: string;
    history: History;
    onEmailChange: (email: string) => void;
    paymentTotals: TotalsObject | undefined;
    checkoutStep: CheckoutSteps;
    isCreateUser: boolean;
    onCreateUserChange: () => void;
    onPasswordChange: (password: string) => void ;
    isGuestEmailSaved: boolean;
    goBack: () => void;
    totals: CartTotals;
    isMobile: boolean;
    isPickInStoreMethodSelected: boolean;
    handleSelectDeliveryMethod: () => void;
    isInStoreActivated: boolean;
    cartTotalSubPrice: number | null;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    onStoreSelect: (address: StoreWithCountryId) => void;
    selectedStoreAddress: StoreWithCountryId | undefined;
    isSignedIn: boolean;
}

export type CheckoutContainerPropsKeys =
| 'billingAddress'
| 'cartTotalSubPrice'
| 'checkoutStep'
| 'checkoutTotals'
| 'email'
| 'estimateAddress'
| 'history'
| 'isCreateUser'
| 'isDeliveryOptionsLoading'
| 'isEmailAvailable'
| 'isGuestEmailSaved'
| 'isInStoreActivated'
| 'isSignedIn'
| 'isLoading'
| 'isMobile'
| 'orderID'
| 'paymentMethods'
| 'paymentTotals'
| 'selectedShippingMethod'
| 'setHeaderState'
| 'shippingAddress'
| 'shippingMethods'
| 'totals'
| 'selectedStoreAddress'
| 'isPickInStoreMethodSelected';

export interface AddressInformation {
    billing_address: CheckoutAddress | Partial<StoreWithCountryId>;
    shipping_address: CheckoutAddress | Partial<StoreWithCountryId>;
    shipping_carrier_code: string;
    shipping_method_code: string;
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
