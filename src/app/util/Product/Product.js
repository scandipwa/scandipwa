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

const checkEveryOption = (parameters, options) => Object.keys(options)
    .every((param) => {
        if (typeof options[param] === 'string') {
            return options[param] === parameters[param];
        }

        return options[param].includes(parameters[param]);
    });

/**
 * Get parameters for product variant from varian attributes
 * @param {{ attribute_code: string, attribute_value: string }[]} variantAttributes
 * @param {*} requiredParams
 * @returns {Object}
 */
export const generateParameters = (variantAttributes, requiredParams) => {
    const parameters = variantAttributes.reduce((accum, { attribute_code, attribute_value }) => (
        requiredParams.includes(attribute_code)
            ? {
                ...accum,
                [attribute_code]: attribute_value
            }
            : accum),
    {});
    return parameters;
};

/**
 * Return product with parameters
 * @param {Obejct} product
 * @param {string[]} requiredParameters
 * @returns {Object}
 */
export const getProductWithParams = (product, requiredParameters) => {
    const { attributes } = product;
    const parameters = generateParameters(attributes, requiredParameters);

    return {
        ...product,
        parameters
    };
};

/**
 * Append product variant with parameters
 * @param {Object} variant
 * @param {string[]} requiredParameters
 * @returns {Object}
 */
export const getVariantWithParams = (variant, requiredParameters) => {
    const { product: initialProduct } = variant;
    const product = getProductWithParams(initialProduct, requiredParameters);

    return {
        ...variant,
        product
    };
};

/**
 * Get product variant index by options
 * @param {Object[]} variants
 * @param {{ attribute_code: string }[]} options
 * @returns {number}
 */
export const getVariantIndex = (variants, options) => +Object.keys(variants)
    .find(key => checkEveryOption(variants[key].product.parameters, options));

/**
 * Append product variants with parameters
 * @param {Object[]} variants
 * @param {{ attribute_code: string }[]} configurable_options
 * @returns {Object[]}
 */
export const getVariantsWithParams = (variants, configurable_options) => {
    const requiredParameters = configurable_options.map(({ attribute_code }) => attribute_code);
    return variants.map(variant => getVariantWithParams(variant, requiredParameters));
};

/**
 * Get product's brand from attributes
 * @param {{ attribute_value: string, attribute_code: string }} attributes
 * @returns {string}
 */
export const getBrand = (attributes) => {
    const { attribute_value } = attributes.find(({ attribute_code }) => attribute_code === 'brand');
    return attribute_value;
};
