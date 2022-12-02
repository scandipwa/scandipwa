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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// TODO: try SEARCH type
import { Page } from 'Component/Header/Header.config';
import { LOADING_TIME, SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import {
    CategoryPageContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
} from 'Route/CategoryPage/CategoryPage.container';
import CategoryReducer from 'Store/Category/Category.reducer';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { ReactElement } from 'Type/Common.type';
import { getSelectedFiltersFromUrl } from 'Util/Category';
import { isSearchPage } from 'Util/Category/Category';
import { decodeString, noopFn } from 'Util/Common';
import { withReducers } from 'Util/DynamicReducer';
import history from 'Util/History';
import { debounce } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import SearchPage from './SearchPage.component';
import {
    SearchPageComponentContainerPropKeys,
    SearchPageComponentProps,
    SearchPageContainerConfig,
    SearchPageContainerMapDispatchProps, SearchPageContainerMapStateProps, SearchPageContainerProps,
    SearchPageContainerState,
} from './SearchPage.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const CategoryDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Category/Category.dispatcher'
);
export const MetaDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Meta/Meta.dispatcher'
);
export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Route/SearchPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SearchPageContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
    minPriceRange: state.ProductListReducer.minPrice,
    maxPriceRange: state.ProductListReducer.maxPrice,
});

/** @namespace Route/SearchPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SearchPageContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
});

/** @namespace Route/SearchPage/Container */
export class SearchPageContainer extends CategoryPageContainer<
SearchPageContainerProps,
SearchPageContainerState
> {
    static defaultProps: Partial<SearchPageContainerProps> = {
        ...CategoryPageContainer.defaultProps,
        isSearchPage: isSearchPage(),
        updateMetaFromCategory: noopFn,
    };

    config: SearchPageContainerConfig = {
        sortKey: 'none',
        sortDirection: SortDirections.ASC,
    };

    updateMeta(): void {
        const { updateMetaStore } = this.props;

        updateMetaStore({ title: __('Search') });
    }

    updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const search = decodeString(this.getSearchParam());

        updateBreadcrumbs({
            url: '',
            name: search,
            id: '',
            breadcrumbs: [],
        });
    }

    updateHeaderState(): void {
        const {
            changeHeaderState,
        } = this.props;

        const { category } = history?.location?.state || {};
        const search = this.getSearchParam();

        const onBackClick = category
            ? () => history.goBack()
            : () => history.push(appendWithStoreCode('/menu'));

        changeHeaderState({
            name: Page.CATEGORY,
            title: search,
            onBackClick,
        });
    }

    componentDidMount(): void {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeaderState();
        this.updateNavigationState();
    }

    componentDidUpdate(prevProps: SearchPageContainerProps): void {
        const {
            isOffline,
            match: { params = {} },
            selectedFilters,
            updateCategoryStore,
        } = this.props;
        const { query } = params as Record<string, string>;

        const {
            match: { params: prevParams = {} },
        } = prevProps;
        const { query: prevQuery } = prevParams as Record<string, string>;

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        /**
         * If search query has changed - update related information
         */
        if (query !== prevQuery) {
            this.updateMeta();
            this.updateBreadcrumbs();
            this.updateHeaderState();
        }

        if (JSON.stringify(selectedFilters) !== JSON.stringify(getSelectedFiltersFromUrl())) {
            updateCategoryStore({ selectedFilters: getSelectedFiltersFromUrl() });
        }
    }

    getSearchParam(): string {
        const { match: { params = {} } } = this.props;
        const { query } = params as Record<string, string>;

        return query;
    }

    containerProps(): Pick<
    SearchPageComponentProps,
    SearchPageComponentContainerPropKeys
    > {
        return {
            ...super.containerProps(),
            search: this.getSearchParam(),
        };
    }

    render(): ReactElement {
        return (
            <SearchPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withReducers({
    CategoryReducer,
})(connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer));
