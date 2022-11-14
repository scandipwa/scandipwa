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
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

export const NOT_ACTIVE = 'NOT_ACTIVE';

/**
 * Product Cart Dispatcher
 * @class NewsletterSubscriptionDispatcher
 * @namespace Store/NewsletterSubscription/Dispatcher
 */
export class NewsletterSubscriptionDispatcher extends SimpleDispatcher {
    subscribeToNewsletter(email: string): Promise<ShowNotificationAction> {
        return fetchMutation(NewsletterSubscriptionQuery.getSubscribeToNewsletterMutation(email)).then(
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then */
            ({ subscribeEmailToNewsletter: { status } }) => {
                // `NOT_ACTIVE` response status corresponds to `newsletter_subscription_confirm` magento setting
                const message = status === NOT_ACTIVE
                    ? __('Confirmation request has been sent.')
                    : __('Thank you for your subscription.');

                return this.dispatch(showNotification(NotificationType.SUCCESS, message));
            },
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then/catch */
            (error) => this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error))),
        );
    }
}

export default new NewsletterSubscriptionDispatcher();
