/* eslint-disable import/prefer-default-export */
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

import { PRODUCT_OUT_OF_STOCK } from 'Component/CartItem/CartItem.config';

/**
 * Checks whether some items in cart are out of stock
 * @param {Array} items cartTotals items
 * @namespace Util/Cart/hasOutOfStockProductsInCartItems */
export const hasOutOfStockProductsInCartItems = (items) => items.some((item) => {
    const hasOutOfStock = item.product.stock_status === PRODUCT_OUT_OF_STOCK;

    if (hasOutOfStock) {
        return true;
    }

    const hasVariants = item.product.variants && item.product.variants.length > 0;

    if (!hasVariants || !item.product.variants.some((variant) => variant.sku === item.sku)) {
        return true;
    }

    return false;
});
