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

import { ReactElement } from 'Type/Common.type';

import CategorySort from './CategorySort.component';
import {
    CategorySortComponentProps,
    CategorySortContainerProps, CategorySortField, CategorySortOption, CategorySortOptionLabelMap
} from './CategorySort.type';

/** @namespace Component/CategorySort/Container */
export class CategorySortContainer extends PureComponent<CategorySortContainerProps> {
    static defaultProps = {
        sortFields: [],
        isMatchingInfoFilter: false
    };

    containerProps(): CategorySortComponentProps {
        const {
            isMatchingInfoFilter,
            onSortChange,
            sortDirection,
            sortKey
        } = this.props;

        return {
            isMatchingInfoFilter,
            onSortChange,
            sortDirection,
            sortKey,
            selectOptions: this._prepareOptions()
        };
    }

    _getLabel(option: CategorySortField): Partial<CategorySortOptionLabelMap> {
        const { id, label: pureLabel } = option;

        // eslint-disable-next-line fp/no-let
        let [label] = pureLabel.split(' ');
        label = label.charAt(0).toUpperCase() + label.slice(1);

        switch (id) {
        case 'name':
            return {
                asc: __('Name: A to Z', label),
                desc: __('Name: Z to A', label)
            };
        case 'position':
            return {
                asc: __('Best match')
            };
        case 'price':
            return {
                asc: __('%s: Low to High', label),
                desc: __('%s: High to Low', label)
            };
        case 'none':
            return {
                asc: __('Best match')
            };
        default:
            return {
                asc: __('%s: Ascending', label),
                desc: __('%s: Descending', label)
            };
        }
    }

    _prepareOptions(): CategorySortOption[] {
        const { sortFields } = this.props;

        if (!sortFields) {
            return [];
        }

        const selectOptions = sortFields.reduce((acc: CategorySortOption[], option) => {
            const { id } = option;
            const label = this._getLabel(option);
            const { asc, desc } = label;

            if (asc) {
                acc.push({
                    id: `ASC ${id}`,
                    name: id,
                    value: `ASC ${id}`,
                    label: asc
                });
            }

            if (desc) {
                acc.push({
                    id: `DESC ${id}`,
                    name: id,
                    value: `DESC ${id}`,
                    label: desc
                });
            }

            return acc;
        }, []);

        return selectOptions;
    }

    render(): ReactElement {
        return (
            <CategorySort
              { ...this.containerProps() }
            />
        );
    }
}

export default CategorySortContainer;
