/* eslint-disable spaced-comment */
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

import { PRODUCT_TYPE } from 'Component/Product/Product.config';
import { STOCK_TYPE } from 'Component/Product/Stock.config';
import { formatPrice } from 'Util/Price';

export const DEFAULT_MIN_PRODUCTS = 1;
export const DEFAULT_MAX_PRODUCTS = 999;

export const MIN_SALE_QTY = 'min_sale_qty';
export const MAX_SALE_QTY = 'max_sale_qty';
export const SALABLE_QTY = 'salable_qty';

/** @namespace Util/Product/Extract/getFieldQty */
export const getFieldQty = (product, field) => {
    if (field === MIN_SALE_QTY || field === MAX_SALE_QTY) {
        const { stock_item: { [field]: qty } = {} } = product;
        return qty;
    }

    const { [field]: qty } = product;
    return qty;
};

/**
 * Returns product quantity for specific field (with fallback value)
 * @param product
 * @param defaultValue
 * @param field
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getQuantity
 */
export const getQuantity = (product, defaultValue, field, configIndex = -1) => {
    if (!product) {
        return defaultValue;
    }

    const qty = getFieldQty(product, field);

    if (!qty) {
        return defaultValue;
    }

    const { variants } = product;

    if ((!configIndex && !variants) || configIndex === -1) {
        return qty;
    }

    const variantQty = getFieldQty(variants[configIndex] || {}, field);

    return variantQty || qty;
};

/**
 * Returns minimum purchasable item quantity
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getMinQuantity
 */
export const getMinQuantity = (product, configIndex = -1) => (
    getQuantity(product, DEFAULT_MIN_PRODUCTS, MIN_SALE_QTY, configIndex)
);

/**
 * Returns maximum purchasable item quantity.
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getMaxQuantity
 */
export const getMaxQuantity = (product, configIndex = -1) => {
    const maxQuantity = getQuantity(product, DEFAULT_MAX_PRODUCTS, MAX_SALE_QTY, configIndex);
    const salableQuantity = getQuantity(product, DEFAULT_MAX_PRODUCTS, SALABLE_QTY, configIndex);
    return Math.min(maxQuantity, salableQuantity);
};

/**
 * Returns active products name
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getName
 */
export const getName = (product, configIndex = -1) => {
    const { variants = [] } = product;

    const {
        name = ''
    } = variants[configIndex] || product;

    return name;
};

/**
 * Returns whether or not product is in stock (true if in stock | false if out of stock)
 * @param product
 * @param parentProduct
 * @returns {boolean}
 * @namespace Util/Product/Extract/getProductInStock
 */
export const getProductInStock = (product, parentProduct = {}) => {
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

    if (type === PRODUCT_TYPE.bundle) {
        const { items = [] } = product;
        const requiredItems = items.filter(({ required }) => required);
        const requiredItemsInStock = requiredItems.filter(
            ({ options }) => options.some(({ product }) => getProductInStock(product))
        );

        return inStock && requiredItemsInStock.length === requiredItems.length;
    }

    if (type === PRODUCT_TYPE.configurable && parentProduct === product) {
        return inStock && !!variants.some((variant) => getProductInStock(variant, product));
    }

    const { type_id: parentTypeId = false } = parentProduct;

    if (parentTypeId === PRODUCT_TYPE.configurable && parentProduct !== product) {
        const {
            stock_item: {
                in_stock: parentInStock = true
            } = {},
            stock_status: parentStockStatus
        } = parentProduct;

        return parentInStock && parentStockStatus !== STOCK_TYPE.OUT_OF_STOCK && getProductInStock(product);
    }

    if (type === PRODUCT_TYPE.grouped) {
        return inStock && !!items.some(({ product }) => getProductInStock(product));
    }

    const { stock_status: stockStatus } = product;

    return stockStatus !== STOCK_TYPE.OUT_OF_STOCK && (inStock || stockStatus === STOCK_TYPE.IN_STOCK);
};

/**
 * Checks if bundle option exist in options (ignoring quantity)
 * @param uid
 * @param options
 * @namespace Util/Product/Extract/getBundleOption
 */
