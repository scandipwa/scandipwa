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
import { SearchBarDispatcher } from 'Store/SearchBar';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { CategoryDispatcher, updateLoadStatus } from 'Store/Category';
import SearchPage from './SearchPage.component';

const mapStateToProps = state => ({
    isSearchPage: true,
    category: state.CategoryReducer.category,
    categoryList: state.CategoryReducer.categoryList,
    items: state.CategoryReducer.items,
    totalItems: state.CategoryReducer.totalItems,
    sortFields: state.CategoryReducer.sortFields,
    filters: state.CategoryReducer.filters,
    isLoading: state.CategoryReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    makeSearchRequest: options => SearchBarDispatcher.handleData(dispatch, options),
    requestCategory: (options) => {
        CategoryDispatcher.handleData(dispatch, options);
    },
    updateLoadStatus: (options) => {
        dispatch(updateLoadStatus(options));
    },
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

const SearchPageContainer = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export default SearchPageContainer;
