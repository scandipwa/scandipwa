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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SearchBarReducer from 'Store/SearchBar/SearchBar.reducer';
import { ReactElement } from 'Type/Common.type';
import { withReducers } from 'Util/DynamicReducer';
import { RootState } from 'Util/Store/Store.type';

import SearchOverlay from './SearchOverlay.component';
import {
    SearchOverlayComponentContainerPropKeys,
    SearchOverlayComponentProps,
    SearchOverlayContainerFunctions,
    SearchOverlayContainerMapDispatchProps,
    SearchOverlayContainerMapStateProps,
    SearchOverlayContainerProps
} from './SearchOverlay.type';

export const SearchBarDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/SearchBar/SearchBar.dispatcher'
);

/** @namespace Component/SearchOverlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SearchOverlayContainerMapStateProps => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

/** @namespace Component/SearchOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SearchOverlayContainerMapDispatchProps => ({
    makeSearchRequest: (options) => SearchBarDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    clearSearchResults: () => SearchBarDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearSearchResults(dispatch)
    )
});

/** @namespace Component/SearchOverlay/Container */
export class SearchOverlayContainer extends PureComponent<SearchOverlayContainerProps> {
    static defaultProps: Partial<SearchOverlayContainerProps> = {
        isHideOverlay: false
    };

    containerFunctions: SearchOverlayContainerFunctions = {
        makeSearchRequest: this.makeSearchRequest.bind(this)
    };

    containerProps(): Pick<SearchOverlayComponentProps, SearchOverlayComponentContainerPropKeys> {
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

    makeSearchRequest(): void {
        const {
            makeSearchRequest,
            clearSearchResults,
            searchCriteria
        } = this.props;

        if (searchCriteria) {
            clearSearchResults();
            const search = encodeURIComponent(searchCriteria.trim().replace(/%/g, '%25'));
            makeSearchRequest({
                args: {
                    search,
                    pageSize: 24,
                    currentPage: 1
                }
            });
        }
    }

    render(): ReactElement {
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
