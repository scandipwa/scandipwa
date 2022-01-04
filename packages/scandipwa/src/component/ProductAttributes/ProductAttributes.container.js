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

import { ProductType } from 'Type/ProductList.type';
import { getAttributesWithValues } from 'Util/Product';

import ProductAttributes from './ProductAttributes.component';

/** @namespace Component/ProductAttributes/Container */
export class ProductAttributesContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    };

    containerProps() {
        const { areDetailsLoaded, product } = this.props;

        return {
            areDetailsLoaded,
            attributesWithValues: getAttributesWithValues(product)
        };
    }

    render() {
        return (
            <ProductAttributes
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductAttributesContainer;
