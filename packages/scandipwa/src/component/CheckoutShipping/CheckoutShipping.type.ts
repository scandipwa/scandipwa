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

import { FormFields } from 'Component/Form/Form.type';
import { ShippingMethod } from 'Query/Checkout.type';
import { Customer } from 'Query/MyAccount.type';
import { Store } from 'Query/StoreInPickUp.type';
import { AddressInformation, CheckoutAddress } from 'Route/Checkout/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { GQLEstimateShippingCostsAddress } from 'Type/Graphql.type';
import { FieldData } from 'Util/Form/Form.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

export interface CheckoutShippingContainerMapStateProps {
    customer: Partial<Customer>;
    addressLinesQty: number;
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    savedShippingMethodCode: string;
}

export interface CheckoutShippingContainerMapDispatchProps {
    updateShippingFields: (fields: Record<string, string | boolean>) => void;
}

export interface CheckoutShippingContainerBaseProps {
    saveAddressInformation: (addressInformation: AddressInformation) => Promise<void>;
    shippingMethods: ShippingMethod[];
    estimateAddress?: GQLEstimateShippingCostsAddress;
    handleSelectDeliveryMethod: () => void;
    isLoading: boolean;
    isPickInStoreMethodSelected: boolean;
    isSubmitted: boolean;
    onShippingEstimationFieldsChange: (address: CheckoutAddress) => void;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    onStoreSelect: (address: Store) => void;
    selectedStoreAddress?: Store;
}

export type CheckoutShippingContainerProps = CheckoutShippingContainerMapStateProps
& CheckoutShippingContainerMapDispatchProps
& CheckoutShippingContainerBaseProps;

export interface CheckoutShippingContainerState {
    selectedCustomerAddressId: number;
    isSubmitted: boolean;
    selectedShippingMethod: ShippingMethod | undefined;
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
    onShippingEstimationFieldsChange: (address: CheckoutAddress) => void;
    shippingMethods: ShippingMethod[];
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    selectedShippingMethod: ShippingMethod | undefined;
    onAddressSelect: (id: number) => void;
    isLoading: boolean;
    isSubmitted: boolean;
    onStoreSelect: (address: Store) => void;
    estimateAddress?: GQLEstimateShippingCostsAddress;
    handleSelectDeliveryMethod: () => void;
    isPickInStoreMethodSelected: boolean;
}

export type CheckoutShippingContainerPropsKeys =
| 'cartTotalSubPrice'
| 'estimateAddress'
| 'handleSelectDeliveryMethod'
| 'isLoading'
| 'isPickInStoreMethodSelected'
| 'isSubmitted'
| 'shippingMethods'
| 'totals'
| 'selectedShippingMethod'
| 'onStoreSelect'
| 'onShippingEstimationFieldsChange';
