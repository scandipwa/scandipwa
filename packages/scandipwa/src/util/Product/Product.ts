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

import { ConfigurableProductSelectedVariantValue } from 'Component/Product/Product.type';
import { REVIEW_POPUP_ID } from 'Component/ProductReviews/ProductReviews.config';
import {
    AttributeWithValue,
    AttributeWithValueOption,
    BundleItem,
    BundleOption,
    BundleOptionSelection,
    BundlePriceOption,
    ConfigurableProductOptions,
    CustomizableProductFragmentOptions,
    ProductItem,
    ProductReview,
    ProductReviews,
    ProductStockItem,
    RatingsBreakdown,
    VariantItem,
} from 'Query/ProductList.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { showPopup } from 'Store/Popup/Popup.action';
import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { decodeBase64 } from 'Util/Base64';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';

import {
    IndexedAttributeWithValue,
    IndexedAttributeWithValueOption,
    IndexedBaseProduct,
    IndexedBundleItem,
    IndexedBundleOption,
    IndexedConfigurableOption,
    IndexedConfigurableOptions,
    IndexedCustomOption,
    IndexedProduct,
    IndexedReview,
    IndexedVariant,
    IndexedWishlistProduct,
    RatingVote,
} from './Product.type';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';

/**
 * Checks whether every option is in attributes
 * @param {Object} attributes
 * @param {{ attribute_code: string }[]} options
 * @returns {boolean}
 * @namespace Util/Product/checkEveryOption
 */
export const checkEveryOption = (
    attributes: Record<string, IndexedAttributeWithValue>,
    options: Record<string, string>,
): boolean => Object.keys(options)
    .every((option) => {
        if (!attributes[option]) {
            return false;
        }

        const { attribute_value } = attributes[option];

        if (typeof options[option] === 'string') {
            return options[option] === attribute_value;
        }

        return Array.isArray(options[option]) && options[option].includes(attribute_value);
    });

/** @namespace Util/Product/getIndexedAttributeOption */
export const getIndexedAttributeOption = (option: AttributeWithValueOption): IndexedAttributeWithValueOption => {
    const { swatch_data: defaultSwatchData } = option;

    if (!defaultSwatchData) {
        return option;
    }

    const { type } = defaultSwatchData;
    const swatch_data = type ? defaultSwatchData : null;

    return {
        ...option,
        swatch_data,
    };
};

/** @namespace Util/Product/getIndexedAttributes */
export const getIndexedAttributes = (
    attributes: AttributeWithValue[],
): Record<string, IndexedAttributeWithValue> => attributes.reduce((indexedAttributes, attribute) => {
    const { attribute_code, attribute_options = [] } = attribute;

    return {
        ...indexedAttributes,
        [attribute_code]: {
            ...attribute,
            attribute_options: attribute_options.reduce((acc, option) => {
                const { value } = option;

                return {
                    ...acc,
                    [value]: getIndexedAttributeOption(option),
                };
            }, {}),
        },
    };
}, {});

/** @namespace Util/Product/getIndexedConfigurableOptions */
export const getIndexedConfigurableOptions = (
    configurableOptions: ConfigurableProductOptions[],
    indexedAttributes: Record<string, IndexedAttributeWithValue>,
): IndexedConfigurableOptions => (
    configurableOptions.reduce((indexedConfigurableOptions, configurableOption) => {
        const { values, attribute_code } = configurableOption;

        return {
            ...indexedConfigurableOptions,
            [attribute_code]: {
                ...configurableOption,
                ...indexedAttributes[attribute_code],
                attribute_values: values.map(({ value_index }) => `${ value_index }`),
            },
        };
    }, {})
);

/** @namespace Util/Product/getIndexedVariants */
export const getIndexedVariants = (
    variants: VariantItem[],
): IndexedVariant[] => variants.map(({ product }) => {
    const { attributes } = product;

    return {
        ...product,
        attributes: getIndexedAttributes(attributes || []),
    };
});

/** @namespace Util/Product/getIndexedSingleVariant */
export const getIndexedSingleVariant = (
    variants: VariantItem[],
    itemSku: string,
): IndexedVariant[] => {
    const index = variants.findIndex(({ product: { sku } }) => sku === itemSku || itemSku.includes(sku));

    if (index < 0) {
        return getIndexedVariants(variants);
    }

    const indexedProduct = variants[index].product;
    const { attributes } = indexedProduct;

    return [
        { ...indexedProduct, attributes: getIndexedAttributes(attributes || []) },
    ];
};

/** @namespace Util/Product/getVariantsIndexes */
export const getVariantsIndexes = (
    variants: IndexedVariant[],
    options: Record<string, string>,
    inStockOnly = false,
): number[] => {
    const result = Object.entries(variants)
        .reduce((indexes: number[], [index, variant]) => {
            if (checkEveryOption(variant.attributes, options)) {
                indexes.push(+index);
            }

            return indexes;
        }, []);

    if (inStockOnly) {
        return result.filter((n) => variants[n].stock_status === GQLProductStockStatus.IN_STOCK);
    }

    return result;
};

