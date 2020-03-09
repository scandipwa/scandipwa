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
import PropTypes from 'prop-types';
import Overlay from 'Component/Overlay';
import ResetButton from 'Component/ResetButton';
import RangeSelector from 'Component/RangeSelector';
import ExpandableContent from 'Component/ExpandableContent';
import CategoryConfigurableAttributes from 'Component/CategoryConfigurableAttributes';
import './CategoryFilterOverlay.style';

export const CATEGORY_FILTER_OVERLAY_ID = 'category-filter';

export default class CategoryFilterOverlay extends PureComponent {
    static propTypes = {
        availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
        updatePriceRange: PropTypes.func.isRequired,
        areFiltersEmpty: PropTypes.bool.isRequired,
        isContentFiltered: PropTypes.bool.isRequired,
        isProductsLoading: PropTypes.bool.isRequired,
        priceValue: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number
        }).isRequired,
        minPriceValue: PropTypes.number.isRequired,
        maxPriceValue: PropTypes.number.isRequired,
        onSeeResultsClick: PropTypes.func.isRequired,
        onVisible: PropTypes.func.isRequired,
        customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
        toggleCustomFilter: PropTypes.func.isRequired,
        getFilterUrl: PropTypes.func.isRequired,
        totalPages: PropTypes.number.isRequired
    };

    renderPriceRange() {
        const {
            updatePriceRange,
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const { min: minValue, max: maxValue } = priceValue;
        const min = minValue || minPriceValue;
        const max = maxValue || maxPriceValue;

        if (maxPriceValue - minPriceValue === 0) return null;

        return (
            <ExpandableContent
              heading={ __('Price') }
              subHeading={ __('From: %s to %s', min, max) }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: 'price' }
              } }
            >
                <RangeSelector
                  value={ priceValue }
                  minValue={ minPriceValue || min }
                  maxValue={ maxPriceValue || max }
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
            <CategoryConfigurableAttributes
              mix={ { block: 'CategoryFilterOverlay', elem: 'Attributes' } }
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
            <div
              block="CategoryFilterOverlay"
              elem="SeeResults"
            >
                <button
                  block="CategoryFilterOverlay"
                  elem="Button"
                  mix={ { block: 'Button' } }
                  onClick={ onSeeResultsClick }
                >
                    { __('SEE RESULTS') }
                </button>
            </div>
        );
    }

    renderResetButton() {
        const { onSeeResultsClick } = this.props;

        return (
            <ResetButton
              onClick={ onSeeResultsClick }
              mix={ { block: 'CategoryFilterOverlay', elem: 'ResetButton' } }
            />
        );
    }

    renderHeading() {
        return (
            <h2 block="CategoryFilterOverlay" elem="Heading">
                { __('Shopping Options') }
            </h2>
        );
    }

    renderNoResults() {
        return (
            <p block="CategoryFilterOverlay" elem="NoResults">
                { __(`The selected filter combination returned no results.
                Please try again, using a different set of filters.`) }
            </p>
        );
    }

    renderEmptyFilters() {
        return (
            <Overlay
              mix={ { block: 'CategoryFilterOverlay' } }
              id={ CATEGORY_FILTER_OVERLAY_ID }
            >
                { this.renderNoResults() }
                { this.renderResetButton() }
                { this.renderSeeResults() }
            </Overlay>
        );
    }

    renderMinimalFilters() {
        return (
            <Overlay mix={ { block: 'CategoryFilterOverlay' } } id={ CATEGORY_FILTER_OVERLAY_ID }>
                { this.renderPriceRange() }
            </Overlay>
        );
    }

    renderDefaultFilters() {
        const { onVisible } = this.props;

        return (
            <Overlay
              onVisible={ onVisible }
              mix={ { block: 'CategoryFilterOverlay' } }
              id={ CATEGORY_FILTER_OVERLAY_ID }
            >
                { this.renderHeading() }
                { this.renderResetButton() }
                { this.renderFilters() }
                { this.renderPriceRange() }
                { this.renderSeeResults() }
            </Overlay>
        );
    }

    render() {
        const {
            totalPages,
            areFiltersEmpty,
            isProductsLoading,
            isContentFiltered
        } = this.props;

        if (!isProductsLoading && totalPages === 0 && !isContentFiltered) {
            return (
                <div block="CategoryFilterOverlay" />
            );
        }

        if (!isProductsLoading && totalPages === 0) {
            return this.renderEmptyFilters();
        }

        if (areFiltersEmpty) {
            return this.renderMinimalFilters();
        }

        return this.renderDefaultFilters();
    }
}
