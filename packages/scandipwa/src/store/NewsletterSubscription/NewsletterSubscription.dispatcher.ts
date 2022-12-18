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

import NewsletterSubscriptionQuery from 'Query/NewsletterSubscription.query';
import { NotificationType } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

export const NOT_ACTIVE = 'NOT_ACTIVE';

/**
 * Product Cart Dispatcher
 * @class NewsletterSubscriptionDispatcher
 * @namespace Store/NewsletterSubscription/Dispatcher
 */
export class NewsletterSubscriptionDispatcher extends SimpleDispatcher {
    subscribeToNewsletter(email: string): Promise<void> {
        return fetchMutation(NewsletterSubscriptionQuery.getSubscribeToNewsletterMutation(email)).then(
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then */
            ({ subscribeEmailToNewsletter: { status } }) => {
                // `NOT_ACTIVE` response status corresponds to `newsletter_subscription_confirm` magento setting
                const message = status === NOT_ACTIVE
                    ? __('Confirmation request has been sent.')
                    : __('Thank you for your subscription.');

                return NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.SUCCESS,
                        message,
                    ),
                );
            },
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then/catch */
            (error) => NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error),
                ),
            ),
        );
    }
}

export default new NewsletterSubscriptionDispatcher();
