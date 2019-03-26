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
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import CategoryPage from './CategoryPage.component';

const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    categoryList: state.CategoryReducer.categoryList,
    items: state.CategoryReducer.items,
    totalItems: state.CategoryReducer.totalItems,
    sortFields: state.CategoryReducer.sortFields,
    filters: state.CategoryReducer.filters,
    isLoading: state.CategoryReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    requestCategory: (options) => {
        CategoryDispatcher.handleData(dispatch, options);
    },

    updateBreadcrumbs: (breadcrumbs) => {
        if (Object.keys(breadcrumbs).length) BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch);
        else BreadcrumbsDispatcher.update([], dispatch);
    }
});

const CategoryPageContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default CategoryPageContainer;
