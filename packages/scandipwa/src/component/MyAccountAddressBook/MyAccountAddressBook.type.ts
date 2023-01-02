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
import { Customer } from 'Query/MyAccount.type';
import { MyAccountTab } from 'Route/MyAccount/MyAccount.type';

export interface MyAccountAddressBookContainerMapStateProps {
    customer: Partial<Customer>;
}

export interface MyAccountAddressBookContainerMapDispatchProps {
    showPopup: <T>(payload: T) => void;
}

export interface MyAccountAddressBookContainerFunctions {
    showCreateNewPopup: () => void;
}

export interface MyAccountAddressBookContainerBaseProps {
    tabMap: Record<string, MyAccountTab>;
    changeTabName: (newTabName: string) => void;
}

export type MyAccountAddressBookContainerProps = MyAccountAddressBookContainerMapStateProps
& MyAccountAddressBookContainerMapDispatchProps
& MyAccountAddressBookContainerBaseProps;

export interface MyAccountAddressBookComponentProps {
    customer: Partial<Customer>;
    showCreateNewPopup: () => void;
}

export interface MyAccountAddressBookComponentState {}

export interface MyAccountAddressBookContainerState {}