/**
 * Get product variant index by options
 * @param {Object[]} variants
 * @param {{ attribute_code: string }[]} options
 * @pram {boolean} inStockOnly
 * @returns {number}
 * @namespace Util/Product/getVariantIndex
 */
export const getVariantIndex = (
    variants: IndexedVariant[],
    options: Record<string, string>,
    inStockOnly = false,
): number => {
    const indexes = getVariantsIndexes(variants, options, inStockOnly);

    return indexes.length ? indexes[0] : -1;
};

/** @namespace Util/Product/getIndexedCustomOption */
export const getIndexedCustomOption = (option: CustomizableProductFragmentOptions): IndexedCustomOption => {
    const {
        checkboxValues,
        dropdownValues,
        fieldValues,
        areaValues,
        fileValues,
        ...otherFields
    } = option;

    if (checkboxValues) {
        const data = Array.isArray(checkboxValues) ? checkboxValues : [checkboxValues];

        return { value: data, ...otherFields };
    }

    if (dropdownValues) {
        const data = Array.isArray(dropdownValues) ? dropdownValues : [dropdownValues];

        return { value: data, ...otherFields };
    }

    if (fieldValues) {
        return { value: fieldValues, ...otherFields };
    }

    if (areaValues) {
        return { value: areaValues, ...otherFields };
    }

    if (fileValues) {
        return { value: fileValues, ...otherFields };
    }

    return { value: otherFields, ...otherFields };
};

/** @namespace Util/Product/getIndexedCustomOptions */
export const getIndexedCustomOptions = (
    options: CustomizableProductFragmentOptions[],
): IndexedCustomOption[] => options.reduce(
    (acc: IndexedCustomOption[], option) => {
        const indexedOption = getIndexedCustomOption(option);

        if (indexedOption) {
            acc.push(indexedOption);
        }

        return acc;
    },
    [],
);

/** @namespace Util/Product/getIndexedReviews */
export const getIndexedReviews = (reviews?: ProductReviews): IndexedReview[] => {
    if (!reviews) {
        return [];
    }

    const { items } = reviews;
    const ONE_FIFTH_OF_A_HUNDRED = 20;

    return items.reduce((acc: IndexedReview[], review: ProductReview) => {
        const { rating_votes = [], ...restOfReview } = review;

        const newRatingVotes = rating_votes.reduce((ratingVotesAcc: RatingVote[], vote: RatingsBreakdown) => {
            const { rating_code, value } = vote;

            return [
                ...ratingVotesAcc,
                {
                    rating_code,
                    value,
                    // stars / 5 * 100 to get percent
                    percent: Number(value) * ONE_FIFTH_OF_A_HUNDRED,
                },
            ];
        }, []);

        return [
            ...acc,
            {
                ...restOfReview,
                rating_votes: newRatingVotes,
            },
        ];
    }, []);
};

/** @namespace Util/Product/getBundleId */
export const getBundleId = (uid = ''): number => {
    const arrayId = decodeBase64(uid).split('/');

    if (Array.isArray(arrayId) && arrayId.length > 2) {
        return +arrayId[2];
    }

    return 0;
};

/** @namespace Util/Product/getBundleOptions */
export const getBundleOptions = (
    options: BundlePriceOption[],
    items: BundleItem[],
): IndexedBundleItem[] => {
    const bundleOptions = options
        .reduce(
            (prev: BundleOptionSelection[], next: BundlePriceOption) => [...prev, ...next.selection_details],
            [],
        );

    return items.map((item) => ({
        ...item,
        options: item
            ?.options
            ?.filter(({ product }) => !!product)
            ?.map((option: BundleOption): IndexedBundleOption => {
                const id = getBundleId(option.uid);
                const selection: Partial<BundleOptionSelection> = bundleOptions.find(
                    (o) => o.selection_id === id,
                ) || {};

                const {
                    regular_option_price: regularOptionPrice = 0,
                    regular_option_price_excl_tax: regularOptionPriceExclTax = 0,
                    final_option_price: finalOptionPrice = 0,
                    final_option_price_excl_tax: finalOptionPriceExclTax = 0,
                } = selection;

                return {
                    ...option,
                    regularOptionPrice,
                    regularOptionPriceExclTax,
                    finalOptionPrice,
                    finalOptionPriceExclTax,
                };
            }),
    }));
};

/** @namespace Util/Product/getIndexedProduct */
export const getIndexedProduct = <T extends Partial<ProductItem>>(
    product: T,
    itemSku?: string,
): IndexedBaseProduct<T> => {
    const {
        variants: initialVariants = [],
        configurable_options: initialConfigurableOptions = [],
        attributes: initialAttributes = [],
        options: initialOptions = [],
        rating_summary = 0,
        review_count = 0,
        reviews: initialReviews,
        items = [],
        bundle_options = [],
    } = product;

    const attributes = getIndexedAttributes(initialAttributes || []);
    const reviews = getIndexedReviews(initialReviews);

    const updatedProduct: IndexedBaseProduct<T> = {
        ...product,
        configurable_options: getIndexedConfigurableOptions(initialConfigurableOptions, attributes),
        variants: itemSku ? getIndexedSingleVariant(initialVariants, itemSku) : getIndexedVariants(initialVariants),
        options: getIndexedCustomOptions(initialOptions || []),
        attributes,
        // Magento 2.4.1 review endpoint compatibility
        reviews,
        review_summary: {
            rating_summary,
            review_count,
        },
    };

    if (bundle_options.length) {
        updatedProduct.items = getBundleOptions(bundle_options, items);
    }

    return updatedProduct;
};

