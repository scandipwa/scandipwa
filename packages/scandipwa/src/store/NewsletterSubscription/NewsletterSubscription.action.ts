/* eslint-disable import/prefer-default-export */
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

import { NewsletterSubscriptionActionType, SubscribeToNewsletterAction } from './NewsletterSubscription.type';

/**
 * @param {String} email
 * @returns {void}
 * @namespace Store/NewsletterSubscription/Action/subscribeToNewsletter
 */
export const subscribeToNewsletter = (email: string): SubscribeToNewsletterAction => ({
    type: NewsletterSubscriptionActionType.SUBSCRIBE_TO_NEWSLETTER,
    email
});
