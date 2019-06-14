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

import React from 'react';
import PropTypes from 'prop-types';
import CategoryPage from 'Route/CategoryPage/CategoryPage.component';
import {
    getUrlParam, getQueryParam, setQueryParams, clearQueriesFromUrl
} from 'Util/Url';
import './SearchPage.style';

class SearchPage extends CategoryPage {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'name',
            sortDirection: 'ASC',
            defaultPriceRange: { min: 0, max: 300 },
            minPriceRange: 0,
            maxPriceRange: 300,
            previousPage: 0,
            pageSize: 12
        };
    }

    componentWillMount() {
        this.updateBreadcrumbs();
    }

    componentDidMount() {
        const { isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (!isOnlyPlaceholder) {
            this.updateBreadcrumbs();
            this.requestCategory();
        } else {
            updateLoadStatus(true);
        }
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;

        if (this.urlHasChanged(location, prevProps)) {
            this.updateBreadcrumbs();
            this.requestCategory();
        }
    }

    /**
     * Prepare and dispatch category request
     * @return {void}
     */
    requestCategory() {
        const {
            requestCategory,
            location,
            isSearchPage,
            items,
            category,
            categoryIds
        } = this.props;

        const {
            sortKey,
            sortDirection,
            previousPage,
            pageSize
        } = this.state;

        const categoryUrlPath = !categoryIds ? this.getCategoryUrlPath() : null;
        const currentPage = getQueryParam('page', location) || 1;
        const priceRange = this.getPriceRangeFromUrl();
        const customFilters = this.getCustomFiltersFromUrl();
        const querySortKey = getQueryParam('sortKey', location);
        const querySortDirection = getQueryParam('sortDirection', location);

        const options = {
            search: getUrlParam({ path: 'search/' }, location),
            isSearchPage: isSearchPage || false,
            categoryUrlPath,
            currentPage,
            previousPage,
            pageSize,
            priceRange,
            customFilters,
            categoryIds,
            sortKey: querySortKey || sortKey,
            sortDirection: querySortDirection || sortDirection,
            productsLoaded: items.length,
            // TODO: adding configurable data request (as in PDP) to query, should make a seperate/more specific query
            getConfigurableData: true,
            isCategoryLoaded: (!!Object.entries(category).length)
        };

        const stateUpdate = {
            previousPage: currentPage
        };

        if (querySortKey) {
            stateUpdate.sortKey = querySortKey;
        }

        if (querySortDirection) {
            stateUpdate.sortDirection = querySortDirection;
        }

        this.setState(stateUpdate);

        requestCategory(options);
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs, location } = this.props;
        const search = getUrlParam({ path: 'search/' }, location);
        updateBreadcrumbs([
            {
                name: 'Results'
            },
            {
                url: search,
                name: search
            },
            {
                name: 'Search'
            }
        ]);
    }

    renderCategoryDetails() {
        const search = decodeURIComponent(getUrlParam({ path: 'search/' }, location));

        return (
            <div block="SearchPage" elem="Description">
                <h1 block="SearchPage" elem="Heading">
                    { __('Search results for: ') }
                    <span>{ search }</span>
                </h1>
            </div>
        )
    }

    /**
     * Clear all filters
     * @return {void}
     */
    clearFilters(location, history) {
        const { sortKey, sortDirection } = this.state;
        const page = 1;

        clearQueriesFromUrl(history);
        setQueryParams(
            {
                sortKey,
                sortDirection,
                page
            }, location, history
        );
    }
}

SearchPage.propTypes = {
    makeSearchRequest: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default SearchPage;
