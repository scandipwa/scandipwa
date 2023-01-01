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
import { NetworkError } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { returnFilteredCurrencies, setCurrency } from 'Util/Currency';
import { QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { ConfigStore } from './Config.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher<
P extends Readonly<undefined> = Readonly<undefined>,
S extends ConfigStore = ConfigStore,
> extends QueryDispatcher <P, S> {
    __construct(): void {
        super.__construct('Config');
    }

    static async updateCurrency(dispatch: Dispatch, options: { currencyCode: GQLCurrencyEnum }): Promise<void> {
        const { currencyCode } = options;

        try {
            setCurrency(currencyCode);

            CartDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch, true),
            );
        } catch (e) {
            dispatch(updateConfig({}));
        }
    }

    onSuccess(data: ConfigStore, dispatch: Dispatch): void {
        if (data) {
            const { currencyData, currency } = data;
            const filteredData = { ...data, ...returnFilteredCurrencies(currencyData, currency) };

            BrowserDatabase.setItem(filteredData, 'config', ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(filteredData));
        }
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch): void {
        dispatch(showNotification(NotificationType.ERROR, __('Error fetching Config!'), error));
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
}

export default new ConfigDispatcher();
