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

import BrowserDatabase from 'Util/BrowserDatabase';

/**
 *
 * @type {string}
 */
export const CUR_CURRENCY = 'current_currency';

/**
 *
 * @type {number}
 */
export const ONE_HOUR = 3600;

/**
 *
 * @param {Any} currency
 * @returns {void}
 * @namespace Util/Currency/setCurrency
 */
export const setCurrency = (currency: string): void => {
    BrowserDatabase.setItem(currency, CUR_CURRENCY, ONE_HOUR);
};

/**
 *
 * @returns {String} currency
 * @namespace Util/Currency/getCurrency
 */
export const getCurrency = (): string => {
    const currency = BrowserDatabase.getItem(CUR_CURRENCY);

    return (typeof currency === 'string') ? currency : '';
};

/**
 *
 * @param {object} currencyData
 * @param {object} currencyRates
 * @returns {object} filtered currencyData object and currency (rates) object
 * @namespace Util/Currency/returnFilteredCurrencies
 */
export const returnFilteredCurrencies = (currencyData, currencyRates) => {
    if (
        currencyData?.available_currencies_data?.length < 1 || currencyRates?.exchange_rates?.length < 1) {
        return ({ currencyData, currencyRates });
    }

    const { available_currencies_data: availableCurrencies = [] } = currencyData;
    const { base_curreny_code: base, exchange_rates: rates = [] } = currencyRates;

    return ({
        currencyData: {
            ...currencyData,
            available_currencies_data:
                availableCurrencies.filter(({ value }) => (
                    value === base || rates?.find(({ currency_to }) => currency_to === value)?.rate > 0
                ))
        },
        currency: currencyRates
    });
};
