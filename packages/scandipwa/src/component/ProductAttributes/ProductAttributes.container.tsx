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

import { ReactElement } from 'Type/Common.type';
import { getAttributesWithValues } from 'Util/Product';

import ProductAttributes from './ProductAttributes.component';
import { ProductAttributesComponentProps, ProductAttributesContainerProps } from './ProductAttributes.type';

/** @namespace Component/ProductAttributes/Container */
export class ProductAttributesContainer extends PureComponent<ProductAttributesContainerProps> {
    containerProps(): ProductAttributesComponentProps {
        const { areDetailsLoaded, product } = this.props;

        return {
            areDetailsLoaded,
            attributesWithValues: getAttributesWithValues(product)
        };
    }

    render(): ReactElement {
        return (
            <ProductAttributes
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductAttributesContainer;
