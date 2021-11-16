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

import SearchBarReducer from 'Store/SearchBar/SearchBar.reducer';
import { ItemsType } from 'Type/ProductList.type';
import { withReducers } from 'Util/DynamicReducer';

import SearchOverlay from './SearchOverlay.component';

export const SearchBarDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/SearchBar/SearchBar.dispatcher'
);

/** @namespace Component/SearchOverlay/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

/** @namespace Component/SearchOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    makeSearchRequest: (options) => SearchBarDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    clearSearchResults: () => SearchBarDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearSearchResults(dispatch)
    )
});

/** @namespace Component/SearchOverlay/Container */
export class SearchOverlayContainer extends PureComponent {
    static propTypes = {
        makeSearchRequest: PropTypes.func.isRequired,
        clearSearchResults: PropTypes.func.isRequired,
        searchCriteria: PropTypes.string.isRequired,
        searchResults: ItemsType.isRequired,
        isHideOverlay: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isHideOverlay: false
    };

    containerFunctions = {
        makeSearchRequest: this.makeSearchRequest.bind(this)
    };

    containerProps() {
        const {
            clearSearchResults,
            isHideOverlay,
            isLoading,
            searchCriteria,
            searchResults
        } = this.props;

        return {
            clearSearchResults,
            isHideOverlay,
            isLoading,
            searchCriteria,
            searchResults
        };
    }

    makeSearchRequest() {
        const {
            makeSearchRequest,
            clearSearchResults,
            searchCriteria
        } = this.props;

        if (searchCriteria) {
            clearSearchResults();

            makeSearchRequest({
                args: {
                    search: searchCriteria,
                    pageSize: 24,
                    currentPage: 1
                }
            });
        }
    }

    render() {
        return (
            <SearchOverlay
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withReducers({
    SearchBarReducer
})(connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer));
