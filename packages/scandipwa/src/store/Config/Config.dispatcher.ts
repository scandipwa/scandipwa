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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CartQuery from 'Query/Cart.query';
import ConfigQuery from 'Query/Config.query';
import RegionQuery from 'Query/Region.query';
import ReviewQuery from 'Query/Review.query';
import { updateConfig } from 'Store/Config/Config.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { setCurrency } from 'Util/Currency';
import { fetchMutation, QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { ConfigStore } from './Config.type';

/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher extends QueryDispatcher<undefined, ConfigStore> {
    __construct(): void {
        super.__construct('Config');
    }

    static async updateCurrency(dispatch: Dispatch, options: { currencyCode: string }): Promise<void> {
        const { currencyCode } = options;

        try {
            await fetchMutation(ConfigQuery.getSaveSelectedCurrencyMutation(currencyCode));
            setCurrency(currencyCode);
        } catch (e) {
            dispatch(updateConfig({} as ConfigStore));
        }
    }

    onSuccess(data: ConfigStore, dispatch: Dispatch): void {
        if (data) {
            BrowserDatabase.setItem(data, 'config', ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(data));
        }
    }

    onError(error: unknown, dispatch: Dispatch): void {
        dispatch(showNotification(NotificationType.ERROR, __('Error fetching Config!'), error));
    }

    prepareRequest(): Query<string, unknown, boolean>[] {
        return [
            RegionQuery.getCountriesQuery(),
            ReviewQuery.getRatingQuery(),
            ConfigQuery.getQuery(),
            ConfigQuery.getCheckoutAgreements(),
            ConfigQuery.getCurrencyData(),
            CartQuery.getCartDisplayConfig()
        ] as Query<string, unknown, boolean>[];
    }
}

export default new ConfigDispatcher();
