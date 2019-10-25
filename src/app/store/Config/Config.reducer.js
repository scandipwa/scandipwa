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

export const ALWAYS_UPDATE_IN_CONFIG = ['header_logo_src', 'logo_height', 'logo_width'];

export const filterStoreConfig = config => Object.entries(config).reduce(
    (acc, [key, value]) => {
        if (ALWAYS_UPDATE_IN_CONFIG.includes(key)) {
            return value
                ? { ...acc, [key]: value }
                : { ...acc, [key]: undefined };
        }

        return value ? { ...acc, [key]: value } : acc;
    },
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
    title_prefix: 'ScandiPWA |',
    isLoading: true
};

const ConfigReducer = (state = initialState, action) => {
    const { config: { countries, reviewRatings, storeConfig = {} } = {}, type } = action;
    switch (type) {
    case UPDATE_CONFIG:

        return {
            ...state,
            countries,
            reviewRatings,
            ...filterStoreConfig(storeConfig),
            isLoading: false
        };

    default:
        return state;
    }
};

export default ConfigReducer;
