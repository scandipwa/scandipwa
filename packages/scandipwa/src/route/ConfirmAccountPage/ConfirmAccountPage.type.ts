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

import { RouteComponentProps } from 'react-router';

import { ConfirmAccountOptions, SignInOptions } from 'Query/MyAccount.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import { FieldData } from 'Util/Form/Form.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfirmAccountPageContainerMapStateProps {}

export interface ConfirmAccountPageContainerMapDispatchProps {
    toggleBreadcrumbs: (isVisible: boolean) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    confirmAccount: (options: ConfirmAccountOptions) => Promise<ShowNotificationAction>;
    showNotification: (type: NotificationType, message: string) => void;
    signIn: (options: SignInOptions) => Promise<boolean>;
}

export type ConfirmAccountPageContainerProps = ConfirmAccountPageContainerMapStateProps
& ConfirmAccountPageContainerMapDispatchProps
& RouteComponentProps;

export interface ConfirmAccountPageContainerState {
    redirect: boolean;
    isLoading: boolean;
}

export interface ConfirmAccountPageComponentProps {
    redirect: boolean;
    isLoading: boolean;
    shouldDisplayWarning: boolean;
    onConfirmSuccess: (form: HTMLFormElement, fields: FieldData[]) => void;
    onFormError: () => void;
}

export type ConfirmAccountPageContainerPropsKeys = 'redirect'
| 'isLoading'
| 'shouldDisplayWarning';
