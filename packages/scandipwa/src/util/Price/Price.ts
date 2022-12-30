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

import { TierPrice } from 'Query/ProductList.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

import { CurrencyMap, HUNDRED_PERCENT } from './Price.config';

/** @namespace Util/Price/formatCurrency */
export const formatCurrency = (
    currency = GQLCurrencyEnum.USD,
): string | null => (Object.keys(CurrencyMap).includes(currency) ? currency : null);

/** @namespace Util/Price/formatPrice */
export const formatPrice = (price: number, currency = GQLCurrencyEnum.USD) : string => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(language, { style: 'currency', currency }).format(price || 0);
};

/**
 * Calculate final price
 * @param {Number} discount discount percentage
 * @param {Number} min minimum price
 * @param {Number} reg regular price
 * @return {Number} final price
 * @namespace Util/Price/calculateFinalPrice
 */
export const calculateFinalPrice = (discount: number, min: number, reg: number): number => (discount ? min : reg);

/**
 * Calculate final price
 * @param {Number} tier tier price
 * @param {Number} spec special price
 * @return {Number} final discount
 * @namespace Util/Price/calculateTierDiscountOverSpecialPrice */
export const calculateTierDiscountOverSpecialPrice = (spec: number, tier: number): number => (
    Math.round(HUNDRED_PERCENT - (tier / spec) * HUNDRED_PERCENT)
);

/**
 * Calculate final price
 * @param {Number} price
 * @return {Number} price rounded to 2 digits
 * @namespace Util/Price/roundPrice
 */
export const roundPrice = (price: number): string => price.toFixed(2);

/** @namespace Util/Price/getLowestPriceTiersPrice */
export const getLowestPriceTiersPrice = (price_tiers: TierPrice[], currency: GQLCurrencyEnum): string => {
    const lowestValue = price_tiers
        .reduce((acc, { final_price: { value } }) => (acc < value ? acc : value), price_tiers[0].final_price.value);

    return formatPrice(lowestValue, currency);
};
