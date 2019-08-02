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

export const generateParameters = (variant_attributes, configurable_options) => {
    const required_params = configurable_options.map(({ attribute_code }) => attribute_code);
    const parameters = variant_attributes.reduce((accum, { attribute_code, attribute_value }) => {
        return required_params.includes(attribute_code)
            ? {
                ...accum,
                [attribute_code]: attribute_value
            }
            : accum;
    }, {});
    return parameters;
};

export const addParametersToProductVariant = (variant, configurable_options) => {
    const { attributes } = variant;
    const parameters = generateParameters(attributes, configurable_options);
    return { ...variant, parameters };
};

export const getProductWithParams = (product, requiredParameters) => {
    const { attributes } = product;

    const parameters = attributes.reduce((accum, { attribute_code, attribute_value }) => {
        if (!requiredParameters.includes(attribute_code)) return accum;

        return {
            ...accum,
            [attribute_code]: attribute_value
        };
    }, {});

    return {
        ...product,
        parameters
    };
};

export const getVariantWithParams = (variant, requiredParameters) => {
    const { product: initialProduct } = variant;
    const product = getProductWithParams(initialProduct, requiredParameters);

    return {
        ...variant,
        product
    };
};

export const getVariantIndex = (variants, options) => +Object.keys(variants)
    .find(key => checkEveryOption(variants[key].product.parameters, options));

export const getVariantsWithParams = (variants, requiredParameters) => variants
    .map(variant => getVariantWithParams(variant, requiredParameters));

export const getProductsWithParams = (products, requiredParameters) => products
    .map(product => getProductWithParams(product, requiredParameters));
