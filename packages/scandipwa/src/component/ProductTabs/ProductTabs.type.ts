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

import { ReactElement } from 'Type/Common.type';

export interface ProductTabsComponentProps {
    tabs: ProductTabShape[];
}

export interface ProductTabsComponentState {
    activeTab: string;
}

export interface ProductTabShape {
    id: string;
    name: string;
    render: (key: string) => ReactElement;
    shouldTabRender: () => boolean;
}
