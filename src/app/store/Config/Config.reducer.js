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

import {
    GET_COUNTRY_LIST,
    UPDATE_REVIEW_RATINGS,
    UPDATE_STORE_CONFIG
} from './Config.action';

export const initialState = {
    countries: [],
    reviewRatings: [],
    cms_home_page: '',
    cms_no_route: '',
    copyright: '',
    header_logo_src: '',
    timezone: ''
};

const ConfigReducer = (state = initialState, action) => {
    const {
        countries,
        reviewRatings,
        storeConfig
    } = action;

    switch (action.type) {
    case GET_COUNTRY_LIST:
        return {
            ...state,
            countries
        };
    case UPDATE_REVIEW_RATINGS:
        return {
            ...state,
            reviewRatings
        };
    case UPDATE_STORE_CONFIG:
        return {
            ...state,
            ...storeConfig
        };

    default:
        return state;
    }
};

export default ConfigReducer;
