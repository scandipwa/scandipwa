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

/** @namespace Query/ProductAlerts/Query */
export class ProductAlertsQuery {
    getProductAlertSubscribeMutation(productId, type) {
        return new Field('productAlertSubscribe')
            .addArgument('productId', 'ID!', productId)
            .addArgument('type', 'String!', type);
    }
}

export default new ProductAlertsQuery();
