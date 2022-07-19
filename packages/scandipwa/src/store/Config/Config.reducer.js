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

import BrowserDatabase from 'Util/BrowserDatabase';

import {
    UPDATE_CONFIG,
    UPDATE_CONFIG_DEVICE,
    UPDATE_CURRENT_CURRENCY
} from './Config.action';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;
export const DEFAULT_CATGORY_URL_SUFFIX = '.html';

/** @namespace Store/Config/Reducer/filterStoreConfig */
export const filterStoreConfig = (config) => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {}
);

export const {
    countries, reviewRatings, storeConfig, currencyData, currency, cartDisplayConfig
} = BrowserDatabase.getItem('config') || {
    countries: [],
    reviewRatings: [],
    storeConfig: {},
    currencyData: {},
    currency: {},
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
export const getIndexedRatings = (reviewRatings) => ((reviewRatings) ? reviewRatings.items || [] : []);

/** @namespace Store/Config/Reducer/getCurrencyRates */
export const getCurrencyRates = (base, state) => (base || state.currency || {});

/** @namespace Store/Config/Reducer/getCurrencyData */
export const getCurrencyData = (base, state) => (base || state.currencyData || {});

/** @namespace Store/Config/Reducer/getCountryData */
export const getCountryData = (base, state) => (base || state.countries || {});

/** @namespace Store/Config/Reducer/getCheckoutAgreementData */
export const getCheckoutAgreementData = (base, state) => (base || state.checkoutAgreements || {});

/** @namespace Store/Config/Reducer/getInitialState */
export const getInitialState = () => ({
    ...filterStoreConfig(storeConfig),
    currencyData,
    currency,
    countries,
    reviewRatings,
    checkoutAgreements: [],
    isLoading: true,
    cartDisplayConfig,
    priceTaxDisplay: {},
    category_url_suffix: DEFAULT_CATGORY_URL_SUFFIX,
    device: {
        isMobile: true,
        android: true,
        ios: false,
        blackberry: false,
        opera: false,
        windows: false,
        standaloneMode: window.matchMedia('(display-mode: standalone)').matches
    }
});

/** @namespace Store/Config/Reducer/ConfigReducer */
export const ConfigReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        config: {
            countries,
            reviewRatings,
            checkoutAgreements,
            currencyData,
            storeConfig = {},
            cartDisplayConfig = {}
        } = {},
        device
    } = action;

    const { currentCurrency = '' } = action;
    const { currencyData: prevCurrencyData } = state;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        const { secure_base_media_url } = filteredStoreConfig;

        window.secure_base_media_url = secure_base_media_url;

        return {
            ...state,
            countries: getCountryData(countries, state),
            reviewRatings: getIndexedRatings(reviewRatings),
            checkoutAgreements: getCheckoutAgreementData(checkoutAgreements, state),
            currency: getCurrencyRates(currency, state),
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

    case UPDATE_CURRENT_CURRENCY:
        return {
            ...state,
            currencyData: {
                ...prevCurrencyData,
                current_currency_code: currentCurrency
            }
        };

    default:
        return state;
    }
};
export default ConfigReducer;
