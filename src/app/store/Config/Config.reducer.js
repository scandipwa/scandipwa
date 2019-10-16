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
import { UPDATE_CONFIG, SET_LOADING_STATUS } from './Config.action';

export const initialState = BrowserDatabase.getItem('config') || {
    countries: [],
    reviewRatings: [],
    cms_home_page: '',
    cms_no_route: '',
    copyright: '',
    timezone: '',
    header_logo_src: '',
    logo_alt: '',
    logo_height: '',
    logo_width: '',
    isLoading: true
};

const ConfigReducer = (state = initialState, action) => {
    const {
        config: { countries, reviewRatings, storeConfig } = {},
        type, status
    } = action;

    switch (type) {
    case UPDATE_CONFIG:
        return {
            ...state,
            countries,
            reviewRatings,
            ...storeConfig
        };

    case SET_LOADING_STATUS:
        return {
            ...state,
            isLoading: status
        };

    default:
        return state;
    }
};

export default ConfigReducer;
