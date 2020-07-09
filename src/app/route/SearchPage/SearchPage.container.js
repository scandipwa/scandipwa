import { connect } from 'react-redux';

import { SEARCH } from 'Component/Header/Header.config';
import {
    CategoryPageContainer,
    LOADING_TIME
} from 'Route/CategoryPage/CategoryPage.container';
import { updateCurrentCategory } from 'Store/Category/Category.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import {
    ProductListInfoDispatcher,
    updateInfoLoadStatus
} from 'Store/ProductListInfo/ProductListInfo.action';
import { debounce } from 'Util/Request';
import { getUrlParam } from 'Util/Url';

import SearchPage from './SearchPage.component';

const BreadcrumbsDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/Breadcrumbs/Breadcrumbs.dispatcher');
const CategoryDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/Category/Category.dispatcher');
const MetaDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/Meta/Meta.dispatcher');
const NoMatchDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/NoMatch/NoMatch.dispatcher');


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
    requestCategory: options => CategoryDispatcher.then(({ default: dispatcher }) => dispatcher.handleData(dispatch, options)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.then(({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)),
    requestProductListInfo: options => ProductListInfoDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateInfoLoadStatus(isLoading)),
    updateNoMatch: options => NoMatchDispatcher.then(({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, options)),
    setBigOfflineNotice: isBig => dispatch(setBigOfflineNotice(isBig)),
    updateMetaFromCategory: category => MetaDispatcher.then(({ default: dispatcher }) => dispatcher.updateWithCategory(category, dispatch)),
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
