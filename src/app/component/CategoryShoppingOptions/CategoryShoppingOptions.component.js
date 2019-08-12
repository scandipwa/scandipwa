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
        const newFilterArray = Array.from(customFiltersValues[filterKey] || []);
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
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const isPriceCustom = priceValue.min !== minPriceValue || priceValue.max !== maxPriceValue;
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

    renderCustomFilters() {
        const { availableFilters, customFiltersValues } = this.props;

        const configurable_options = availableFilters.reduce((co, item) => {
            const {
                request_var: attribute_code,
                name: attribute_label,
                filter_items
            } = item;

            // TODO: Remove this hardcoded check, after solving the problem on BE: https://github.com/magento/magento2/blob/89cf888f6f3c7b163702969a8e256f9f0486f6b8/app/code/Magento/Catalog/Model/Layer/FilterList.php#L70
            if (attribute_code === 'cat') return co;

            const { attribute_values, attribute_options } = filter_items.reduce((attribute, option) => {
                const { value_string } = option;
                const { attribute_values, attribute_options } = attribute;

                attribute_values.push(value_string);
                return {
                    ...attribute,
                    attribute_options: {
                        ...attribute_options,
                        [+value_string]: option
                    }
                };
            }, { attribute_values: [], attribute_options: {} });

            return {
                ...co,
                [attribute_code]: {
                    attribute_code,
                    attribute_label,
                    attribute_values,
                    attribute_type: 'select',
                    attribute_options
                }
            };
        }, {});

        return (
            <ProductConfigurableAttributes
              configurable_options={ configurable_options }
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

    renderPlaceholderSwatch(amountOfSwathces) {
        return (
            <li block="CategoryShoppingOptions" elem="FilterBlock">
                { this.renderFilterTitle() }
                <ul block="CategoryShoppingOptions" elem="Swatches">
                    { Array(amountOfSwathces).fill().map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={ i }>
                            <div block="CategoryShoppingOptions" elem="Swatch" />
                        </li>
                    )) }
                </ul>
            </li>
        );
    }

    renderElements(isLoaded) {
        return (
            <ul block="CategoryShoppingOptions" elem="Wrapper">
                { isLoaded
                    ? (
                        <>
                            { this.renderClearFiltersButton() }
                            { this.renderSearchBar() }
                            { this.renderCustomFilters() }
                            { this.renderPriceFilter() }
                        </>
                    )
                    : (
                        <>
                            { this.renderPlaceholderSwatch(6) }
                            { this.renderPlaceholderSwatch(10) }
                            { this.renderPlaceholderSwatch(5) }
                        </>
                    )
                }
            </ul>
        );
    }

    render() {
        const { availableFilters } = this.props;
        const { optionsVisible } = this.state;
        const isLoaded = availableFilters && !!availableFilters.length;

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
    availableFilters: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
