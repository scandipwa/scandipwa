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
import { RegionQuery, ReviewQuery, ConfigQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateConfig } from 'Store/Config';
import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

export class ConfigDispatcher extends QueryDispatcher {
    constructor() {
        super('Config');
    }

    onSuccess(data, dispatch) {
        if (data) {
            const config = BrowserDatabase.getItem('config') || {};
            const { storeConfig = {} } = config;
            const { showWelcomeMessage = true } = storeConfig;
            const { storeConfig: newStoreConfig } = data;
            const override = {};

            if (!showWelcomeMessage) {
                const { welcome: oldWelcome } = storeConfig;
                const { welcome: newWelcome } = newStoreConfig;

                if (oldWelcome !== newWelcome) {
                    override.showWelcomeMessage = true;
                }
            }

            const result = {
                ...data,
                storeConfig: {
                    ...newStoreConfig,
                    showWelcomeMessage,
                    ...override
                }
            };

            BrowserDatabase.setItem(result, 'config', ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(result));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Config!', error));
    }

    prepareRequest() {
        return [
            RegionQuery.getCountriesQuery(),
            ReviewQuery.getRatingQuery(),
            ConfigQuery.getQuery()
        ];
    }
}

export default new ConfigDispatcher();
