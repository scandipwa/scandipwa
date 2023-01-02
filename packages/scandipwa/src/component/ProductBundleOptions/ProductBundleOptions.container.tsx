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

import ProductBundleOptions from './ProductBundleOptions.component';
import { ProductBundleOptionsComponentProps, ProductBundleOptionsContainerProps, ProductBundleOptionsContainerState } from './ProductBundleOptions.type';

/**
 * Product Bundle Options
 * @class ProductBundleOptions
 * @namespace Component/ProductBundleOptions/Container
 */
export class ProductBundleOptionsContainer<
P extends Readonly<ProductBundleOptionsContainerProps> = Readonly<ProductBundleOptionsContainerProps>,
S extends ProductBundleOptionsContainerState = ProductBundleOptionsContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductBundleOptionsContainerProps> = {
        options: [],
    };

    containerProps(): ProductBundleOptionsComponentProps {
        const { options, updateSelectedValues } = this.props;

        return {
            options,
            updateSelectedValues,
        };
    }

    render(): ReactElement {
        return (
            <ProductBundleOptions
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductBundleOptionsContainer;
