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

/* eslint-disable no-param-reassign */
import {
    GET_COUNTRY_LIST,
    UPDATE_REVIEW_RATINGS
} from './Config.action';

const initialState = {
    countries: [],
    reviewRatings: []
};

const ConfigReducer = (state = initialState, action) => {
    const { countries, reviewRatings } = action;

    const resultingCountries = countries && countries.map(({
        id, full_name_locale: label, available_regions
    }) => ({ id, label, available_regions }));

    switch (action.type) {
    case GET_COUNTRY_LIST:
        return {
            ...state,
            countries: resultingCountries
        };
    case UPDATE_REVIEW_RATINGS:
        return {
            ...state,
            reviewRatings
        };

    default:
        return state;
    }
};

export default ConfigReducer;
