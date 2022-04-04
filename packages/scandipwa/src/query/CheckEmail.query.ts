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

import { Query } from '@tilework/opus';

import { GQLIsEmailAvailableOutput } from 'Type/Graphql.type';

/**
 * Email availability check Query
 * @class CheckEmailQuery
 * @namespace Query/CheckEmail/Query */
export class CheckEmailQuery {
    getIsEmailAvailableQuery(email: string): Query<'isEmailAvailable', GQLIsEmailAvailableOutput & {
        is_email_available: boolean;
    }> {
        const query = new Query<'isEmailAvailable', GQLIsEmailAvailableOutput>('isEmailAvailable')
            .addArgument('email', 'String!', email)
            .addField('is_email_available');

        return query;
    }
}

export default new CheckEmailQuery();
