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

import LinkedProductsReducer from './LinkedProducts.reducer';
import LinkedProductsDispatcher, {
    LinkedProductsDispatcher as LinkedProductsDispatcherClass
} from './LinkedProducts.dispatcher';

import {
    UPDATE_LINKED_PRODUCTS,
    updateLinkedProducts
} from './LinkedProducts.action';

export {
    LinkedProductsReducer,
    LinkedProductsDispatcher,
    LinkedProductsDispatcherClass,
    UPDATE_LINKED_PRODUCTS,
    updateLinkedProducts
};
