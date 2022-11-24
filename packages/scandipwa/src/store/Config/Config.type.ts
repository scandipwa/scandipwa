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
    Currencies,
    CurrencyData,
    PriceTaxDisplay,
    StoreConfig,
} from 'Query/Config.type';
import { Country } from 'Query/Region.type';
import { ReviewRatingItem } from 'Query/Review.type';
import { Device } from 'Type/Device.type';

export enum ConfigActionType {
    UPDATE_CONFIG_STATE = 'UPDATE_CONFIG',
}

export interface UpdateConfigStateAction extends AnyAction {
    type: ConfigActionType.UPDATE_CONFIG_STATE;
    state: Partial<ConfigStore>;
}

export interface ReviewRatings {
    items: ReviewRatingItem[];
}

export type ConfigStore = StoreConfig & {
    countries: Country[];
    reviewRatings: ReviewRatingItem[];
    checkoutAgreements: CheckoutAgreement[];
    currencyData: CurrencyData;
    cartDisplayConfig: CartDisplayConfig;
    priceTaxDisplay: PriceTaxDisplay;
    isLoading: boolean;
    category_url_suffix: string;
    device: Device;
    currency: Currencies;
    storeConfig: StoreConfig;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ConfigReducer: ConfigStore;
    }
}
