/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import NewsletterSubscriptionQuery from 'Query/NewsletterSubscription.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchMutation, getErrorMessage } from 'Util/Request';

export const NOT_ACTIVE = 'NOT_ACTIVE';

/**
 * Product Cart Dispatcher
 * @class NewsletterSubscriptionDispatcher
 * @namespace Store/NewsletterSubscription/Dispatcher
 */
export class NewsletterSubscriptionDispatcher {
    subscribeToNewsletter(dispatch, email) {
        return fetchMutation(NewsletterSubscriptionQuery.getSubscribeToNewsletterMutation(email)).then(
            /** @namespace Store/NewsletterSubscription/Dispatcher/fetchMutationThen */
            ({ subscribeEmailToNewsletter: { status } }) => {
                // `NOT_ACTIVE` response status corresponds to `newsletter_subscription_confirm` magento setting
                const message = status === NOT_ACTIVE
                    ? __('Confirmation request has been sent.')
                    : __('Thank you for your subscription.');

                return dispatch(showNotification('success', message));
            },
            /** @namespace Store/NewsletterSubscription/Dispatcher/fetchMutationSuccess */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );
    }
}

export default new NewsletterSubscriptionDispatcher();
