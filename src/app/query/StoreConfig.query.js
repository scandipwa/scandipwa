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

class StoreConfigQuery {
    getQuery(options) {
        if (!options) throw new Error('Missing argument `options`');
        const { configs } = options;
        return new Field('storeConfig')
            .addFieldList(configs);
    }
}

export default new StoreConfigQuery();
