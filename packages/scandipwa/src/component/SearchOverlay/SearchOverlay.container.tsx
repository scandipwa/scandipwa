/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ComponentType, createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SearchBarDispatcher from 'Store/SearchBar/SearchBar.dispatcher';
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
    SearchOverlayContainerProps,
    SearchOverlayContainerState,
} from './SearchOverlay.type';

/** @namespace Component/SearchOverlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SearchOverlayContainerMapStateProps => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading,
});

/** @namespace Component/SearchOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SearchOverlayContainerMapDispatchProps => ({
    makeSearchRequest: (options) => SearchBarDispatcher.handleData(dispatch, options),
    clearSearchResults: () => SearchBarDispatcher.clearSearchResults(dispatch),
});

/** @namespace Component/SearchOverlay/Container */
export class SearchOverlayContainer extends PureComponent<SearchOverlayContainerProps> {
    static defaultProps: Partial<SearchOverlayContainerProps> = {
        isHideOverlay: false,
    };

    containerFunctions: SearchOverlayContainerFunctions = {
        makeSearchRequest: this.makeSearchRequest.bind(this),
    };

    resultRef = createRef<HTMLDivElement>();

    state: SearchOverlayContainerState = {
        activeClosingAnimation: false,
    };

    componentDidUpdate(prevProps: Readonly<SearchOverlayContainerProps>): void {
        const { searchCriteria: prevSearchCriteria } = prevProps;
        const { searchCriteria } = this.props;

        if (!searchCriteria.trim() && searchCriteria !== prevSearchCriteria) {
            this.setState({ activeClosingAnimation: true });

            const animationendHandler = () => {
                this.setState({ activeClosingAnimation: false });

                this.resultRef.current?.removeEventListener('animationend', animationendHandler);
            };

            this.resultRef.current?.addEventListener('animationend', animationendHandler);
        }
    }

    containerProps(): Pick<SearchOverlayComponentProps, SearchOverlayComponentContainerPropKeys> {
        const {
            clearSearchResults,
            isHideOverlay,
            isLoading,
            searchCriteria,
            searchResults,
        } = this.props;

        const {
            activeClosingAnimation,
        } = this.state;

        return {
            clearSearchResults,
            isHideOverlay,
            isLoading,
            searchCriteria,
            searchResults,
            resultRef: this.resultRef,
            activeClosingAnimation,
        };
    }

    makeSearchRequest(): void {
        const {
            makeSearchRequest,
            clearSearchResults,
            searchCriteria,
        } = this.props;

        if (searchCriteria) {
            clearSearchResults();
            const search = encodeURIComponent(searchCriteria.trim().replace(/%/g, '%25'));

            makeSearchRequest({
                args: {
                    search,
                    pageSize: 24,
                    currentPage: 1,
                },
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
    SearchBarReducer,
})(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchOverlayContainer)) as unknown as ComponentType<Partial<SearchOverlayComponentProps>>;
