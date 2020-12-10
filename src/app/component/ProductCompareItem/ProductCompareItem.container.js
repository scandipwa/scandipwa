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

import { ProductType } from 'Type/ProductList';

import ProductCompareItem from './ProductCompareItem.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompareItem/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/ProductCompareItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    removeComparedProduct: (sku) => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeComparedProduct(sku, dispatch)
    )
});

/** @namespace Component/ProductCompareItem/Container */
export class ProductCompareItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        removeComparedProduct: PropTypes.func.isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        removeComparedProduct: this.removeComparedProduct.bind(this)
    };

    async removeComparedProduct() {
        const {
            product: { id } = {},
            removeComparedProduct
        } = this.props;

        this.setState({ isLoading: true });
        await removeComparedProduct(id);
    }

    render() {
        return (
            <ProductCompareItem
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareItemContainer);
