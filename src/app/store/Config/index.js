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

import ConfigReducer from './Config.reducer';
import ConfigDispatcher, {
    ConfigDispatcher as ConfigDispatcherClass
} from './Config.dispatcher';

import {
    getCountryList,
    GET_COUNTRY_LIST,
    updateReviewRatings,
    UPDATE_REVIEW_RATINGS
} from './Config.action';

export {
    ConfigReducer,
    ConfigDispatcher,
    ConfigDispatcherClass,
    getCountryList,
    GET_COUNTRY_LIST,
    updateReviewRatings,
    UPDATE_REVIEW_RATINGS
};
