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
import { Location } from 'history';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { FilterPriceRange } from 'Query/ProductList.type';
import ProductListInfoDispatcher from 'Store/ProductListInfo/ProductListInfo.dispatcher';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import { HistoryState } from 'Util/History/History.type';
import { waitForPriorityLoad } from 'Util/Request/LowPriorityLoad';
import { RootState } from 'Util/Store/Store.type';
import { getQueryParam, setQueryParams } from 'Util/Url';

import ProductList from './ProductList.component';
import {
    PageBounds,
    ProductListComponentContainerPropKeys,
    ProductListComponentProps,
    ProductListContainerFunctions,
    ProductListContainerMapDispatchProps,
    ProductListContainerMapStateProps,
    ProductListContainerProps,
    ProductListContainerState,
} from './ProductList.type';

/** @namespace Component/ProductList/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductListContainerMapStateProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/ProductList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductListContainerMapDispatchProps => ({
    requestProductListInfo: (options) => ProductListInfoDispatcher.handleData(dispatch, options),
});

/** @namespace Component/ProductList/Container */
export class ProductListContainer extends PureComponent<ProductListContainerProps, ProductListContainerState> {
    static defaultProps: Partial<ProductListContainerProps> = {
        mix: {},
        pageSize: 24,
        filter: {},
        search: '',
        selectedFilters: {},
        sort: null,
        isPreventRequest: false,
        isPaginationEnabled: true,
        isInfiniteLoaderEnabled: true,
        isPageLoading: false,
        isLoading: false,
        noAttributes: false,
        noVariants: false,
        isWidget: false,
        title: '',
        totalPages: 1,
        isPlp: false,
    };

    state: ProductListContainerState = {
        pagesCount: 1,
    };

    containerFunctions: ProductListContainerFunctions = {
        loadPrevPage: this.loadPage.bind(this, false),
        loadPage: this.loadPage.bind(this),
        updatePage: this.updatePage.bind(this),
    };

    componentDidMount(): void {
        const {
            pages, isPreventRequest,
        } = this.props;
        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            this.setState({ pagesCount: pagesLength });
        }

