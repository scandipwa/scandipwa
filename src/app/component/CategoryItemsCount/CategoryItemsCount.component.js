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
import TextPlaceholder from 'Component/TextPlaceholder';
import PropTypes from 'prop-types';

export default class CategoryItemsCount extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        totalItems: PropTypes.number.isRequired
    };

    render() {
        const { isLoading, totalItems } = this.props;

        return (
            <p block="CategoryPage" elem="ItemsCount">
                <TextPlaceholder
                  content={ (isLoading
                      ? __('Products are loading...')
                      : __('%s items found', totalItems)
                  ) }
                />
            </p>
        );
    }
}
