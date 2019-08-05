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

export const generateParameters = (variant_attributes, required_params) => {
    const parameters = variant_attributes.reduce((accum, { attribute_code, attribute_value }) => (
        required_params.includes(attribute_code)
            ? {
                ...accum,
                [attribute_code]: attribute_value
            }
            : accum),
    {});
    return parameters;
};

export const getProductWithParams = (product, requiredParameters) => {
    const { attributes } = product;
    const parameters = generateParameters(attributes, requiredParameters);

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

export const getVariantsWithParams = (variants, configurable_options) => {
    const requiredParameters = configurable_options.map(({ attribute_code }) => attribute_code);
    return variants.map(variant => getVariantWithParams(variant, requiredParameters));
};
