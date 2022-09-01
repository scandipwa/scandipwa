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
import { PaymentMethod, ShippingMethod, TotalsObject } from 'Query/Checkout.type';
import { CreateAccountOptions, Customer } from 'Query/MyAccount.type';
import { Country } from 'Query/Region.type';
import { Store } from 'Query/StoreInPickUp.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCountryCodeEnum, GQLEstimateShippingCostsAddress } from 'Type/Graphql.type';

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
    savedEmail: string;
    isSignedIn: boolean;
    isCartLoading: boolean;
    shippingFields: Record<string, unknown>;
    minimumOrderAmount?: MinimumOrderAmount;
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
    toggleBreadcrumbs: (state: boolean) => void;
    updateEmail: (email: string) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    updateShippingFields: (fields: Record<string, unknown>) => void;
    updateShippingPrice: (data: TotalsObject) => void;
    setPickUpStore: (store: Store | null) => void;
}

export interface CheckoutContainerFunctions {
    goBack: () => void;
    handleSelectDeliveryMethod: () => void;
    onCreateUserChange: () => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void ;
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    onStoreSelect: (address: StoreWithCountryId) => void;
    saveAddressInformation: (addressInformation: AddressInformation) => Promise<void>;
    savePaymentInformation: (paymentInformation: PaymentInformation) => Promise<void>;
    setDetailsStep: (orderID: string) => void;
    setLoading: (isLoading: boolean) => void;
    onChangeEmailRequired: () => void;
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
    email: string;
    estimateAddress?: GQLEstimateShippingCostsAddress;
    isCreateUser: boolean;
    isDeliveryOptionsLoading: boolean;
    isGuestEmailSaved: boolean;
    isLoading: boolean;
    isPickInStoreMethodSelected: boolean;
    orderID: string;
    paymentMethods: PaymentMethod[];
    paymentTotals: TotalsObject | undefined;
    requestsSent: number;
    selectedShippingMethod: string;
    password: string;
    shippingAddress: Partial<CheckoutAddress> | undefined;
    shippingMethods: ShippingMethod[];
    isVisibleEmailRequired: boolean;
}

export interface CheckoutComponentProps extends CheckoutContainerFunctions {
    billingAddress: CheckoutAddress | undefined;
    cartTotalSubPrice: number | null;
    checkoutStep: CheckoutSteps;
    checkoutTotals: CartTotals;
    email: string;
    estimateAddress: GQLEstimateShippingCostsAddress | undefined;
    isCreateUser: boolean;
    isDeliveryOptionsLoading: boolean;
    isEmailAvailable: boolean;
    isGuestEmailSaved: boolean;
    isInStoreActivated: boolean;
    isLoading: boolean;
    isCartLoading: boolean;
    isMobile: boolean;
    isPickInStoreMethodSelected: boolean;
    isSignedIn: boolean;
    orderID: string;
    paymentMethods: PaymentMethod[];
    paymentTotals: TotalsObject | undefined;
    selectedShippingMethod: string;
    selectedStoreAddress: StoreWithCountryId | undefined;
    setHeaderState: (stateName: NavigationState) => void;
    shippingAddress: Partial<CheckoutAddress> | undefined;
    shippingMethods: ShippingMethod[];
    totals: CartTotals;
    isVisibleEmailRequired: boolean;
}

export type CheckoutContainerPropsKeys =
| 'billingAddress'
| 'cartTotalSubPrice'
| 'checkoutStep'
| 'checkoutTotals'
| 'email'
| 'estimateAddress'
| 'isCreateUser'
| 'isDeliveryOptionsLoading'
| 'isEmailAvailable'
| 'isGuestEmailSaved'
| 'isInStoreActivated'
| 'isSignedIn'
| 'isLoading'
| 'isCartLoading'
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
| 'isPickInStoreMethodSelected'
| 'isVisibleEmailRequired';

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
