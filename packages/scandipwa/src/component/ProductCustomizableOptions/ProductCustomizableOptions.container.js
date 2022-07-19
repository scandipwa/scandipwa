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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { OptionsListType } from 'Type/ProductList.type';

import ProductCustomizableOptions from './ProductCustomizableOptions.component';

/**
 * Product Customizable Options
 * @class ProductCustomizableOptionsContainer
 * @namespace Component/ProductCustomizableOptions/Container
 */
export class ProductCustomizableOptionsContainer extends PureComponent {
    static propTypes = {
        options: OptionsListType,
        updateSelectedValues: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: []
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
            <ProductCustomizableOptions
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductCustomizableOptionsContainer;
