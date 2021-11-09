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

import ProductList from 'Component/ProductList';
import { updateLoadStatus } from 'Store/ProductList/ProductList.action';
import { FilterInputType, SelectedFiltersType } from 'Type/Category.type';
import { LayoutType } from 'Type/Layout.type';
import { PagesType } from 'Type/ProductList.type';

import './CategoryProductList.style';

export const ProductListDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductList/ProductList.dispatcher'
);

/** @namespace Component/CategoryProductList/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    isPageLoading: state.ProductListReducer.isPageLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages
});

/** @namespace Component/CategoryProductList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    requestProductList: (options) => ProductListDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    updateLoadStatus: (isLoading) => dispatch(updateLoadStatus(isLoading))
});

/** @namespace Component/CategoryProductList/Container */
export class CategoryProductListContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isMatchingListFilter: PropTypes.bool,
        isMatchingInfoFilter: PropTypes.bool,
        layout: LayoutType,
        filter: FilterInputType,
        requestProductList: PropTypes.func.isRequired,
        isCurrentCategoryLoaded: PropTypes.bool,
        totalItems: PropTypes.number.isRequired,
        totalPages: PropTypes.number,
        search: PropTypes.string,
        sort: PropTypes.objectOf(PropTypes.string),
        selectedFilters: SelectedFiltersType,
        pages: PagesType.isRequired,
        isPageLoading: PropTypes.bool
    };

    static defaultProps = {
        isMatchingListFilter: false,
        isMatchingInfoFilter: false,
        isCurrentCategoryLoaded: false,
        filter: {},
        layout: 'grid',
        totalPages: 1,
        search: '',
        sort: undefined,
        selectedFilters: {},
        isPageLoading: false
    };

    containerFunctions = {
        requestProductList: this.requestProductList.bind(this)
    };

    getIsLoading() {
        const {
            filter,
            isLoading,
            isMatchingListFilter,
            isCurrentCategoryLoaded
        } = this.props;

        /**
         * In case the wrong category was passed down to the product list,
         * show the loading animation, it will soon change to proper category.
         */
        if (filter.categoryIds === -1) {
            return true;
        }

        /**
         * Do not request page, if category is not yet loaded
         * without this command the products are requested twice:
         * 1. Once with global default sorting
         * 2. Once with category default sortingZ
         */
        if (!isCurrentCategoryLoaded) {
            return true;
        }

        if (!navigator.onLine) {
            return false;
        }

        // if the filter expected matches the last requested filter
        if (isMatchingListFilter) {
            return false;
        }

        return isLoading;
    }

    getIsPreventRequest() {
        const { isMatchingListFilter, isMatchingInfoFilter } = this.props;

        return isMatchingListFilter && isMatchingInfoFilter; // if filter match - prevent request
    }

    getLayout() {
        const { layout } = this.props;

        return layout;
    }

    requestProductList(options) {
        const { requestProductList } = this.props;
        requestProductList({ ...options, isPlp: true });
    }

    containerProps() {
        const {
            filter,
            isPageLoading,
            pages,
            search,
            selectedFilters,
            sort,
            totalItems,
            totalPages
        } = this.props;

        return {
            filter,
            isPageLoading,
            pages,
            search,
            selectedFilters,
            sort,
            totalItems,
            totalPages,
            isLoading: this.getIsLoading(),
            isPreventRequest: this.getIsPreventRequest(),
            mix: { block: 'CategoryProductList', mods: { layout: this.getLayout() } }
        };
    }

    render() {
        return (
            <ProductList
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer);
