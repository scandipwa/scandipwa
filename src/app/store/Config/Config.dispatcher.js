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

import { QueryDispatcher } from 'Util/Request';
import { RegionQuery, Review } from 'Query';
import { showNotification } from 'Store/Notification';
import { getCountryList, updateReviewRatings } from 'Store/Config';

export class ConfigDispatcher extends QueryDispatcher {
    constructor() {
        super('Config', 86400);
    }

    onSuccess(data, dispatch) {
        if (data) {
            const { countries, rating_details } = data;

            dispatch(getCountryList(countries));
            dispatch(updateReviewRatings(rating_details));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Config!', error));
    }

    prepareRequest() {
        return [
            RegionQuery.getCountriesList(),
            Review.getRatingDetails()
        ];
    }
}

export default new ConfigDispatcher();
