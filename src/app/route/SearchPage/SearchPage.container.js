import { connect } from 'react-redux';
import { SEARCH } from 'Component/Header/Header.component';
import { TOP_NAVIGATION_TYPE, BOTTOM_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeNavigationState } from 'Store/Navigation';
import { CategoryDispatcher, updateCurrentCategory } from 'Store/Category';
import { MetaDispatcher, updateMeta } from 'Store/Meta';
import { setBigOfflineNotice } from 'Store/Offline';
import { toggleOverlayByKey } from 'Store/Overlay';
import { NoMatchDispatcher } from 'Store/NoMatch';

import {
    ProductListInfoDispatcher,
    updateInfoLoadStatus
} from 'Store/ProductListInfo';
import {
    CategoryPageContainer,
    LOADING_TIME
} from 'Route/CategoryPage/CategoryPage.container';
import { getUrlParam } from 'Util/Url';
import { debounce } from 'Util/Request';

import SearchPage from './SearchPage.component';

export const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    isOffline: state.OfflineReducer.isOffline,
    filters: state.ProductListInfoReducer.filters,
    sortFields: state.ProductListInfoReducer.sortFields,
    minPriceRange: state.ProductListInfoReducer.minPrice,
    maxPriceRange: state.ProductListInfoReducer.maxPrice,
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages
});

export const mapDispatchToProps = dispatch => ({
    toggleOverlayByKey: key => dispatch(toggleOverlayByKey(key)),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    changeNavigationState: state => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, state)),
    requestCategory: options => CategoryDispatcher.handleData(dispatch, options),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    requestProductListInfo: options => ProductListInfoDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateInfoLoadStatus(isLoading)),
    updateNoMatch: options => NoMatchDispatcher.updateNoMatch(dispatch, options),
    setBigOfflineNotice: isBig => dispatch(setBigOfflineNotice(isBig)),
    updateMetaFromCategory: category => MetaDispatcher.updateWithCategory(category, dispatch),
    updateCurrentCategory: category => dispatch(updateCurrentCategory(category)),
    updateMeta: meta => dispatch(updateMeta(meta))
});

export class SearchPageContainer extends CategoryPageContainer {
    static defaultProps = {
        ...this.defaultProps,
        isSearchPage: true
    };

    componentDidMount() {
        const {
            isOnlyPlaceholder,
            updateLoadStatus,
            updateMeta
        } = this.props;

        updateMeta({ title: __('Search') });

        if (isOnlyPlaceholder) {
            updateLoadStatus(true);
        }

        // request data only if URL does not match loaded category
        if (this.getIsNewCategory()) {
            this._requestCategoryWithPageList();
        } else {
            this._onCategoryUpdate();
        }

        this._updateBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        const {
            category: { id }, isOffline,
            match: { params: { query } }
        } = this.props;

        const {
            category: { id: prevId },
            match: { params: { query: prevQuery } }
        } = prevProps;

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        if (id !== prevId) {
            this._onCategoryUpdate();
        }

        if (query !== prevQuery) {
            this._updateBreadcrumbs();
        }

        this._updateData(prevProps);
    }

    _updateBreadcrumbs() {
        const { updateBreadcrumbs, match: { params: { query } } } = this.props;

        updateBreadcrumbs([{
            url: '',
            name: query
        }, {
            url: '/',
            name: __('Home')
        }]);
    }

    _onCategoryUpdate() {
        this._updateHeaderState();
        this._updateNavigationState();
    }

    _requestCategory() {
        const { updateCurrentCategory, match: { params: { query: url_path } } } = this.props;

        updateCurrentCategory({ url_path });
        this._updateHeaderState();
    }

    _getProductListOptions(currentPage) {
        const { match: { params: { query } } } = this.props;
        const customFilters = this._getSelectedFiltersFromUrl();

        return {
            args: {
                filter: {
                    customFilters
                },
                search: query
            },
            currentPage
        };
    }

    _getFilter() {
        const { categoryIds } = this.props;
        const customFilters = this._getSelectedFiltersFromUrl();
        const priceRange = this._getSelectedPriceRangeFromUrl();

        return {
            priceRange,
            categoryIds,
            customFilters
        };
    }

    _getSearchParam() {
        const { match: { params: { query } } } = this.props;

        return query;
    }

    getIsNewCategory() {
        const { category: { url_path } = {} } = this.props;

        const { location, match } = this.props;
        const path = getUrlParam(match, location);

        return `${ SEARCH }/${ url_path }` !== path;
    }

    render() {
        return (
            <SearchPage
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);
