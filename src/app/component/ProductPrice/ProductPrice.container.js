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

import React, { PureComponent } from 'react';
import { PriceType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import ProductPrice from './ProductPrice.component';
/**
 * Product price
 * @class ProductPrice
 */
class ProductPriceContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.containerFunctions = {
            calculateDiscountPercentage: this.calculateDiscountPercentage.bind(this),
            calculateFinalPrice: this.calculateFinalPrice.bind(this),
            roundPrice: this.roundPrice.bind(this)
        };
    }

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
        return (
            <ProductPrice
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

ProductPriceContainer.propTypes = {
    price: PriceType,
    mix: MixType
};

ProductPriceContainer.defaultProps = {
    mix: {},
    price: {}
};

export default ProductPriceContainer;
