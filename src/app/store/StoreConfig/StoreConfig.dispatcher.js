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

import { QueryDispatcher } from 'Util/Request';
import { StoreConfigQuery } from 'Query';
import { updateStoreConfig } from './StoreConfig.action';
import { showNotification } from 'Store/Notification';

class StoreConfigDispatcher extends QueryDispatcher {
    constructor() {
        super('StoreConfig', 86400);
    }

    onSuccess(data, dispatch) {
        dispatch(updateStoreConfig(data));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching store configuration!', error));
    }

    prepareRequest(options) {
        return StoreConfigQuery.getQuery(options);
    }
}

export default new StoreConfigDispatcher();
