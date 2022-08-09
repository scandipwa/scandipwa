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
import { PopupPayloadDefault } from 'Store/Popup/Popup.type';
import { NetworkError } from 'Type/Common.type';
import { GQLCustomerAddressInput } from 'Type/Graphql.type';

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

export interface MyAccountAddressPopupContainerFunctions {
    handleAddress: (address: GQLCustomerAddressInput) => Promise<void>;
    handleDeleteAddress: () => Promise<void>;
}

export type MyAccountAddressPopupContainerProps = MyAccountAddressPopupContainerMapStateProps
& MyAccountAddressPopupContainerMapDispatchProps;

export interface MyAccountAddressPopupComponentProps {
    isLoading: boolean;
    handleAddress: (address: GQLCustomerAddressInput) => Promise<void>;
    handleDeleteAddress: () => Promise<void>;
    payload: MyAccountAddressPopupPayload;
}

export interface MyAccountAddressPopupContainerState {
    isLoading: boolean;
}

export type MyAccountAddressPopupPayload = PopupPayloadDefault & {
    action: MyAccountAddressPopupAction.EDIT_ADDRESS
    | MyAccountAddressPopupAction.DELETE_ADDRESS
    | MyAccountAddressPopupAction.ADD_ADDRESS;
    address: CustomerAddress;
};
