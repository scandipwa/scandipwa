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
import { CustomerAddress } from 'Query/MyAccount.type';
import { OrderAddress } from 'Query/Order.type';
import { Country } from 'Query/Region.type';
import { Mix } from 'Type/Common.type';

export interface MyAccountAddressTableContainerMapStateProps {
    countries: Country[];
}

export interface MyAccountAddressTableContainerMapDispatchProps {
    showEditPopup: <T>(payload: T) => void;
}

export interface MyAccountAddressTableContainerFunctions {
    onEditClick: () => void;
    onDeleteClick: () => void;
}

export type MyAccountAddressTableContainerProps = MyAccountAddressTableContainerMapStateProps
& MyAccountAddressTableContainerMapDispatchProps & {
    mix?: Mix;
    address: CustomerAddress | OrderAddress;
    showAdditionalFields?: boolean;
    showActions?: boolean;
    title?: string;
};

export interface MyAccountAddressTableComponentProps extends MyAccountAddressTableContainerFunctions {
    mix?: Mix;
    address: CustomerAddress | OrderAddress;
    showActions?: boolean;
    showAdditionalFields?: boolean;
    countries: Country[];
    title?: string;
}

export type MyAccountAddressTableContainerPropsKeys =
'address'
| 'countries'
| 'mix'
| 'showAdditionalFields'
| 'showActions'
| 'title';
