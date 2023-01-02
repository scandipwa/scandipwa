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

import {
    MyAccountAddressFormComponentProps,
    MyAccountAddressFormContainerProps,
    MyAccountAddressFormContainerPropsKeys,
    MyAccountAddressFormContainerState,
} from 'Component/MyAccountAddressForm/MyAccountAddressForm.type';
import { EstimateAddress } from 'Route/Checkout/Checkout.type';

export interface CheckoutAddressFormContainerBaseProps {
    onShippingEstimationFieldsChange: ((address: EstimateAddress) => void) | (() => void);
    defaultCountry: string;
}

export interface CheckoutAddressFormContainerProps extends MyAccountAddressFormContainerProps,
    CheckoutAddressFormContainerBaseProps {}

export interface CheckoutAddressFormComponentBaseProps {
    onShippingEstimationFieldsChange: ((address: EstimateAddress) => void) | (() => void);
}

export interface CheckoutAddressFormComponentProps extends MyAccountAddressFormComponentProps,
    CheckoutAddressFormComponentBaseProps {}

export type CheckoutAddressFormContainerPropsKeys = MyAccountAddressFormContainerPropsKeys
| 'onShippingEstimationFieldsChange';

export interface EstimateAddressFields {
    city: string;
    country_id: string;
    postcode: string;
    region_id?: string;
    region_string?: string;
}

export interface CheckoutAddressFormComponentState {}

export interface CheckoutAddressFormContainerState extends MyAccountAddressFormContainerState {}
