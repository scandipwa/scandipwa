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
    getUrlParam, getQueryParam
} from 'Util/Url';
import './SearchPage.style';

class SearchPage extends CategoryPage {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'name',
            sortDirection: 'ASC',
            defaultPriceRange: { min: 0, max: 300 },
            previousPage: 0,
            pageSize: 12
        };
    }

    componentWillMount() {
        this.updateBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;

        if (this.urlHasChanged(location, prevProps)) {
            this.updateBreadcrumbs();
            this.requestCategory();
        }
    }


    _getProductListOptions(currentPage, isNext) {
        const {
            location,
            categoryIds
        } = this.props;

        const {
            sortKey,
            pageSize,
            sortDirection
        } = this.state;

        const categoryUrlPath = !categoryIds ? this.getCategoryUrlPath() : null;
        const customFilters = this.getCustomFiltersFromUrl();
        const priceRange = this.getPriceRangeFromUrl();
        const querySortDirection = getQueryParam('sortDirection', location);
        const querySortKey = getQueryParam('sortKey', location);

        const options = {
            categoryIds,
            categoryUrlPath,
            currentPage,
            customFilters,
            // TODO: adding configurable data request (as in PDP) to query, should make a seperate/more specific query
            getConfigurableData: true,
            isNext,
            pageSize,
            priceRange,
            search: getUrlParam({ path: 'search/' }, location),
            sortDirection: querySortDirection || sortDirection,
            sortKey: querySortKey || sortKey
        };

        this.setState({
            sortKey: querySortKey || sortKey,
            sortDirection: querySortDirection || sortDirection
        });

        return options;
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
        );
    }
}

SearchPage.propTypes = {
    makeSearchRequest: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired
};

export default SearchPage;
