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
import TextPlaceholder from 'Component/TextPlaceholder';
import Swatch from 'Component/Swatch';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import './CategoryShoppingOptions.style';

import Store from 'Store';
import { toggleOverlayByKey } from 'Store/Overlay';

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

    componentDidMount() {
        Store.dispatch(toggleOverlayByKey('category-filter'));
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
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const isPriceCustom = priceValue.min !== minPriceValue || priceValue.max !== maxPriceValue;
        return Object.keys(customFiltersValues).length > 0 || isPriceCustom || !(sortKey || sortDirection);
    }

    renderClearFiltersButton() {
        const { clearFilters } = this.props;

        if (window.location.search && this.isClearButtonShown()) { // ok to use window object for simple check...?
            return (
                <button
                  block="CategoryShoppingOptions"
                  elem="ClearButton"
                  onClick={ () => clearFilters() }
                >
                    Clear Filters
                </button>
            );
        }

        return null;
    }

    render() {
        const {
            availableFilters,
            customFiltersValues,
            updateFilter,
            updatePriceRange,
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const { optionsVisible } = this.state;
        const isLoaded = availableFilters && !!availableFilters.length;

        return (
            <div block="CategoryShoppingOptions" mods={ { optionsVisible } }>
                
            </div>
        );
    }
}

CategoryShoppingOptions.propTypes = {
    updatePriceRange: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
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

export default CategoryShoppingOptions;
