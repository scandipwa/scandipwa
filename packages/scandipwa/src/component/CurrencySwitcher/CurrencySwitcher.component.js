/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import { getCurrency } from 'Util/Currency';

import './CurrencySwitcher.style';

/** @namespace Component/CurrencySwitcher/Component */
export class CurrencySwitcher extends PureComponent {
    static propTypes = {
        currencyData: PropTypes.shape({
            available_currencies_data: PropTypes.arrayOf(
                PropTypes.objectOf(
                    PropTypes.string
                )
            ),
            current_currency_code: PropTypes.string
        }).isRequired,
        handleCurrencySelect: PropTypes.func.isRequired
    };

    getCurrencyValue() {
        const {
            currencyData: {
                available_currencies_data: availableCurrencies,
                current_currency_code: currentCurrencyCode
            } = {}
        } = this.props;

        // check whether user’s selected currency is among available currencies for current store,
        // otherwise use default currency for current store.
        const currency = getCurrency();

        return availableCurrencies.some((e) => e.id === currency) ? currency : currentCurrencyCode;
    }

    currencyHasRate(currency_code) {
        const {
            currencyRates: {
                base_currency_code: base,
                exchange_rates: rates
            }
        } = this.props;

        if (currency_code === base) {
            return true;
        }

        if (rates.find(({ currency_to }) => currency_to === currency_code).rate !== 0) {
            return true;
        }

        return false;
    }

    returnFilteredCurrencies() {
        const { currencyData: { available_currencies_data: availableCurrencies } } = this.props;
        const currenciesToFilter = Array.from(availableCurrencies);
        return currenciesToFilter.filter(({ value }) => this.currencyHasRate(value));
    }

    render() {
        const {
            handleCurrencySelect,
            currencyData: {
                available_currencies_data: availableCurrencies
            } = {}
        } = this.props;

        if (availableCurrencies && availableCurrencies.length > 1) {
            return (
                <div block="CurrencySwitcher">
                    <Field
                      type={ FIELD_TYPE.select }
                      attr={ {
                          id: 'CurrencySwitcherList',
                          name: 'CurrencySwitcherList',
                          defaultValue: this.getCurrencyValue(),
                          noPlaceholder: true
                      } }
                      events={ {
                          onChange: handleCurrencySelect
                      } }
                      options={ this.returnFilteredCurrencies() }
                    />
                </div>
            );
        }

        return null;
    }
}

export default CurrencySwitcher;
