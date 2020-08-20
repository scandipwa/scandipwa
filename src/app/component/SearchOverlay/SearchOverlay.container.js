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
        searchCriteria: PropTypes.string.isRequired
    };

    containerFunctions = {
        makeSearchRequest: this.makeSearchRequest.bind(this)
    };

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
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer);
