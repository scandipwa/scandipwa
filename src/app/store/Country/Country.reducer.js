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
    GET_COUNTRY_LIST
} from './Country.action';

const initialState = {
    countries: []
};

const CountryReducer = (state = initialState, action) => {
    const { countries } = action;

    const resultingCountries = countries && countries.map(country => ({
        id: country.id,
        label: country.full_name_locale
    }));

    switch (action.type) {
    case GET_COUNTRY_LIST:
        return {
            ...state,
            countries: resultingCountries
        };

    default:
        return state;
    }
};

export default CountryReducer;
