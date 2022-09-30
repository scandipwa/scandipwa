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

import { Field, Mutation } from '@tilework/opus';

import { GQLSubscriptionStatusesEnum } from 'Type/Graphql.type';

/**
 * NewsletterSubscription Mutations
 * @class NewsletterSubscriptionQuery
 * @namespace Query/NewsletterSubscription/Query */
export class NewsletterSubscriptionQuery {
    getSubscribeToNewsletterMutation(
        email: string,
    ): Mutation<'subscribeEmailToNewsletter', { status: GQLSubscriptionStatusesEnum }> {
        return new Mutation<'subscribeEmailToNewsletter', { status: GQLSubscriptionStatusesEnum }>(
            'subscribeEmailToNewsletter',
        )
            .addArgument('email', 'String!', email)
            .addFieldList(this._getPageFields());
    }

    _getPageFields(): Field<'status', GQLSubscriptionStatusesEnum>[] {
        return [
            new Field<'status', GQLSubscriptionStatusesEnum>('status'),
        ];
    }
}

export default new NewsletterSubscriptionQuery();
