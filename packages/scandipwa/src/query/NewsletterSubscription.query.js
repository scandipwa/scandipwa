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

import { Field } from 'Util/Query';

/**
 * NewsletterSubscription Mutations
 * @class NewsletterSubscriptionQuery
 * @namespace Query/NewsletterSubscription/Query */
export class NewsletterSubscriptionQuery {
    getSubscribeToNewsletterMutation(email) {
        return new Field('subscribeEmailToNewsletter')
            .addArgument('email', 'String!', email)
            .addFieldList(this._getPageFields());
    }

    _getPageFields() {
        return [
            'status'
        ];
    }
}

export default new NewsletterSubscriptionQuery();
