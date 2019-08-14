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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay';
import RangeSelector from 'Component/RangeSelector';
import ExpandableContent from 'Component/ExpandableContent';
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';
import './CategoryFilterOverlay.style';

class CategoryFilterOverlay extends PureComponent {
    renderPriceRange() {
        const {
            updatePriceRange,
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const { min, max } = priceValue;

        return (
            <ExpandableContent
              heading="Price"
              subHeading={ `From: ${min} to ${max}` }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: 'price' }
              } }
            >
                <RangeSelector
                  value={ priceValue }
                  minValue={ minPriceValue }
                  maxValue={ maxPriceValue }
                  onChangeComplete={ updatePriceRange }
                />
            </ExpandableContent>
        );
    }

    renderFilters() {
        const {
            availableFilters,
            customFiltersValues,
            toggleCustomFilter,
            getFilterUrl
        } = this.props;

        const isLoaded = availableFilters && !!Object.keys(availableFilters).length;
        return (
            <ProductConfigurableAttributes
              isReady={ isLoaded }
              configurable_options={ availableFilters }
              getLink={ getFilterUrl }
              parameters={ customFiltersValues }
              updateConfigurableVariant={ toggleCustomFilter }
            />
        );
    }

    renderSeeResults() {
        const { onSeeResultsClick } = this.props;

        return (
            <button
              block="CategoryFilterOverlay"
              elem="SeeResults"
              mix={ { block: 'Button' } }
              onClick={ onSeeResultsClick }
            >
                { __('SEE RESULTS') }
            </button>
        );
    }

    renderHeading() {
        return (
            <h2 block="CategoryFilterOverlay" elem="Heading">
                { __('Shopping Options') }
            </h2>
        );
    }

    render() {
        return (
            <Overlay mix={ { block: 'CategoryFilterOverlay' } } id="category-filter">
                { this.renderHeading() }
                { this.renderFilters() }
                { this.renderPriceRange() }
                { this.renderSeeResults() }
            </Overlay>
        );
    }
}

CategoryFilterOverlay.propTypes = {
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    updatePriceRange: PropTypes.func.isRequired,
    priceValue: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }).isRequired,
    minPriceValue: PropTypes.number.isRequired,
    maxPriceValue: PropTypes.number.isRequired,
    onSeeResultsClick: PropTypes.func.isRequired,
    customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
    toggleCustomFilter: PropTypes.func.isRequired,
    getFilterUrl: PropTypes.func.isRequired
};

export default CategoryFilterOverlay;
