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

    confirmSubscribeToNewsletterMutation(
        id: string,
        code: string,
    ): Mutation<'confirmSubscribingToNewsletter', {
            status: string;
            message: string;
        }> {
        return new Mutation<'confirmSubscribingToNewsletter', {
            status: string;
            message: string;
        }>(
            'confirmSubscribingToNewsletter',
        )
            .addArgument('id', 'String!', id)
            .addArgument('code', 'String!', code)
            .addFieldList(this._getConfirmFields());
    }

    _getConfirmFields(): Array<
    Field<'status', string>
    | Field<'message', string>
    > {
        return [
            new Field<'status', string>('status'),
            new Field<'message', string>('message'),
        ];
    }
}

export default new NewsletterSubscriptionQuery();
