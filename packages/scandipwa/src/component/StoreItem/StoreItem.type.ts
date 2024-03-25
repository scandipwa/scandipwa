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

import { MouseEvent } from 'react';

import { FormattedStore } from 'Component/StoreSwitcher/StoreSwitcher.type';

export interface StoreItemContainerFunctions {
    handleStoreItemClick: (e: MouseEvent) => void;
}

export interface StoreItemContainerProps {
    item: FormattedStore;
    handleStoreSelect: (storeCode: string) => void;
}

export interface StoreItemComponentProps
    extends StoreItemContainerFunctions {
    item: FormattedStore;
}
