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

import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { ShippingMethod } from 'Query/Checkout.type';
import { Store } from 'Query/StoreInPickUp.type';

export interface StoreInPickUpContainerMapStateProps {
    selectedStore: Store | null;
}

export interface StoreInPickUpContainerDispatchProps {
    showPopup: <T>(payload: T) => void;
    hideActiveOverlay: () => void;
    setPickUpStore: (store: Store) => void;
}

export interface StoreInPickUpContainerBaseProps {
    shippingMethods: ShippingMethod[];
    onStoreSelect: (address: StoreWithCountryId) => void;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    countryId: string;
    cartItemsSku: { sku: string }[];
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
    countryId: string;
    shippingMethods: ShippingMethod[];
    onStoreSelect: (address: StoreWithCountryId) => void;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    cartItemsSku: { sku: string }[];
    selectedStore: Store | null;
    selectStore: (store: Store) => void;
}

export type StoreInPickUpComponentPropsKeys = 'countryId'
| 'onShippingMethodSelect'
| 'onStoreSelect'
| 'selectedStore'
| 'shippingMethods'
| 'cartItemsSku';

export interface StoreInPickUpComponentState {}

export interface StoreInPickUpContainerState {}
