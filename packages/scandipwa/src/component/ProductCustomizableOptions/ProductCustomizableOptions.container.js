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
import { connect } from 'react-redux';

import { OptionsListType, ProductType } from 'Type/ProductList.type';
import { getProductInStock } from 'Util/Product/Extract';

import ProductCustomizableOptions from './ProductCustomizableOptions.component';

/** @namespace Component/ProductCustomizableOptions/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    activeProduct: state.ProductReducer.product
});

/** @namespace Component/ProductCustomizableOptions/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/**
 * Product Customizable Options
 * @class ProductCustomizableOptionsContainer
 * @namespace Component/ProductCustomizableOptions/Container
 */
export class ProductCustomizableOptionsContainer extends PureComponent {
    static propTypes = {
        options: OptionsListType,
        updateSelectedValues: PropTypes.func.isRequired,
        activeProduct: ProductType.isRequired
    };

    static defaultProps = {
        options: []
    };

    containerProps() {
        const { options, updateSelectedValues, activeProduct } = this.props;

        return {
            options,
            updateSelectedValues,
            isProductInStock: getProductInStock(activeProduct)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizableOptionsContainer);
