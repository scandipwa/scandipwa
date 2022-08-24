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

import { Field, Query } from '@tilework/opus';

/**
 * Email availability check Query
 * @class CheckEmailQuery
 * @namespace Query/CheckEmail/Query */
export class CheckEmailQuery {
    getIsEmailAvailableQuery(email: string): Query<'isEmailAvailable', { is_email_available: boolean }> {
        const query = new Query<'isEmailAvailable', { is_email_available: boolean }>('isEmailAvailable')
            .addArgument('email', 'String!', email)
            .addField(new Field<'is_email_available', boolean>('is_email_available'));

        return query;
    }
}

export default new CheckEmailQuery();
