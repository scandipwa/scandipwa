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

import { PRODUCT_TYPE } from 'Config/Product.config';
import { IN_STOCK } from 'Config/Stock.config';

export const DEFAULT_MIN_PRODUCTS = 1;
export const DEFAULT_MAX_PRODUCTS = 100;

export const getQuantity = (product, defaultValue, field, configIndex = -1) => {
    const {
        stock_item: { [field]: qty } = {},
        variants
    } = product;

    if (!qty) {
        return defaultValue;
    }

    if ((!configIndex && !variants) || configIndex === -1) {
        return qty;
    }

    const { stock_item: { [field]: variantQty } = {} } = variants[configIndex] || {};

    return variantQty || qty;
};

/**
 * Returns minimum purchasable item quantity
 * @param product
 * @param configIndex
 * @returns {*}
 */
export const getMinQuantity = (product, configIndex = -1) => (
    getQuantity(product, DEFAULT_MIN_PRODUCTS, 'min_sale_qty', configIndex)
);

/**
 * Returns maximum purchasable item quantity.
 * @param product
 * @param configIndex
 * @returns {*}
 */
export const getMaxQuantity = (product, configIndex = -1) => (
    getQuantity(product, DEFAULT_MAX_PRODUCTS, 'max_sale_qty', configIndex)
);

/**
 * Returns active products name
 * @param product
 * @param configIndex
 * @returns {*}
 */
export const getName = (product, configIndex = -1) => {
    const { variants = [] } = product;

    const {
        name
    } = variants[configIndex] || product;

    return name;
};

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

    const { type_id, variants = [], items = [] } = product;

    if (type_id === PRODUCT_TYPE.bundle) {
        const { items = [] } = product;
        const requiredItems = items.filter(({ required }) => required);
        const requiredItemsInStock = requiredItems.filter(
            ({ options }) => options.some(({ product }) => getProductInStock(product))
        );

        return requiredItemsInStock.length === requiredItems.length;
    }

    if (type_id === PRODUCT_TYPE.configurable && configIndex === -1) {
        return !!variants.some(({ product }) => getProductInStock(product));
    }

    if (type_id === PRODUCT_TYPE.grouped && configIndex === -1) {
        return !!items.some(({ product }) => getProductInStock(product));
    }

    const { stock_status } = variants[configIndex] || product;

    return stock_status === IN_STOCK;
};

export const getPrice = (product, adjustedPrice = {}) => {
    const {
        price_range: {
            minimum_price: {
                regular_price: { currency = '', value: basePrice = 0 } = {},
                regular_price_excl_tax: { value: basePriceExclTax = 0 } = {},
                discount: { percent_off = 0 } = {},
                discount
            } = {}
        } = {}
    } = product || {};

    // eslint-disable-next-line no-magic-numbers
    const discountValue = (1 - percent_off / 100);
    const priceValue = { value: basePrice, currency };
    const priceValueExclTax = { value: basePriceExclTax, currency };

    Object.keys(adjustedPrice).forEach((key) => {
        const { [key]: group } = adjustedPrice;
        if (typeof group === 'object') {
            const { inclTax = 0, exclTax = 0 } = group;
            priceValue.value += inclTax;
            priceValueExclTax.value += exclTax;
        } else {
            priceValue.value += group;
            priceValueExclTax.value += group;
        }
    });

    priceValue.value *= discountValue;
    priceValueExclTax.value *= discountValue;

    return {
        minimum_price: {
            final_price: priceValue,
            regular_price: priceValue,
            final_price_excl_tax: priceValueExclTax,
            regular_price_excl_tax: priceValueExclTax,
            discount
        }
    };
};

export const getAdjustedPrice = (product, downloadableLinks, enteredOptions, selectedOptions) => {
    const {
        downloadable_product_links = [],
        options = [],
        items = [],
        type_id: typeId
    } = product;

    const adjustedPrice = {
        downloadable: 0,
        group: 0,
        bundle: {
            exclTax: 0,
            inclTax: 0
        },
        config: {
            exclTax: 0,
            inclTax: 0
        }
    };

    // Downloadable
    if (typeId === PRODUCT_TYPE.downloadable) {
        downloadableLinks.forEach((uid) => {
            const link = downloadable_product_links.find(({ uid: linkUid }) => linkUid === uid);

            if (link) {
                const { price } = link;
                adjustedPrice.downloadable += price;
            }
        });
    }

    // Grouped

    // Bundle
    if (typeId === PRODUCT_TYPE.bundle) {
        selectedOptions.forEach((uid) => {
            items.forEach(({ options = [] }) => {
                const option = Array.isArray(options) && options.find(({ uid: linkedUid }) => linkedUid === uid);
                if (option) {
                    const {
                        price = 0,
                        price_type: priceType,
                        product
                    } = option;

                    if (priceType === 'FIXED') {
                        adjustedPrice.bundle.inclTax += price;
                    } else {
                        const {
                            minimum_price: {
                                final_price: { value: priceInclTax = 0 } = {},
                                final_price_excl_tax: { value: priceExclTax = 0 } = {}
                            }
                        } = getPrice(product) || {};

                        adjustedPrice.bundle.inclTax += priceInclTax;
                        adjustedPrice.bundle.exclTax += priceExclTax;
                    }
                }
            });
        });
    }

    // Config
    enteredOptions.forEach(({ uid }) => {
        const option = options.find(({ uid: linkUid }) => linkUid === uid);
        if (option) {
            const { value: { priceExclTax = 0, priceInclTax = 0 } = {} } = option;
            adjustedPrice.config.inclTax += priceInclTax;
            adjustedPrice.config.exclTax += priceExclTax;
        }
    });

    selectedOptions.forEach((uid) => {
        options.forEach(({ value = [] }) => {
            const option = Array.isArray(value) && value.find(({ uid: linkedUid }) => linkedUid === uid);
            if (option) {
                const { priceExclTax = 0, priceInclTax = 0 } = option;
                adjustedPrice.config.inclTax += priceInclTax;
                adjustedPrice.config.exclTax += priceExclTax;
            }
        });
    });

    return adjustedPrice;
};
