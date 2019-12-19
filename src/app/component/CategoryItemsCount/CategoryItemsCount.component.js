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

import debounceRender from 'react-debounce-render';
import { PureComponent } from 'react';
import TextPlaceholder from 'Component/TextPlaceholder';
import PropTypes from 'prop-types';
import { RENDER_PAGE_FREQUENCY } from 'Component/ProductList/ProductList.component';

export class CategoryItemsCount extends PureComponent {
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

export default debounceRender(CategoryItemsCount, RENDER_PAGE_FREQUENCY, { leading: false });
