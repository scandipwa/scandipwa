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
import { NetworkError } from 'Type/Common.type';

import { MyAccountAddressPopupAction } from './MyAccountAddressPopup.config';

export interface MyAccountAddressPopupContainerMapStateProps {
    payload: MyAccountAddressPopupPayload;
}

export interface MyAccountAddressPopupContainerMapDispatchProps {
    hideActiveOverlay: () => void;
    showErrorNotification: (error: NetworkError | NetworkError[]) => void;
    showSuccessNotification: (message: string) => void;
    updateCustomerDetails: () => void;
    goToPreviousHeaderState: () => void;
}

export type MyAccountAddressPopupContainerProps = MyAccountAddressPopupContainerMapStateProps
& MyAccountAddressPopupContainerMapDispatchProps;

export type MyAccountAddressPopupComponentProps = {
    isLoading: boolean;
    handleAddress: (address: CustomerAddress) => Promise<void>;
    handleDeleteAddress: () => Promise<void>;
    payload: MyAccountAddressPopupPayload;
};

export type MyAccountAddressPopupContainerState = {
    isLoading: boolean;
};

export type MyAccountAddressPopupPayload = {
    action: MyAccountAddressPopupAction.EDIT_ADDRESS
    | MyAccountAddressPopupAction.DELETE_ADDRESS
    | MyAccountAddressPopupAction.ADD_ADDRESS;
    address: CustomerAddress;
    title: string;
};
