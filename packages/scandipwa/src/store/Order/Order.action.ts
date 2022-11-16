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

import { OrderActionType, OrderStore, UpdateOrderStoreAction } from './Order.type';

/** @namespace Store/Order/Action/updateOrderStore */
export const updateOrderStore = (state: Partial<OrderStore>): UpdateOrderStoreAction => ({
    type: OrderActionType.UPDATE_ORDER_STORE,
    state,
});
