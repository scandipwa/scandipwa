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

import { Dispatch } from 'redux';

import NewsletterSubscriptionQuery from 'Query/NewsletterSubscription.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';

export const NOT_ACTIVE = 'NOT_ACTIVE';

/**
 * Product Cart Dispatcher
 * @class NewsletterSubscriptionDispatcher
 * @namespace Store/NewsletterSubscription/Dispatcher
 */
export class NewsletterSubscriptionDispatcher {
    subscribeToNewsletter(dispatch: Dispatch, email: string): Promise<ShowNotificationAction> {
        return fetchMutation(NewsletterSubscriptionQuery.getSubscribeToNewsletterMutation(email)).then(
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then */
            ({ subscribeEmailToNewsletter: { status } }) => {
                // `NOT_ACTIVE` response status corresponds to `newsletter_subscription_confirm` magento setting
                const message = status === NOT_ACTIVE
                    ? __('Confirmation request has been sent.')
                    : __('Thank you for your subscription.');

                return dispatch(showNotification(NotificationType.SUCCESS, message));
            },
            /** @namespace Store/NewsletterSubscription/Dispatcher/NewsletterSubscriptionDispatcher/subscribeToNewsletter/fetchMutation/then/dispatch/catch */
            (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)))
        );
    }
}

export default new NewsletterSubscriptionDispatcher();
