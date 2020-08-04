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
import './CategoryProductList.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ProductList from 'Component/ProductList';
import { updateLoadStatus } from 'Store/ProductList/ProductList.action';

export const ProductListDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductList/ProductList.dispatcher'
);

export const mapStateToProps = (state) => ({
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    isPageLoading: state.ProductListReducer.isPageLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages
});

export const mapDispatchToProps = (dispatch) => ({
    requestProductList: (options) => ProductListDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    updateLoadStatus: (isLoading) => dispatch(updateLoadStatus(isLoading))
});

export class CategoryProductListContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isMatchingListFilter: PropTypes.bool,
        requestProductList: PropTypes.func.isRequired
    };

    static defaultProps = {
        isMatchingListFilter: false
    };

    containerFunctions = {
        requestProductList: this.requestProductList.bind(this)
    };

    getIsLoading() {
        const {
            isLoading,
            isMatchingListFilter
        } = this.props;

        if (!navigator.onLine) {
            return false;
        }

        // if the filter expected matches the last requested filter
        if (isMatchingListFilter) {
            return false;
        }

        return isLoading;
    }

    requestProductList(options) {
        const { requestProductList } = this.props;

        requestProductList(options);
    }

    containerProps = () => ({
        isLoading: this.getIsLoading(),
        mix: { block: 'CategoryProductList' }
    });

    render() {
        return (
            <ProductList
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer);
