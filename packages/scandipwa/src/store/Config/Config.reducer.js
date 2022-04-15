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

import BrowserDatabase from 'Util/BrowserDatabase';

import { UPDATE_CONFIG, UPDATE_CONFIG_DEVICE } from './Config.action';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;
export const DEFAULT_CATGORY_URL_SUFFIX = '.html';

/** @namespace Store/Config/Reducer/filterStoreConfig */
export const filterStoreConfig = (config) => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {}
);

/** @namespace Store/Config/Reducer/filterAvailableCurrencies */
export const filterAvailableCurrencies = (currencyData, currencyRates) => {
    if (currencyData.available_currencies_data.length < 1 || currencyRates.exchange_rates.length < 1) {
        return ({ currencyData, currencyRates });
    }
    const { available_currencies_data: availableCurrencies = [] } = currencyData;
    const { base_curreny_code: base, exchange_rates: rates = [] } = currencyRates;
    return ({
        currencyData: {
            ...currencyData,
            available_currencies_data:
     availableCurrencies.filter(({ value }) => (
         value === base || rates?.find(({ currency_to }) => currency_to === value).rate > 0
     ))
        },
        currencyRates
    });
};

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
    ...filterAvailableCurrencies(currencyData, currency),
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
            currency,
            storeConfig = {},
            cartDisplayConfig = {}
        } = {},
        device
    } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        // const filteredCurrencyData = {
        //     ...currencyData,
        //     ...filterAvailableCurrencies(currencyData, currency)
        // };
        const { secure_base_media_url } = filteredStoreConfig;
        window.secure_base_media_url = secure_base_media_url;

        return {
            ...state,
            countries: getCountryData(countries, state),
            reviewRatings: getIndexedRatings(reviewRatings),
            checkoutAgreements: getCheckoutAgreementData(checkoutAgreements, state),
            ...filterAvailableCurrencies(
                getCurrencyData(currencyData, state),
                getCurrencyRates(currency, state)
            ),
            // currency: getCurrencyRates(currency, state),
            // ...filteredCurrencyData,
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
