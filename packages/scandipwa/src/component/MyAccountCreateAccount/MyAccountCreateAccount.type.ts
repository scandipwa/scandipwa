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

import { MouseEvent } from 'react';

import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CreateAccountOptions } from 'Query/MyAccount.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { FieldData } from 'Util/Form/Form.type';
import { ValidationRule } from 'Util/Validator/Validator.type';

export interface MyAccountCreateAccountContainerMapStateProps {
    isLoading: boolean;
    showTaxVatNumber: string;
    newsletterActive: boolean;
    isMobile: boolean;
    minimunPasswordLength: number;
    minimunPasswordCharacter: string;
}

export interface MyAccountCreateAccountContainerMapDispatchProps {
    createAccount: (options: CreateAccountOptions) => Promise<boolean | 'confirmation_required'>;
    showNotification: (type: NotificationType, message: string) => void;
}

export interface MyAccountCreateAccountContainerFunctions {
    onError: () => void;
    onSuccess: (form: HTMLFormElement, fields: FieldData[]) => Promise<void>;
}

export type MyAccountCreateAccountContainerProps = MyAccountCreateAccountContainerMapStateProps
& MyAccountCreateAccountContainerMapDispatchProps & {
    onSignIn: () => void;
    setSignInState: (state: MyAccountPageState) => void;
    setLoadingState: (isLoading: boolean) => void;
    isLandingPage: boolean;
    handleSignIn: (e: MouseEvent<HTMLButtonElement>) => void;
    state: MyAccountPageState;
};

export interface MyAccountCreateAccountComponentProps {
    state: MyAccountPageState;
    onError: () => void;
    onSuccess: (form: HTMLFormElement, fields: FieldData[]) => Promise<void>;
    handleSignIn: (e: MouseEvent<HTMLButtonElement>) => void;
    showTaxVatNumber: boolean;
    vatNumberRequired: boolean;
    newsletterActive: boolean;
    range: ValidationRule['range'];
    minimunPasswordCharacter: string;
}

export type MyAccountCreateAccountContainerPropsKeys =
| 'state'
| 'handleSignIn'
| 'showTaxVatNumber'
| 'newsletterActive'
| 'vatNumberRequired'
| 'range'
| 'minimunPasswordCharacter';

export interface MyAccountCreateAccountComponentState {}

export interface MyAccountCreateAccountContainerState {}
