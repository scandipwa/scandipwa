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

import { Store } from 'Query/StoreInPickUp.type';

export interface StoreInPickUpStoreContainerProps {
    selectStore: (store: Store) => void;
    isSelectedStore: boolean;
    store: Store | null;
}

export interface StoreInPickUpStoreContainerFunctions {
    handleSelectStore: () => void;
}

export interface StoreInPickUpStoreComponentProps {
    store: Store | null;
    handleSelectStore: () => void;
    isSelectedStore: boolean;
}

export type StoreInPickUpStoreContainerPropsKeys = 'store'
| 'isSelectedStore';
