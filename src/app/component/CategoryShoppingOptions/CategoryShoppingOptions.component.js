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

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO: make mobile drop-down interactive

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RangeSelector from 'Component/RangeSelector';
import CategorySearch from 'Component/CategorySearch';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';
import './CategoryShoppingOptions.style';

/**
 * Category Shopping Options (filters)
 * @class CategoryShoppingOptions
 */
class CategoryShoppingOptions extends Component {
    constructor(props) {
        super(props);

        this.getFilterUrl = this.getFilterUrl.bind(this);
        this.updateFilter = this.updateFilter.bind(this);

        this.state = {
            optionsVisible: false
        };
    }

    /**
     * Returns filter array with new parameters
     *
     * @param {String} filterKey key of option
     * @param {String} value
     * @returns {Object[]}
     * @memberof CategoryShoppingOptions
     */
    getNewFilterArray(filterKey, value) {
        const { customFiltersValues } = this.props;
        const newFilterArray = customFiltersValues[filterKey] !== undefined
            ? Array.from(customFiltersValues[filterKey])
            : [];
        const filterValueIndex = newFilterArray.indexOf(value);

        if (filterValueIndex === -1) {
            newFilterArray.push(value);
        } else {
            newFilterArray.splice(filterValueIndex, 1);
        }

        return newFilterArray;
    }

    /**
     * Get URL for new filter value
     *
     * @param {*} filterKey
     * @param {*} value
     * @returns {String} new URL path
     * @memberof CategoryShoppingOptions
     */
    getFilterUrl(filterKey, value) {
        const { getFilterUrl } = this.props;

        return getFilterUrl(filterKey, this.getNewFilterArray(filterKey, value));
    }

    /**
     * Update filter when new filter is selected
     * @return {Boolean}
     */
    updateFilter(requestVar, value) {
        const { updateFilter } = this.props;

        updateFilter(requestVar, this.getNewFilterArray(requestVar, value));
    }

    /**
     * Check if any filter is selected to show Clear all button
     * @return {Boolean}
     */
    isClearButtonShown() {
        const {
            customFiltersValues,
            sortKey,
            sortDirection,
            searchValue,
            priceValue: { min, max },
            minPriceValue,
            maxPriceValue
        } = this.props;

        const isPriceCustom = min !== minPriceValue || max !== maxPriceValue;
        return Object.keys(customFiltersValues).length > 0
            || searchValue || isPriceCustom || !(sortKey || sortDirection);
    }

    /**
     * Open/Close shoping options on mobile
     * @return {void}
     */
    toggleOptions() {
        const { optionsVisible } = this.state;
        this.setState({ optionsVisible: !optionsVisible });
    }

    renderFilterTitle(title) {
        return (
            <h4 block="CategoryShoppingOptions" elem="FilterTitle">
                <TextPlaceholder content={ title || '' } />
            </h4>
        );
    }

    renderPriceFilter() {
        const {
            updatePriceRange, priceValue, minPriceValue, maxPriceValue
        } = this.props;

        return (
            <li block="CategoryShoppingOptions" elem="FilterBlock">
                { this.renderFilterTitle('Price Range') }
                <RangeSelector
                  value={ priceValue }
                  minValue={ minPriceValue }
                  maxValue={ maxPriceValue }
                  onChangeComplete={ newValue => updatePriceRange(newValue) }
                />
            </li>
        );
    }

    renderCustomFilters(isLoaded) {
        const { availableFilters, customFiltersValues } = this.props;

        return (
            <ProductConfigurableAttributes
              isReady={ isLoaded }
              configurable_options={ availableFilters }
              getLink={ this.getFilterUrl }
              parameters={ customFiltersValues }
              updateConfigurableVariant={ this.updateFilter }
            />
        );
    }

    renderSearchBar() {
        const { searchValue, updateSearch, showSearch } = this.props;

        if (!showSearch) return null;

        return (
            <li block="CategoryShoppingOptions" elem="SearchBar">
                { this.renderFilterTitle('Search') }
                <CategorySearch
                  value={ searchValue }
                  onChange={ value => updateSearch(value) }
                />
            </li>
        );
    }

    renderClearFiltersButton() {
        const { clearFilters } = this.props;

        if (!window.location.search) return null; // bad, that we are showing this on page

        return (
            <button
              block="CategoryShoppingOptions"
              elem="ClearButton"
              onClick={ () => clearFilters() }
            >
                { __('Clear Filters') }
            </button>
        );
    }

    renderElements(isLoaded) {
        return (
            <ul block="CategoryShoppingOptions" elem="Wrapper">
                { this.renderClearFiltersButton() }
                { this.renderSearchBar() }
                { this.renderCustomFilters(isLoaded) }
                { this.renderPriceFilter() }
            </ul>
        );
    }

    render() {
        const { availableFilters } = this.props;
        const { optionsVisible } = this.state;
        const isLoaded = availableFilters && !!Object.keys(availableFilters).length;

        return (
            <div block="CategoryShoppingOptions" mods={ { optionsVisible } }>
                <h3
                  block="CategoryShoppingOptions"
                  elem="Heading"
                  mods={ { isLoaded } }
                  onClick={ () => this.toggleOptions() }
                >
                    <TextPlaceholder content={ isLoaded ? __('Shopping Options') : '' } />
                </h3>
                { this.renderElements(isLoaded) }
            </div>
        );
    }
}

CategoryShoppingOptions.propTypes = {
    updatePriceRange: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    getFilterUrl: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    showSearch: PropTypes.bool,
    searchValue: PropTypes.string,
    priceValue: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }).isRequired,
    minPriceValue: PropTypes.number.isRequired,
    maxPriceValue: PropTypes.number.isRequired,
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
    clearFilters: PropTypes.func.isRequired,
    sortKey: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired
};

CategoryShoppingOptions.defaultProps = {
    searchValue: '',
    showSearch: false
};

export default CategoryShoppingOptions;
