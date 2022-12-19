/* eslint-disable import/prefer-default-export */
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

import {
    LinkedProductsActionType,
    LinkedProductsStore,
    UpdateLinkedProductsAction,
} from './LinkedProducts.type';

/**
 * Update upsell products list (rewrite if already exists).
 * @param  {Array<String>} upsell List of products returned from fetch
 * @return {void}
 * @namespace Store/LinkedProducts/Action/updateLinkedProductsStore */
export const updateLinkedProductsStore = (linkedProducts: Partial<LinkedProductsStore>): UpdateLinkedProductsAction => ({
    type: LinkedProductsActionType.UPDATE_LINKED_PRODUCTS_STORE,
    linkedProducts,
});
