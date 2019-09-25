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
import WishlistItem from './WishlistItem.component';

export class WishlistItemContainer extends PureComponent {
    render() {
        return <WishlistItem { ...this.props } />;
    }
}

export default WishlistItemContainer;
