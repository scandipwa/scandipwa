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

import { ConfirmAccountOptions, SignInOptions } from 'Query/MyAccount.type';
import { BreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { MetaStore } from 'Store/Meta/Meta.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { FieldData } from 'Util/Form/Form.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfirmAccountPageContainerMapStateProps {}

export interface ConfirmAccountPageContainerMapDispatchProps {
    updateBreadcrumbsStore: (state: Partial<BreadcrumbsStore>) => void;
    updateMetaStore: (state: Partial<MetaStore>) => void;
    confirmAccount: (options: ConfirmAccountOptions) => Promise<void>;
    showNotification: (type: NotificationType, message: string) => void;
    signIn: (options: SignInOptions) => Promise<boolean>;
}

export interface ConfirmAccountPageContainerFunctions {
    onConfirmSuccess: (form: HTMLFormElement, fields: FieldData[]) => void;
    onFormError: () => void;
}

export type ConfirmAccountPageContainerProps = ConfirmAccountPageContainerMapStateProps
& ConfirmAccountPageContainerMapDispatchProps;

export interface ConfirmAccountPageContainerState {
    redirect: boolean;
    isLoading: boolean;
}

export interface ConfirmAccountPageComponentProps extends ConfirmAccountPageContainerFunctions {
    redirect: boolean;
    isLoading: boolean;
    shouldDisplayWarning: boolean;
}

export type ConfirmAccountPageContainerPropsKeys = 'redirect'
| 'isLoading'
| 'shouldDisplayWarning';
