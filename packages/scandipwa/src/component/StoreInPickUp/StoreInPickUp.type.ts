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

import { ShippingMethod } from 'Query/Checkout.type';
import { Store } from 'Query/StoreInPickUp.type';
import { StoreInPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.type';

export interface StoreInPickUpContainerMapStateProps {
    selectedStore: Store | null;
    shippingMethods: ShippingMethod[];
}

export interface StoreInPickUpContainerDispatchProps {
    showPopup: <T>(payload: T) => void;
    hideActiveOverlay: () => void;
    updateStoreInPickUpStore: (state: Partial<StoreInPickUpStore>) => void;
}

export interface StoreInPickUpContainerBaseProps {
    countryId: string;
}

export interface StoreInPickUpContainerFunctions {
    handleOpenPopup: () => void;
    setSelectedStore: (store: Store) => void;
}

export type StoreInPickUpContainerProps =
     StoreInPickUpContainerMapStateProps
     & StoreInPickUpContainerDispatchProps
     & StoreInPickUpContainerBaseProps;

export interface StoreInPickUpComponentProps extends StoreInPickUpContainerFunctions {
    shippingMethods: ShippingMethod[];
    selectedStore: Store | null;
}

export type StoreInPickUpComponentPropsKeys = 'selectedStore'
| 'shippingMethods';
