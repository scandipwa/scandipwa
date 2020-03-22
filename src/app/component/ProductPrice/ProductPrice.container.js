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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { PriceType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import {
    formatCurrency,
    calculateDiscountPercentage,
    calculateFinalPrice,
    roundPrice
} from 'Util/Price';
import ProductPrice from './ProductPrice.component';
/**
 * Product price
 * @class ProductPrice
 */
class ProductPriceContainer extends PureComponent {
    static propTypes = {
        isSchemaRequired: PropTypes.bool,
        price: PriceType,
        mix: MixType
    };

    static defaultProps = {
        isSchemaRequired: false,
        mix: {},
        price: {}
    };

    containerProps = () => {
        const { price: { minimalPrice, regularPrice } } = this.props;

        if (!minimalPrice || !regularPrice) {
            return {};
        }

        const minimalPriceValue = minimalPrice.amount.value;
        const regularPriceValue = regularPrice.amount.value;
        const roundedRegularPrice = roundPrice(regularPriceValue);
        const priceCurrency = regularPrice.amount.currency;
        const discountPercentage = calculateDiscountPercentage(minimalPriceValue, regularPriceValue);
        const finalPrice = calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
        const formatedCurrency = roundPrice(finalPrice);
        const currency = formatCurrency(priceCurrency);

        return {
            roundedRegularPrice,
            priceCurrency,
            discountPercentage,
            formatedCurrency,
            currency
        };
    };

    render() {
        return (
            <ProductPrice
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}


export default ProductPriceContainer;
