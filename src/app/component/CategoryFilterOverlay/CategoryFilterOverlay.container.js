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
    static propTypes = {
        customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        updateFilter: PropTypes.func.isRequired,
        getFilterUrl: PropTypes.func.isRequired
    };

    containerFunctions = {
        onSeeResultsClick: this.onSeeResultsClick.bind(this),
        toggleCustomFilter: this.toggleCustomFilter.bind(this),
        getFilterUrl: this.getFilterUrl.bind(this)
    };

    onSeeResultsClick() {
        const { hideActiveOverlay, goToPreviousHeaderState } = this.props;

        hideActiveOverlay();
        goToPreviousHeaderState();
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

        return getFilterUrl(filterKey, this._getNewFilterArray(filterKey, value));
    }

    toggleCustomFilter(requestVar, value) {
        const { updateFilter } = this.props;

        updateFilter(requestVar, this._getNewFilterArray(requestVar, value));
    }

    /**
     * Returns filter array with new parameters
     *
     * @param {String} filterKey key of option
     * @param {String} value
     * @returns {Object[]}
     * @memberof CategoryShoppingOptions
     */
    _getNewFilterArray(filterKey, value) {
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

    render() {
        return (
            <CategoryFilterOverlay
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(CategoryFilterOverlayContainer);
