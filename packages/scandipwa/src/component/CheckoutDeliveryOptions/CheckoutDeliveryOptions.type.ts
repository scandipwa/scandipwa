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

import { ShippingMethod } from 'Query/Checkout.type';

export interface CheckoutDeliveryOptionsContainerProps {
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    shippingMethods: ShippingMethod[];
    handleSelectDeliveryMethod: () => void;
    selectedShippingMethod?: ShippingMethod;
}

export interface CheckoutDeliveryOptionsContainerState {
    isShippingMethodPreSelected: boolean;
}

export interface CheckoutDeliveryOptionsComponent {
    shippingMethods: ShippingMethod[];
    selectShippingMethod: (shippingMethod: ShippingMethod) => void;
    handleSelectDeliveryMethod: () => void;
    selectedShippingMethod?: ShippingMethod;
    isShippingMethodPreSelected: boolean;
}

export type CheckoutDeliveryOptionsContainerPropsKeys =
| 'selectedShippingMethod'
| 'shippingMethods'
| 'handleSelectDeliveryMethod'
| 'isShippingMethodPreSelected';
