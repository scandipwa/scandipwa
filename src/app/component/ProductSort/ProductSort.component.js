/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import './ProductSort.style';

/**
 * Product Sort
 * @class ProductSort
 */
class ProductSort extends Component {
    /**
     * Handle Sort key change
     * @param {{target: Object}} value sort key
     * @return {void}
     */
    onGetSortKey({ target: { value } }) {
        const { onGetSortKey } = this.props;

        onGetSortKey(value);
    }

    /**
     * Handle Sort direction change
     * @return {void}
     */
    onGetSortDirection() {
        const { onGetSortDirection, sortDirection } = this.props;
        const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';

        onGetSortDirection(newSortDirection);
    }

    renderSortOption(option) {
        return (
            option.value !== 'size' && option.value !== 'position'
                && (
                    <option
                      block="ProductSort"
                      elem="Option"
                      key={ option.value }
                      value={ option.value }
                    >
                        { option.label }
                    </option>
                )
        );
    }

    renderPlaceholder() {
        return (
            <div block="ProductSort">
                <p block="ProductSort" elem="Placeholder">
                    <TextPlaceholder length="short" />
                </p>
            </div>
        );
    }

    render() {
        const { value, sortFields, sortDirection } = this.props;

        return (
            sortFields && Object.keys(sortFields).length > 0
                ? (
                    <div block="ProductSort">
                        <span
                          block="ProductSort"
                          elem="Label"
                        >
                            Sort By:
                        </span>
                        <select
                          block="ProductSort"
                          elem="Select"
                          value={ value }
                          onChange={ e => this.onGetSortKey(e) }
                        >
                            { sortFields.options && sortFields.options.map(option => this.renderSortOption(option)) }
                        </select>
                        <button
                          block="ProductSort"
                          elem="Switch"
                          onClick={ () => this.onGetSortDirection() }
                        >
                            {
                                sortDirection === 'ASC' ? '↑' : '↓'
                            }
                        </button>
                    </div>
                )
                : this.renderPlaceholder()
        );
    }
}

ProductSort.propTypes = {
    onGetSortKey: PropTypes.func.isRequired,
    onGetSortDirection: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    sortFields: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.objectOf(PropTypes.array)
    ]).isRequired
};

export default ProductSort;
