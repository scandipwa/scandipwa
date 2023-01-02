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

import ProductCustomizableOptions from './ProductCustomizableOptions.component';
import {
    ProductCustomizableOptionsComponentProps,
    ProductCustomizableOptionsContainerProps,
    ProductCustomizableOptionsContainerState,
} from './ProductCustomizableOptions.type';

/**
 * Product Customizable Options
 * @class ProductCustomizableOptionsContainer
 * @namespace Component/ProductCustomizableOptions/Container
 */
export class ProductCustomizableOptionsContainer<
P extends Readonly<ProductCustomizableOptionsContainerProps> = Readonly<ProductCustomizableOptionsContainerProps>,
S extends ProductCustomizableOptionsContainerState = ProductCustomizableOptionsContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductCustomizableOptionsContainerProps> = {
        options: [],
    };

    containerProps(): ProductCustomizableOptionsComponentProps {
        const { options, updateSelectedValues } = this.props;

        return {
            options,
            updateSelectedValues,
        };
    }

    render(): ReactElement {
        return (
            <ProductCustomizableOptions
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductCustomizableOptionsContainer;
