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

import { ChangeEvent, MouseEvent } from 'react';

import { EventFieldData } from 'Component/Field/Field.type';
import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { SignInOptions } from 'Query/MyAccount.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { ValidationRule } from 'Util/Validator/Validator.type';

export interface CheckoutGuestFormContainerMapStateProps {
    isEmailConfirmationRequired: boolean;
    emailValue: string;
    isEmailAvailable: boolean;
    minimunPasswordLength: number;
    minimunPasswordCharacter: string;
}

export interface CheckoutGuestFormContainerMapDispatchProps {
    signIn: (options: SignInOptions) => void;
    showNotification: (type: NotificationType, message: string) => void;
    showErrorNotification: (error: NetworkError | NetworkError[]) => void;
    clearEmailStatus: () => void;
    checkEmailAvailability: (email: string) => void;
    updateEmail: (email: string) => void;
}

export interface CheckoutGuestFormContainerFunctions {
    handleCreateAccount: (e: MouseEvent) => void;
    handleCreateUser: () => void;
    handleEmailInput: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    handleForgotPassword: (e: MouseEvent) => void;
    handlePasswordInput: (password: string) => void;
    handleSignIn: (e: MouseEvent) => void;
    onFormError: () => void;
    setLoadingState: (isLoading: boolean) => void;
    setSignInState: (signInState: MyAccountPageState | '') => void;
}

export interface CheckoutGuestFormContainerBaseProps {
    isCreateUser: boolean;
    isGuestEmailSaved: boolean;
    onCreateUserChange: () => void;
    onPasswordChange: (password: string) => void ;
    onEmailChange: (email: string) => void;
    onSignIn: () => void;
}

export type CheckoutGuestFormContainerProps = CheckoutGuestFormContainerMapStateProps
& CheckoutGuestFormContainerMapDispatchProps
& CheckoutGuestFormContainerBaseProps;

export interface CheckoutGuestFormContainerState {
    isLoading: boolean;
    signInState: MyAccountPageState | '';
}

export interface CheckoutGuestFormComponentProps {
    formId: string;
    handleEmailInput: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    handleCreateUser: () => void;
    handlePasswordInput: (password: string) => void;
    isEmailAvailable: boolean;
    emailValue: string;
    signInState: MyAccountPageState | '';
    setSignInState: (signInState: MyAccountPageState | '') => void;
    onSignIn: () => void;
    range: ValidationRule['range'];
    minimunPasswordCharacter: string;
    isLoading: boolean;
    isCreateUser: boolean;
    handleForgotPassword: (e: MouseEvent) => void;
    handleSignIn: (e: MouseEvent) => void;
    handleCreateAccount: (e: MouseEvent) => void;
    onFormError: () => void;
    setLoadingState: (isLoading: boolean) => void;
}

export type CheckoutGuestFormContainerPropsKeys =
| 'formId'
| 'emailValue'
| 'isEmailAvailable'
| 'isLoading'
| 'signInState'
| 'onSignIn'
| 'range'
| 'minimunPasswordCharacter'
| 'isCreateUser';

export interface CheckoutGuestFormRenderMapItem {
    render?: () => ReactElement;
    title?: string;
}

export interface CheckoutGuestFormProps {
    emailValue: string;
    range: ValidationRule['range'];
    minimunPasswordCharacter: string;
    isCreateUser: boolean;
}

export interface CheckoutGuestFormEvents {
    handleEmailInput: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    handlePasswordInput: (password: string) => void;
    range: ValidationRule['range'];
    minimunPasswordCharacter: string;
}
