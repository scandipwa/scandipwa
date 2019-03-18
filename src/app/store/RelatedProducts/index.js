/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import RelatedProductsReducer from './RelatedProducts.reducer';
import RelatedProductsDispatcher from './RelatedProducts.dispatcher';

import {
    UPDATE_RELATED_PRODUCTS,
    updateRelatedProducts
} from './RelatedProducts.action';

export {
    RelatedProductsReducer,
    RelatedProductsDispatcher,
    UPDATE_RELATED_PRODUCTS,
    updateRelatedProducts
};
