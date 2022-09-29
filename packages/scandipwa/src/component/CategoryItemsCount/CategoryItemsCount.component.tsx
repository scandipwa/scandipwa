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

import TextPlaceholder from 'Component/TextPlaceholder';
import { ReactElement } from 'Type/Common.type';

import { CategoryItemsCountComponentProps } from './CategoryItemsCount.type';

/** @namespace Component/CategoryItemsCount/Component */
export class CategoryItemsCount extends PureComponent<CategoryItemsCountComponentProps> {
    static defaultProps: Partial<CategoryItemsCountComponentProps> = {
        isMatchingListFilter: false,
    };

    render(): ReactElement {
        const {
            totalItems,
            isMatchingListFilter,
        } = this.props;

        return (
            <p block="CategoryPage" elem="ItemsCount">
                <TextPlaceholder
                  content={ (!isMatchingListFilter
                      ? __('Products are loading...')
                      : __('%s items found', totalItems)
                  ) }
                />
            </p>
        );
    }
}

export default CategoryItemsCount;
