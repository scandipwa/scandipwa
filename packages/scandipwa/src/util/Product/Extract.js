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

import { IN_STOCK, OUT_OF_STOCK } from 'Component/ProductCard/ProductCard.config';
import { BUNDLE, CONFIGURABLE, GROUPED } from 'Util/Product/Types';

/**
 * Returns whether or not product is in stock (true if in stock | false if out of stock)
 * @param product
 * @param configIndex
 * @returns {boolean}
 * @namespace Util/Product/Extract/getProductInStock
 */
export const getProductInStock = (product, configIndex = -1) => {
    if (!product) {
        return false;
    }

    const {
        type_id: type,
        variants = [],
        items = [],
        stock_item: {
            in_stock: inStock = true
        } = {}
    } = product;

    // Bundle (in stock if: itself in stock && each required option contains at-least one in stock product)
    if (type === BUNDLE) {
        const { items = [] } = product;
        const requiredItems = items.filter(({ required }) => required);
        const requiredItemsInStock = requiredItems.filter(
            ({ options }) => options.some(({ product }) => getProductInStock(product))
        );

        return inStock && requiredItemsInStock.length === requiredItems.length;
    }

    // Configurable (in stock if: itself in stock and at-lest one variant is in stock)
    if (type === CONFIGURABLE && configIndex === -1) {
        return inStock && !!variants.some((product) => getProductInStock(product));
    }

    // Configurable variant (in stock if: parent is set to in stock && item itself is in stock)
    if (type === CONFIGURABLE && configIndex !== -1) {
        const activeProduct = variants[configIndex];
        if (activeProduct) {
            const {
                stock_status: activeStockStatus,
                stock_item: {
                    in_stock: activeInStock = true
                } = {}
            } = activeProduct;

            return getProductInStock(product)
                && activeStockStatus !== OUT_OF_STOCK
                && (activeInStock || activeStockStatus === IN_STOCK);
        }
    }

    // Grouped (in stock if: contains at-least one product in stock)
    if (type === GROUPED) {
        return inStock && !!items.some(({ product }) => getProductInStock(product));
    }

    const { stock_status: stockStatus } = variants[configIndex] || product;

    return stockStatus !== OUT_OF_STOCK && (inStock || stockStatus === IN_STOCK);
};
