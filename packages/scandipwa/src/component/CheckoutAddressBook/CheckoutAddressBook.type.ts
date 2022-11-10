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

import { Customer, CustomerAddress } from 'Query/MyAccount.type';
import { EstimateAddress } from 'Route/Checkout/Checkout.type';

export interface CheckoutAddressBookContainerMapStateProps {
    customer: Partial<Customer>;
}

export interface CheckoutAddressBookContainerMapDispatchProps {
    requestCustomerData: () => void;
}

export interface CheckoutAddressBookContainerBaseProps {
    onShippingEstimationFieldsChange: (address: EstimateAddress) => void;
    onAddressSelect: (id: number) => void;
    isBilling: boolean;
    is_virtual: boolean;
}

export type CheckoutAddressBookContainerProps = CheckoutAddressBookContainerMapStateProps
& CheckoutAddressBookContainerMapDispatchProps
& CheckoutAddressBookContainerBaseProps;

export interface CheckoutAddressBookContainerState {
    prevDefaultAddressId: number;
    selectedAddressId: number;
}

export interface CheckoutAddressBookComponentProps {
    customer: Partial<Customer>;
    onAddressSelect: (address?: CustomerAddress) => void;
    onShippingEstimationFieldsChange: ((address: EstimateAddress) => void) | (() => void);
    selectedAddressId: number;
    isBilling: boolean;
    is_virtual: boolean;
}

export interface CheckoutAddressBookComponentState {
    isCustomAddressExpanded: boolean;
}

export type CheckoutAddressBookContainerPropsKeys =
| 'customer'
| 'onShippingEstimationFieldsChange'
| 'isBilling'
| 'selectedAddressId'
| 'is_virtual';
