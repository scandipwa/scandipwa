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
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getQueryParam, setQueryParams } from 'Util/Url';
import { PagesType, FilterInputType } from 'Type/ProductList';
import { HistoryType } from 'Type/Common';
import { debounce } from 'Util/Request';
import { LocationType } from 'Type/Router';

import ProductList from './ProductList.component';

export const UPDATE_PAGE_FREQUENCY = 0; // (ms)

export class ProductListContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired,
        location: LocationType.isRequired,
        getIsNewCategory: PropTypes.func.isRequired,
        pages: PagesType.isRequired,
        pageSize: PropTypes.number,
        isLoading: PropTypes.bool.isRequired,
        totalItems: PropTypes.number.isRequired,
        requestProductList: PropTypes.func.isRequired,
        selectedFilters: PropTypes.objectOf(PropTypes.shape),
        isInfiniteLoaderEnabled: PropTypes.bool,
        isPaginationEnabled: PropTypes.bool,
        filter: FilterInputType,
        search: PropTypes.string,
        sort: PropTypes.objectOf(PropTypes.string)
    };

    static defaultProps = {
        pageSize: 20,
        filter: {},
        search: '',
        selectedFilters: {},
        sort: undefined,
        isPaginationEnabled: true,
        isInfiniteLoaderEnabled: true
    };

    state = { pagesCount: 1 };

    containerFunctions = {
        loadPrevPage: this.loadPage.bind(this, false),
        loadPage: this.loadPage.bind(this),
        updatePage: this.updatePage.bind(this)
    };

    requestPage = debounce((currentPage = 1, isNext = false) => {
        const {
            sort,
            search,
            filter,
            pageSize,
            requestProductList
        } = this.props;

        if (!isNext) {
            window.scrollTo(0, 0);
        }

        const options = {
            isNext,
            args: {
                sort,
                filter,
                search,
                pageSize,
                currentPage
            }
        };

        requestProductList(options);
    }, UPDATE_PAGE_FREQUENCY);

    static getDerivedStateFromProps(props) {
        const { isLoading } = props;
        if (isLoading) {
            return { pagesCount: 1 };
        }

        return null;
    }

    componentDidMount() {
        const { pages, getIsNewCategory } = this.props;
        const { pagesCount } = this.state;
        const pagesLength = Object.keys(pages).length;

        if (pagesCount !== pagesLength) {
            this.setState({ pagesCount: pagesLength });
        }

        // Is true when category is changed. This check prevents making new requests when navigating back to PLP from PDP
        if (getIsNewCategory()) {
            this.requestPage(this._getPageFromUrl());
        }
    }

    componentDidUpdate(prevProps) {
        const { sort, search, filter } = this.props;
        const { sort: prevSort, search: prevSearch, filter: prevFilter } = prevProps;

        if (search !== prevSearch
            || JSON.stringify(sort) !== JSON.stringify(prevSort)
            || JSON.stringify(filter) !== JSON.stringify(prevFilter)
        ) {
            this.requestPage(this._getPageFromUrl());
        }
    }

    containerProps = () => ({
        currentPage: this._getPageFromUrl(),
        isShowLoading: this._isShowLoading(),
        isVisible: this._isVisible(),
        requestPage: this.requestPage
    });

    _getPageFromUrl() {
        const { location } = this.props;
        return +(getQueryParam('page', location) || 1);
    }

    _getPagesBounds() {
        const { pages, totalItems, pageSize } = this.props;
        const keys = Object.keys(pages);

        return {
            maxPage: Math.max(...keys),
            minPage: Math.min(...keys),
            totalPages: Math.ceil(totalItems / pageSize),
            loadedPagesCount: keys.length
        };
    }

    _isShowLoading() {
        const { isLoading } = this.props;
        const { minPage } = this._getPagesBounds();
        return minPage > 1 && !isLoading;
    }

    _isVisible() {
        const { maxPage, totalPages } = this._getPagesBounds();
        return maxPage < totalPages;
    }

    loadPage(next = true) {
        const { pagesCount } = this.state;
        const { isLoading } = this.props;
        const {
            minPage,
            maxPage,
            totalPages,
            loadedPagesCount
        } = this._getPagesBounds();

        const isUpdatable = totalPages > 0 && pagesCount === loadedPagesCount;
        const shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

        if (isUpdatable && shouldUpdateList && !isLoading) {
            this.setState({ pagesCount: pagesCount + 1 });
            this.requestPage(next ? maxPage + 1 : minPage - 1, true);
        }
    }

    updatePage(pageNumber) {
        const { location, history } = this.props;

        setQueryParams({
            page: pageNumber === 1 ? '' : pageNumber
        }, location, history);
    }

    render() {
        return (
            <ProductList
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(ProductListContainer);
