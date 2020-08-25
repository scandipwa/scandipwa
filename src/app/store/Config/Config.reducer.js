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

import { UPDATE_CONFIG } from './Config.action';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;

export const filterStoreConfig = (config) => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {}
);

const { countries, reviewRatings, storeConfig } = BrowserDatabase.getItem('config') || {
    countries: [],
    reviewRatings: [],
    storeConfig: {}
};

export const initialState = {
    ...filterStoreConfig(storeConfig),
    countries,
    reviewRatings,
    checkoutAgreements: [],
    isLoading: true
};

export const ConfigReducer = (state = initialState, action) => {
    const {
        config: {
            countries,
            reviewRatings,
            checkoutAgreements,
            storeConfig = {}
        } = {}, type
    } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);

        return {
            ...state,
            countries,
            reviewRatings,
            checkoutAgreements,
            ...filteredStoreConfig,
            // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
            // and header_logo_src takes old value
            isLoading: false
        };

    default:
        return state;
    }
};

export default ConfigReducer;
