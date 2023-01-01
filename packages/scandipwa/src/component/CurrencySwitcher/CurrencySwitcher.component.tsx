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

import { PureComponent } from 'react';

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { getCurrency } from 'Util/Currency';

import { CurrencySwitcherComponentProps } from './CurrencySwitcher.type';

import './CurrencySwitcher.style';

/** @namespace Component/CurrencySwitcher/Component */
export class CurrencySwitcherComponent<
P extends Readonly<CurrencySwitcherComponentProps> = Readonly<CurrencySwitcherComponentProps>,
S extends CurrencySwitcherComponentState = CurrencySwitcherComponentState,
> extends PureComponent<P, S> {
    getCurrencyValue(): string | undefined {
        const {
            currencyData: {
                available_currencies_data: availableCurrencies,
                current_currency_code: currentCurrencyCode,
            } = {},
        } = this.props;

        // check whether user’s selected currency is among available currencies for current store,
        // otherwise use default currency for current store.
        const currency = getCurrency();

        return availableCurrencies?.some((e) => e.id === currency) ? currency : currentCurrencyCode;
    }

    render(): ReactElement {
        const {
            currencyData: {
                available_currencies_data: availableCurrencies,
            } = {},
            handleCurrencySelect,
        } = this.props;

        if (availableCurrencies && availableCurrencies.length > 1) {
            return (
                <div block="CurrencySwitcher">
                    <Field
                      type={ FieldType.SELECT }
                      attr={ {
                          id: 'CurrencySwitcherList',
                          name: 'CurrencySwitcherList',
                          defaultValue: this.getCurrencyValue(),
                          noPlaceholder: true,
                      } }
                      events={ {
                          onChange: handleCurrencySelect,
                      } }
                      options={ availableCurrencies }
                    />
                </div>
            );
        }

        return null;
    }
}

export default CurrencySwitcherComponent;
