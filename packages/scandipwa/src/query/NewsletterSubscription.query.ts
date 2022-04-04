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

import { Mutation } from '@tilework/opus';

import { GQLSubscribeEmailToNewsletterOutput } from 'Type/Graphql.type';

/**
 * NewsletterSubscription Mutations
 * @class NewsletterSubscriptionQuery
 * @namespace Query/NewsletterSubscription/Query */
export class NewsletterSubscriptionQuery {
    getSubscribeToNewsletterMutation(
        email: string
    ): Mutation<'subscribeEmailToNewsletter', GQLSubscribeEmailToNewsletterOutput> {
        return new Mutation<'subscribeEmailToNewsletter', GQLSubscribeEmailToNewsletterOutput>(
            'subscribeEmailToNewsletter'
        )
            .addArgument('email', 'String!', email)
            .addFieldList(this._getPageFields());
    }

    _getPageFields(): string[] {
        return [
            'status'
        ];
    }
}

export default new NewsletterSubscriptionQuery();
