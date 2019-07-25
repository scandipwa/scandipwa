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
import { CategoryDispatcher, updateCurrentCategory } from 'Store/Category';
import { ProductListDispatcher, updateLoadStatus } from 'Store/ProductList';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CategoryPage from './CategoryPage.component';

const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    categoryList: state.CategoryReducer.categoryList,
    pages: state.ProductListReducer.pages,
    filters: state.ProductListReducer.filters,
    isLoading: state.ProductListReducer.isLoading,
    totalItems: state.ProductListReducer.totalItems,
    sortFields: state.ProductListReducer.sortFields,
    minPriceRange: state.ProductListReducer.minPrice,
    maxPriceRange: state.ProductListReducer.maxPrice
});

const mapDispatchToProps = dispatch => ({
    requestCategory: (options) => {
        CategoryDispatcher.handleData(dispatch, options);
    },

    requestProductList: (options) => {
        ProductListDispatcher.handleData(dispatch, options);
    },

    updateCurrentCategory: (categoryUrlPath, categoryIds, isSearchPage) => {
        dispatch(updateCurrentCategory(categoryUrlPath, categoryIds, isSearchPage));
    },

    updateLoadStatus: (options) => {
        dispatch(updateLoadStatus(options));
    },

    updateBreadcrumbs: (breadcrumbs) => {
        if (Object.keys(breadcrumbs).length) BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch);
        else BreadcrumbsDispatcher.update([], dispatch);
    }
});

const CategoryPageContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default CategoryPageContainer;
