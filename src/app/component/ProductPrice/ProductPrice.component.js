import React, { Component } from 'react';
import { PriceType } from 'Type/ProductList';
import PropTypes from 'prop-types';
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
        const discountPercentage = this.calculateDiscountPercentage(minimalPriceValue, regularPriceValue);
        const finalPrice = this.calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);

        // TODO: implement dynamic when store-config will be injected
        const currency = '$';

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        return (
            <p block="ProductPrice" aria-label="Product Price" mods={ mods || {} }>
                <PriceSemanticElementName aria-label="Current product price">
                    <data value={ this.roundPrice(finalPrice) }>
                        { currency }
                        { this.roundPrice(finalPrice) }
                    </data>
                </PriceSemanticElementName>

                { discountPercentage > 0 && (
                    <del aria-label="Old product price">
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
