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

import { ItemOptionsType } from 'Type/ProductList.type';

import ProductBundleOptions from './ProductBundleOptions.component';

/**
 * Product Bundle Options
 * @class ProductBundleOptions
 * @namespace Component/ProductBundleOptions/Container
 */
export class ProductBundleOptionsContainer extends PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(ItemOptionsType).isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    containerProps() {
        const { options, updateSelectedValues } = this.props;

        return {
            options,
            updateSelectedValues
        };
    }

    render() {
        return (
            <ProductBundleOptions
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductBundleOptionsContainer;
