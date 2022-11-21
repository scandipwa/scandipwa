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

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';

import { CategorySortComponentProps } from './CategorySort.type';

import './CategorySort.style';

/**
 * Product Sort
 * @class ProductSort
 * @namespace Component/CategorySort/Component
 */
export class CategorySortComponent extends PureComponent<CategorySortComponentProps> {
    renderPlaceholder(): ReactElement {
        return (
            <p block="CategorySort" elem="Placeholder">
                <TextPlaceholder length={ TextPlaceHolderLength.SHORT } />
            </p>
        );
    }

    renderSortField(): ReactElement {
        const {
            sortKey,
            sortDirection,
            selectOptions,
            isMatchingInfoFilter,
            isCurrentCategoryLoaded,
            onSortChange,
        } = this.props;

        if (!isMatchingInfoFilter || !isCurrentCategoryLoaded) {
            return this.renderPlaceholder();
        }

        return (
            <Field
              type={ FieldType.SELECT }
              attr={ {
                  id: 'category-sort',
                  name: 'category-sort',
                  value: `${sortDirection} ${sortKey}`,
                  noPlaceholder: true,
              } }
              events={ {
                  onChange: onSortChange,
              } }
              isSortSelect
              options={ selectOptions }
              mix={ { block: 'CategorySort', elem: 'Select' } }
            />
        );
    }

    render(): ReactElement {
        return (
            <div block="CategorySort">
                { this.renderSortField() }
            </div>
        );
    }
}

export default CategorySortComponent;
