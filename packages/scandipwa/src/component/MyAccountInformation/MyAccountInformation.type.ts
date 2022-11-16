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

import { RouteComponentProps } from 'react-router';

import { ChangeCustomerPasswordOptions, Customer, SignInOptions } from 'Query/MyAccount.type';
import { MyAccountStore } from 'Store/MyAccount/MyAccount.type';
import { NetworkError } from 'Type/Common.type';
import { GQLCustomerUpdateInput } from 'Type/Graphql.type';

export interface MyAccountInformationContainerMapStateProps {
    customer: Partial<Customer>;
    isMobile: boolean;
    isLoading: boolean;
    isLocked: boolean;
    baseLinkUrl: string;
}

export interface MyAccountInformationContainerMapDispatchProps {
    updateMyAccountStore: (state: Partial<MyAccountStore>) => void;

    showSuccessNotification: (message: string) => void;
    showErrorNotification: (error: NetworkError | NetworkError[] | string) => void;

    logout: () => void;
}

export interface MyAccountInformationContainerFunctions {
    onCustomerSave: (fields:
    ChangeCustomerPasswordOptions
    & SignInOptions
    & GQLCustomerUpdateInput
    ) => Promise<void>;
    handleChangeEmailCheckbox: () => void;
    handleChangePasswordCheckbox: () => void;
}

export type MyAccountInformationContainerProps = MyAccountInformationContainerMapStateProps
& MyAccountInformationContainerMapDispatchProps
& RouteComponentProps<EmptyObject, EmptyObject, { editPassword?: boolean }>;

export interface MyAccountInformationContainerState {
    showEmailChangeField: boolean;
    showPasswordChangeField: boolean;
    isErrorShow: boolean;
}

export interface MyAccountInformationComponentProps {
    onCustomerSave: (fields:
    ChangeCustomerPasswordOptions
    & SignInOptions
    & GQLCustomerUpdateInput
    ) => Promise<void>;
    isLoading: boolean;
    customer: Partial<Customer>;
    showEmailChangeField: boolean;
    showPasswordChangeField: boolean;
    handleChangeEmailCheckbox: () => void;
    handleChangePasswordCheckbox: () => void;
}

export type MyAccountInformationContainerPropsKeys = 'customer'
| 'isLoading'
| 'showEmailChangeField'
| 'showPasswordChangeField';
