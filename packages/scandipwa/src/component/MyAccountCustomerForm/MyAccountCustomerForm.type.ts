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

import { ChangeEvent } from 'react';

import { ChangeCustomerPasswordOptions, Customer, SignInOptions } from 'Query/MyAccount.type';
import { GQLCustomerUpdateInput } from 'Type/Graphql.type';

export interface MyAccountCustomerFormContainerMapStateProps {
    showTaxVatNumber: string;
    minimunPasswordLength: number;
    minimunPasswordCharacter: string;
}


export interface MyAccountCustomerFormContainerMapDispatchProps {}

export interface MyAccountCustomerFormContainerFunctions {
    handleEmailInput: (emailInput: ChangeEvent<HTMLInputElement>) => void;
    handlePasswordInput: (currentPasswordInput: ChangeEvent<HTMLInputElement>) => void;
}

export interface MyAccountCustomerFormContainerBaseProps {
    customer: Partial<Customer>;
    onSave: (fields:
    ChangeCustomerPasswordOptions
    & SignInOptions
    & GQLCustomerUpdateInput
    ) => Promise<void>;
    showEmailChangeField: boolean;
    showPasswordChangeField: boolean;
    handleChangeEmailCheckbox: () => void;
    handleChangePasswordCheckbox: () => void;
}

export type MyAccountCustomerFormContainerProps = MyAccountCustomerFormContainerMapStateProps
& MyAccountCustomerFormContainerMapDispatchProps
& MyAccountCustomerFormContainerBaseProps;

export interface MyAccountCustomerFormContainerState {
    email: string;
    currentPassword: string;
    isEmailEdit: boolean;
}

export interface MyAccountCustomerFormComponentProps {
    customer: Partial<Customer>;
    onSave: (fields:
    ChangeCustomerPasswordOptions
    & SignInOptions
    & GQLCustomerUpdateInput
    ) => Promise<void>;
    showTaxVatNumber: boolean;
    showEmailChangeField: boolean;
    showPasswordChangeField: boolean;
    handleChangeEmailCheckbox: () => void;
    handleChangePasswordCheckbox: () => void;
    handleEmailInput: (emailInput: ChangeEvent<HTMLInputElement>) => void;
    handlePasswordInput: (currentPasswordInput: ChangeEvent<HTMLInputElement>) => void;
    email: string;
    currentPassword: string;
    vatNumberRequired: boolean;
    range: { min: number; max: number };
    minimunPasswordCharacter: string;
}

export type MyAccountCustomerFormContainerPropsKeys = 'customer'
| 'onSave'
| 'showTaxVatNumber'
| 'showEmailChangeField'
| 'showPasswordChangeField'
| 'handleChangeEmailCheckbox'
| 'handleChangePasswordCheckbox'
| 'email'
| 'currentPassword'
| 'vatNumberRequired'
| 'range'
| 'minimunPasswordCharacter';

export type MyAccountCustomerFormEmailAndPasswordProps = 'minimunPasswordCharacter'
| 'showEmailChangeField'
| 'showPasswordChangeField'
| 'handleEmailInput'
| 'handlePasswordInput'
| 'currentPassword'
| 'email'
| 'range';

export type MyAccountCustomerFormInformationProps = 'customer'
| 'showTaxVatNumber'
| 'handleChangeEmailCheckbox'
| 'handleChangePasswordCheckbox'
| 'showEmailChangeField'
| 'showPasswordChangeField'
| 'vatNumberRequired';
