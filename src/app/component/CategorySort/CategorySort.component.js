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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import Field from 'Component/Field';
import './CategorySort.style';

/**
 * Product Sort
 * @class ProductSort
 */
class CategorySort extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        const { onGetSortKey, onGetSortDirection } = this.props;
        const [direction, ...key] = value.split(' ');

        onGetSortDirection(direction);
        onGetSortKey(key);
    }


    prepareOptions() {
        const { sortDirection, sortFields, value: sortKey } = this.props;

        if (!sortFields) return null;

        const selectOptions = sortFields.options.reduce((acc, option) => {
            const { value, label } = option;
            let ascLabel = label.split(' ')[0];
            let descLabel = label.split(' ')[0];

            switch (value) {
            case 'size':
                return acc;
            case 'position':
                return acc;
            case 'price':
                ascLabel += ': Low to High';
                descLabel += ': High to Low';
                break;
            case 'name':
                ascLabel += ': A to Z';
                descLabel += ': Z to A';
                break;
            default:
                break;
            }

            const isKeySelected = sortKey === value;
            const ascOption = {
                id: `ASC ${value}`,
                name: value,
                value: `ASC ${value}`,
                label: ascLabel,
                selected: isKeySelected && sortDirection === 'ASC'
            };
            const descOption = {
                id: `DESC ${value}`,
                name: value,
                value: `DESC ${value}`,
                label: descLabel,
                selected: isKeySelected && sortDirection === 'DESC'
            };

            return [...acc, ascOption, descOption];
        }, []);

        return selectOptions;
    }

    renderPlaceholder() {
        return (
            <div block="CategorySort">
                <p block="CategorySort" elem="Placeholder">
                    <TextPlaceholder length="short" />
                </p>
            </div>
        );
    }

    render() {
        const { sortFields } = this.props;

        const selectableOptions = this.prepareOptions();

        return (
            sortFields && Object.keys(sortFields).length > 0
                ? (
                    <Field
                      id="category-sort"
                      name="category-sort"
                      type="select"
                      label="SORT"
                      mix={ { block: 'CategorySort', elem: 'Select' } }
                      selectOptions={ selectableOptions }
                      onChange={ this.onChange }
                    />
                )
                : this.renderPlaceholder()
        );
    }
}

CategorySort.propTypes = {
    onGetSortKey: PropTypes.func.isRequired,
    onGetSortDirection: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    sortFields: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.objectOf(PropTypes.array)
    ]).isRequired
};

export default CategorySort;
