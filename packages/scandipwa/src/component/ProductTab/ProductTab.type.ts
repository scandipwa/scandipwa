/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ProductTabShape } from 'Component/ProductTabs/ProductTabs.type';

export interface ProductTabComponentProps {
    tab: ProductTabShape;
    onClick: (tabId: string) => void;
    isActive: boolean;
}
