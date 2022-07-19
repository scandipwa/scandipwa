/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import CartQuery from 'Query/Cart.query';
import ConfigQuery from 'Query/Config.query';
import RegionQuery from 'Query/Region.query';
import ReviewQuery from 'Query/Review.query';
import { updateConfig, updateCurrentCurrency } from 'Store/Config/Config.action';
import { showNotification } from 'Store/Notification/Notification.action';
import BrowserDatabase from 'Util/BrowserDatabase';
import { returnFilteredCurrencies, setCurrency } from 'Util/Currency';
import { fetchMutation, QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('Config');
    }

    static updateCurrency(dispatch, options) {
        const { currencyCode } = options;

        return fetchMutation(ConfigQuery.getSaveSelectedCurrencyMutation(
            currencyCode
        )).then(
            /** @namespace Store/Config/Dispatcher/ConfigDispatcher/updateCurrency/fetchMutation/then */
            async (currencyCode) => {
                setCurrency(currencyCode);
                await dispatch(updateCurrentCurrency(currencyCode));

                CartDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch, true)
                );
            }
        );
    }

    onSuccess(data, dispatch) {
        if (data) {
            const { currencyData, currency } = data;
            const filteredData = { ...data, ...returnFilteredCurrencies(currencyData, currency) };

            BrowserDatabase.setItem(filteredData, 'config', ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(filteredData));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', __('Error fetching Config!'), error));
    }

    prepareRequest() {
        return [
            RegionQuery.getCountriesQuery(),
            ReviewQuery.getRatingQuery(),
            ConfigQuery.getQuery(),
            ConfigQuery.getCheckoutAgreements(),
            ConfigQuery.getCurrencyData(),
            ConfigQuery.getCurrencyRates(),
            CartQuery.getCartDisplayConfig()
        ];
    }
}

export default new ConfigDispatcher();
