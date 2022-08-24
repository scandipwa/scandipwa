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

import { ChangeEvent } from 'react';

import { ShippingMethod } from 'Query/Checkout.type';
import { Store } from 'Query/StoreInPickUp.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Merge } from 'Type/Common.type';
import { GQLCountryCodeEnum } from 'Type/Graphql.type';
import { CountryOption } from 'Util/Address/Address.type';

export interface StoreInPickUpPopupContainerMapStateProps {
    countries: CountryOption[];
    defaultCountry: string;
    selectedStore: Store | null;
}

export interface StoreInPickUpPopupContainerDispatchProps {
    hideActiveOverlay: () => void;
    showNotification: (type: NotificationType, message: string) => void;
    clearPickUpStore: () => void;
}

export interface StoreInPickUpPopupContainerFunctions {
    handleStoresSearch: () => Promise<void>;
    selectStore: (store: Store) => void;
    setStoreSearchCriteria: (searchCriteria: ChangeEvent<HTMLInputElement>) => void;
    handleChangeCountry: (countryId: string) => void;
}

export interface StoreInPickUpPopupContainerBaseProps {
    countryId: string;
    onShippingMethodSelect: (selectedShippingMethod: ShippingMethod) => void;
    onStoreSelect: (store: StoreWithCountryId) => void;
    setSelectedStore: (store: Store) => void;
    shippingMethods: ShippingMethod[];
    cartItemsSku: { sku: string }[];
}

export type StoreInPickUpPopupContainerProps =
    StoreInPickUpPopupContainerMapStateProps
    & StoreInPickUpPopupContainerDispatchProps
    & StoreInPickUpPopupContainerBaseProps;

export interface StoreInPickUpPopupContainerState {
    stores: Store[];
    storeSearchCriteria: string;
    isLoading: boolean;
    selectedCountryId: string;
}

export interface StoreInPickUpPopupComponentProps
    extends StoreInPickUpPopupContainerFunctions {
    countries: CountryOption[];
    selectedCountryId: string;
    handleChangeCountry: (countryId: string) => void;
    isLoading: boolean;
    selectStore: (store: Store) => void;
    setStoreSearchCriteria: (searchCriteria: ChangeEvent<HTMLInputElement>) => void;
    storeSearchCriteria: string;
    stores: Store[];
}

export type StoreInPickUpPopupComponentPropsKeys = 'countries'
| 'isLoading'
| 'selectedCountryId'
| 'stores'
| 'storeSearchCriteria';

export type StoreWithCountryId = Merge<Store, { country_id: GQLCountryCodeEnum }>;
