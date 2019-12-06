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
import { setCurrency, getCurrency } from 'Util/Currency/Current';
import PropTypes from 'prop-types';
import Field from 'Component/Field/Field.container';

class CurrencySwitcherComponent extends PureComponent {
    static propTypes = {
        setCurrencyData: PropTypes.func.isRequired,
        currency: PropTypes.object.isRequired
    };

    changeCurrency(value) {
        if (value !== getCurrency()) {
            setCurrency(value);
            window.location.reload();
        }
    }

    renderCurrencyList() {
        const { currency } = this.props;
        const currencyCodes = currency.currency_codes ? currency.currency_codes : [];
        const availableCurrency = currencyCodes.filter(elem => elem.rate > 0);
        const selectOptions = [];
        availableCurrency.map((currency) => {
            selectOptions.push({
                id: currency.currency_to,
                label: currency.currency_to,
                value: currency.currency_to
            });

            return 0;
        });

        if (availableCurrency.length > 1) {
            return (
                <Field
                  id="currency-switcher"
                  name="currency-switcher"
                  type="select"
                  selectOptions={ selectOptions }
                  value={ getCurrency() }
                  onChange={ this.changeCurrency }
                />
            );
        }

        return null;
    }

    render() {
        return (
            <div block="currency">
                { this.renderCurrencyList() }
            </div>
        );
    }
}

export default CurrencySwitcherComponent;
