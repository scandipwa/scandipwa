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

import ProductBundleOptions from './ProductBundleOptions.component';

export class ProductBundleOptionsContainer extends PureComponent {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    containerProps() {
        return {
            ...this.props,
            ...this.state
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
