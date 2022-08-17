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

/**
 * Updates wishlist item price for option based products
 * @param {Object} product
 * @namespace Util/Wishlist/getPriceRange
 */
export const getPriceRange = (product, price, priceWithoutTax, discount) => {
    if (!price) {
        return {};
    }

    const {
        price_range: {
            minimum_price: {
                regular_price: {
                    currency
                }
            }
        }
    } = product;

    const priceCurrencyValue = { value: price, currency };
    const priceCurrencyValueExclTax = { value: priceWithoutTax, currency };

    const priceSection = {
        final_price: priceCurrencyValue,
        regular_price: priceCurrencyValue,
        final_price_excl_tax: priceCurrencyValueExclTax,
        regular_price_excl_tax: priceCurrencyValueExclTax,
        default_final_price_excl_tax: priceCurrencyValueExclTax,
        discount
    };

    return {
        price_range: {
            minimum_price: priceSection,
            maximum_price: priceSection
        }
    };
};

export default getPriceRange;
