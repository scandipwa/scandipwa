/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */
import PropTypes from 'prop-types';

export const PriceItemType = PropTypes.shape({
    currency: PropTypes.string,
    value: PropTypes.number,
    valueFormatted: PropTypes.string
});

export const DiscountType = PropTypes.shape({
    amount_off: PropTypes.number,
    percent_off: PropTypes.number
});

export const PriceVariantType = PropTypes.shape({
    discount: DiscountType,
    final_price: PriceItemType,
    regular_price: PriceItemType
});

export const PriceType = PropTypes.shape({
    minimum_price: PriceVariantType,
    maximal_price: PriceVariantType
});

export const OriginalPriceType = PropTypes.shape({
    minRegularPrice: PriceItemType,
    minFinalPrice: PriceItemType,
    minFinalPriceExclTax: PriceItemType,
    maxRegularPrice: PriceItemType,
    maxFinalPrice: PriceItemType,
    maxFinalPriceExclTax: PriceItemType
});

export const ProductPriceType = PropTypes.shape({
    price: PropTypes.shape({
        finalPrice: PriceItemType,
        finalPriceExclTax: PriceItemType,
        originalPrice: PriceItemType,
        originalPriceExclTax: PriceItemType,
        discount: DiscountType
    }),
    originalPrice: OriginalPriceType,
    configuration: PropTypes.shape({
        containsOptions: false,
        containsOptionsWithPrice: false,
        containsRequiredOptions: false,
        containsRequiredOptionsWithPrice: false
    })
});

export const TierPricesType = PropTypes.arrayOf(PropTypes.shape({
    discount: DiscountType,
    final_price: PropTypes.shape({
        currency: PropTypes.string,
        value: PropTypes.number
    }),
    quantity: PropTypes.number
}));
