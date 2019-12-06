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
import React, { PureComponent } from 'react';
import { executeGet } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { prepareQuery } from 'Util/Query';
import CurrencyQuery from 'Query/Currency.query';
import { setCurrencyData } from 'Store/Currency';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrency, getCurrency } from 'Util/Currency/Current';
import CurrencySwitcherComponent from './CurrencySwitcher.component';

export const mapDispatchToProps = dispatch => ({
    setCurrencyData: data => dispatch(setCurrencyData(data))
});

export const mapStateToProps = state => ({
    currency: state.CurrencyReducer.currency,
    default_display_currency_code: state.ConfigReducer.default_display_currency_code
});

export class CurrencySwitcherContainer extends PureComponent {
    static propTypes = {
        setCurrencyData: PropTypes.func.isRequired,
        currency: PropTypes.object.isRequired,
        default_display_currency_code: PropTypes.string.isRequired
    };

    componentDidMount() {
        this._requestStoreCurrencies();
    }

    _requestStoreCurrencies() {
        const { setCurrencyData } = this.props;
        const query = [CurrencyQuery.getCurrencyMutation()];
        executeGet(prepareQuery(query), 'Currency', ONE_MONTH_IN_SECONDS, false)
            .then((data) => {
                // Clears the Currency of localstorage if same data is not present in the API
                if (!data.currency.currency_codes.find(code => code.rate > 0 && code.currency_to === getCurrency())) {
                    setCurrency('');
                    window.location.reload();
                } else {
                    setCurrencyData(data);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    validatedCurrencyCodes() {
        const { currency, default_display_currency_code } = this.props;

        const currencyCodes = currency.currency_codes ? currency.currency_codes : [];
        const availableCurrency = [];

        currencyCodes.map((currencyCode) => {
            if (currencyCode.rate > 0) {
                availableCurrency.push(currencyCode.currency_to);
            }

            return 0;
        });

        if (availableCurrency.length > 1) {
            const code = getCurrency();

            if (availableCurrency.indexOf(code) >= 0) {
                setCurrency(code);
            } else {
                setCurrency(default_display_currency_code);
            }
        }
    }

    render() {
        this.validatedCurrencyCodes();
        return (
            <CurrencySwitcherComponent
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcherContainer);
