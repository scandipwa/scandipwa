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
import Swatch from 'Component/Swatch';
import './CategoryShoppingOptions.style';

/**
 * Category Shopping Options (filters)
 * @class CategoryShoppingOptions
 */
class CategoryShoppingOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsVisible: false
        };
    }

    /**
     * Open/Close shoping options on mobile
     * @return {void}
     */
    toggleOptions() {
        const { optionsVisible } = this.state;
        this.setState({ optionsVisible: !optionsVisible });
    }

    /**
     * Update filter when new filter is selected
     * @return {Boolean}
     */
    toggleCustomFilter(requestVar, value) {
        const { updateFilter, customFiltersValues } = this.props;
        const newFilterArray = customFiltersValues[requestVar] ? customFiltersValues[requestVar] : [];
        const filterValueIndex = newFilterArray.indexOf(value);

        if (filterValueIndex === -1) {
            newFilterArray.push(value);
        } else {
            newFilterArray.splice(filterValueIndex, 1);
        }

        updateFilter(requestVar, newFilterArray);
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

    renderFilterItems(requestVar, filterItems) {
        const { customFiltersValues } = this.props;
        const filterIsColor = requestVar === 'color';
        const currentFilterArray = customFiltersValues[requestVar] ? customFiltersValues[requestVar] : [];

        return filterItems.map(({ swatch_data, label, value_string }) => {
            const title = (swatch_data && swatch_data.value) || label;
            const isSelected = currentFilterArray.indexOf(value_string) !== -1;
            const dynamicStyle = filterIsColor ? title : '';

            return (
                <li key={ value_string }>
                    <Swatch
                      title={ filterIsColor ? '' : title }
                      isSelected={ isSelected }
                      isRound={ filterIsColor }
                      backgroundColor={ dynamicStyle }
                      handler={ () => this.toggleCustomFilter(requestVar, value_string) }
                    />
                </li>
            );
        });
    }

    renderCustomFilters() {
        const { availableFilters } = this.props;

        return availableFilters.map(({ name, request_var, filter_items }) => {
            if (request_var !== 'cat') {
                return (
                    <li block="CategoryShoppingOptions" elem="FilterBlock" key={ name }>
                        { this.renderFilterTitle(name) }
                        <ul block="CategoryShoppingOptions" elem="Swatches">
                            { this.renderFilterItems(request_var, filter_items) }
                        </ul>
                    </li>
                );
            }

            return null;
        });
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
                            <Swatch />
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
