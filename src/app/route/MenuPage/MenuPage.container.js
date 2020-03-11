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

import MenuOverlay from 'Component/MenuOverlay';
import './MenuPage.style';

export class MenuPageContainer extends ExtensiblePureComponent {
    render() {
        return (
            <main block="MenuPage">
                <MenuOverlay />
            </main>
        );
    }
}

export default middleware(MenuPageContainer, 'Route/MenuPage/Container');
