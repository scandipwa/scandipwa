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

import { AnyAction } from 'redux';

import { CartDisplayConfig } from 'Query/Cart.type';
import {
    CheckoutAgreement,
    CurrencyConfig,
    PriceTaxDisplay,
    StoreConfig
} from 'Query/Config.type';
import { Country } from 'Query/Region.type';
import { Device } from 'Type/Device.type';

export enum ConfigActionType {
    UPDATE_CONFIG = 'UPDATE_CONFIG',
    UPDATE_CONFIG_DEVICE = 'UPDATE_CONFIG_DEVICE'
}

export interface UpdateConfigAction extends AnyAction {
    type: ConfigActionType.UPDATE_CONFIG;
    config: ConfigStore;
}

export interface UpdateConfigDeviceAction extends AnyAction {
    type: ConfigActionType.UPDATE_CONFIG_DEVICE;
    device: Device;
}

export type ConfigAction = UpdateConfigAction | UpdateConfigDeviceAction;

export type ReviewRatingOption = {
    option_id: string;
    value: string;
};

export type ReviewRatingItem = {
    rating_id: string;
    rating_code: string;
    rating_options: ReviewRatingOption[];
};

export type ReviewRatings = {
    items: ReviewRatingItem[];
};

export type ConfigStore = StoreConfig & {
    countries: Country[];
    reviewRatings: ReviewRatingItem[];
    // storeConfig: GQLStoreConfig;
    checkoutAgreements: CheckoutAgreement[];
    currencyData: CurrencyConfig;
    cartDisplayConfig: CartDisplayConfig;
    priceTaxDisplay: PriceTaxDisplay;
    isLoading: boolean;
    category_url_suffix: string;
    device: Device;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ConfigReducer: ConfigStore;
    }
}
