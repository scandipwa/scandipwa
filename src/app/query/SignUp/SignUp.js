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

import { Field } from 'Util/Query';

/**
 * SignUp Query
 * @class SignUpQuery
 */
class SignUpQuery {
    getQuery(options) {
        if (!options) throw 'Missing argument `options`';
        const { customer, password } = options;

        const items = new Field('customer')
            .addFieldList([
                'id', 'firstname',
                'lastname', 'email'
            ]);

        return new Field('createCustomer')
            .setComponentType('mutation')
            .addArgument('customer', 'CreateCustomerInput!', customer)
            .addArgument('password', 'String!', password)
            .addField('status')
            .addField('token')
            .addField(items);
    }
}

export default new SignUpQuery();
