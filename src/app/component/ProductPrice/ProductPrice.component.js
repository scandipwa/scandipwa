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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import { PriceType } from 'Type/ProductList';
import { formatCurrency } from 'Util/Price';
import './ProductPrice.style';

/**
 * Product price
 * @class ProductPrice
 */
class ProductPrice extends Component {
    /**
     * Calculate discount percentage
     * @param {Number} min minimum price
     * @param {Number} reg regular price
     * @return {Nmber} discount percentage
     */
    calculateDiscountPercentage(min, reg) {
        return Math.floor(Math.round((1 - min / reg) * 100));
    }

    /**
     * Calculate final price
     * @param {Number} discount discount percentage
     * @param {Number} min minimum price
     * @param {Number} reg regular price
     * @return {Nmber} final price
     */
    calculateFinalPrice(discount, min, reg) {
        return discount ? min : reg;
    }

    /**
     * Calculate final price
     * @param {Number} price
     * @return {Nmber} rounded price
     */
    roundPrice(price) {
        return parseFloat(price).toFixed(2);
    }

    render() {
        const { price: { minimalPrice, regularPrice }, mix } = this.props;

        if (!minimalPrice || !regularPrice) {
            return (
                <p block="ProductPrice" aria-label="Product Price" mix={ mix }>
                    <TextPlaceholder />
                </p>
            );
        }

        const minimalPriceValue = minimalPrice.amount.value;
        const regularPriceValue = regularPrice.amount.value;
        const roundedRegularPrice = this.roundPrice(regularPriceValue);
        const priceCurrency = regularPrice.amount.currency;
        const discountPercentage = this.calculateDiscountPercentage(minimalPriceValue, regularPriceValue);
        const finalPrice = this.calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
        const formatedCurrency = this.roundPrice(finalPrice);
        const currency = formatCurrency(priceCurrency);

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        return (
            <p
              block="ProductPrice"
              mix={ mix }
              aria-label={ `Product price: ${ formatedCurrency }${ currency }` }
              itemProp="offers"
              itemScope
              itemType="https://schema.org/AggregateOffer"
            >
                <PriceSemanticElementName>
                    <data
                      value={ formatedCurrency }
                    >
                        <span itemProp="lowPrice">{ formatedCurrency }</span>
                        <span>{ currency }</span>
                    </data>
                </PriceSemanticElementName>

                <del
                  block="ProductPrice"
                  elem="HighPrice"
                  mods={ { isVisible: discountPercentage > 0 } }
                  aria-label={ __('Old product price') }
                  itemProp="highPrice"
                >
                    { roundedRegularPrice }
                </del>

                <meta itemProp="priceCurrency" content={ priceCurrency } />
            </p>
        );
    }
}

ProductPrice.propTypes = {
    price: PriceType,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    })
};

ProductPrice.defaultProps = {
    mix: {},
    price: {}
};

export default ProductPrice;
