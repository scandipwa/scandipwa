// TODO remove eslint disable
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-shadow */
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

import { ProductType } from 'Component/Product/Product.config';
import { AdjustedPriceMap, ProductOption } from 'Component/Product/Product.type';
import { ImageType } from 'Component/ProductGallery/ProductGallery.config';
import {
    GroupedProductItem,
    Money,
    PriceRange
} from 'Query/ProductList.type';
import { GQLCurrencyEnum, GQLProductStockStatus } from 'Type/Graphql.type';
import { decodeBase64 } from 'Util/Base64';
import { FieldValue } from 'Util/Form/Form.type';
import { formatPrice } from 'Util/Price';

import {
    DEFAULT_MAX_PRODUCTS,
    DEFAULT_MIN_PRODUCTS,
    IndexedBundleItem,
    IndexedBundleOption,
    IndexedProduct,
    IndexedVariant,
    ProductExtractImage,
    ProductExtractPrice,
    QtyFields,
    StockCheckProduct
} from './Product.type';

// TODO unify keyof product and stockitem.
/** @namespace Util/Product/Extract/getFieldQty */
export const getFieldQty = (
    product: Partial<IndexedProduct> | Partial<IndexedVariant>,
    field: QtyFields
): number => {
    if (field === QtyFields.MIN_SALE_QTY || field === QtyFields.MAX_SALE_QTY) {
        const { stock_item: { [field]: qty = 0 } = {} } = product;

        return qty;
    }

    const { [field]: qty } = product;

    return qty || 0;
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
export const getQuantity = (
    product: IndexedProduct,
    defaultValue: number,
    field: QtyFields,
    configIndex = -1
): number => {
    if (!product) {
        return defaultValue;
    }

    const qty = getFieldQty(product, field);

    if (!qty) {
        return defaultValue;
    }

    const { variants } = product;

    if ((!configIndex && !variants) || configIndex === -1 || typeof variants === 'undefined') {
        return qty;
    }

    const variantQty = getFieldQty(variants[configIndex], field);

    return variantQty || qty;
};

/**
 * Returns minimum purchasable item quantity
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getMinQuantity
 */
export const getMinQuantity = (product: IndexedProduct, configIndex = -1): number => (
    getQuantity(product, DEFAULT_MIN_PRODUCTS, QtyFields.MIN_SALE_QTY, configIndex)
);

/**
 * Returns maximum purchasable item quantity.
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getMaxQuantity
 */
export const getMaxQuantity = (product: IndexedProduct, configIndex = -1): number => {
    const maxQuantity: number = getQuantity(
        product, DEFAULT_MAX_PRODUCTS,
        QtyFields.MAX_SALE_QTY,
        configIndex
    );
    const salableQuantity: number = getQuantity(
        product, DEFAULT_MAX_PRODUCTS,
        QtyFields.SALABLE_QTY,
        configIndex
    );

    return Math.min(maxQuantity, salableQuantity);
};

/**
 * Returns active products name
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Util/Product/Extract/getName
 */
export const getName = (product: IndexedProduct, configIndex = -1): string => {
    const { variants = [] } = product;

    const {
        name = ''
    } = variants[configIndex] || product;

    return name;
};

/** @namespace Util/Product/Extract/getProductOptionInStock */
export const getProductOptionInStock = (product: IndexedProduct): boolean => {
    const { stock_status: stockStatus } = product;

    return stockStatus !== GQLProductStockStatus.OUT_OF_STOCK && stockStatus === GQLProductStockStatus.IN_STOCK;
};

/**
 * Returns whether or not product is in stock (true if in stock | false if out of stock)
 * @param product
 * @param parentProduct
 * @returns {boolean}
 * @namespace Util/Product/Extract/getProductInStock
 */
export const getProductInStock = (
    product: Partial<StockCheckProduct>,
    parentProduct?: Partial<StockCheckProduct>
): boolean => {
    if (!product) {
        return false;
    }

    const {
        type_id: type,
        stock_item: {
            in_stock: inStock = true
        } = {}
    } = product;

    if (type === ProductType.BUNDLE) {
        const { items = [] } = product;
        const requiredItems = (items as IndexedBundleItem[]).filter(({ required }) => required);
        const requiredItemsInStock = requiredItems.filter(
            ({ options }) => options?.some(({ product: optionProduct }) => getProductOptionInStock(optionProduct))
        );

        return inStock && requiredItemsInStock.length === requiredItems.length;
    }

    if (type === ProductType.CONFIGURABLE && parentProduct === product) {
        const { variants = [] } = product;

        return inStock && !!variants.some((variant) => getProductInStock(
            variant,
            product
        ));
    }

    const { type_id: parentTypeId = false } = parentProduct || {};

    if (parentTypeId === ProductType.CONFIGURABLE && parentProduct !== product) {
        const {
            stock_item: {
                in_stock: parentInStock = true
            } = {},
            stock_status: parentStockStatus
        } = parentProduct || {};

        return parentInStock && parentStockStatus !== GQLProductStockStatus.OUT_OF_STOCK && getProductInStock(product);
    }

    if (type === ProductType.GROUPED) {
        const { items = [] } = product;

        return inStock && !!(items as GroupedProductItem[]).some(
            ({ product: groupedProduct }) => getProductInStock(groupedProduct as StockCheckProduct)
        );
    }

    const { stock_status: stockStatus } = product;

    return stockStatus !== GQLProductStockStatus.OUT_OF_STOCK
        && (inStock || stockStatus === GQLProductStockStatus.IN_STOCK);
};

/**
 * Checks if items in Grouped Product are in stock
 * @param product: productGroup
 * @param products: products in stock
 * @namespace Util/Product/Extract/getGroupedProductsInStockQuantity */

export const getGroupedProductsInStockQuantity = (
    { items = [] }: Partial<IndexedProduct>
): Record<number, number> => (items as GroupedProductItem[]).reduce((acc: Record<number, number>, {
    product, product: { id }, qty = 1
}) => (getProductInStock(product as StockCheckProduct) ? { ...acc, [id]: qty } : acc), {});

/**
 * Checks if bundle option exist in options (ignoring quantity)
 * @param uid
 * @param options
 * @namespace Util/Product/Extract/getBundleOption
 */
export const getBundleOption = (
    uid: string, options: IndexedBundleOption[] = []
): IndexedBundleOption | undefined => {
    const uidParts = decodeBase64(uid).split('/');
    return options.find(({ uid: linkedUid = '' }) => {
        const linkedUidParts = decodeBase64(linkedUid).split('/');

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
    priceRange: Partial<PriceRange>,
    dynamicPrice = false,
    adjustedPrice: Partial<AdjustedPriceMap> = {},
    type: ProductType = ProductType.SIMPLE,
    options = []
): ProductExtractPrice => {
    const priceAcc = type === ProductType.BUNDLE
        ? 'default_final_price'
        : 'regular_price';
    const priceExcTaxAcc = type === ProductType.BUNDLE || type === ProductType.CONFIGURABLE
        ? 'default_final_price_excl_tax'
        : 'regular_price_excl_tax';
    const accessRange = type === ProductType.VIRTUAL || type === ProductType.DOWNLOADABLE
        ? 'maximum_price'
        : 'minimum_price';

    const {
        [accessRange]: {
            [priceAcc]: { currency = GQLCurrencyEnum.USD, value: basePrice = 0 } = {},
            [priceExcTaxAcc]: { value: basePriceExclTax = 0 } = {},
            discount: {
                percent_off: percentOffRef = 0,
                amount_off: amountOff = 0
            } = {}
        } = {},
        minimum_price: {
            regular_price: minRegularPrice = {} as Money,
            final_price: minFinalPrice = {} as Money,
            final_price_excl_tax: minFinalPriceExclTax = {} as Money
        } = {},
        maximum_price: {
            regular_price: maxRegularPrice = {} as Money,
            final_price: maxFinalPrice = {} as Money,
            final_price_excl_tax: maxFinalPriceExclTax = {} as Money
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

    const priceValue = {
        value: dynamicPrice ? 0 : basePriceExclDiscount * discountValue,
        currency,
        valueFormatted: '0'
    };
    const priceValueExclTax = {
        value: dynamicPrice ? 0 : basePriceExclDiscountExclTax * discountValue,
        currency,
        valueFormatted: '0'
    };
    const priceValueExclDiscount = {
        value: dynamicPrice ? 0 : basePriceExclDiscount,
        currency,
        valueFormatted: '0'
    };
    const priceValueExclDiscountExclTax = {
        value: dynamicPrice ? 0 : basePriceExclDiscountExclTax,
        currency,
        valueFormatted: '0'
    };

    // Adds adjusted price
    Object.keys(adjustedPrice || {}).forEach((key) => {
        const { [key as keyof AdjustedPriceMap]: group } = adjustedPrice;
        const {
            inclTax = 0,
            exclTax = 0,
            requiresDiscountCalculations = true,
            hasDiscountCalculated = false
        } = group || {};

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
export const getAdjustedPrice = (
    product: IndexedProduct,
    downloadableLinks: string[],
    enteredOptions: ProductOption[],
    selectedOptions: FieldValue<string, false>[]
): AdjustedPriceMap => {
    const {
        options = [],
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
            requiresDiscountCalculations: false,
            hasDiscountCalculated: false
        }
    };

    // #region DOWNLOADABLE
    if (typeId === ProductType.DOWNLOADABLE) {
        const { downloadable_product_links = [] } = product;
        downloadableLinks.forEach((uid) => {
            const link = downloadable_product_links.find(({ uid: linkUid }) => linkUid === uid);

            if (link) {
                const { price } = link;
                adjustedPrice.downloadable.exclTax += price;
                adjustedPrice.downloadable.inclTax += price;
            }
        });
    }
    // #endregion

    // #region BUNDLE
    if (typeId === ProductType.BUNDLE) {
        const { items = [], dynamic_price: dynamicPrice = false } = product;

        selectedOptions.forEach((uid) => {
            (items as IndexedBundleItem[]).forEach(({ options: sldOptions = [] }) => {
                const uidParts = decodeBase64(uid).split('/');
                const option = Array.isArray(options) && getBundleOption(uid, sldOptions);
                const quantity = +uidParts[uidParts.length - 1];

                if (option) {
                    const {
                        finalOptionPrice,
                        finalOptionPriceExclTax,
                        product: {
                            price_range: optionProductPriceRange,
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
    // #endregion

    // #region CONFIGURABLE
    enteredOptions.forEach(({ uid }) => {
        const option = options.find(({ uid: linkUid }) => linkUid === uid);

        if (option) {
            const { value } = option;

            if ('priceInclTax' in value) {
                const { priceExclTax = 0, priceInclTax = 0 } = value;
                adjustedPrice.config.inclTax += priceInclTax;
                adjustedPrice.config.exclTax += priceExclTax;
            }
        }
    });

    selectedOptions.forEach((uid) => {
        options.forEach(({ value = [] }) => {
            const option = Array.isArray(value) && value.find((option) => {
                if ('uid' in option) {
                    const { uid: linkedUid } = option;

                    return linkedUid === uid;
                }

                return false;
            });

            if (option) {
                const { priceExclTax = 0, priceInclTax = 0 } = option;
                adjustedPrice.config.inclTax += priceInclTax;
                adjustedPrice.config.exclTax += priceExclTax;
            }
        });
    });
    // #endregion

    return adjustedPrice;
};

// #region SubLabel
/**
 * Returns ProductCustomizable Text/TextArea Option Sublabel based on Maximum characters setup in BE
 * @param maxCharacters
 * @param value
 * @namespace Util/Product/Extract/getSubLabelFromMaxCharacters
 */
export const getSubLabelFromMaxCharacters = (maxCharacters: number, value = ''): string | null => {
    const valueLength = value.length;
    const remainingCharacters = maxCharacters - valueLength;

    if (maxCharacters > 0) {
        if (valueLength > 0 && valueLength <= maxCharacters) {
            return __('Maximum %s characters (%s remaining)', maxCharacters, remainingCharacters);
        }

        if (valueLength >= maxCharacters) {
            return null;
        }

        return __('Maximum %s characters', maxCharacters);
    }

    return null;
};
// #endregion

// #region IMAGE
/**
 * Returns product image based on variable field, on fail placeholder
 * @param product
 * @param field
 * @namespace Util/Product/Extract/getImage
 */
export const getImage = (product: Partial<ProductExtractImage>, field: ImageType): string => {
    const { [field]: { url = 'no_selection' } = {} } = product;
    return url && url !== 'no_selection' ? url : '';
};

/**
 * Returns products thumbnail image
 * @param product
 * @namespace Util/Product/Extract/getThumbnailImage
 */
export const getThumbnailImage = (
    product: Partial<ProductExtractImage>
): string => getImage(product, ImageType.THUMBNAIL);

/**
 * Returns products small image
 * @param product
 * @namespace Util/Product/Extract/getSmallImage
 */
export const getSmallImage = (product: Partial<ProductExtractImage>): string => getImage(product, ImageType.SMALL);

/**
 * Returns products base image
 * @param product
 * @namespace Util/Product/Extract/getBaseImage
 */
export const getBaseImage = (product: Partial<ProductExtractImage>): string => getImage(product, ImageType.IMAGE);
// #endregion
