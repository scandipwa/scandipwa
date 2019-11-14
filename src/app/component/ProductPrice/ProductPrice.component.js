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

import { PureComponent } from 'react';
import TextPlaceholder from 'Component/TextPlaceholder';
import {
    formatCurrency,
    calculateDiscountPercentage,
    calculateFinalPrice,
    roundPrice
} from 'Util/Price';
import { PriceType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import Price from 'Component/Price';

import './ProductPrice.style';

/**
 * Product price
 * @class ProductPrice
 */
export default class ProductPrice extends PureComponent {
    static propTypes = {
        price: PriceType,
        mix: MixType
    };

    static defaultProps = {
        mix: {},
        price: {}
    };

    render() {
        const {
            price: { minimalPrice, regularPrice },
            mix
        } = this.props;

        if (!minimalPrice || !regularPrice) {
            return (
                <p block="ProductPrice" aria-label="Product Price" mix={ mix }>
                    <TextPlaceholder mix={ { block: 'ProductPrice', elem: 'Placeholder' } } length="custom" />
                </p>
            );
        }

        const minimalPriceValue = minimalPrice.amount.value;
        const regularPriceValue = regularPrice.amount.value;
        const roundedRegularPrice = roundPrice(regularPriceValue);
        const priceCurrency = regularPrice.amount.currency;
        const discountPercentage = calculateDiscountPercentage(minimalPriceValue, regularPriceValue);
        const finalPrice = calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
        const formatedCurrency = roundPrice(finalPrice);
        const currency = formatCurrency(priceCurrency);

        return (
            <p
              block="ProductPrice"
              mix={ mix }
              aria-label={ `Product price: ${ formatedCurrency }${ currency }` }
              itemProp="offers"
              itemScope
              itemType="https://schema.org/AggregateOffer"
            >
                <Price currency={ priceCurrency } oldPrice={ roundedRegularPrice } finalPrice={ finalPrice } />
            </p>
        );
    }
}
