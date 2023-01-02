/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ShowNotificationAction } from 'Store/Notification/Notification.type';

export interface NewsletterSubscriptionMapStateProps {
    allowGuestSubscribe: boolean;
    isSignedIn: boolean;
}

export interface NewsletterSubscriptionMapDispatchProps {
    subscribeToNewsletter: (email: string) => Promise<ShowNotificationAction>;
    showErrorNotification: (message: string) => void;
}

export interface NewsletterSubscriptionContainerFunctions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFormSubmit: (form: HTMLFormElement, fields: any) => void;
}

export type NewsletterSubscriptionContainerProps = NewsletterSubscriptionMapStateProps
& NewsletterSubscriptionMapDispatchProps;

export interface NewsletterSubscriptionContainerState {
    isLoading: boolean;
}

export interface NewsletterSubscriptionComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFormSubmit: (form: HTMLFormElement, fields: any) => void;
    isLoading: boolean;
}

export interface NewsletterSubscriptionComponentState {}
