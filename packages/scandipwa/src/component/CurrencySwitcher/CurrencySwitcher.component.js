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

    render() {
        const {
            currencyData: {
                available_currencies_data: availableCurrencies
            } = {},
            handleCurrencySelect
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
                      options={ availableCurrencies }
                    />
                </div>
            );
        }

        return null;
    }
}

export default CurrencySwitcher;
