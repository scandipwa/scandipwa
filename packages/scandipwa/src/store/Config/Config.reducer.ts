/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Action, Reducer } from 'redux';

import { DeviceContextType } from 'Store/Device/Device.context';
import BrowserDatabase from 'Util/BrowserDatabase';
import isMobile from 'Util/Mobile';

import { UPDATE_CONFIG, UPDATE_CONFIG_DEVICE } from './Config.action';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;
export const DEFAULT_CATGORY_URL_SUFFIX = '.html';

export interface ConfigStore {
    countries: {
        available_regions?: string
        id: string
        is_state_required?: boolean
        label: string
    }[]
    reviewRatings: {
        rating_code: string
        rating_id: string
        rating_options: {
            option_id: string
            value: string
        }[]
    }[]
    checkoutAgreements: {
        agreement_id: number
        checkbox_text: string
        content: string
        content_height?: number
        is_html: boolean
        mode: string
        name: string
    }[]
    currencyData: {
        available_currencies_data: {
            id: string
            label: string
            value: string
        }[]
        current_currency_code: string
    }[]
    isLoading: boolean
    cartDisplayConfig: {
        display_full_tax_summary?: boolean
        display_tax_in_price?: string
        display_tax_in_shipping_amount?: string
        display_tax_in_subtotal?: string
        display_zero_tax_subtotal?: boolean
        include_tax_in_order_total?: boolean
    }
    priceTaxDisplay: Record<string, string>
    category_url_suffix: string
    device: DeviceContextType
    storeConfig?: Partial<Record<string, string | number | boolean>>

    [key: string]: unknown
}

declare module 'Util/Store/type' {
    export interface RootState {
        ConfigReducer: ConfigStore
    }
}

/** @namespace Store/Config/Reducer/filterStoreConfig */
export const filterStoreConfig = <T>(config:T): T => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {} as T
);

export const {
    countries,
    reviewRatings,
    storeConfig,
    currencyData,
    cartDisplayConfig
} = BrowserDatabase.getItem('config') || {
    countries: [],
    reviewRatings: [],
    storeConfig: {},
    currencyData: {},
    cartDisplayConfig: {
        display_tax_in_price: '',
        display_tax_in_subtotal: '',
        display_tax_in_shipping_amount: '',
        include_tax_in_order_total: false,
        display_full_tax_summary: false,
        display_zero_tax_subtotal: false
    }
};

/** @namespace Store/Config/Reducer/getIndexedRatings */
export const getIndexedRatings = (
    reviewRatings: { items: ConfigStore['reviewRatings'] }
): ConfigStore['reviewRatings'] => ((reviewRatings) ? reviewRatings.items || [] : []);

/** @namespace Store/Config/Reducer/getCurrencyData */
export const getCurrencyData = (
    base: ConfigStore['currencyData'],
    state: ConfigStore
): ConfigStore['currencyData'] => (base || state.currencyData || {});

/** @namespace Store/Config/Reducer/getCountryData */
export const getCountryData = (
    base: ConfigStore['countries'],
    state: ConfigStore
): ConfigStore['countries'] => (base || state.countries || {});

/** @namespace Store/Config/Reducer/getCheckoutAgreementData */
export const getCheckoutAgreementData = (
    base: ConfigStore['checkoutAgreements'],
    state: ConfigStore
): ConfigStore['checkoutAgreements'] => (base || state.checkoutAgreements || {});

/** @namespace Store/Config/Reducer/getInitialState */
export const getInitialState = (): ConfigStore => ({
    ...filterStoreConfig(storeConfig),
    countries,
    reviewRatings,
    checkoutAgreements: [],
    currencyData,
    isLoading: true,
    cartDisplayConfig,
    priceTaxDisplay: {},
    category_url_suffix: DEFAULT_CATGORY_URL_SUFFIX,
    device: {
        isMobile: isMobile.any(),
        android: isMobile.android(),
        ios: isMobile.iOS(),
        blackberry: isMobile.blackBerry(),
        opera: isMobile.opera(),
        windows: isMobile.windows(),
        safari: isMobile.safari(),
        standaloneMode: window.matchMedia('(display-mode: standalone)').matches
    }
});

/** @namespace Store/Config/Reducer/ConfigReducer */
export const ConfigReducer: Reducer<
    ConfigStore,
    Action<
        typeof UPDATE_CONFIG
        | typeof UPDATE_CONFIG_DEVICE
    > & { config: Partial<ConfigStore>, device: Partial<DeviceContextType> }
> = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        config: {
            countries = [],
            reviewRatings = {},
            checkoutAgreements = [],
            currencyData = [],
            storeConfig = {},
            cartDisplayConfig = {}
        } = {},
        device
    } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        const { secure_base_media_url } = filteredStoreConfig;
        window.secure_base_media_url = secure_base_media_url as string;

        return {
            ...state,
            countries: getCountryData(countries, state),
            reviewRatings: getIndexedRatings(reviewRatings as { items: ConfigStore['reviewRatings'] }),
            checkoutAgreements: getCheckoutAgreementData(checkoutAgreements, state),
            currencyData: getCurrencyData(currencyData, state),
            ...filteredStoreConfig,
            // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
            // and header_logo_src takes old value
            isLoading: false,
            cartDisplayConfig
        };

    case UPDATE_CONFIG_DEVICE:
        return {
            ...state,
            device: {
                ...state.device,
                ...device
            }
        };

    default:
        return state;
    }
};

export default ConfigReducer;