export const getBundleOption = (uid, options = []) => {
    const uidParts = atob(uid).split('/');
    return options.find(({ uid: linkedUid }) => {
        const linkedUidParts = atob(linkedUid).split('/');

        if (uidParts.length !== linkedUidParts.length) {
            return false;
        }

        // eslint-disable-next-line fp/no-loops,fp/no-let
        for (let i = 0; i < uidParts.length - 1; i++) {
            if (uidParts[i] !== linkedUidParts[i]) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Returns price object for product.
 * @param priceRange
 * @param dynamicPrice
 * @param adjustedPrice
 * @param type
 * @param options
 * @returns {{originalPrice: {maxFinalPriceExclTax: {valueFormatted: string}, minFinalPrice: {valueFormatted: string}, minFinalPriceExclTax: {valueFormatted: string}, maxFinalPrice: {valueFormatted: string}}, price: {originalPriceExclTax: {currency: string, value: (number|number)}, originalPrice: {currency: string, value: (number|number)}, finalPriceExclTax: {currency: string, value: (number|number)}, finalPrice: {currency: string, value: (number|number)}, discount: {percentOff: number}}}}
 * @namespace Util/Product/Extract/getPrice
 */
export const getPrice = (
    priceRange,
    dynamicPrice = false,
    adjustedPrice = {},
    type = PRODUCT_TYPE.simple,
    options = []
) => {
    const priceAcc = type === PRODUCT_TYPE.bundle
        ? 'default_final_price'
        : 'regular_price';
    const priceExcTaxAcc = type === PRODUCT_TYPE.bundle || type === PRODUCT_TYPE.configurable
        ? 'default_final_price_excl_tax'
        : 'regular_price_excl_tax';
    const accessRange = type === PRODUCT_TYPE.virtual || type === PRODUCT_TYPE.downloadable
        ? 'maximum_price'
        : 'minimum_price';

    const {
        [accessRange]: {
            [priceAcc]: { currency = 'USD', value: basePrice = 0 } = {},
            [priceExcTaxAcc]: { value: basePriceExclTax = 0 } = {},
            discount: {
                percent_off: percentOffRef = 0,
                amount_off: amountOff = 0
            } = {}
        } = {},
        minimum_price: {
            regular_price: minRegularPrice = {},
            final_price: minFinalPrice = {},
            final_price_excl_tax: minFinalPriceExclTax = {}
        } = {},
        maximum_price: {
            regular_price: maxRegularPrice = {},
            final_price: maxFinalPrice = {},
            final_price_excl_tax: maxFinalPriceExclTax = {}
        } = {}
    } = priceRange || {};

    // Fixes decimal misplacement for discount
    // eslint-disable-next-line no-magic-numbers
    const percentOffCalc = (amountOff / basePrice) * 100;
    // eslint-disable-next-line no-magic-numbers
    const percentOff = Math.round(percentOffCalc * 100) / 100 === percentOffRef
        ? percentOffCalc
        : percentOffRef;

    // eslint-disable-next-line no-magic-numbers
    const discountValue = (1 - percentOff / 100);
    // eslint-disable-next-line no-magic-numbers
    const discountValueRevert = discountValue === 0 ? 1 : discountValue;

    const basePriceExclDiscount = priceAcc === 'default_final_price'
        ? basePrice / discountValueRevert
        : basePrice;
    const basePriceExclDiscountExclTax = priceAcc === 'default_final_price'
        ? basePriceExclTax / discountValueRevert
        : basePriceExclTax;

    const priceValue = { value: dynamicPrice ? 0 : basePriceExclDiscount * discountValue, currency };
    const priceValueExclTax = { value: dynamicPrice ? 0 : basePriceExclDiscountExclTax * discountValue, currency };
    const priceValueExclDiscount = { value: dynamicPrice ? 0 : basePriceExclDiscount, currency };
    const priceValueExclDiscountExclTax = { value: dynamicPrice ? 0 : basePriceExclDiscountExclTax, currency };

    // Adds adjusted price
    Object.keys(adjustedPrice || {}).forEach((key) => {
        const { [key]: group } = adjustedPrice;
        const {
            inclTax = 0,
            exclTax = 0,
            requiresDiscountCalculations = true,
            hasDiscountCalculated = false
        } = group;

        if (requiresDiscountCalculations) {
            if (hasDiscountCalculated) {
                priceValue.value += inclTax;
                priceValueExclTax.value += exclTax;
                priceValueExclDiscount.value += inclTax / discountValueRevert;
                priceValueExclDiscountExclTax.value += exclTax / discountValueRevert;
            } else {
                priceValue.value += inclTax * discountValue;
                priceValueExclTax.value += exclTax * discountValue;
                priceValueExclDiscount.value += inclTax;
                priceValueExclDiscountExclTax.value += exclTax;
            }
        } else {
            priceValue.value += inclTax;
            priceValueExclTax.value += exclTax;
            priceValueExclDiscount.value += inclTax;
            priceValueExclDiscountExclTax.value += exclTax;
        }
    });

    // Adds formatted price option
    priceValue.valueFormatted = formatPrice(priceValue.value, currency);
    priceValueExclTax.valueFormatted = formatPrice(priceValueExclTax.value, currency);
    priceValueExclDiscount.valueFormatted = formatPrice(priceValueExclDiscount.value, currency);
    priceValueExclDiscountExclTax.valueFormatted = formatPrice(priceValueExclDiscountExclTax.value, currency);

    const configuration = {
        containsOptions: options && !!options.length,
        containsOptionsWithPrice: false,
        containsRequiredOptions: false,
        containsRequiredOptionsWithPrice: false
    };

    if (options) {
        configuration.containsOptionsWithPrice = !!options.find(
            ({ value = [] }) => Array.isArray(value) && value.find(({ price }) => price)
        );
        const requiredOptions = options.filter(({ required }) => required);
        configuration.containsRequiredOptions = !!requiredOptions.length;

        if (requiredOptions.length) {
            configuration.containsRequiredOptionsWithPrice = !!requiredOptions.find(
                ({ value = [] }) => Array.isArray(value) && value.find(({ price }) => price)
            );
        }
    }

    return {
        price: {
            finalPrice: priceValue,
            finalPriceExclTax: priceValueExclTax,
            originalPrice: priceValueExclDiscount,
            originalPriceExclTax: priceValueExclDiscountExclTax,
            discount: {
                percentOff
            }
        },
        originalPrice: {
            minRegularPrice: {
                ...minRegularPrice,
                valueFormatted: formatPrice(minRegularPrice.value || 0, currency)
            },
            minFinalPrice: {
                ...minFinalPrice,
                valueFormatted: formatPrice(minFinalPrice.value || 0, currency)
            },
            minFinalPriceExclTax: {
                ...minFinalPriceExclTax,
                valueFormatted: formatPrice(minFinalPriceExclTax.value || 0, currency)
            },
            maxRegularPrice: {
                ...maxRegularPrice,
                valueFormatted: formatPrice(maxRegularPrice.value || 0, currency)
            },
            maxFinalPrice: {
                ...maxFinalPrice,
                valueFormatted: formatPrice(maxFinalPrice.value || 0, currency)
            },
            maxFinalPriceExclTax: {
                ...maxFinalPriceExclTax,
                valueFormatted: formatPrice(maxFinalPriceExclTax.value || 0, currency)
            }
        },
        configuration
    };
};

/**
 * Generates adjusted price from entered product options
 *
 * @param product
 * @param downloadableLinks
 * @param enteredOptions
 * @param selectedOptions
 * @namespace Util/Product/Extract/getAdjustedPrice
 */
export const getAdjustedPrice = (product, downloadableLinks, enteredOptions, selectedOptions) => {
    const {
        downloadable_product_links = [],
        options = [],
        items = [],
        dynamic_price: dynamicPrice = false,
        type_id: typeId
    } = product;

    const adjustedPrice = {
        downloadable: {
            exclTax: 0,
            inclTax: 0,
            requiresDiscountCalculations: true,
            hasDiscountCalculated: false
        },
        bundle: {
            exclTax: 0,
            inclTax: 0,
            requiresDiscountCalculations: true,
            hasDiscountCalculated: true
        },
        config: {
            exclTax: 0,
            inclTax: 0,
            requiresDiscountCalculations: false
        }
    };

    //#region DOWNLOADABLE
    if (typeId === PRODUCT_TYPE.downloadable) {
        downloadableLinks.forEach((uid) => {
            const link = downloadable_product_links.find(({ uid: linkUid }) => linkUid === uid);

            if (link) {
                const { price } = link;
                adjustedPrice.downloadable.exclTax += price;
                adjustedPrice.downloadable.inclTax += price;
            }
        });
    }
    //#endregion

    //#region BUNDLE
    if (typeId === PRODUCT_TYPE.bundle) {
        selectedOptions.forEach((uid) => {
            items.forEach(({ options = [] }) => {
                const uidParts = atob(uid).split('/');
                const option = Array.isArray(options) && getBundleOption(uid, options);
                const quantity = +uidParts[uidParts.length - 1];

                if (option) {
                    const {
                        finalOptionPrice,
                        finalOptionPriceExclTax,
                        product: {
                            price_range: optionProductPriceRange = {},
                            type_id: optionProductType,
                            dynamic_price: optionProductDynamic
                        },
                        can_change_quantity: canChangeQuantity = false
                    } = option;

                    if (!dynamicPrice) {
                        const multiplier = canChangeQuantity ? quantity : quantity;
                        adjustedPrice.bundle.exclTax += finalOptionPriceExclTax * multiplier;
                        adjustedPrice.bundle.inclTax += finalOptionPrice * multiplier;
                    } else {
                        const {
                            price: {
                                finalPrice: { value: priceInclTax = 0 } = {},
                                finalPriceExclTax: { value: priceExclTax = 0 } = {}
                            }
                        } = getPrice(
                            optionProductPriceRange, optionProductDynamic, {}, optionProductType
                        ) || {};

                        adjustedPrice.bundle.inclTax += priceInclTax * quantity;
                        adjustedPrice.bundle.exclTax += priceExclTax * quantity;
                    }
                }
            });
        });
    }
    //#endregion

    //#region CONFIGURABLE
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
    //#endregion

    return adjustedPrice;
};

//#region IMAGE
/**
 * Returns product image based on variable field, on fail placeholder
 * @param product
 * @param field
 * @namespace Util/Product/Extract/getImage
 */
export const getImage = (product, field) => {
    const { [field]: { url = 'no_selection' } = {} } = product;
    return url && url !== 'no_selection' ? url : '';
};

/**
 * Returns products thumbnail image
 * @param product
 * @namespace Util/Product/Extract/getThumbnailImage
 */
export const getThumbnailImage = (product) => getImage(product, 'thumbnail');

/**
 * Returns products small image
 * @param product
 * @namespace Util/Product/Extract/getSmallImage
 */
export const getSmallImage = (product) => getImage(product, 'small_image');

/**
 * Returns products base image
 * @param product
 * @namespace Util/Product/Extract/getBaseImage
 */
export const getBaseImage = (product) => getImage(product, 'image');
//#endregion
