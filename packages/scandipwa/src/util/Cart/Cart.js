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
 * Checks whether item in cart are out of stock
 * @namespace Util/Cart/itemIsOutOfStock
 * */
export const itemIsOutOfStock = (item) => {
    const {
        product: {
            stock_status,
            variants,
            type_id
        },
        sku: itemSku
    } = item;

    if (stock_status === PRODUCT_OUT_OF_STOCK) {
        // item is out of stock
        return true;
    }

    if (type_id !== 'configurable') {
        // item is not configurable => previous check is sufficient
        return false;
    }

    if (
        variants.some(({ sku }) => sku === itemSku)
        && variants.find(({ sku }) => sku === itemSku).stock_status !== PRODUCT_OUT_OF_STOCK
    ) {
        // item added to cart is present in variants and it stock status is IN_STOCK
        return false;
    }

    return true;
};

/**
 * Checks whether some items in cart are out of stock
 * @param {Array} items cartTotals items
 * @namespace Util/Cart/hasOutOfStockProductsInCartItems */
export const hasOutOfStockProductsInCartItems = (items = []) => items.some(itemIsOutOfStock);
