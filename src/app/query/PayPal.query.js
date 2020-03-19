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

export class PayPalQuery {
    getCreatePaypalExpressTokenMutation(input) {
        return new Field('s_createPaypalExpressToken')
            .addArgument('input', 'S_PaypalExpressTokenInput!', input)
            .addFieldList(this._getTokenFields())
            .setAlias('paypalExpress');
    }

    _getTokenFields() {
        return ['token'];
    }
}

export default new PayPalQuery();
