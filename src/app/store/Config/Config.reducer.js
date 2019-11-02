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

export const MAX_WIDTH = 200;
export const MAX_HEIGHT = 50;
export const DEFAULT_LOGO_WIDTH = 183;
export const DEFAULT_LOGO_HEIGHT = 46;

export const getLogoSize = (
    logo_height = DEFAULT_LOGO_HEIGHT, logo_width = DEFAULT_LOGO_WIDTH, header_logo_src
) => {
    if (!header_logo_src) return {};

    if (logo_height > MAX_HEIGHT) {
        const newWidth = Math.round(logo_width / (logo_height / MAX_HEIGHT));

        if (newWidth > MAX_WIDTH) {
            const newHeight = Math.round(MAX_HEIGHT / (newWidth / MAX_WIDTH));

            return { height: newHeight, width: MAX_WIDTH };
        }

        return { height: MAX_HEIGHT, width: newWidth };
    }

    if (logo_width > MAX_WIDTH) {
        const newHeight = Math.round(logo_height / (logo_width / MAX_WIDTH));
        return { height: newHeight, width: MAX_WIDTH };
    }

    return {
        height: logo_height,
        width: logo_width
    };
};

export const filterStoreConfig = config => Object.entries(config).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
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
    logo_size: {},
    isLoading: true
};

const ConfigReducer = (state = initialState, action) => {
    const { config: { countries, reviewRatings, storeConfig = {} } = {}, type } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        const { logo_height, logo_width, header_logo_src } = filteredStoreConfig;

        return {
            ...state,
            countries,
            reviewRatings,
            ...filteredStoreConfig,
            logoSize: getLogoSize(logo_height, logo_width, header_logo_src),
            // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
            // and header_logo_src takes old value
            header_logo_src,
            isLoading: false
        };

    default:
        return state;
    }
};

export default ConfigReducer;
