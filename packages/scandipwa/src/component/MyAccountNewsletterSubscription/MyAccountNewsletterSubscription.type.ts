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

export interface MyAccountNewsletterSubscriptionContainerMapStateProps {
    customer: Partial<Customer>;
    newsletterConfirmStatus: boolean;
}

export interface MyAccountNewsletterSubscriptionContainerMapDispatchProps {
    updateCustomer: (customer: Partial<Customer>) => void;
    showErrorNotification: (error: string) => void;
    showSuccessNotification: (message: string) => void;
}

export type MyAccountNewsletterSubscriptionContainerProps = MyAccountNewsletterSubscriptionContainerMapStateProps
& MyAccountNewsletterSubscriptionContainerMapDispatchProps;

export type MyAccountNewsletterSubscriptionContainerState = {
    isLoading: boolean;
    isSubscriptionSelected: boolean;
};

export interface MyAccountNewsletterSubscriptionComponentProps {
    onCustomerSave: (form, fields) => void;
    customer: Partial<Customer>;
    isSubscriptionSelected: boolean;
    setSubscriptionStatus: () => void;
    onError: () => void;
}

export type MyAccountNewsletterSubscriptionContainerPropsKeys =
      | 'customer'
      | 'isSubscriptionSelected';
