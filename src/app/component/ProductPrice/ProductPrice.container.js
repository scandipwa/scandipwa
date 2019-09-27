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

    render() {
        return (
            <ProductPrice
              { ...this.props }
            />
        );
    }
}


export default ProductPriceContainer;
