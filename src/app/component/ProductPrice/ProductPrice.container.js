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

import { MixType } from 'Type/Common';
import { PriceType } from 'Type/ProductList';
import {
    calculateFinalPrice,
    formatPrice,
    roundPrice
} from 'Util/Price';

import ProductPrice from './ProductPrice.component';

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */
export class ProductPriceContainer extends PureComponent {
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
        const {
            price: {
                minimum_price: {
                    discount: {
                        percent_off: discountPercentage
                    } = {},
                    final_price: {
                        value: minimalPriceValue,
                        currency: priceCurrency
                    } = {},
                    regular_price: {
                        value: regularPriceValue
                    } = {}
                } = {}
            } = {}
        } = this.props;

        if (!minimalPriceValue || !regularPriceValue) {
            return {};
        }

        const roundedRegularPrice = roundPrice(regularPriceValue);
        const finalPrice = calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
        const formattedFinalPrice = formatPrice(finalPrice, priceCurrency);

        return {
            roundedRegularPrice,
            priceCurrency,
            discountPercentage,
            formattedFinalPrice
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