/** @namespace Util/Product/getIndexedProducts */
export const getIndexedProducts = <T extends Partial<ProductItem>>(
    products: T[],
): IndexedBaseProduct<T>[] => products.map((product) => getIndexedProduct(product));

/** @namespace Util/Product/getIndexedParameteredProducts */
export const getIndexedParameteredProducts = (
    products: Record<string, WishlistProduct>,
): Record<string, IndexedWishlistProduct> => Object.entries(products)
    .reduce((
        products,
        [id, product],
    ) => ({
        ...products,
        [id]: getIndexedProduct(product),
    }), {});

/** @namespace Util/Product/sortBySortOrder */
export const sortBySortOrder = <T>(options: T[], sortKey?: keyof T): T[] => options.sort(
    (a, b) => {
        const k = sortKey || 'sort_order' as keyof T;

        if (a[k] < b[k]) {
            return -1;
        }

        if (a[k] > b[k]) {
            return 1;
        }

        return 0;
    },
);

/** @namespace Util/Product/getIsConfigurableParameterSelected */
export const getIsConfigurableParameterSelected = (
    parameters: Record<string, string>,
    key: string,
    value: ConfigurableProductSelectedVariantValue,
): boolean => Object.hasOwnProperty.call(parameters, key) && parameters[key] === value;

/** @namespace Util/Product/getNewParameters */
// eslint-disable-next-line max-len
export const getNewParameters = (
    parameters: Record<string, string>,
    key: string,
    value: ConfigurableProductSelectedVariantValue = '',
): Record<string, string> => {
    // If value is already selected, than we remove the key to achieve deselection
    if (getIsConfigurableParameterSelected(parameters, key, value)) {
        const { [key]: oldValue, ...newParameters } = parameters;

        return newParameters;
    }

    return {
        ...parameters,
        [key]: value.toString(),
    };
};

/** @namespace Util/Product/showNewReviewPopup */
export const showNewReviewPopup = (): void => {
    const store = getStore();
    const {
        ConfigReducer: {
            reviews_allow_guest: isGuestEnabled,
        } = {},
    } = store.getState() as RootState;
    const { dispatch } = store;

    // if not logged in and guest reviews are not enabled
    if (!isSignedIn() && !isGuestEnabled) {
        dispatch(showNotification(NotificationType.INFO, __('You must login or register to review products.')));

        return;
    }

    dispatch(showPopup(REVIEW_POPUP_ID, { title: __('Write a review') }));
};

/** @namespace Util/Product/getBooleanLabel */
export const getBooleanLabel = (label: string, isBoolean = false): string => {
    if (!isBoolean) {
        return label;
    }

    return +label ? __('Yes') : __('No');
};

/** @namespace Util/Product/filterConfigurableOptions */
export const filterConfigurableOptions = (
    options: IndexedConfigurableOptions,
    variants: IndexedVariant[],
): Record<string, IndexedConfigurableOption> => Object.values(options)
    .reduce((acc: Record<string, IndexedConfigurableOption>, option) => {
        const {
            attribute_values,
            attribute_code,
        } = option;

        // show option if it exist as variant for configurable product
        const filteredOptions = attribute_values.reduce((acc: string[], value) => {
            const isVariantExist = variants.find(({ attributes }) => {
                const { attribute_value: foundValue } = attributes?.[attribute_code] || {};

                return value === foundValue;
            });

            if (isVariantExist) {
                acc.push(value);
            }

            return acc;
        }, []);

        return {
            ...acc,
            [attribute_code]: {
                ...option,
                attribute_values: filteredOptions,
            },
        };
    }, {});

/** @namespace Util/Product/validateProductQuantity */
export const validateProductQuantity = (quantity: number, stockItem: ProductStockItem): Array<string | boolean> => {
    const { min_sale_qty = 1, max_sale_qty, qty_increments = 1 } = stockItem;

    if (quantity < min_sale_qty) {
        return [false, __('The minimum amount you can purchase is %s', min_sale_qty)];
    }

    if (quantity > max_sale_qty) {
        return [false, __('The maximum amount you can purchase is %s', max_sale_qty)];
    }

    if (qty_increments > 1 && quantity % qty_increments !== 0) {
        return [false, __('You can buy this product only in quantities of %s at a time.', qty_increments)];
    }

    return [true];
};

/** @namespace Util/Product/getAttributesWithValues */
export const getAttributesWithValues = (product: IndexedProduct): Record<string, IndexedAttributeWithValue> => {
    const { attributes = {} } = product;

    return Object.entries(attributes).reduce((acc, [, val]) => {
        const { attribute_label, attribute_value } = val;

        if (attribute_value) {
            return { ...acc, [attribute_label]: val };
        }

        return acc;
    }, {});
};
