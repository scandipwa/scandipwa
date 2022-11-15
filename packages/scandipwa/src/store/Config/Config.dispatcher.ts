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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CartQuery from 'Query/Cart.query';
import { CartDisplayConfig } from 'Query/Cart.type';
import ConfigQuery from 'Query/Config.query';
import {
    CheckoutAgreement, Currencies, CurrencyData, StoreConfig,
} from 'Query/Config.type';
import RegionQuery from 'Query/Region.query';
import { Country } from 'Query/Region.type';
import ReviewQuery from 'Query/Review.query';
import { ReviewRatingItem } from 'Query/Review.type';
import { updateConfig } from 'Store/Config/Config.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { returnFilteredCurrencies, setCurrency } from 'Util/Currency';
import { fetchCancelableQuery } from 'Util/Request/BroadCast';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ConfigStore } from './Config.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher extends SimpleDispatcher {
    static async updateCurrency(dispatch: Dispatch, options: { currencyCode: GQLCurrencyEnum }): Promise<void> {
        const { currencyCode } = options;

        try {
            setCurrency(currencyCode);

            CartDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateInitialCartData(true),
            );
        } catch (e) {
            dispatch(updateConfig({}));
        }
    }

    prepareRequest(): Array<
    Query<'countries', Country, true>
    | Query<'reviewRatings', { items: ReviewRatingItem[] }>
    | Query<'storeConfig', StoreConfig>
    | Query<'checkoutAgreements', CheckoutAgreement, true>
    | Query<'currencyData', CurrencyData>
    | Query<'currency', Currencies>
    | Query<'cartDisplayConfig', CartDisplayConfig>
    > {
        return [
            RegionQuery.getCountriesQuery(),
            ReviewQuery.getRatingQuery(),
            ConfigQuery.getQuery(),
            ConfigQuery.getCheckoutAgreements(),
            ConfigQuery.getCurrencyData(),
            ConfigQuery.getCurrencyRates(),
            CartQuery.getCartDisplayConfig(),
        ];
    }

    async getConfigs() {
        const rawQueries = this.prepareRequest();

        try {
            const data = await fetchCancelableQuery<ConfigStore>(rawQueries, 'Config');

            if (data) {
                const { currencyData, currency } = data;
                const filteredData = { ...data, ...returnFilteredCurrencies(currencyData, currency) };

                BrowserDatabase.setItem(filteredData, 'config', ONE_MONTH_IN_SECONDS);
                this.dispatch(updateConfig(filteredData));
            }
        } catch (err) {
            this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Config!'), err));
        }
    }
}

export default new ConfigDispatcher();
