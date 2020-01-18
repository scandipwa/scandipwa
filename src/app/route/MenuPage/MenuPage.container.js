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
import MenuOverlay from 'Component/MenuOverlay';

export class MenuPageContainer extends PureComponent {
    render() {
        return (
            <main>
                <MenuOverlay />
            </main>
        );
    }
}

export default MenuPageContainer;
