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

import { IN_STOCK } from 'Component/ProductCard/ProductCard.config';
import { BUNDLE, CONFIGURABLE, GROUPED } from 'Util/Product/Types';

/**
 * Returns whether or not product is in stock (true if in stock | false if out of stock)
 * @param product
 * @param configIndex
 * @returns {boolean}
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

    if (type === BUNDLE) {
        const { items = [] } = product;
        const requiredItems = items.filter(({ required }) => required);
        const requiredItemsInStock = requiredItems.filter(
            ({ options }) => options.some(({ product }) => getProductInStock(product))
        );

        return inStock && requiredItemsInStock.length === requiredItems.length;
    }

    if (type === CONFIGURABLE && configIndex === -1) {
        return inStock && !!variants.some((product) => getProductInStock(product));
    }

    if (type === GROUPED) {
        return inStock && !!items.some(({ product }) => getProductInStock(product));
    }

    const { stock_status: stockStatus } = variants[configIndex] || product;

    return stockStatus === IN_STOCK;
};
