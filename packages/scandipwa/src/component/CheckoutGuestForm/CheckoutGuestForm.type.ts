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

import { ChangeEvent, MouseEvent, RefObject } from 'react';

import { EventFieldData } from 'Component/Field/Field.type';
import { FormFields } from 'Component/Form/Form.type';
import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { SignInOptions } from 'Query/MyAccount.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { ValidationDOMOutput, ValidationRule } from 'Util/Validator/Validator.type';

export interface CheckoutGuestFormContainerMapStateProps {
    isEmailConfirmationRequired: boolean;
    emailValue: string;
    isEmailAvailable: boolean;
    minimumPasswordLength: number;
    minimumPasswordCharacter: string;
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
    onFormError: (
        _: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput
    ) => void;
    setLoadingState: (isLoading: boolean) => void;
    setSignInState: (signInState: MyAccountPageState | '') => void;
}

export interface CheckoutGuestFormContainerBaseProps {
    isCreateUser: boolean;
    isGuestEmailSaved: boolean;
    isVisibleEmailRequired: boolean;
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

export interface CheckoutGuestFormComponentProps extends CheckoutGuestFormContainerFunctions {
    formId: string;
    isEmailAvailable: boolean;
    emailValue: string;
    signInState: MyAccountPageState | '';
    onSignIn: () => void;
    range: ValidationRule['range'];
    minimumPasswordCharacter: string;
    isLoading: boolean;
    isCreateUser: boolean;
    formRef: RefObject<HTMLFormElement>;
}

export type CheckoutGuestFormContainerPropsKeys =
| 'formId'
| 'emailValue'
| 'isEmailAvailable'
| 'isLoading'
| 'signInState'
| 'onSignIn'
| 'range'
| 'minimumPasswordCharacter'
| 'isCreateUser'
| 'formRef';

export interface CheckoutGuestFormRenderMapItem {
    render?: () => ReactElement;
    title?: string;
}

export interface CheckoutGuestFormProps {
    emailValue: string;
    range: ValidationRule['range'];
    minimumPasswordCharacter: string;
    isCreateUser: boolean;
}

export interface CheckoutGuestFormEvents {
    handleEmailInput: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    handlePasswordInput: (password: string) => void;
    range: ValidationRule['range'];
    minimumPasswordCharacter: string;
}

export interface CheckoutGuestFormComponentState {}
