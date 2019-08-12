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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goToPreviousHeaderState } from 'Store/Header';
import { hideActiveOverlay } from 'Store/Overlay';
import CategoryFilterOverlay from './CategoryFilterOverlay.component';

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState())
});

export class CategoryFilterOverlayContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.availableFunction = {
            onSeeResultsClick: this.onSeeResultsClick.bind(this),
            getAppliedFilterItemsString: this.getAppliedFilterItemsString.bind(this),
            getAppliedFilterItems: this.getAppliedFilterItems.bind(this),
            toggleCustomFilter: this.toggleCustomFilter.bind(this)
        };
    }

    onSeeResultsClick() {
        const { hideActiveOverlay, goToPreviousHeaderState } = this.props;

        hideActiveOverlay();
        goToPreviousHeaderState();
    }

    getAppliedFilterItems(filter) {
        const { customFiltersValues: appliedFilters } = this.props;
        const { request_var } = filter;
        return appliedFilters[request_var] || [];
    }

    getAppliedFilterItemsString(filter) {
        const { filter_items } = filter;
        return filter_items.reduce(
            (prev, { label, value_string }) => {
                if (this.getAppliedFilterItems(filter).indexOf(value_string) !== -1) prev.push(label);
                return prev;
            }, []
        ).join(', ');
    }

    toggleCustomFilter(requestVar, value) {
        const { updateFilter, customFiltersValues } = this.props;
        const newFilterArray = Array.from(customFiltersValues[requestVar] || []);
        const filterValueIndex = newFilterArray.indexOf(value);

        if (filterValueIndex === -1) {
            newFilterArray.push(value);
        } else {
            newFilterArray.splice(filterValueIndex, 1);
        }

        updateFilter(requestVar, newFilterArray);
    }

    render() {
        return (
            <CategoryFilterOverlay
              { ...this.props }
              { ...this.availableFunction }
            />
        );
    }
}

CategoryFilterOverlayContainer.propTypes = {
    customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CategoryFilterOverlayContainer);
