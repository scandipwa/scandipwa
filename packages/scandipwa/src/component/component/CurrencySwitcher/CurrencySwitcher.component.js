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

import Field from '../Field';
import { getCurrency } from '../../../../../../../123/src/app/util/Currency';

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

    render() {
        const {
            handleCurrencySelect,
            currencyData: {
                available_currencies_data: availableCurrencies,
                current_currency_code: currentCurrencyCode
            } = {}
        } = this.props;

        if (availableCurrencies && availableCurrencies.length > 1) {
            return (
                <div block="CurrencySwitcher">
                    <Field
                      id="CurrencySwitcherList"
                      name="CurrencySwitcherList"
                      type="select"
                      placeholder={ __('Select currency') }
                      selectOptions={ availableCurrencies }
                      value={ getCurrency() || currentCurrencyCode }
                      onChange={ handleCurrencySelect }
                    />
                </div>
            );
        }

        return null;
    }
}

export default CurrencySwitcher;
