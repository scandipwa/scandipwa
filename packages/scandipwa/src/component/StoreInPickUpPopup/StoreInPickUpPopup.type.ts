/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Country } from 'Query/Region.type';
import { Store } from 'Query/StoreInPickUp.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Merge } from 'Type/Common.type';

export interface StoreInPickUpContainerMapStateProps {
    countries: Country[];
    defaultCountry: string;
    selectedStore: Store | null;
}

export interface StoreInPickUpContainerDispatchProps {
    hideActiveOverlay: () => void;
    showNotification: (type: NotificationType, message: string) => void;
    clearPickUpStore: () => void;
}

export type StoreInPickUpContainerProps =
    StoreInPickUpContainerMapStateProps & StoreInPickUpContainerDispatchProps & {
        countryId: string;
        estimateAddress: never;
        onShippingMethodSelect: () => void;
        onStoreSelect: (store: StoreWithCountryId) => void;
        setSelectedStore: (store: Store) => void;
        shippingMethods: never;
        cartItemsSku: Array<{ sku: string }>;
    };

export interface StoreInPickUpContainerState {
    stores: Store[];
    storeSearchCriteria: string;
    isLoading: boolean;
    selectedCountryId: string;
}

export type StoreWithCountryId = Merge<Store, { country_id: string }>;
