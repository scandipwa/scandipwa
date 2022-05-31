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

import {
    MyAccountAddressFormComponentProps,
    MyAccountAddressFormContainerProps,
    MyAccountAddressFormContainerPropsKeys
} from 'Component/MyAccountAddressForm/MyAccountAddressForm.type';
import { CheckoutAddress } from 'Route/Checkout/Checkout.type';

export interface CheckoutAddressFormContainerBaseProps {
    onShippingEstimationFieldsChange: ((address: CheckoutAddress) => void) | (() => void);
}

export type CheckoutAddressFormContainerProps = MyAccountAddressFormContainerProps
& CheckoutAddressFormContainerBaseProps;

export interface CheckoutAddressFormComponentBaseProps {
    onShippingEstimationFieldsChange: ((address: CheckoutAddress) => void) | (() => void);
}

export type CheckoutAddressFormComponentProps = MyAccountAddressFormComponentProps
& CheckoutAddressFormComponentBaseProps;

export type CheckoutAddressFormContainerPropsKeys = MyAccountAddressFormContainerPropsKeys
| 'onShippingEstimationFieldsChange';
