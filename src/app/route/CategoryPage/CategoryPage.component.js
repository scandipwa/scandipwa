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
import React, { Component } from 'react';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import CategoryProductList from 'Component/CategoryProductList';
import CategoryPagination from 'Component/CategoryPagination';
import TextPlaceholder from 'Component/TextPlaceholder';
import CategoryDetails from 'Component/CategoryDetails';
import ContentWrapper from 'Component/ContentWrapper';
import CategorySort from 'Component/CategorySort';
import { CategoryTreeType } from 'Type/Category';
import { PagesType } from 'Type/ProductList';
import Meta from 'Component/Meta';
import './CategoryPage.style';

class CategoryPage extends Component {
    renderItemCount() {
        const { totalItems, isInfoLoading } = this.props;

        return (
            <p block="CategoryPage" elem="ItemsCount">
                <TextPlaceholder
                  content={ (isInfoLoading
                      ? __('Products are loading...')
                      : __('%s items found', totalItems)
                  ) }
                />
            </p>
        );
    }

    renderProductList() {
        const {
            pages, isInfoLoading,
            requestNextPage, getSelectedFiltersFromUrl,
            getPageParams, updatePage,
            isPagesLoading
        } = this.props;

        const customFilters = getSelectedFiltersFromUrl();
        const { totalPages } = getPageParams();

        return (
            <CategoryProductList
              pages={ pages }
              isLoading={ isInfoLoading || isPagesLoading }
              totalPages={ totalPages }
              selectedFilters={ customFilters }
              loadPage={ requestNextPage }
              updatePage={ updatePage }
            />
        );
    }

    renderCategoryDetails() {
        const { category } = this.props;

        return (
            <CategoryDetails
              category={ category }
            />
        );
    }

    renderFilterButton() {
        const { toggleOverlayByKey, changeHeaderState } = this.props;

        return (
            <button
              block="CategoryPage"
              elem="Filter"
              onClick={ () => {
                  toggleOverlayByKey('category-filter');
                  changeHeaderState({ name: 'filter', title: 'Filters' });
              } }
            >
                { __('Filter') }
            </button>
        );
    }

    renderFilterOverlay() {
        const {
            minPriceRange, maxPriceRange,
            filters, getSelectedFiltersFromUrl,
            getPriceRangeFromUrl,
            updatePriceRange, updateFilter
        } = this.props;

        return (
            <CategoryFilterOverlay
              availableFilters={ filters }
              customFiltersValues={ getSelectedFiltersFromUrl() }
              updateFilter={ updateFilter }
              updatePriceRange={ updatePriceRange }
              priceValue={ getPriceRangeFromUrl() }
              minPriceValue={ minPriceRange }
              maxPriceValue={ maxPriceRange }
            />
        );
    }

    renderCategorySort() {
        const { sortFields, getSortFromUrl, onSortChange } = this.props;
        const { options = {} } = sortFields;
        const updatedSortFields = Object.values(options).map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = getSortFromUrl();

        return (
            <CategorySort
              onSortChange={ onSortChange }
              sortFields={ updatedSortFields }
              sortKey={ sortKey }
              sortDirection={ sortDirection }
            />
        );
    }

    renderCategoryPagination() {
        const {
            category, requestPage,
            location, history,
            isInfoLoading, getPageParams
        } = this.props;

        if (isInfoLoading) return null;

        const { totalPages, currentPage } = getPageParams();

        return (
            <CategoryPagination
              history={ history }
              location={ location }
              category={ category }
              totalPages={ totalPages }
              currentPage={ currentPage }
              ariaLabel={ __('Catalog navigation') }
              getPage={ requestPage }
            />
        );
    }

    render() {
        const { category } = this.props;

        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CategoryPage', elem: 'Wrapper' } }
                  label="Category page"
                >
                    <Meta metaObject={ category } />
                    { this.renderFilterOverlay() }
                    { this.renderCategoryDetails() }
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemCount() }
                        { this.renderCategorySort() }
                        { this.renderFilterButton() }
                    </aside>
                    { this.renderProductList() }
                    { this.renderCategoryPagination() }
                </ContentWrapper>
            </main>
        );
    }
}

CategoryPage.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    category: CategoryTreeType.isRequired,
    pages: PagesType.isRequired,
    totalItems: PropTypes.number.isRequired,
    minPriceRange: PropTypes.number.isRequired,
    maxPriceRange: PropTypes.number.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    sortFields: PropTypes.shape({
        options: PropTypes.array
    }).isRequired,
    isInfoLoading: PropTypes.bool.isRequired,
    isPagesLoading: PropTypes.bool.isRequired,
    onSortChange: PropTypes.func.isRequired,
    getPageParams: PropTypes.func.isRequired,
    getPriceRangeFromUrl: PropTypes.func.isRequired,
    getSelectedFiltersFromUrl: PropTypes.func.isRequired,
    requestPage: PropTypes.func.isRequired,
    requestNextPage: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updatePriceRange: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    getSortFromUrl: PropTypes.func.isRequired,
    toggleOverlayByKey: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

export default CategoryPage;
