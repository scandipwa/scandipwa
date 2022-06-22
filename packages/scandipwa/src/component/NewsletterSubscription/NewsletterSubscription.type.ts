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
    onFormSubmit: (form: HTMLFormElement, fields) => void;
}

export type NewsletterSubscriptionContainerProps = NewsletterSubscriptionMapStateProps
& NewsletterSubscriptionMapDispatchProps
& RouteComponentProps;

export interface NewsletterSubscriptionContainerState {
    isLoading: boolean;
}

export interface NewsletterSubscriptionComponentProps {
    onFormSubmit: (form: HTMLFormElement, fields) => void;
    isLoading: boolean;
}
