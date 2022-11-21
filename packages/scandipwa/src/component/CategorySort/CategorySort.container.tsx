/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { getIsMatchingInfoFilter } from 'Util/Category/Category';
import { getSelectedSortFromUrl } from 'Util/Category/Sort';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { setQueryParams } from 'Util/Url';

import CategorySort from './CategorySort.component';
import {
    CategorySortComponentProps,
    CategorySortComponentPropsKey,
    CategorySortContainerMapDispatchProps,
    CategorySortContainerMapStateProps,
    CategorySortContainerProps, CategorySortField, CategorySortOption, CategorySortOptionLabelMap,
} from './CategorySort.type';

export const MetaDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Meta/Meta.dispatcher'
);

/** @namespace Component/CategorySort/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategorySortContainerMapStateProps => ({
    sortFields: state.ProductListInfoReducer.sortFields,
    category: state.CategoryReducer.category,
});

/** @namespace Component/CategorySort/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CategorySortContainerMapDispatchProps => ({
    updateMetaFromCategory: (category) => MetaDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithCategory(category),
    ),
});

/** @namespace Component/CategorySort/Container */
export class CategorySortContainer extends PureComponent<CategorySortContainerProps> {
    static defaultProps: Partial<CategorySortContainerProps> = {
        isCurrentCategoryLoaded: false,
    };

    containerFunctions = {
        onSortChange: this.onSortChange.bind(this),
    };

    containerProps(): Pick<CategorySortComponentProps, CategorySortComponentPropsKey> {
        const {
            isCurrentCategoryLoaded,
        } = this.props;

        const { sortDirection, sortKey } = getSelectedSortFromUrl();

        return {
            isCurrentCategoryLoaded,
            isMatchingInfoFilter: getIsMatchingInfoFilter(),
            sortDirection,
            sortKey,
            selectOptions: this._prepareOptions(),
        };
    }

    onSortChange(value: string): void {
        const { updateMetaFromCategory, category } = this.props;

        const [direction, ...sortKey] = value.split(' ');
        const { location: { search }, location } = history;
        const meta_robots = search
            ? ''
            : 'follow, index';

        setQueryParams({ sortKey: sortKey.join(','), sortDirection: direction, page: '' }, location, history);

        updateMetaFromCategory({
            ...category,
            meta_robots,
        });
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
                desc: __('Name: Z to A', label),
            };
        case 'position':
            return {
                asc: __('Best match'),
            };
        case 'price':
            return {
                asc: __('%s: Low to High', label),
                desc: __('%s: High to Low', label),
            };
        case 'none':
            return {
                asc: __('Best match'),
            };
        default:
            return {
                asc: __('%s: Ascending', label),
                desc: __('%s: Descending', label),
            };
        }
    }

    _prepareOptions(): CategorySortOption[] {
        const { sortFields } = this.props;

        if (!sortFields) {
            return [];
        }

        const { options = [] } = sortFields;
        const updatedSortFields: CategorySortField[] = options.map(({ value: id, label }) => ({ id, label }));

        const selectOptions = updatedSortFields.reduce((acc: CategorySortOption[], option) => {
            const { id } = option;
            const label = this._getLabel(option);
            const { asc, desc } = label;

            if (asc) {
                acc.push({
                    id: `ASC ${id}`,
                    name: id,
                    value: `ASC ${id}`,
                    label: asc,
                });
            }

            if (desc) {
                acc.push({
                    id: `DESC ${id}`,
                    name: id,
                    value: `DESC ${id}`,
                    label: desc,
                });
            }

            return acc;
        }, []);

        return selectOptions;
    }

    render(): ReactElement {
        return (
            <CategorySort
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySortContainer);
