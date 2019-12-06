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
import { Field } from 'Util/Query';

export class CurrencyQuery {
    getCurrencyMutation() {
        return new Field('currency')
            .addFieldList(this._currencyFieldLists());
    }

    _currencyFieldLists() {
        return [
            'available_currency_codes',
            'base_currency_code',
            'default_display_currency_code',
            this._getExchangeRates()
        ];
    }

    _getExchangeRates() {
        return new Field('exchange_rates')
            .setAlias('currency_codes')
            .addFieldList([
                'currency_to',
                'rate'
            ]);
    }
}

export default new CurrencyQuery();
