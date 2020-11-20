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

import ConfigQuery from 'Query/Config.query';
import RegionQuery from 'Query/Region.query';
import ReviewQuery from 'Query/Review.query';
import { updateConfig } from 'Store/Config/Config.action';
import { showNotification } from 'Store/Notification/Notification.action';
import BrowserDatabase from 'Util/BrowserDatabase';
import { QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('Config');
    }

    onSuccess(data, dispatch) {
        if (data) {
            BrowserDatabase.setItem(data, 'config', ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(data));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Config!', error));
    }

    prepareRequest() {
        return [
            RegionQuery.getCountriesQuery(),
            ReviewQuery.getRatingQuery(),
            ConfigQuery.getQuery(),
            ConfigQuery.getCheckoutAgreements()
        ];
    }
}

export default new ConfigDispatcher();
