/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { getAttributesWithValues } from 'Util/Product';

import ProductAttributes from './ProductAttributes.component';
import {
    ProductAttributesComponentProps,
    ProductAttributesContainerProps,
    ProductAttributesContainerState,
} from './ProductAttributes.type';

/** @namespace Component/ProductAttributes/Container */
export class ProductAttributesContainer<
P extends Readonly<ProductAttributesContainerProps> = Readonly<ProductAttributesContainerProps>,
S extends ProductAttributesContainerState = ProductAttributesContainerState,
> extends PureComponent<P, S> {
    containerProps(): ProductAttributesComponentProps {
        const { areDetailsLoaded, product } = this.props;

        return {
            areDetailsLoaded,
            attributesWithValues: getAttributesWithValues(product),
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
