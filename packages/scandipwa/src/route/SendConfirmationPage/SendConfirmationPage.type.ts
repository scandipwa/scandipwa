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

import { PageMeta } from 'Store/Meta/Meta.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { FieldData } from 'Util/Form/Form.type';

export interface SendConfirmationPageContainerMapStateProps {}

export interface SendConfirmationPageContainerMapDispatchProps {
    toggleBreadcrumbs: (isVisible: boolean) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    resendConfirmation: (options: { email: string }) => Promise<boolean>;
    showNotification: (type: NotificationType, message: string) => void;
}

export interface SendConfirmationPageContainerBaseProps {}

export interface SendConfirmationPageContainerProps extends SendConfirmationPageContainerMapStateProps,
    SendConfirmationPageContainerMapDispatchProps,
    SendConfirmationPageContainerBaseProps {}

export interface SendConfirmationPageContainerFunctions {
    onConfirmSuccess: (form: HTMLFormElement, fields: FieldData[]) => void;
    onFormError: () => void;
}

export interface SendConfirmationPageContainerState {
    email: string;
    redirect: boolean;
    isLoading: boolean;
}

export interface SendConfirmationPageComponentProps extends SendConfirmationPageContainerFunctions {
    email: string;
    redirect: boolean;
    isLoading: boolean;
    shouldDisplayWarning: boolean;
}

export type SendConfirmationPageContainerPropsKeys = 'email'
| 'redirect'
| 'isLoading'
| 'shouldDisplayWarning';
