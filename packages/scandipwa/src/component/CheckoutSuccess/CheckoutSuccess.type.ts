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

export interface CheckoutSuccessComponentProps {
    orderID: string;
    isEmailAvailable: boolean;
    email: string;
    firstName: string;
    lastName: string;
}

export interface CheckoutSuccessComponentState {}

export interface CheckoutSuccessContainerState {}
