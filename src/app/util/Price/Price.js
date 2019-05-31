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

/* eslint-disable import/prefer-default-export */

/**
 * Calculates and round subTotal, final, regular and tax prices
 * @param {Object} product Product object
 * @return {Object} Object of prices
 */
export const getProductPrice = (product) => {
    const { price: { minimalPrice, regularPrice: regPrice } } = product;
    const tax = 1 - 0.12; // TODO: Hardcoded for now, need to get from configuration
    const minimalPriceValue = minimalPrice.amount.value;
    const regularPriceValue = regPrice.amount.value;

    const discountPercentage = Math.floor(Math.round((1 - minimalPriceValue / regularPriceValue) * 100));
    const subTotalPrice = parseFloat(discountPercentage ? minimalPriceValue : regularPriceValue);
    const regularPrice = parseFloat(regularPriceValue);
    const taxPrice = subTotalPrice - (subTotalPrice * tax);

    const roundedsubTotalPrice = subTotalPrice.toFixed(2);
    const roundedRegularPrice = regularPrice.toFixed(2);
    const roundedTaxPrice = taxPrice.toFixed(2);

    return {
        subTotalPrice,
        regularPrice,
        taxPrice,
        roundedsubTotalPrice,
        roundedRegularPrice,
        roundedTaxPrice
    };
};

export const formatCurrency = (price, currency = 'USD') => {
    return new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency }
    ).format(price);
};
