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

import { ResetPasswordOptions } from 'Query/MyAccount.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { FieldData } from 'Util/Form/Form.type';
import { ValidationRule } from 'Util/Validator/Validator.type';

export interface PasswordChangePageContainerMapStateProps {
    passwordResetStatus: string;
    passwordResetMessage: string;
    isMobile: boolean;
    minimunPasswordLength: number;
    minimunPasswordCharacter: string;
}

export interface PasswordChangePageContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    toggleBreadcrumbs: (visibility: boolean) => void;
    setHeaderState: (headerState: NavigationState) => void;
    resetPassword: (options: ResetPasswordOptions) => void;
    showNotification: (type: NotificationType, message: string) => void;
}

export type PasswordChangePageContainerProps = PasswordChangePageContainerMapStateProps
& PasswordChangePageContainerMapDispatchProps
& RouteComponentProps;

export interface PasswordChangePageContainerState {
    passwordResetStatus: string;
    isLoading: boolean;
}

export interface PasswordChangePageComponentProps {
    isLoading: boolean;
    onPasswordSuccess: (form: HTMLFormElement, fields: FieldData[]) => void;
    onError: () => void;
    range: ValidationRule['range'];
    isMobile: boolean;
    shouldDisplayWarning: boolean;
    minimunPasswordCharacter: string;
}

export type PasswordChangePageContainerPropsKeys = 'range'
| 'isLoading'
| 'isMobile'
| 'minimunPasswordCharacter'
| 'shouldDisplayWarning';
