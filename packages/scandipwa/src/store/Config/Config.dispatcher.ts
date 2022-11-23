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
import { updateConfigState } from 'Store/Config/Config.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { returnFilteredCurrencies, setCurrency } from 'Util/Currency';
import { fetchCancelableQuery } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ConfigStore, ReviewRatings } from './Config.type';

/** @namespace Store/Config/Dispatcher/filterStoreConfig */
export const filterStoreConfig = (config: StoreConfig): Partial<StoreConfig> => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {},
);

/** @namespace Store/Config/Dispatcher/getIndexedRatings */
export const getIndexedRatings = (
    reviewRatings: ReviewRatings,
): ReviewRatingItem[] => ((reviewRatings) ? reviewRatings.items || [] : []);

/** @namespace Store/Config/Dispatcher/getCurrencyRates */
export const getCurrencyRates = (
    base: Currencies,
    state: Partial<ConfigStore>,
): Currencies => (base || state.currency || {});

/** @namespace Store/Config/Dispatcher/getCurrencyData */
export const getCurrencyData = (
    base: CurrencyData,
    state: Partial<ConfigStore>,
): CurrencyData => (base || state.currencyData || {});

/** @namespace Store/Config/Dispatcher/getCountryData */
export const getCountryData = (
    base: Country[],
    state: Partial<ConfigStore>,
): Country[] => (base || state.countries || {});

/** @namespace Store/Config/Dispatcher/getCheckoutAgreementData */
export const getCheckoutAgreementData = (
    base: CheckoutAgreement[],
    state: Partial<ConfigStore>,
): CheckoutAgreement[] => (base || state.checkoutAgreements || {});

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
            dispatch(updateConfigState({}));
        }
    }

    prepareRequest(): Array<
    Query<'countries', Country, true>
    | Query<'reviewRatings', ReviewRatings>
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
        const { ...state } = this.storeState.ConfigReducer;
        const rawQueries = this.prepareRequest();

        try {
            const data = await fetchCancelableQuery<ConfigStore>(rawQueries, 'Config');

            if (data) {
                const {
                    currencyData,
                    countries,
                    cartDisplayConfig,
                    reviewRatings,
                    storeConfig,
                    checkoutAgreements,
                    currency,
                } = data;
                const filteredData = { ...data, ...returnFilteredCurrencies(currencyData, currency) };

                const filteredStoreConfig = filterStoreConfig(storeConfig);
                const { secure_base_media_url } = filteredStoreConfig;

                window.secure_base_media_url = secure_base_media_url;

                const newConfigState = {
                    ...state,
                    ...filteredData,
                    countries: getCountryData(countries, state),
                    // @ts-ignore
                    reviewRatings: getIndexedRatings(reviewRatings),
                    checkoutAgreements: getCheckoutAgreementData(checkoutAgreements, state),
                    currency: getCurrencyRates(currency, state),
                    currencyData: getCurrencyData(currencyData, state),
                    ...filteredStoreConfig,
                    // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
                    // and header_logo_src takes old value
                    isLoading: false,
                    cartDisplayConfig,
                };

                this.dispatch(updateConfigState(newConfigState));
            }
        } catch (err) {
            this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Config!'), err));
        }
    }
}

export default new ConfigDispatcher();
