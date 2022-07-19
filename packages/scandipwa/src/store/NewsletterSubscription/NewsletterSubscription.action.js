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

export const SUBSCRIBE_TO_NEWSLETTER = 'SUBSCRIBE_TO_NEWSLETTER';

/**
 * @param {String} email
 * @returns {void}
 * @namespace Store/NewsletterSubscription/Action/subscribeToNewsletter
 */
export const subscribeToNewsletter = (email) => ({
    type: SUBSCRIBE_TO_NEWSLETTER,
    email
});
