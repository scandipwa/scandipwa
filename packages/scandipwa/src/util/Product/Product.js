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

import { STOCK_TYPE } from 'Component/Product/Stock.config';
import { REVIEW_POPUP_ID } from 'Component/ProductReviews/ProductReviews.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { isSignedIn } from 'Util/Auth';
import getStore from 'Util/Store';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';

/**
 * Checks whether every option is in attributes
 * @param {Object} attributes
 * @param {{ attribute_code: string }[]} options
 * @returns {boolean}
 * @namespace Util/Product/checkEveryOption
 */
export const checkEveryOption = (attributes, options) => Object.keys(options)
    .every((option) => {
        if (!attributes[option]) {
            return false;
        }

        const { attribute_value } = attributes[option];

        if (typeof options[option] === 'string') {
            return options[option] === attribute_value;
        }

        return options[option].includes(attribute_value);
    });

/** @namespace Util/Product/getIndexedAttributeOption */
export const getIndexedAttributeOption = (option) => {
    const { swatch_data: defaultSwatchData } = option;

    if (!defaultSwatchData) {
        return option;
    }

    const { type } = defaultSwatchData;
    const swatch_data = type ? defaultSwatchData : null;

    return {
        ...option,
        swatch_data
    };
};

/** @namespace Util/Product/getIndexedAttributes */
export const getIndexedAttributes = (attributes) => attributes.reduce((indexedAttributes, attribute) => {
    const { attribute_code, attribute_options = [] } = attribute;

    return {
        ...indexedAttributes,
        [attribute_code]: {
            ...attribute,
            attribute_options: attribute_options.reduce((acc, option) => {
                const { value } = option;

                return {
                    ...acc,
                    [value]: getIndexedAttributeOption(option)
                };
            }, {})
        }
    };
}, {});

/** @namespace Util/Product/getIndexedConfigurableOptions */
export const getIndexedConfigurableOptions = (configurableOptions, indexedAttributes) => (
    configurableOptions.reduce((indexedConfigurableOptions, configurableOption) => {
        const { values, attribute_code } = configurableOption;

        return {
            ...indexedConfigurableOptions,
            [attribute_code]: {
                ...configurableOption,
                ...indexedAttributes[attribute_code],
                attribute_values: values.map(({ value_index }) => `${ value_index }`)
            }
        };
    }, {})
);

/** @namespace Util/Product/getIndexedVariants */
export const getIndexedVariants = (variants) => variants.map(({ product }) => {
    const { attributes } = product;

    return {
        ...product,
        attributes: getIndexedAttributes(attributes || [])
    };
});

/** @namespace Util/Product/getIndexedSingleVariant */
export const getIndexedSingleVariant = (variants, itemSku) => {
    const index = variants.findIndex(({ product: { sku } }) => sku === itemSku || itemSku.includes(sku));

    if (index < 0) {
        return getIndexedVariants(variants);
    }

    const indexedProduct = variants[index].product;
    const { attributes } = indexedProduct;

    return [
        { ...indexedProduct, attributes: getIndexedAttributes(attributes || []) }
    ];
};

