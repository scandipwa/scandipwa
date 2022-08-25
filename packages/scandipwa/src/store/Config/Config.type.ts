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

import { AnyAction } from 'redux';

import { CartDisplayConfig } from 'Query/Cart.type';
import {
    CheckoutAgreement,
    CurrencyConfig,
    PriceTaxDisplay,
    StoreConfig
} from 'Query/Config.type';
import { Country } from 'Query/Region.type';
import { ReviewRatingItem } from 'Query/Review.type';
import { Device } from 'Type/Device.type';

export enum ConfigActionType {
    UPDATE_CONFIG = 'UPDATE_CONFIG',
    UPDATE_CONFIG_DEVICE = 'UPDATE_CONFIG_DEVICE',
    UPDATE_CURRENT_CURRENCY = 'UPDATE_CURRENT_CURRENCY'
}

export interface UpdateConfigAction extends AnyAction {
    type: ConfigActionType.UPDATE_CONFIG;
    config: Partial<ConfigStore>;
}

export interface UpdateConfigDeviceAction extends AnyAction {
    type: ConfigActionType.UPDATE_CONFIG_DEVICE;
    device: Device;
}

export interface UpdateConfigCurrencyAction extends AnyAction {
    type: ConfigActionType.UPDATE_CURRENT_CURRENCY;
    selectedCurrency: string;
}

export type ConfigAction = UpdateConfigAction | UpdateConfigDeviceAction | UpdateConfigCurrencyAction;

export interface ReviewRatings {
    items: ReviewRatingItem[];
}

export type ConfigStore = StoreConfig & {
    countries: Country[];
    reviewRatings: ReviewRatingItem[];
    checkoutAgreements: CheckoutAgreement[];
    currencyData: CurrencyConfig;
    cartDisplayConfig: CartDisplayConfig;
    priceTaxDisplay: PriceTaxDisplay;
    isLoading: boolean;
    category_url_suffix: string;
    device: Device;
    currency: string;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ConfigReducer: ConfigStore;
    }
}
