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

/** @namespace Query/ProductAlerts/Query */
export class ProductAlertsQuery {
    getProductAlertSubscribeMutation(productId: string, type: string): Mutation<'productAlertSubscribe', boolean> {
        return new Mutation<'productAlertSubscribe', boolean>('productAlertSubscribe')
            .addArgument('productId', 'ID!', productId)
            .addArgument('type', 'String!', type);
    }
}

export default new ProductAlertsQuery();
