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
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { UPDATE_CONFIG, UPDATE_SINGLE_CONFIG_PROPERTY } from './Config.action';

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;

export const filterStoreConfig = config => Object.entries(config).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
);

const { countries, reviewRatings, storeConfig = {} } = BrowserDatabase.getItem('config') || {
    countries: [],
    reviewRatings: [],
    storeConfig: {}
};

const { showWelcomeMessage: initialShowWelcomeMessage = true } = storeConfig || {};

export const initialState = {
    ...filterStoreConfig(storeConfig),
    countries,
    reviewRatings,
    title_prefix: 'ScandiPWA |',
    isLoading: true,
    showWelcomeMessage: initialShowWelcomeMessage
};

const ConfigReducer = (state = initialState, action) => {
    const { config: { countries, reviewRatings, storeConfig = {} } = {}, type } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        const { header_logo_src } = filteredStoreConfig;
        const { showWelcomeMessage } = state;

        const result = {
            ...state,
            countries,
            reviewRatings,
            ...filteredStoreConfig,
            // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
            // and header_logo_src takes old value
            header_logo_src,
            isLoading: false
        };

        if (!showWelcomeMessage) {
            const { welcome: oldWelcome } = state;
            const { welcome: newWelcome } = storeConfig;

            if (oldWelcome !== newWelcome) {
                return {
                    ...result,
                    showWelcomeMessage: true
                };
            }
        }

        return result;

    case UPDATE_SINGLE_CONFIG_PROPERTY:
        const { property } = action;
        const config = BrowserDatabase.getItem('config');
        const { storeConfig: localStoreConfig } = config;
        const result2 = {
            ...config,
            storeConfig: {
                ...localStoreConfig,
                ...property
            }
        };

        BrowserDatabase.setItem(result2, 'config', ONE_MONTH_IN_SECONDS);
        return { ...state, ...property };

    default:
        return state;
    }
};

export default ConfigReducer;
