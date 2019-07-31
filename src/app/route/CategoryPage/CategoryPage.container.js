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

import { connect } from 'react-redux';
import { CategoryDispatcher } from 'Store/Category';
import { ProductListDispatcher, updateLoadStatus as updateProductLoadStatus } from 'Store/ProductList';
import { ProductListInfoDispatcher, updateInfoLoadStatus } from 'Store/ProductListInfo';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CategoryPage from './CategoryPage.component';

const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    pages: state.ProductListReducer.pages,
    isPagesLoading: state.ProductListReducer.isLoading,
    filters: state.ProductListInfoReducer.filters,
    totalItems: state.ProductListInfoReducer.totalItems,
    sortFields: state.ProductListInfoReducer.sortFields,
    minPriceRange: state.ProductListInfoReducer.minPrice,
    maxPriceRange: state.ProductListInfoReducer.maxPrice,
    isInfoLoading: state.ProductListInfoReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestCategory: (options) => {
        CategoryDispatcher.handleData(dispatch, options);
    },

    requestProductList: (options) => {
        ProductListDispatcher.handleData(dispatch, options);
    },

    requestProductListInfo: (options) => {
        ProductListInfoDispatcher.handleData(dispatch, options);
    },

    updateLoadStatus: (options) => {
        dispatch(updateInfoLoadStatus(options));
        dispatch(updateProductLoadStatus(options));
    },

    updateBreadcrumbs: (breadcrumbs) => {
        if (Object.keys(breadcrumbs).length) BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch);
        else BreadcrumbsDispatcher.update([], dispatch);
    }
});

const CategoryPageContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default CategoryPageContainer;
