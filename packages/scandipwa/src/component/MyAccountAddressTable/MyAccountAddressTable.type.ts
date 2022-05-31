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
import { Country } from 'Query/Region.type';
import { Mix } from 'Type/Common.type';

export interface MyAccountAddressTableContainerMapStateProps {
    countries: Country[];
}

export interface MyAccountAddressTableContainerMapDispatchProps {
    showEditPopup: <T>(payload: T) => void;
}

export type MyAccountAddressTableContainerProps = MyAccountAddressTableContainerMapStateProps
& MyAccountAddressTableContainerMapDispatchProps & {
    mix: Mix;
    address: CustomerAddress;
    showAdditionalFields: boolean;
    showActions: boolean;
    title: string;
};

export type MyAccountAddressTableComponentProps = {
    mix: Mix;
    address: CustomerAddress;
    showActions: boolean;
    showAdditionalFields: boolean;
    onEditClick: () => void;
    onDeleteClick: () => void;
    countries: Country[];
    title: string;
};

export type MyAccountAddressTableContainerPropsKeys =
'address'
| 'countries'
| 'mix'
| 'showAdditionalFields'
| 'showActions'
| 'title';
