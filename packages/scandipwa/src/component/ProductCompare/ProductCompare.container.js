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

import { ProductItemsType } from 'Type/ProductList';

import ProductCompare from './ProductCompare.component';

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

/** @namespace Component/ProductCompare/Container/mapStateToProps  */
export const mapStateToProps = (state) => ({
    products: state.ProductCompareReducer.products,
    items: state.ProductCompareReducer.items,
    attributes: state.ProductCompareReducer.attributes,
    isLoading: state.ProductCompareReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/ProductCompare/Container/mapDispatchToProps  */
export const mapDispatchToProps = (dispatch) => ({
    fetchCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getCompareList(dispatch)
    ),
    clearCompareList: () => ProductCompareDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearComparedProducts(dispatch)
    )
});

/** @namespace Component/ProductCompare/Container */
export class ProductCompareContainer extends PureComponent {
    static propTypes = {
        fetchCompareList: PropTypes.func.isRequired,
        clearCompareList: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        products: ProductItemsType,
        items: PropTypes.array,
        attributes: PropTypes.array
    };

    static defaultProps = {
        isLoading: false,
        products: [],
        items: [],
        attributes: []
    };

    containerFunctions = {
        getAttributes: this.getAttributes.bind(this),
        clearCompareList: this.clearCompareList.bind(this)
    };

    componentDidMount() {
        this.fetchCompareList();
    }

    fetchCompareList() {
        const { fetchCompareList } = this.props;

        fetchCompareList();
    }

    clearCompareList() {
        const { clearCompareList } = this.props;

        clearCompareList();
    }

    getAttributes() {
        const { attributes, items } = this.props;

        if (!items.length || !attributes.length) {
            return [];
        }

        return attributes.map(({ code, label }) => ({
            attribute_id: code,
            attribute_code: code,
            attribute_label: label,
            attribute_values: items.map(
                ({ attributes }) => attributes.find((attribute) => attribute.code === code).value
            )
        }));
    }

    render() {
        return (
            <ProductCompare
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompareContainer);
