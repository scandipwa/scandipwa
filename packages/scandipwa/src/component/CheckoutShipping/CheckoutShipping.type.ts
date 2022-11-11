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

import { FormFields } from 'Component/Form/Form.type';
import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { ShippingMethod } from 'Query/Checkout.type';
import { Customer } from 'Query/MyAccount.type';
import { AddressInformation, EstimateAddress } from 'Route/Checkout/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { CheckoutStore } from 'Store/Checkout/Checkout.type';
import { FieldData } from 'Util/Form/Form.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

export interface CheckoutShippingContainerMapStateProps {
    customer: Partial<Customer>;
    addressLinesQty: number;
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    savedShippingMethodCode: string;
    isDeliveryOptionsLoading: boolean;
    selectedStoreAddress?: StoreWithCountryId;
    selectedShippingMethod?: ShippingMethod;
    shippingMethods: ShippingMethod[];
}

export interface CheckoutShippingContainerMapDispatchProps {
    updateCheckoutStore: (state: Partial<CheckoutStore>) => void;
    onChangeEmailRequired: () => void;
}

export interface CheckoutShippingContainerFunctions {
    onShippingSuccess: (
        form: HTMLFormElement,
        fields: FieldData[]
    ) => void;
    onShippingError: (
        form: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput
    ) => void;
    onAddressSelect: (id: number) => void;
}

export interface CheckoutShippingContainerBaseProps {
    saveAddressInformation: (addressInformation: AddressInformation) => Promise<void>;
    shippingMethods: ShippingMethod[];
    isPickInStoreMethodSelected: boolean;
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    onStoreSelect: (address: StoreWithCountryId) => void;
}

export type CheckoutShippingContainerProps = CheckoutShippingContainerMapStateProps
& CheckoutShippingContainerMapDispatchProps
& CheckoutShippingContainerBaseProps;

export interface CheckoutShippingContainerState {
    selectedCustomerAddressId: number;
}

export interface CheckoutShippingComponentProps {
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    onShippingSuccess: (
        form: HTMLFormElement,
        fields: FieldData[]
    ) => void;
    onShippingError: (
        form: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput
    ) => void;
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    selectedShippingMethod: ShippingMethod | undefined;
    onAddressSelect: (id: number) => void;
    isDeliveryOptionsLoading: boolean;
    isPickInStoreMethodSelected: boolean;
}

export type CheckoutShippingContainerPropsKeys =
| 'cartTotalSubPrice'
| 'isDeliveryOptionsLoading'
| 'isPickInStoreMethodSelected'
| 'totals'
| 'selectedShippingMethod'
| 'onShippingEstimationFieldsChange';
