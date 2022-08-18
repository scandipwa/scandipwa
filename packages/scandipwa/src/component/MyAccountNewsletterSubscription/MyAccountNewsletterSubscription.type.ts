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

import { Customer } from 'Query/MyAccount.type';
import { NetworkError } from 'Type/Common.type';

export interface MyAccountNewsletterSubscriptionContainerMapStateProps {
    customer: Partial<Customer>;
    newsletterConfirmStatus: boolean;
}

export interface MyAccountNewsletterSubscriptionContainerMapDispatchProps {
    updateCustomer: (customer: Partial<Customer>) => void;
    showErrorNotification: (error: NetworkError) => void;
    showSuccessNotification: (message: string) => void;
}

export interface MyAccountNewsletterSubscriptionContainerFunctions {
    setSubscriptionStatus: () => void;
    onError: () => void;
    onCustomerSave: (form: unknown, fields: { isSubscribed: { value: boolean } }) => void;
}

export type MyAccountNewsletterSubscriptionContainerProps = MyAccountNewsletterSubscriptionContainerMapStateProps
& MyAccountNewsletterSubscriptionContainerMapDispatchProps;

export interface MyAccountNewsletterSubscriptionContainerState {
    isLoading: boolean;
    isSubscriptionSelected: boolean;
}

export interface MyAccountNewsletterSubscriptionComponentProps {
    onCustomerSave: (form: unknown, fields: { isSubscribed: { value: boolean } }) => void;
    customer: Partial<Customer>;
    isSubscriptionSelected: boolean;
    setSubscriptionStatus: () => void;
    onError: () => void;
}

export type MyAccountNewsletterSubscriptionContainerPropsKeys =
      | 'customer'
      | 'isSubscriptionSelected';
