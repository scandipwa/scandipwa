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
import { updateMeta } from 'Store/Meta';
import { SearchBarDispatcher } from 'Store/SearchBar';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { ProductListDispatcher, updateLoadStatus as updateProductLoadStatus } from 'Store/ProductList';
import { ProductListInfoDispatcher, updateInfoLoadStatus } from 'Store/ProductListInfo';
import { CategoryDispatcher } from 'Store/Category';
import SearchPage from './SearchPage.component';

export const mapStateToProps = state => ({
    isSearchPage: true,
    category: state.CategoryReducer.category,
    pages: state.ProductListReducer.pages,
    isPagesLoading: state.ProductListReducer.isLoading,
    filters: state.ProductListInfoReducer.filters,
    totalItems: state.ProductListInfoReducer.totalItems,
    sortFields: state.ProductListInfoReducer.sortFields,
    isInfoLoading: state.ProductListInfoReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta)),
    makeSearchRequest: options => SearchBarDispatcher.handleData(dispatch, options),
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
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    }
});

export class SearchPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Search') });
    }

    render() {
        return (
            <SearchPage
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);
