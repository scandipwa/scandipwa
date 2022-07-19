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
 * Email availability check Query
 * @class CheckEmailQuery
 * @namespace Query/CheckEmail/Query */
export class CheckEmailQuery {
    getIsEmailAvailableQuery(email) {
        const query = new Field('isEmailAvailable')
            .addArgument('email', 'String!', email)
            .addField('is_email_available');

        return query;
    }
}

export default new CheckEmailQuery();
