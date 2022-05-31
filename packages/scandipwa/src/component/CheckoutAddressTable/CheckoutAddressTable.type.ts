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
    MyAccountAddressTableComponentProps,
    MyAccountAddressTableContainerProps,
    MyAccountAddressTableContainerPropsKeys
} from 'Component/MyAccountAddressTable/MyAccountAddressTable.type';
import { CustomerAddress } from 'Query/MyAccount.type';

export interface CheckoutAddressTableContainerBaseProps {
    isSelected: boolean;
    onClick: (address?: CustomerAddress) => void;
}

export type CheckoutAddressTableContainerProps = CheckoutAddressTableContainerBaseProps
& MyAccountAddressTableContainerProps;

export type CheckoutAddressTableContainerPropsKeys = MyAccountAddressTableContainerPropsKeys
| 'isSelected'
| 'onClick';

export interface CheckoutAddressTableComponentBaseProps {
    isSelected: boolean;
    onClick: (address?: CustomerAddress) => void;
}

export type CheckoutAddressTableComponentProps = MyAccountAddressTableComponentProps
& CheckoutAddressTableComponentBaseProps;
