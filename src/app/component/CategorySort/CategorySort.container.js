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
import CategorySort from './CategorySort.component';

export class CategorySortContainer extends PureComponent {
    static propTypes = {
        sortFields: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                label: PropTypes.string
            }))
        ])
    };

    static defaultProps = {
        sortFields: []
    };

    containerProps = () => ({
        selectOptions: this._prepareOptions()
    });

    _getLabel(option) {
        const { id, label: pureLabel } = option;
        const [label] = pureLabel.split(' ');

        switch (id) {
        case 'price':
            return {
                asc: __('%s: Low to High', label),
                desc: __('%s: High to Low', label)
            };
        case 'name':
            return {
                asc: __('%s: A to Z', label),
                desc: __('%s: Z to A', label)
            };
        case 'position':
            return {
                asc: __('%s: Ascending', label),
                desc: __('%s: Descending', label)
            };
        default:
            return {};
        }
    }

    _prepareOptions() {
        const { sortFields } = this.props;

        if (!sortFields) return [];

        const selectOptions = sortFields.reduce((acc, option) => {
            const { id } = option;
            const label = this._getLabel(option);
            const { asc, desc } = label;

            if (!asc || !desc) return acc;

            const ascOption = {
                id: `ASC ${id}`,
                name: id,
                value: `ASC ${id}`,
                label: asc
            };

            const descOption = {
                id: `DESC ${id}`,
                name: id,
                value: `DESC ${id}`,
                label: desc
            };

            return [...acc, ascOption, descOption];
        }, []);

        return selectOptions;
    }

    render() {
        return (
            <CategorySort
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default CategorySortContainer;
