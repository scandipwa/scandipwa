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
import { PriceType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import {
    calculateFinalPrice,
    calculateDiscountPercentage
} from 'Util/Price';

import ProductPrice from './ProductPrice.component';

/**
 * Product price
 * @class ProductPrice
 */
class ProductPriceContainer extends PureComponent {
    static propTypes = {
        price: PriceType,
        mix: MixType
    };

    static defaultProps = {
        mix: {},
        price: {}
    };

    containerProps = () => ({
        isLoading: this._getIsLoading(),
        finalPrice: this._getFinalPrice()
    });

    _getIsLoading() {
        const { price: { minimalPrice, regularPrice } } = this.props;
        return !(minimalPrice && regularPrice);
    }

    _getFinalPrice() {
        if (this._getIsLoading()) return 0;

        const {
            price: {
                minimalPrice: { amount: { value: minimalPriceValue } },
                regularPrice: { amount: { value: regularPriceValue } }
            }
        } = this.props;

        const discountPercentage = calculateDiscountPercentage(minimalPriceValue, regularPriceValue);

        return calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);
    }

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