        // Is true when category is changed. This check prevents making new requests when navigating back to PLP from PDP
        if (!isPreventRequest) {
            this.requestPage(this._getPageFromUrl());
        }
    }

    componentDidUpdate(prevProps: ProductListContainerProps): void {
        const {
            sort,
            search,
            filter,
            pages,
            device,
            isPlp,
        } = this.props;

        const {
            sort: prevSort,
            search: prevSearch,
            filter: prevFilter,
            location: prevLocation,
        } = prevProps;

        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ pagesCount: pagesLength });
        }

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (
            JSON.stringify(filter) !== JSON.stringify(prevFilter)
            || JSON.stringify(sort) !== JSON.stringify(prevSort)
            || currentPage !== prevPage
        ) {
            window.isPrefetchValueUsed = false;
        }

        // prevents requestPage() fired twice on Mobile PLP with enabled infinite scroll
        if (device.isMobile && this._getIsInfiniteLoaderEnabled() && isPlp) {
            return;
        }

        if (search !== prevSearch
            || currentPage !== prevPage
            || JSON.stringify(sort) !== JSON.stringify(prevSort)
            || JSON.stringify(filter) !== JSON.stringify(prevFilter)
        ) {
            this.requestPage(this._getPageFromUrl());
        }
    }

    componentWillUnmount() {
        window.isPrefetchValueUsed = false;
    }

    isEmptyFilter(): boolean {
        const { filter } = this.props;

        const validFilters = Object.entries(filter).filter(([key, value]) => {
            switch (key) {
            case 'priceRange':
                return (value as FilterPriceRange).min > 0 || (value as FilterPriceRange).max > 0;
            case 'customFilters':
                return Object.keys(value).length > 0;
            case 'categoryIds':
            default:
                return true;
            }
        });

        /**
         * If there is more then one valid filter, filters are not empty.
         */
        return validFilters.length > 0;
    }

    requestPage(currentPage = 1, isNext = false): void {
        const {
            sort,
            search,
            filter,
            pageSize,
            requestProductList,
            requestProductListInfo,
            noAttributes,
            noVariants,
            isWidget,
            device,
            location: { pathname },
        } = this.props;
        const { isPrefetchValueUsed } = window;

        const isSearch = pathname.includes(Page.SEARCH);
        const isPrefetched = isPrefetchValueUsed && !isWidget && !isSearch;

        /**
         * In case the wrong category was passed down to the product list,
         * prevent it from being requested.
         */
        if (filter.categoryIds === -1) {
            return;
        }

        /**
         * Do not request page if there are no filters
         */
        if (!search && !this.isEmptyFilter()) {
            return;
        }

        // TODO: product list requests filters alongside the page
        // TODO: sometimes product list is requested more then once
        // TODO: the product list should not request itself, when coming from PDP

        const options = {
            isNext,
            noAttributes,
            noVariants,
            args: {
                sort: sort ?? undefined,
                filter,
                search,
                pageSize,
                currentPage,
            },
        };

        const infoOptions = {
            args: {
                filter,
                search,
            },
        };

        if (!isPrefetched) {
            requestProductList(options);
        }

        if (!isWidget) {
            waitForPriorityLoad().then(
            /** @namespace Component/ProductList/Container/ProductListContainer/requestPage/waitForPriorityLoad/then/requestProductListInfo */
                () => requestProductListInfo(infoOptions),
            );

            if (!device.isMobile) {
                scrollToTop();
            }
        }
    }

    containerProps(): Pick<ProductListComponentProps, ProductListComponentContainerPropKeys> {
        const {
            isPaginationEnabled: defaultIsPaginationEnabled = false,
        } = ProductListContainer.defaultProps;
        const {
            device,
            isLoading,
            isPaginationEnabled = defaultIsPaginationEnabled,
            isWidget = false,
            mix,
            pages,
            selectedFilters,
            title = '',
            totalPages,
            isPlp,
        } = this.props;

        return {
            device,
            isLoading,
            isPaginationEnabled,
            isWidget,
            mix,
            pages,
            selectedFilters,
            title,
            totalPages,
            currentPage: this._getPageFromUrl(),
            isShowLoading: this._isShowLoading(),
            isVisible: this._isVisible(),
            isPlp: !!isPlp,
            requestPage: this.requestPage,
            // disable this property to enable infinite scroll on desktop
            isInfiniteLoaderEnabled: this._getIsInfiniteLoaderEnabled(),
        };
    }

    _getIsInfiniteLoaderEnabled(): boolean { // disable infinite scroll on mobile
        const { isInfiniteLoaderEnabled = false, device } = this.props;
        const {
            isInfiniteLoaderEnabled: defaultIsInfiniteLoaderEnabled = false,
        } = ProductListContainer.defaultProps;

        // allow scroll and mobile
        if (device.isMobile) {
            return isInfiniteLoaderEnabled || defaultIsInfiniteLoaderEnabled;
        }

        return false;
    }

    _getPageFromUrl(url?: Location<HistoryState>): number {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location || '') || 1);
    }

    _getPagesBounds(): PageBounds {
        const {
            pageSize: defaultPageSize,
        } = ProductListContainer.defaultProps;
        const {
            pages,
            totalItems,
            pageSize = defaultPageSize || 0,
        } = this.props;
        const keys: number[] = Object.keys(pages) as unknown as number[];

        return {
            maxPage: Math.max(...keys),
            minPage: Math.min(...keys),
            totalPages: Math.ceil(totalItems / pageSize),
            loadedPagesCount: keys.length,
        };
    }

    _isShowLoading(): boolean {
        const { isLoading } = this.props;
        const { minPage } = this._getPagesBounds();

        return minPage > 1 && !isLoading;
    }

    _isVisible(): boolean {
        const { maxPage, totalPages } = this._getPagesBounds();

        return maxPage < totalPages;
    }

    loadPage(next = true): void {
        const { pagesCount } = this.state;
        const { isPageLoading } = this.props;

        const {
            minPage,
            maxPage,
            totalPages,
            loadedPagesCount,
        } = this._getPagesBounds();

        const isUpdatable = totalPages > 0 && pagesCount === loadedPagesCount;
        const shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

        if (isUpdatable && shouldUpdateList && !isPageLoading) {
            this.setState({ pagesCount: pagesCount + 1 });
            this.requestPage(next ? maxPage + 1 : minPage - 1, true);
        }
    }

    updatePage(pageNumber: number): void {
        const { location, history, device } = this.props;

        setQueryParams({
            page: pageNumber === 1 ? '' : String(pageNumber),
        }, location, history);

        if (!device.isMobile && !this._getIsInfiniteLoaderEnabled()) {
            scrollToTop();
        }
    }

    render(): ReactElement {
        return (
            <ProductList
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        ProductListContainer as unknown as React.ComponentType<
        RouteComponentProps & ProductListContainerProps
        >,
    ),
);