/** @namespace Util/Product/getVariantsIndexes */
export const getVariantsIndexes = (variants, options, inStockOnly = false) => {
    const result = Object.entries(variants)
        .reduce((indexes, [index, variant]) => {
            if (checkEveryOption(variant.attributes, options)) {
                indexes.push(+index);
            }

            return indexes;
        }, []);

    if (inStockOnly) {
        return result.filter((n) => variants[n].stock_status === STOCK_TYPE.IN_STOCK);
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
export const getVariantIndex = (variants, options, inStockOnly = false) => {
    const indexes = getVariantsIndexes(variants, options, inStockOnly);

    return indexes.length ? indexes[0] : -1;
};

/** @namespace Util/Product/getIndexedCustomOption */
export const getIndexedCustomOption = (option) => {
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
export const getIndexedCustomOptions = (options) => options.reduce(
    (acc, option) => {
        const indexedOption = getIndexedCustomOption(option);

        if (indexedOption) {
            acc.push(indexedOption);
        }

        return acc;
    },
    []
);

/** @namespace Util/Product/getIndexedReviews */
export const getIndexedReviews = (reviews) => {
    if (!reviews) {
        return null;
    }

    const { items } = reviews;
    const ONE_FIFTH_OF_A_HUNDRED = 20;

    return items.reduce((acc, review) => {
        const { rating_votes = [], ...restOfReview } = review;

        const newRatingVotes = rating_votes.reduce((acc, vote) => {
            const { rating_code, value } = vote;

            return [
                ...acc,
                {
                    rating_code,
                    value,
                    // stars / 5 * 100 to get percent
                    percent: value * ONE_FIFTH_OF_A_HUNDRED
                }
            ];
        }, []);

        return [
            ...acc,
            {
                ...restOfReview,
                rating_votes: newRatingVotes
            }
        ];
    }, []);
};

/** @namespace Util/Product/getBundleId */
export const getBundleId = (uid = '') => {
    const arrayId = atob(uid).split('/');

    if (Array.isArray(arrayId) && arrayId.length > 2) {
        return +arrayId[2];
    }

    return 0;
};

/** @namespace Util/Product/getBundleOptions */
export const getBundleOptions = (options, items) => {
    const bundleOptions = options.reduce((prev, next) => [...prev, ...next.selection_details], []);

    return items.map((item) => ({
        ...item,
        options: item?.options?.filter(({ product }) => product).map((option) => {
            const id = getBundleId(option.uid);
            const selection = bundleOptions.find((o) => o.selection_id === id) || {};

            const {
                regular_option_price: regularOptionPrice = 0,
                regular_option_price_excl_tax: regularOptionPriceExclTax = 0,
                final_option_price: finalOptionPrice = 0,
                final_option_price_excl_tax: finalOptionPriceExclTax = 0
            } = selection;

            return {
                ...option,
                regularOptionPrice,
                regularOptionPriceExclTax,
                finalOptionPrice,
                finalOptionPriceExclTax
            };
        })
    }));
};

/** @namespace Util/Product/getIndexedProduct */
export const getIndexedProduct = (product, itemSku) => {
    const {
        variants: initialVariants = [],
        configurable_options: initialConfigurableOptions = [],
        attributes: initialAttributes = [],
        options: initialOptions = [],
        rating_summary,
        review_count,
        reviews: initialReviews,
        items = [],
        bundle_options = []
    } = product;

    const attributes = getIndexedAttributes(initialAttributes || []);
    const reviews = getIndexedReviews(initialReviews);

    const updatedProduct = {
        ...product,
        configurable_options: getIndexedConfigurableOptions(initialConfigurableOptions, attributes),
        variants: itemSku ? getIndexedSingleVariant(initialVariants, itemSku) : getIndexedVariants(initialVariants),
        options: getIndexedCustomOptions(initialOptions || []),
        attributes,
        // Magento 2.4.1 review endpoint compatibility
        reviews,
        review_summary: {
            rating_summary,
            review_count
        }
    };

    if (bundle_options.length) {
        updatedProduct.items = getBundleOptions(bundle_options, items);
    }

    return updatedProduct;
};

/** @namespace Util/Product/getIndexedProducts */
export const getIndexedProducts = (products) => products.map((product) => getIndexedProduct(product));

/** @namespace Util/Product/getIndexedParameteredProducts */
export const getIndexedParameteredProducts = (products) => Object.entries(products)
    .reduce((products, [id, product]) => ({
        ...products,
        [id]: getIndexedProduct(product)
    }), {});

/** @namespace Util/Product/sortBySortOrder */
export const sortBySortOrder = (options, sortKey = 'sort_order') => options.sort(
    (a, b) => {
        if (a[sortKey] < b[sortKey]) {
            return -1;
        }

        if (a[sortKey] > b[sortKey]) {
            return 1;
        }

        return 0;
    }
);

/** @namespace Util/Product/getIsConfigurableParameterSelected */
// eslint-disable-next-line max-len
export const getIsConfigurableParameterSelected = (parameters, key, value) => Object.hasOwnProperty.call(parameters, key) && parameters[key] === value;

/** @namespace Util/Product/getNewParameters */
export const getNewParameters = (parameters, key, value = '') => {
    // If value is already selected, than we remove the key to achieve deselection
    if (getIsConfigurableParameterSelected(parameters, key, value)) {
        const { [key]: oldValue, ...newParameters } = parameters;

        return newParameters;
    }

    return {
        ...parameters,
        [key]: value.toString()
    };
};

/** @namespace Util/Product/showNewReviewPopup */
export const showNewReviewPopup = () => {
    const store = getStore();
    const {
        ConfigReducer: {
            reviews_allow_guest: isGuestEnabled
        } = {}
    } = store.getState();
    const { dispatch } = store;

    // if not logged in and guest reviews are not enabled
    if (!isSignedIn() && !isGuestEnabled) {
        dispatch(showNotification('info', __('You must login or register to review products.')));

        return;
    }

    dispatch(showPopup(REVIEW_POPUP_ID, { title: __('Write a review') }));
};

/** @namespace Util/Product/sortAlphabetically */
export const sortAlphabetically = (options, key, caseSensitive = false) => options
    .sort((a, b) => {
        const textA = caseSensitive ? a[key] : a[key].toUpperCase();
        const textB = caseSensitive ? b[key] : b[key].toUpperCase();

        if (textA < textB) {
            return -1;
        }

        if (textA > textB) {
            return 1;
        }

        return 0;
    });

/** @namespace Util/Product/getBooleanLabel */
export const getBooleanLabel = (label, isBoolean = false) => {
    if (!isBoolean) {
        return label;
    }

    return +label ? __('Yes') : __('No');
};

/** @namespace Util/Product/filterConfigurableOptions */
export const filterConfigurableOptions = (options, variants) => Object.values(options)
    .reduce((acc, option) => {
        const {
            attribute_values,
            attribute_code
        } = option;

        // show option if it exist as variant for configurable product
        const filteredOptions = attribute_values.reduce((acc, value) => {
            const isVariantExist = variants.find(({ attributes }) => {
                const { attribute_value: foundValue } = attributes[attribute_code] || {};

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
                attribute_values: filteredOptions
            }
        };
    }, {});

/** @namespace Util/Product/validateProductQuantity */
export const validateProductQuantity = (quantity, stockItem) => {
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
