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

import ProductDispatcher from 'Store/Product/Product.dispatcher';
import getStore from 'Util/Store';

/** @namespace Util/PreLoad/Product */
export class ProductPreload {
    options = {
        isSingleProduct: true,
        args: { filter: { productSKU: window.actionName?.sku } },
    };

    preloadProduct() {
        ProductDispatcher.handleData(getStore().dispatch, this.options);
    }
}

export default new ProductPreload();
