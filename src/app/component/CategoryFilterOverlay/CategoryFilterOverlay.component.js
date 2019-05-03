import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpandableContent from 'Component/ExpandableContent';
import Overlay from 'Component/Overlay';
import Swatch from 'Component/Swatch';
import RangeSelector from 'Component/RangeSelector';
import './CategoryFilterOverlay.style';

class CategoryFilterOverlay extends Component {
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

    renderPriceRange() {
        const {
            updatePriceRange, priceValue, minPriceValue, maxPriceValue
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

    renderFilterItems(requestVar, filterItems, appliedFilters) {
        return filterItems.map((filterItem) => {
            const { value_string } = filterItem;

            return (
                <li key={ value_string }>
                    <Swatch
                      mix={ { block: 'CategoryFilterOverlay', elem: 'Item' } }
                      filterItem={ filterItem }
                      requestVar={ requestVar }
                      isSelected={ appliedFilters.indexOf(value_string) !== -1 }
                      onClick={ () => this.toggleCustomFilter(requestVar, value_string) }
                    />
                </li>
            );
        });
    }

    renderFilter(filter) {
        const { customFiltersValues: appliedFilters } = this.props;
        const { name, request_var: requestVar, filter_items: filterItems } = filter;
        const appliedFilterItems = appliedFilters[requestVar] ? appliedFilters[requestVar] : [];
        const appliedFilterItemsString = filterItems.reduce(
            (prev, { label, value_string }) => {
                if (appliedFilterItems.indexOf(value_string) !== -1) prev.push(label);
                return prev;
            }, []
        ).join(', ');

        return (
            <ExpandableContent
              key={ requestVar }
              heading={ name }
              subHeading={ appliedFilterItemsString }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: requestVar }
              } }
            >
                <ul block="CategoryFilterOverlay" elem="ItemList" mods={ { type: requestVar } }>
                    { this.renderFilterItems(requestVar, filterItems, appliedFilterItems) }
                </ul>
            </ExpandableContent>
        );
    }

    render() {
        const { availableFilters } = this.props;

        return (
            <Overlay mix={ { block: 'CategoryFilterOverlay' } } id="category-filter">
                <h2 block="CategoryFilterOverlay" elem="Heading">Shopping Options</h2>
                { availableFilters.map(filter => this.renderFilter(filter)) }
                { this.renderPriceRange() }
            </Overlay>
        );
    }
}

CategoryFilterOverlay.propTypes = {
    availableFilters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
    updatePriceRange: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    priceValue: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }).isRequired,
    minPriceValue: PropTypes.number.isRequired,
    maxPriceValue: PropTypes.number.isRequired
};

export default CategoryFilterOverlay;
