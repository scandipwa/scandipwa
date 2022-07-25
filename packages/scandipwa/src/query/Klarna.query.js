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

import { Field } from 'Util/Query';

/** @namespace Query/Klarna/Query */
export class KlarnaQuery {
    getCreateKlarnaTokenMutation(input) {
        return new Field('createKlarnaToken')
            .addArgument('input', 'KlarnaTokenInput!', input)
            .setAlias('klarnaToken');
    }
}

export default new KlarnaQuery();
