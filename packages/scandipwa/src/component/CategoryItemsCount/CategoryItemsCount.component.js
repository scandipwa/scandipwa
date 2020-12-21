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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import TextPlaceholder from 'Component/TextPlaceholder';

/** @namespace Component/CategoryItemsCount/Component */
export class CategoryItemsCount extends PureComponent {
    static propTypes = {
        totalItems: PropTypes.number.isRequired,
        isMatchingListFilter: PropTypes.bool
    };

    static defaultProps = {
        isMatchingListFilter: false
    };

    render() {
        const {
            totalItems,
            isMatchingListFilter
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
