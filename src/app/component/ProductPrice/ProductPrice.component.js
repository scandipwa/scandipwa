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
        const { price: { minimalPrice, regularPrice }, mods } = this.props;
        const minimalPriceValue = minimalPrice.amount.value;
        const regularPriceValue = regularPrice.amount.value;
        const priceCurrency = regularPrice.amount.currency;
        const discountPercentage = this.calculateDiscountPercentage(minimalPriceValue, regularPriceValue);
        const finalPrice = this.calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
        const priceString = formatCurrency(this.roundPrice(finalPrice), priceCurrency);

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        return (
            <p block="ProductPrice" aria-label={ __('Product Price') } mods={ mods || {} }>
                <PriceSemanticElementName aria-label={ __('Current product price') }>
                    <data value={ this.roundPrice(finalPrice) }>{ priceString }</data>
                </PriceSemanticElementName>

                { discountPercentage > 0 && (
                    <del aria-label={ __('Old product price') }>
                        { this.roundPrice(regularPriceValue) }
                    </del>
                )}
            </p>
        );
    }
}

ProductPrice.propTypes = {
    price: PriceType.isRequired,
    mods: PropTypes.shape({
        type: PropTypes.string,
        color: PropTypes.string
    })
};

ProductPrice.defaultProps = {
    mods: {}
};

export default ProductPrice;
